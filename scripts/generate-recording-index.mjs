import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { cases, variantMeta } from './cases.mjs';

const captureManifest = JSON.parse(await readFile('recordings/matrix-capture-manifest.json', 'utf8'));
const interactionManifest = JSON.parse(await readFile('recordings/interaction-capture-manifest.json', 'utf8'));
const freezeName = (await readdir('recordings')).filter(name => name.startsWith('source-freeze-')).sort().at(-1);
const freezePath = resolve('recordings', freezeName);
const freeze = JSON.parse(await readFile(join(freezePath, 'freeze.json'), 'utf8'));
const letters = ['a', 'b', 'c', 'd', 'e'];
const records = [];
const issues = [];
const layoutFindings = [];

for (const item of captureManifest.records) {
  if (item.code !== 0) { issues.push({ kind: 'capture-failed', item }); continue; }
  const meta = JSON.parse(await readFile(join(item.directory, 'capture.json'), 'utf8'));
  const videoBytes = (await stat(join(item.directory, 'clip.webm'))).size;
  const sourceMatchFreeze = JSON.stringify(meta.sourceSha256) === JSON.stringify(freeze.records[item.key][item.variant].files);
  const entry = { ...item, metadata: meta, videoBytes, sourceMatchFreeze };
  records.push(entry);
  const overflowPx = Math.max(0, meta.metrics.documentWidth - meta.metrics.viewportWidth);
  if (overflowPx) layoutFindings.push({ key: item.key, variant: item.variant, view: item.view, overflowPx });
  if (!sourceMatchFreeze || meta.sourceChangedDuringCapture || meta.pageErrors.length || meta.networkFailures.length || videoBytes < 10000) {
    issues.push({ kind: 'capture-warning', key: item.key, variant: item.variant, view: item.view, motion: item.motion, sourceMatchFreeze, sourceChangedDuringCapture: meta.sourceChangedDuringCapture, pageErrors: meta.pageErrors, networkFailures: meta.networkFailures, videoBytes });
  }
}

for (const item of interactionManifest.records) {
  if (item.failure || item.pageErrors.length || item.sourceChangedDuringCapture) issues.push({ kind: 'interaction-warning', ...item });
}

const link = (label, path) => `[${label}](${resolve(path)})`;
const prompt = (key, variant) => {
  if (variant === 'a' && ['lumina', 'lumina-classic'].includes(key)) return '官方原始生成 Prompt 未公开';
  if (variant === 'b' && key === 'lumina') return link('最初 polish 要求', 'docs/prompts/lumina.md') + '（B 路径的完整贴上讯息未留存）';
  if (variant === 'b' && key === 'lumina-classic') return link('B 执行报告', 'docs/evidence/lumina-classic/B-REPORT.md') + '（完整贴上讯息未留存）';
  const file = variant === 'a' ? 'prompt-a.txt' : `${variant}-${{ b: 'polish', c: 'bolder', d: 'distill', e: 'animate' }[variant]}-prompt.txt`;
  return link('Prompt 简体转写', `docs/evidence/${key}/${file}`);
};
const lines = [
  '# A–E 页面录影与留证索引', '',
  `本轮录制 ${records.length} 段页面卷动影片（A–E × 五案 × 桌面／手机，另含 A／E 正常动态桌面对照）与 ${interactionManifest.records.length} 段原创题目操作影片。来源副本：${link('source freeze', join(freezePath, 'freeze.json'))}；每段的 capture.json／interaction.json 保存路径、尺寸、时间、浏览器、来源杂凑、操作与错误。`, '',
  '卷动片为无声浏览器录影，没有 Codex/Cursor 生成对话；互动片也不显示滑鼠游标。一般 A–E 片使用 `prefers-reduced-motion: reduce` 固定版面，A／E 另有 `no-preference` 片供动画比较。', '',
  '当前页面和已追踪 Prompt 已在 2026-11-01 转为简体。下方 Prompt 链接是简体转写；当时逐字输入和转换前页面请从 Git 提交 `91642f3` 取回（例如 `git show 91642f3:docs/evidence/tea/prompt-a.txt`）。', '',
];

for (const [key, entry] of Object.entries(cases)) {
  lines.push(`## ${entry.id} ${entry.label}`, '', '| 版 | 页面 | 桌面 1440×900 | 手机 390×844 | 操作片／动态片 | 指令证据 |', '|---|---|---|---|---|---|');
  for (const variant of letters) {
    const get = (view, motion = 'reduce') => records.find(record => record.key === key && record.variant === variant && record.view === view && record.motion === motion);
    const desktop = get('desktop'), mobile = get('mobile');
    if (!desktop || !mobile) { issues.push({ kind: 'missing-pair', key, variant }); continue; }
    const captureLinks = record => [link('影片', join(record.directory, 'clip.webm')), link('首屏', join(record.directory, 'viewport.png')), link('全页', join(record.directory, 'full-page.png')), link('metadata', join(record.directory, 'capture.json'))].join(' / ');
    const extras = [];
    const interaction = interactionManifest.records.find(record => record.key === key && record.variant === variant);
    if (interaction) extras.push(link('操作影片', join(interaction.directory, 'clip.webm')), link('操作纪录', join(interaction.directory, 'interaction.json')));
    const motion = get('desktop', 'no-preference');
    if (motion) extras.push(link('正常动态片', join(motion.directory, 'clip.webm')));
    lines.push(`| ${variant.toUpperCase()} ${variantMeta[variant].command || '原始'} | [开启页面](http://127.0.0.1:5173${entry.variants[variant]}) | ${captureLinks(desktop)} | ${captureLinks(mobile)} | ${extras.join(' / ') || '—'} | ${prompt(key, variant)} |`);
  }
  lines.push('', `${link('桌面并排板', `docs/evidence/boards/${key}-desktop.png`)} · ${link('手机并排板', `docs/evidence/boards/${key}-mobile.png`)}`, '');
}

lines.push('## 检查结果', '', `- 已核对 ${records.length} 段来源杂凑与 source freeze；${issues.length} 项录影完整性／浏览器错误警示。`, `- ${layoutFindings.length} 项水平溢出观察：${layoutFindings.map(f => `${f.key}/${f.variant}/${f.view} ${f.overflowPx}px`).join('；') || '无'}。官方 A 的溢出是原始页既有问题；festival D 手机仍有版面问题。`, '- 所有影片与 source freeze 留在本机，预设不进 Git；剪辑前请备份 `recordings/captures/`、`recordings/interactions/`、`recordings/source-freeze-*/`。', '');
await writeFile('recordings/MATRIX-INDEX.md', lines.join('\n'));
await writeFile('docs/evidence/CAPTURE-AUDIT.json', JSON.stringify({ checkedAt: new Date().toISOString(), sourceFreeze: freezePath, scrollVideos: records.length, interactionVideos: interactionManifest.records.length, issues, layoutFindings, videos: records.map(({ key, variant, view, motion, directory, videoBytes, sourceMatchFreeze, metadata }) => ({ key, variant, view, motion, directory, videoBytes, sourceMatchFreeze, overflowPx: Math.max(0, metadata.metrics.documentWidth - metadata.metrics.viewportWidth), durationMs: metadata.durationMs })) }, null, 2) + '\n');
console.log(`Indexed ${records.length} scroll videos and ${interactionManifest.records.length} interaction videos; ${issues.length} warnings.`);
if (records.length !== 60 || interactionManifest.records.length !== 15 || issues.length) process.exitCode = 1;
