export function formatPrompt(raw, mode = 'skill') {
  const body = raw.replace(/^# [^\n]+\n\s*/, '').trim();
  if (mode === 'exact') return raw;
  if (mode === 'plain') return body.replace(/^\$impeccable[^\n]*\n\s*/, '').trim() + '\n';
  return (body.startsWith('$impeccable') ? body : '$impeccable\n\n' + body) + '\n';
}

const FOLLOWUPS = ['audit', 'adapt', 'bolder', 'critique', 'distill', 'animate', 'polish', 'optimize'];

export function followupPrompt(entry, key, command) {
  if (!FOLLOWUPS.includes(command)) throw new Error('未知的后续指令');
  const dir = entry.directory || entry.root;
  const route = entry.route;
  return `$impeccable ${command} ${dir}/index.html\n\n只处理 ${route}，遵守 docs/prompts/${key}.md 的原始产品事实与范围限制。先记录此完整 Prompt；不得修改官方 baseline 或其他变体目录。回报实际检查证据、额外指令与未解决问题。\n`;
}

/** Prompt aimed at a specific variant letter (a–e). */
export function variantPrompt(entry, key, letter, command) {
  if (!FOLLOWUPS.includes(command)) throw new Error('未知的后续指令');
  const route = entry.variants?.[letter];
  if (!route) throw new Error(`案例没有变体 ${letter}`);
  const dir = route.replace(/^\//, '').replace(/\/$/, '');
  return `$impeccable ${command} ${dir}/index.html\n\n只处理 ${route}。C／D／E 必须从已冻结的 B 副本分叉，不得修改 a/ 或 b/。遵守 docs/prompts/${key}.md。回报检查证据与未解决问题。\n`;
}
