import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { cases } from './cases.mjs';
import { formatPrompt } from './prompt.mjs';

const provenance = JSON.parse(await readFile('docs/provenance.json', 'utf8'));
for (const [file, reference] of Object.entries(provenance.demoFiles)) {
  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  assert.equal(hash, reference.sha256, `官方 baseline 有變動：${file}`);
  console.log(`PASS immutable baseline ${file}`);
}
for (const [key, entry] of Object.entries(cases)) {
  await access(`${entry.directory}/index.html`);
  const prompt = await readFile(entry.prompt, 'utf8');
  assert(prompt.includes(entry.directory), `${key} Prompt 缺少檔案範圍`);
  assert(prompt.includes(entry.route), `${key} Prompt 缺少路徑`);
  assert(formatPrompt(prompt).startsWith('$impeccable'));
  console.log(`PASS route and prompt ${key}`);
}
assert((await readFile('.agents/skills/impeccable/SKILL.md', 'utf8')).includes(`version: ${provenance.skillVersion}`));
console.log('PASS installed skill version');
