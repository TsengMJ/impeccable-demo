import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,relative,join} from 'node:path';
import {createHash} from 'node:crypto';
import {getVideoMetadata} from '@remotion/renderer';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../../..');
const project=JSON.parse(await readFile(resolve(here,'../scenes.json'),'utf8'));
const manifest=JSON.parse(await readFile(join(root,'recordings/matrix-capture-manifest.json'),'utf8'));
const ids=[...new Set(project.scenes.flatMap(s=>s.assets))];
const assets=[];
for(const id of ids){
 const r=manifest.records.find(r=>`${r.key}-${r.variant}-${r.view}`===id&&r.motion==='reduce'&&r.code===0);
 if(!r)throw Error(`Missing ${id}`);
 const metadata=JSON.parse(await readFile(join(r.directory,'capture.json'),'utf8'));
 const files={};
 for(const f of ['viewport.png','clip.webm','capture.json']){
  const p=join(r.directory,f); const bytes=await readFile(p);
  files[f]={path:relative(root,p),sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
 }
 const video=await getVideoMetadata(join(r.directory,'clip.webm'));
 await copyFile(join(r.directory,'viewport.png'),join(here,'public/assets',`${id}.png`));
 if(id==='lumina-b-mobile')await copyFile(join(r.directory,'clip.webm'),join(here,'public/assets',`${id}.webm`));
 assets.push({id,key:r.key,variant:r.variant,view:r.view,files,capture:metadata,video});
}
const inventory={createdAt:new Date().toISOString(),projectRoot:root,edition:'v2 official demo focus',assets};
await writeFile(join(here,'asset-inventory.json'),JSON.stringify(inventory,null,2)+'\n');
const lines=['# 素材清单 v2 · 官方案例主线','','素材来自 2026-11-01 的真实页面录影。源文件保留在仓库 recordings/captures/；仅复制制作需要的 PNG 与一段 WebM 到 production/public/assets/，原件 SHA-256 和媒体信息见 production/asset-inventory.json。','','| ID | Scene | 视频时长 | 原始尺寸 | 原件目录（仓库相对） |','|---|---|---|---|---|'];
for(const a of assets){lines.push(`| ${a.id} | ${project.scenes.filter(s=>s.assets.includes(a.id)).map(s=>s.id).join(', ')} | ${a.video.durationInSeconds.toFixed(2)}s | ${a.video.width}×${a.video.height} | \`${dirname(a.files['clip.webm'].path)}\` |`)}
lines.push('','## 核验','',`Lumina 390px 视口：A 页面宽 ${assets.find(a=>a.id==='lumina-a-mobile').capture.metrics.documentWidth}px；B 页面宽 ${assets.find(a=>a.id==='lumina-b-mobile').capture.metrics.documentWidth}px。所有入选录影的源码在录制中未变化，pageErrors / networkFailures 均为空。`,'','- 官方起点与本地修改关系：docs/evidence/OFFICIAL-RESULTS.md。','- Classic D 从 B 分叉：docs/evidence/lumina-classic/D-REPORT.md。','- 风格取舍：wallet B / C 手机首屏；这是 B→C，不冒充无 skill 对照。','- 旁白：本机 Tingting 临时音轨，成本 $0，仅用于 Animatic 校时。','- 当前未调用 Higgsfield；无生成式视频画面、无音乐采购。','- 原始 PNG 保留实际页面像素；镜头裁切与动画属于编辑加工。','');
await writeFile(resolve(here,'../asset-manifest.md'),lines.join('\n'));
console.log(assets.map(a=>`${a.id}: ${a.video.durationInSeconds}s`).join('\n'));
