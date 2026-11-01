import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { cases, variantMeta } from './cases.mjs';
import { formatPrompt } from './prompt.mjs';

const provenance = JSON.parse(await readFile('docs/provenance.json', 'utf8'));
for (const [file, reference] of Object.entries(provenance.demoFiles)) {
  const hash = createHash('sha256').update(await readFile(file)).digest('hex');
  assert.equal(hash, reference.sha256, `官方 baseline 有变动：${file}`);
  console.log(`PASS immutable baseline ${file}`);
}

// Official demos/*/a must match public baselines
for (const key of ['lumina', 'lumina-classic']) {
  const demoA = await readFile(`demos/${key}/a/index.html`);
  const frozen = await readFile(`public/baselines/${key}/index.html`);
  assert.equal(
    createHash('sha256').update(demoA).digest('hex'),
    createHash('sha256').update(frozen).digest('hex'),
    `${key} demos/*/a 与 public/baselines 不一致`,
  );
  console.log(`PASS demos/${key}/a mirrors baseline`);
}

for (const [key, entry] of Object.entries(cases)) {
  for (const letter of Object.keys(variantMeta)) {
    const dir = entry.variants[letter].replace(/^\//, '').replace(/\/$/, '');
    await access(`${dir}/index.html`);
  }
  const prompt = await readFile(entry.prompt, 'utf8');
  const legacyRoot = entry.root;
  assert(prompt.includes(legacyRoot) || prompt.includes(entry.directory), `${key} Prompt 缺少档案范围`);
  assert(
    prompt.includes(`/${legacyRoot}/`) || Object.values(entry.variants).some(v => prompt.includes(v)),
    `${key} Prompt 缺少路径`,
  );
  assert(formatPrompt(prompt).startsWith('$impeccable'));
  console.log(`PASS routes and prompt ${key}`);
}
assert((await readFile('.agents/skills/impeccable/SKILL.md', 'utf8')).includes(`version: ${provenance.skillVersion}`));
console.log('PASS installed skill version');
