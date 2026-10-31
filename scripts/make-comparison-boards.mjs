import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { cases, variantMeta } from './cases.mjs';

const manifest = JSON.parse(await readFile('recordings/matrix-capture-manifest.json', 'utf8'));
const captures = manifest.records.filter(record => record.code === 0 && record.motion === 'reduce');
const output = resolve('docs/evidence/boards');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const differences = {};
try {
  for (const key of Object.keys(cases)) {
    differences[key] = {};
    for (const view of ['desktop', 'mobile']) {
      const cards = [];
      for (const variant of ['a', 'b', 'c', 'd', 'e']) {
        const match = captures.find(record => record.key === key && record.variant === variant && record.view === view);
        if (!match) throw new Error(`Missing capture: ${key}/${variant}/${view}`);
        const png = await readFile(join(match.directory, 'viewport.png'));
        cards.push(`<figure><figcaption>${variantMeta[variant].label}</figcaption><img src="data:image/png;base64,${png.toString('base64')}" alt="${key} ${variant} ${view}"></figure>`);
      }
      const width = view === 'desktop' ? 1400 : 990;
      const columns = view === 'desktop' ? 2 : 3;
      const html = `<!doctype html><html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#22272b;color:#fff;font:16px system-ui;padding:24px}h1{font-size:22px;margin:0 0 18px}.grid{display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:20px}figure{margin:0;background:#14181b;padding:10px;border:1px solid #6d7378}figcaption{padding:0 0 9px;font-weight:700}img{display:block;width:100%;height:auto}</style><h1>${key} — ${view} — 同尺寸 A–E 首屏</h1><div class="grid">${cards.join('')}</div></html>`;
      const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      await page.setContent(html);
      await page.waitForFunction(() => [...document.images].every(image => image.complete));
      differences[key][view] = await page.evaluate(() => {
        const images = [...document.images];
        const canvas = document.createElement('canvas');
        canvas.width = images[0].naturalWidth; canvas.height = images[0].naturalHeight;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const pixels = image => { context.clearRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0); return context.getImageData(0, 0, canvas.width, canvas.height).data; };
        const baseline = pixels(images[0]);
        return Object.fromEntries(images.slice(1).map((image, index) => {
          const current = pixels(image);
          let total = 0, changed = 0, count = 0;
          for (let offset = 0; offset < current.length; offset += 16) {
            const delta = (Math.abs(current[offset] - baseline[offset]) + Math.abs(current[offset + 1] - baseline[offset + 1]) + Math.abs(current[offset + 2] - baseline[offset + 2])) / 3;
            total += delta; changed += delta > 30 ? 1 : 0; count++;
          }
          return [['b', 'c', 'd', 'e'][index], { meanRgbDelta: Number((total / count).toFixed(1)), changedPixelsPct: Number((changed / count * 100).toFixed(1)) }];
        }));
      });
      await page.screenshot({ path: join(output, `${key}-${view}.png`), fullPage: true });
      await page.close();
    }
  }
} finally { await browser.close(); }
await writeFile(join(output, 'visual-diff.json'), JSON.stringify({ note: 'Viewport PNG pixel difference from A at the same size, sampled every fourth pixel. This is a visual coverage heuristic, not a design quality score; E motion is absent under reduced-motion capture.', differences }, null, 2) + '\n');
console.log(output);
