import { chromium } from 'playwright';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';
import { getCase, options, stamp } from './cases.mjs';
import { inventory } from './files.mjs';

let browser;
try {
  const args = options();
  if (args.help) {
    console.log('npm run capture -- --case lumina --take baseline --viewport desktop|mobile [--run recordings/runs/ID] [--base http://127.0.0.1:5173]');
    process.exit(0);
  }
  const entry = getCase(args.case);
  const take = args.take || 'working';
  if (typeof take !== 'string' || !/^[a-z0-9-]+$/.test(take)) throw new Error('--take 只能使用英文小寫、數字與 -');
  if (take === 'baseline' && !entry.baseline) throw new Error('此題目沒有生成基準，不能把待生成頁錄成 baseline。請先建立對照組。');
  const view = args.viewport || 'desktop';
  if (!['desktop', 'mobile'].includes(view)) throw new Error('--viewport 必須是 desktop 或 mobile');
  const viewport = view === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const route = take === 'baseline' ? entry.baseline : entry.route;
  const url = new URL(route, args.base || 'http://127.0.0.1:5173').href;
  const sourceDirectory = take === 'baseline' ? dirname(join('public', entry.baseline.slice(1))) : entry.directory;
  let run = null;
  if (args.run) {
    run = JSON.parse(await readFile(join(args.run, 'run.json'), 'utf8'));
    if (run.case !== args.case) throw new Error('--run 的案例與 --case 不一致');
    // A referenced source snapshot must still match the files being served.
    const current = await inventory(sourceDirectory);
    const fileNames = new Set([...Object.keys(current), ...Object.keys(run.sourceSha256)]);
    for (const file of fileNames) {
      if (current[file] !== run.sourceSha256[file]) throw new Error(`快照與實際錄製來源不同：${file}。請先建立正確快照再錄影。`);
    }
  }
  const output = resolve('recordings/captures', `${stamp()}-${args.case}-${take}-${view}-${randomUUID().slice(0, 8)}`);
  await mkdir(output, { recursive: true });
  browser = await chromium.launch();
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: 'zh-TW', timezoneId: 'Asia/Taipei', colorScheme: 'light', reducedMotion: 'reduce', recordVideo: { dir: output, size: viewport } });
  const page = await context.newPage();
  const errors = [];
  const networkFailures = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => networkFailures.push({ url: request.url(), reason: request.failure()?.errorText }));
  const started = Date.now();
  const navigation = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  if (!navigation?.ok()) throw new Error(`頁面讀取失敗：${navigation?.status()} ${url}`);
  await page.evaluate(() => document.fonts.ready);
  const title = await page.title();
  if (title.includes('待生成')) throw new Error('此頁尚未生成。請先執行題目 Prompt，再錄製成果。');
  await page.evaluate(() => scrollTo(0, 0));
  const contentStartMs = Date.now() - started;
  await page.screenshot({ path: join(output, 'viewport.png') });
  await page.screenshot({ path: join(output, 'full-page.png'), fullPage: true });
  const metrics = await page.evaluate(() => ({ documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth, documentHeight: document.documentElement.scrollHeight }));
  const steps = [{ action: 'hero-hold', atMs: Date.now() - started, durationMs: 2200 }];
  await page.waitForTimeout(2200);
  const height = metrics.documentHeight;
  const positions = [...new Set([Math.min(Math.round(viewport.height * .8), height - viewport.height), Math.max(0, height - viewport.height), 0])];
  for (const top of positions) {
    const target = Math.max(0, top);
    steps.push({ action: 'scroll', top: target, atMs: Date.now() - started, motionMs: 900, holdMs: 1800 });
    // Explicit linear camera motion; page animations are disabled for reproducibility.
    await page.evaluate(targetY => new Promise(done => {
      const start = scrollY, began = performance.now(), duration = 900;
      function frame(now) { const t = Math.min(1, (now - began) / duration); window.scrollTo(0, start + (targetY - start) * t); t < 1 ? requestAnimationFrame(frame) : done(); }
      requestAnimationFrame(frame);
    }), target);
    await page.waitForTimeout(1800);
  }
  const video = page.video();
  const browserVersion = browser.version();
  await context.close();
  await rename(await video.path(), join(output, 'clip.webm'));
  const metadata = { case: args.case, take, route, url, title, viewport, deviceScaleFactor: 1, browser: browserVersion, recordedAt: new Date().toISOString(), contentStartMs, durationMs: Date.now() - started, reducedMotion: 'reduce', locale: 'zh-TW', timezone: 'Asia/Taipei', sourceRun: args.run ? resolve(args.run) : null, promptSha256: run?.promptSha256 || null, steps, metrics, pageErrors: errors, networkFailures, note: 'Browser-only scroll recording. No agent conversation or interaction validation. Leading loading frames may be trimmed using contentStartMs.' };
  await writeFile(join(output, 'capture.json'), JSON.stringify(metadata, null, 2) + '\n');
  console.log(output);
  if (errors.length || networkFailures.length) console.warn('錄影已保存；capture.json 包含瀏覽器或網路問題，使用前請檢查。');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { if (browser) await browser.close(); }
