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
  if (typeof args.model !== 'string' || !args.model.trim()) throw new Error('--model 必填；不知道時請寫 unknown，不要猜測模型版本');
  if (args.command && args.prompt) throw new Error('--command 與 --prompt 請擇一');
  const mode = args.mode || (args.prompt ? 'exact' : 'skill');
  if (!['skill', 'plain', 'exact'].includes(mode)) throw new Error('--mode 必須是 skill / plain / exact');
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
  await writeFile(join(output, 'observations.md'), `# ${item.id} / ${args.phase}\n\n模型：${args.model}\n\n## 實際執行（人工填寫）\n- 開始／結束時間：\n- 額外 Prompt：\n- 手動修改與失敗：\n- 圖片來源／生成 Prompt：\n\n## 評分（未測留空，1–5 分；每項附證據）\n| 維度 | 分數 | 證據／素材時間碼 |\n|---|---|---|\n| 辨識度 | | |\n| 內容層級 | | |\n| 需求完成 | | |\n| 互動正確 | | |\n| 響應式 | | |\n| 可及性 | | |\n\n## 結論範圍與未解決問題\n\n`);
  console.log(output);
} catch (error) { console.error(error.message); process.exitCode = 1; }
