import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { cases, variantMeta } from './cases.mjs';
import { formatPrompt, followupPrompt } from './prompt.mjs';

const base = process.env.LAB_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const checks = [], errors = [];
const evidence = 'docs/evidence/screenshots';
const pageHeading = 'h1, p.brand, .brand__name, .hero__title, .hero__brand';
async function waitPageHeading(scope, timeout = 30000) {
  await scope.locator(pageHeading).first().waitFor({ state: 'attached', timeout });
}
await mkdir(evidence, { recursive: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await page.locator('.case-card').first().waitFor();
  assert.equal(await page.locator('.case-card').count(), 5);
  await page.locator('[data-filter="official"]').click();
  assert.equal(await page.locator('.case-card').count(), 2);
  await page.locator('[data-filter="brief"]').click();
  assert.equal(await page.locator('.case-card').count(), 3);
  await page.locator('[data-filter="all"]').click();
  checks.push('Gallery filters: 5 / 2 / 3');

  for (const [key, entry] of Object.entries(cases)) {
    for (const letter of Object.keys(variantMeta)) {
      const dir = entry.variants[letter].replace(/^\//, '').replace(/\/$/, '');
      await access(`${dir}/index.html`);
    }
    await page.goto(`${base}/cases/${key}`);
    await page.locator('#prompt-text').waitFor();
    const raw = await readFile(entry.prompt, 'utf8');
    const initialMode = entry.kind === 'brief' || key.includes('wallet') || key === 'tea' || key === 'festival'
      ? (['wallet', 'tea', 'festival'].includes(key) ? 'plain' : 'skill')
      : 'skill';
    // official prompts use skill mode by default in UI
    const mode = ['wallet', 'tea', 'festival'].includes(key) ? 'plain' : 'skill';
    assert.equal(await page.locator('#prompt-text').textContent(), formatPrompt(raw, mode));
    await page.locator('[data-variant="b"]').click();
    assert.equal(await page.locator('.demo-frame').getAttribute('src'), entry.variants.b);
    await page.locator('[data-variant="a"]').click();
    const frame = page.frameLocator('.demo-frame');
    await waitPageHeading(frame);
    checks.push(`${key}: A–E paths exist, preview switches A↔B`);
    await page.goto(base + entry.variants.a);
    await waitPageHeading(page);
    await page.goto(base + entry.variants.b);
    await waitPageHeading(page);
    checks.push(`${key}: direct A and B routes`);
  }

  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/guide', ...Object.keys(cases).map(key => `/cases/${key}`)]) {
      await page.goto(base + path);
      await page.locator('h1').first().waitFor({ state: 'attached' });
      const metrics = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(metrics.scroll <= metrics.width + 1, `${path} overflows at ${width}: ${metrics.scroll}`);
    }
    checks.push(`${width}px: harness routes have no horizontal overflow`);
  }

  await page.goto(base + '/');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), '跳至內容');
  checks.push('Keyboard entry: skip link is the first focus target');
  await page.goto(base + '/not-a-case');
  assert((await page.locator('h1').textContent()).includes('不存在'));
  assert.deepEqual(errors, [], 'Unexpected browser JavaScript errors');
  await writeFile('docs/evidence/smoke.json', JSON.stringify({ recordedAt: new Date().toISOString(), base, browser: browser.version(), checks, errors }, null, 2) + '\n');
  console.log(checks.map(check => `PASS ${check}`).join('\n'));
} finally { await browser.close(); }
