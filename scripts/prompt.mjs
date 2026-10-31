export function formatPrompt(raw, mode = 'skill') {
  const body = raw.replace(/^# [^\n]+\n\s*/, '').trim();
  if (mode === 'exact') return raw;
  if (mode === 'plain') return body.replace(/^\$impeccable[^\n]*\n\s*/, '').trim() + '\n';
  return (body.startsWith('$impeccable') ? body : '$impeccable\n\n' + body) + '\n';
}

export function followupPrompt(entry, key, command) {
  if (!['audit', 'adapt', 'bolder', 'critique'].includes(command)) throw new Error('未知的後續指令');
  return `$impeccable ${command} ${entry.directory}/index.html\n\n只處理 ${entry.route}，遵守 docs/prompts/${key}.md 的原始產品事實與範圍限制。先記錄此完整 Prompt；不得修改官方 baseline 或其他頁面。回報實際檢查證據、額外指令與未解決問題。\n`;
}
