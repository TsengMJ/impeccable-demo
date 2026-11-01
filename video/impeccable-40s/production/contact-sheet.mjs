import {chromium} from 'playwright';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const dir=resolve('../styleframes');
const files=(await readdir(dir)).filter(f=>/^S\d\d-.*\.png$/.test(f));
const cards=await Promise.all(files.map(async f=>`<figure><figcaption>${f}</figcaption><img src="data:image/png;base64,${(await readFile(resolve(dir,f))).toString('base64')}"></figure>`));
const html=`<!doctype html><meta charset="utf-8"><title>Impeccable v2 · 静态分镜</title><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#202721;color:#e8efe9;font-family:Arial}h1{font-size:24px;margin:0 0 20px}main{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}figure{margin:0}figcaption{font-size:14px;margin:0 0 8px}img{display:block;width:100%}</style><h1>Impeccable · v2 官方案例 · 静态分镜</h1><main>${cards.join('')}</main>`;
await writeFile(resolve(dir,'index.html'),html);
const browser=await chromium.launch({headless:true});
try{const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});await page.setContent(html);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await page.screenshot({path:resolve(dir,'contact-sheet-v02.png'),fullPage:true});}finally{await browser.close();}
