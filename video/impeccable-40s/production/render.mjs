import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill,renderMedia} from '@remotion/renderer';
import {chromium} from 'playwright';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const here=dirname(fileURLToPath(import.meta.url));
const mode=process.argv[2]||'stills';
const target=process.argv[3];
const serveUrl=await bundle({entryPoint:resolve(here,'src/index.jsx'),outDir:resolve(here,'.bundle'),publicDir:resolve(here,'public')});
const browser=await openBrowser('chrome',{browserExecutable:chromium.executablePath()});
const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser});
const keyframes={S01:[18,100],S02:[38,148],S03:[75],S04:[110,155,250],S05:[45,140],S06:[95]};
try{
 if(mode==='stills'){
  for(const [id,frames] of Object.entries(keyframes)){
   if(target&&id!==target)continue;
   for(let i=0;i<frames.length;i++){
    const output=resolve(here,`../styleframes/${id}-r01-${String(i+1).padStart(2,'0')}.png`);
    await renderStill({serveUrl,composition:compositions.find(c=>c.id===id),puppeteerInstance:browser,output,frame:frames[i],inputProps:{sceneId:id,still:true},imageFormat:'png'});
    console.log(output);
   }
  }
 }else{
  const ids=mode==='scene'?[target]:['S01','S02','S03','S04','S05','S06'];
  for(const id of ids){
   const output=resolve(here,`../previews/${id}-r01.mp4`);
   let last=-1;
   await renderMedia({serveUrl,composition:compositions.find(c=>c.id===id),puppeteerInstance:browser,outputLocation:output,codec:'h264',audioCodec:'aac',crf:24,scale:2/3,concurrency:2,pixelFormat:'yuv420p',onProgress:({progress})=>{const p=Math.floor(progress*4);if(p>last){last=p;console.log(`${id} ${Math.round(progress*100)}%`)}}});
   console.log(output);
  }
 }
}finally{await browser.close({silent:true})}
