export function formatPrompt(raw, mode = 'skill') {
  const body = raw.replace(/^# [^\n]+\n\s*/, '').trim();
  if (mode === 'exact') return raw;
  if (mode === 'plain') return body.replace(/^\$impeccable[^\n]*\n\s*/, '').trim() + '\n';
  return (body.startsWith('$impeccable') ? body : '$impeccable\n\n' + body) + '\n';
}

const FOLLOWUPS = ['audit', 'adapt', 'bolder', 'critique', 'distill', 'animate', 'polish', 'optimize'];

export function followupPrompt(entry, key, command) {
  if (!FOLLOWUPS.includes(command)) throw new Error('未知的後續指令');
  const dir = entry.directory || entry.root;
  const route = entry.route;
  return `$impeccable ${command} ${dir}/index.html\n\n只處理 ${route}，遵守 docs/prompts/${key}.md 的原始產品事實與範圍限制。先記錄此完整 Prompt；不得修改官方 baseline 或其他變體目錄。回報實際檢查證據、額外指令與未解決問題。\n`;
}

/** Prompt aimed at a specific variant letter (a–e). */
export function variantPrompt(entry, key, letter, command) {
  if (!FOLLOWUPS.includes(command)) throw new Error('未知的後續指令');
  const route = entry.variants?.[letter];
  if (!route) throw new Error(`案例沒有變體 ${letter}`);
  const dir = route.replace(/^\//, '').replace(/\/$/, '');
  return `$impeccable ${command} ${dir}/index.html\n\n只處理 ${route}。C／D／E 必須從已凍結的 B 副本分叉，不得修改 a/ 或 b/。遵守 docs/prompts/${key}.md。回報檢查證據與未解決問題。\n`;
}
