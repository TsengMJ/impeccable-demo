import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { cases } from './cases.mjs';
import { formatPrompt, followupPrompt } from './prompt.mjs';

const base = process.env.LAB_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const checks = [], errors = [], officialIssues = [];
const evidence = 'docs/evidence/screenshots';
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
  await page.screenshot({ path: `${evidence}/lab-desktop.png`, fullPage: true });
  for (const [key, entry] of Object.entries(cases)) {
    await page.goto(`${base}/cases/${key}`);
    await page.locator('#prompt-text').waitFor();
    assert((await page.title()).includes(entry.label.split(' ')[0]));
    const raw = await readFile(entry.prompt, 'utf8');
    const initialMode = entry.baseline ? 'skill' : 'plain';
    assert.equal(await page.locator('#prompt-text').textContent(), formatPrompt(raw, initialMode));
    await page.locator('#copy-prompt').click();
    await page.waitForFunction(async text => (await navigator.clipboard.readText()) === text, formatPrompt(raw, initialMode));
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), formatPrompt(raw, initialMode));
    await page.locator('[data-command="audit"]').click();
    await page.waitForFunction(async text => (await navigator.clipboard.readText()) === text, followupPrompt(entry, key, 'audit'));
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), followupPrompt(entry, key, 'audit'));
    if (!entry.baseline) {
      await page.locator('#prompt-mode').selectOption('skill');
      assert.equal(await page.locator('#prompt-text').textContent(), formatPrompt(raw, 'skill'));
      await page.locator('#prompt-mode').selectOption('plain');
      assert.equal(await page.locator('#prompt-text').textContent(), formatPrompt(raw, 'plain'));
    } else {
      await page.locator('[data-width="390"]').click();
      assert.equal(await page.locator('.demo-frame').evaluate(frame => frame.style.width), '390px');
      await page.locator('[data-version="working"]').click();
      assert.equal(await page.locator('.demo-frame').getAttribute('src'), entry.route);
      await page.locator('[data-version="baseline"]').click();
      const frame = page.frameLocator('.demo-frame');
      await frame.locator('h1').waitFor();
      assert((await frame.locator('h1').textContent()).includes('Build faster'));
    }
    checks.push(`${key}: direct case route, prompt match, clipboard, iteration command, preview/mode`);
    if (key === 'wallet') {
      const downloadPromise = page.waitForEvent('download');
      await page.locator('#download-prompt').click();
      const download = await downloadPromise;
      assert.equal(await readFile(await download.path(), 'utf8'), formatPrompt(raw, 'plain'));
      checks.push('Prompt download matches exact clipboard text');
      await page.screenshot({ path: `${evidence}/wallet-brief-desktop.png`, fullPage: true });
    }
    await page.goto(base + entry.route);
    await page.locator('h1').waitFor();
    if (entry.baseline) {
      assert((await page.title()).includes('Lumina'));
      await page.setViewportSize({ width: 390, height: 844 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      officialIssues.push({ case: key, mobileOverflow: overflow, action: 'Working copy after first skill-guided modification; frozen upstream baseline remains separate.' });
      await page.setViewportSize({ width: 1440, height: 900 });
    } else assert((await page.title()).includes('待生成'));
    checks.push(`${key}: direct standalone route`);
  }
  for (const width of [390, 360]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/guide', ...Object.keys(cases).map(key => `/cases/${key}`), ...Object.values(cases).filter(c => !c.baseline).map(c => c.route)]) {
      await page.goto(base + path);
      await page.locator('h1').waitFor();
      const metrics = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(metrics.scroll <= metrics.width + 1, `${path} overflows at ${width}: ${metrics.scroll}`);
    }
    checks.push(`${width}px: harness and placeholder routes have no horizontal overflow`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.screenshot({ path: `${evidence}/lab-mobile.png`, fullPage: true });
  await page.goto(base + '/cases/wallet');
  await page.screenshot({ path: `${evidence}/wallet-brief-mobile.png`, fullPage: true });
  await page.goto(base + '/cases/lumina');
  await page.screenshot({ path: `${evidence}/lumina-preview-mobile.png`, fullPage: true });
  await page.goto(base + '/');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), '跳至內容');
  checks.push('Keyboard entry: skip link is the first focus target');
  await page.goto(base + '/not-a-case');
  assert((await page.locator('h1').textContent()).includes('不存在'));
  checks.push('Unknown route shows an explicit not-found state');
  assert.deepEqual(errors, [], 'Unexpected browser JavaScript errors');
  checks.push('No browser pageerror during smoke checks');
  await writeFile('docs/evidence/smoke.json', JSON.stringify({ recordedAt: new Date().toISOString(), base, browser: browser.version(), checks, officialIssues, errors }, null, 2) + '\n');
  console.log(checks.map(check => `PASS ${check}`).join('\n'));
  console.log(JSON.stringify({ officialIssues }));
} finally { await browser.close(); }
