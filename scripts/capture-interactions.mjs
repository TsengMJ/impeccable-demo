import { chromium } from 'playwright';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { join, resolve } from 'node:path';
import { cases, stamp } from './cases.mjs';
import { inventory } from './files.mjs';

const base = process.env.LAB_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const records = [];

async function saveStep(page, output, name, selector, read) {
  if (selector) await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(output, `${name}.png`) });
  return { step: name, value: read ? await read(page) : null };
}

async function capture(key, variant) {
  const entry = cases[key];
  const route = entry.variants[variant];
  const directory = join(entry.root, variant);
  const output = resolve('recordings/interactions', `${stamp()}-${key}-${variant}-${randomUUID().slice(0, 8)}`);
  await mkdir(output, { recursive: true });
  const sourceSha256 = await inventory(directory);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'zh-CN', timezoneId: 'Asia/Taipei', reducedMotion: 'reduce', recordVideo: { dir: output, size: { width: 1440, height: 900 } } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const steps = [];
  let failure = null;
  try {
    await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    if (key === 'wallet') {
      const read = p => p.locator('[data-task="transfer150"] [data-status]').textContent();
      steps.push(await saveStep(page, output, '01-default', '#sandbox', read));
      await page.locator('#daily-limit').fill('200');
      await page.locator('input[name="action"][value="transfer"]').check();
      steps.push(await saveStep(page, output, '02-transfer-allowed', '#tasks', read));
      await page.locator('#btn-revoke').click();
      steps.push(await saveStep(page, output, '03-revoked', '#tasks', read));
      await page.locator('#btn-reenable').click();
      steps.push(await saveStep(page, output, '04-reenabled', '#tasks', read));
    } else if (key === 'tea') {
      const read = p => p.locator('#plan-amount').textContent();
      steps.push(await saveStep(page, output, '01-quarterly', '#plans', read));
      await page.locator('[data-plan="annual"]').click();
      steps.push(await saveStep(page, output, '02-annual', '#plans', read));
      await page.locator('#preview-btn').click();
      steps.push(await saveStep(page, output, '03-preview', '#preview-modal', p => p.locator('#modal-price').textContent()));
      await page.keyboard.press('Escape');
      await page.locator('#tab-ruby').click();
      steps.push(await saveStep(page, output, '04-ruby-brew', '#brew', p => p.locator('#brew-temp').textContent()));
    } else {
      steps.push(await saveStep(page, output, '01-schedule-all', '#schedule-section', p => p.locator('#schedule').innerText()));
      await page.locator('[data-filter="SIGNAL"]').click();
      steps.push(await saveStep(page, output, '02-signal-filter', '#schedule-section', p => p.locator('#schedule').innerText()));
      await page.locator('[data-ticket="general"]').click();
      steps.push(await saveStep(page, output, '03-general-ticket', '#ticket-modal', p => p.locator('#total-value').textContent()));
      await page.locator('#qty-inc').click();
      steps.push(await saveStep(page, output, '04-two-tickets', '#ticket-modal', p => p.locator('#total-value').textContent()));
      await page.keyboard.press('Escape');
    }
  } catch (error) { failure = error.message; }
  const video = page.video();
  await context.close();
  await rename(await video.path(), join(output, 'clip.webm'));
  const sourceChangedDuringCapture = JSON.stringify(sourceSha256) !== JSON.stringify(await inventory(directory));
  const metadata = { key, variant, route, recordedAt: new Date().toISOString(), viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', sourceDirectory: directory, sourceSha256, sourceChangedDuringCapture, steps, pageErrors: errors, failure, note: 'Browser-only scripted interaction recording. No agent conversation; clicks and state changes are shown, but video does not render a mouse pointer.' };
  await writeFile(join(output, 'interaction.json'), JSON.stringify(metadata, null, 2) + '\n');
  return { key, variant, directory: output, failure, pageErrors: errors, sourceChangedDuringCapture };
}

try {
  for (const key of ['wallet', 'tea', 'festival']) {
    for (const variant of ['a', 'b', 'c', 'd', 'e']) {
      const record = await capture(key, variant);
      records.push(record);
      console.log(`${key}/${variant}: ${record.failure ? 'FAILED ' + record.failure : 'saved'}`);
    }
  }
} finally { await browser.close(); }
await writeFile('recordings/interaction-capture-manifest.json', JSON.stringify({ createdAt: new Date().toISOString(), records }, null, 2) + '\n');
if (records.some(record => record.failure || record.pageErrors.length || record.sourceChangedDuringCapture)) process.exitCode = 1;
