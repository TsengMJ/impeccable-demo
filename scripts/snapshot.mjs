import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { getCase, options, stamp } from './cases.mjs';
import { formatPrompt, followupPrompt } from './prompt.mjs';
import { hash, inventory } from './files.mjs';
try {
  const args = options();
  if (args.help) {
    console.log('npm run snapshot -- --case wallet --phase before --model "actual model" [--mode skill|plain|exact] [--prompt exact.txt] [--command audit|adapt|bolder|critique] [--transcript session.md] [--note "..."]');
    process.exit(0);
  }
  const item = getCase(args.case);
  if (!args.phase || !/^[a-z0-9-]+$/.test(args.phase)) throw new Error('--phase 必填：例如 before / after / adapt-01');
  if (typeof args.model !== 'string' || !args.model.trim()) throw new Error('--model 必填；不知道时请写 unknown，不要猜测模型版本');
  if (args.command && args.prompt) throw new Error('--command 与 --prompt 请择一');
  const mode = args.mode || (args.prompt ? 'exact' : 'skill');
  if (!['skill', 'plain', 'exact'].includes(mode)) throw new Error('--mode 必须是 skill / plain / exact');
  const raw = await readFile(args.prompt || item.prompt, 'utf8');
  const prompt = args.command ? followupPrompt(item, args.case, args.command) : formatPrompt(raw, mode);
  const id = `${stamp()}-${args.case}-${args.phase}-${randomUUID().slice(0, 8)}`;
  const output = resolve('recordings/runs', id);
  const transcript = args.transcript ? await readFile(args.transcript) : null;
  await mkdir(output, { recursive: true });
  await cp(item.directory, join(output, 'source'), { recursive: true });
  await writeFile(join(output, 'prompt.txt'), prompt);
  await writeFile(join(output, 'brief.md'), raw);
  for (const file of ['package.json', 'package-lock.json', 'vite.config.js']) await cp(file, join(output, file));
  await cp('docs/provenance.json', join(output, 'provenance.json'));
  if (transcript) await writeFile(join(output, 'transcript.md'), transcript);
  // Preserve context that can affect the next run, even if a previous task edits it.
  for (const file of ['AGENTS.md', 'PRODUCT.md', 'DESIGN.md', '.impeccable/config.json']) {
    try { const value = await readFile(file); await mkdir(join(output, 'context'), { recursive: true }); await writeFile(join(output, 'context', file.replaceAll('/', '_')), value); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  let git = null;
  try { git = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
  const metadata = {
    id, createdAt: new Date().toISOString(), case: args.case, caseId: item.id, phase: args.phase,
    route: item.route, model: args.model, mode, command: args.command || null,
    promptFile: args.prompt || item.prompt, promptSha256: hash(prompt),
    skillSha256: hash(await readFile('.agents/skills/impeccable/SKILL.md')),
    skillFilesSha256: await inventory('.agents/skills/impeccable'),
    lockfileSha256: hash(await readFile('package-lock.json')),
    sourceSha256: await inventory(join(output, 'source')), node: process.version, platform: process.platform,
    git, note: args.note || '', transcriptRecorded: Boolean(transcript),
    status: 'snapshot-only; no skill execution or quality claim',
  };
  await writeFile(join(output, 'run.json'), JSON.stringify(metadata, null, 2) + '\n');
  await writeFile(join(output, 'observations.md'), `# ${item.id} / ${args.phase}\n\n模型：${args.model}\n\n## 实际执行（人工填写）\n- 开始／结束时间：\n- 额外 Prompt：\n- 手动修改与失败：\n- 图片来源／生成 Prompt：\n\n## 评分（未测留空，1–5 分；每项附证据）\n| 维度 | 分数 | 证据／素材时间码 |\n|---|---|---|\n| 辨识度 | | |\n| 内容层级 | | |\n| 需求完成 | | |\n| 互动正确 | | |\n| 响应式 | | |\n| 可及性 | | |\n\n## 结论范围与未解决问题\n\n`);
  console.log(output);
} catch (error) { console.error(error.message); process.exitCode = 1; }
