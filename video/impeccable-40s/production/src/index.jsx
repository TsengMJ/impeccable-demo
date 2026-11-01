import React from 'react';
import {AbsoluteFill,Audio,Composition,Img,OffthreadVideo,Sequence,interpolate,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import project from './scenes.json';
import audio from './guide-audio.json';
const INK='#101411',WHITE='#F1F1E7',MUTED='#9CA69E',MINT='#B9E6C5',CORAL='#FF9D83';
const font='"PingFang SC", "Arial", sans-serif';
const smooth=(f,a,b,from,to)=>interpolate(f,[a,b],[from,to],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
function Heading({title,sub,accent=MINT}){
 return <div style={{position:'absolute',left:110,top:255,width:860}}>
  <div style={{fontSize:32,fontWeight:600,color:accent,letterSpacing:2,marginBottom:26}}>IMPECCABLE / 实测笔记</div>
  <div data-qa="headline" style={{fontSize:title==='Impeccable'?110:80,fontWeight:650,lineHeight:1.15,letterSpacing:-2,whiteSpace:'pre-line'}}>{title}</div>
  {sub&&<div style={{fontSize:42,lineHeight:1.4,marginTop:24,color:MUTED}}>{sub}</div>}
 </div>
}
function Stage({asset,offset=0,width=860,height=840,top=570,label,meta,accent=MINT,desktop=false,video=false,frame=0,annotation=false}){
 const sourceWidth=desktop?1440:390;
 const renderedWidth=desktop?1260:width;
 const scale=renderedWidth/sourceWidth;
 return <div style={{position:'absolute',left:110,top,width:860}}>
  <div data-qa="stage-label" style={{height:63,display:'flex',alignItems:'flex-start',justifyContent:'space-between',fontSize:35,fontWeight:600,color:accent}}><span>{label}</span><span style={{color:MUTED,fontSize:31}}>{meta}</span></div>
  <div style={{position:'relative',height,overflow:'hidden',background:desktop?'#f9f1e6':'#1c241f',borderRadius:10,border:'1px solid #435047'}}>
   <div style={{position:'absolute',left:(860-renderedWidth)/2,top:-offset*scale,width:renderedWidth}}>
    {video?<OffthreadVideo src={staticFile('assets/lumina-b-mobile.webm')} muted trimBefore={30} style={{width:'100%',display:'block'}}/>:<Img src={staticFile(`assets/${asset}.png`)} style={{width:'100%',display:'block'}}/>}
   </div>
   {annotation&&<><div style={{position:'absolute',right:0,top:0,height:250,borderRight:`7px solid ${CORAL}`}}/><div style={{position:'absolute',right:18,top:250,color:CORAL,fontSize:36,fontWeight:600,background:INK,padding:'14px 20px'}}>导航越过右边界</div></>}
  </div>
 </div>
}
function Caption({sceneId,frame,still}){
 const parts=audio.clips.filter(c=>c.sceneId===sceneId);
 let c=parts.find(c=>frame/30>=c.sceneStartSec&&frame/30<c.sceneStartSec+c.durationSec+.07);
 if(!c&&still)c=parts[0];
 if(!c)return null;
 return <div data-qa="caption" style={{position:'absolute',left:110,top:1492,width:860,minHeight:115,display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center',fontSize:52,fontWeight:500,lineHeight:1.48,color:WHITE,textWrap:'balance'}}>{c.text}</div>
}
function Scene({sceneId,still=false}){
 const f=useCurrentFrame();const s=project.scenes.find(s=>s.id===sceneId);
 const sec=f/30;
 let content;
 if(sceneId==='S01'){
  const desktop=f<36;
  content=<><Heading title={'手机一看，\n露馅了'} accent={CORAL}/><Stage asset={desktop?'lumina-a-desktop':'lumina-a-mobile'} desktop={desktop} offset={desktop?0:0} top={565} height={865} label={desktop?'官方原版 A · 桌面':'官方原版 A · 手机'} meta={desktop?'实际截图':'视口 390 / 页面 698px'} accent={CORAL} annotation={!desktop&&f>65}/></>;
 }else if(sceneId==='S02'){
  const before=f<18;const offset=before?0:smooth(f,65,125,0,365);
  content=<><Heading title={'导航和按钮，\n顺了'}/><Stage asset={before?'lumina-a-mobile':'lumina-b-mobile'} offset={offset} top={565} height={865} label={before?'原版 A':'本地打磨 B · polish'} meta={before?'698px':'页面回到 390px'} accent={before?CORAL:MINT}/></>;
 }else if(sceneId==='S03'){
  content=<><Heading title="Impeccable" sub="给编程 AI 的开源设计技能"/><Stage asset="lumina-b-mobile" offset={smooth(f,0,180,185,240)} top={650} height={780} label="就在已有页面上继续改" meta="Lumina / B"/></>;
 }else if(sceneId==='S04'){
  const variant=f<135?'a':f<180?'b':'d';
  const labels={a:'官方原版 A',b:'本地打磨 B',d:'打磨后，再精简 D'};
  content=<><Heading title={'装饰少了，\n内容出来了'}/><Stage asset={`lumina-classic-${variant}-mobile`} width={700} offset={variant==='a'?smooth(f,32,95,100,350):100} top={565} height={865} label={labels[variant]} meta="A → B → D" accent={variant==='a'?CORAL:MINT}/></>;
 }else if(sceneId==='S05'){
  const v=f<90?'b':'c';
  content=<><Heading title={'起点已经不错，\n更多是换风格'} accent="#C6BDE9"/><Stage asset={`wallet-${v}-mobile`} offset={110} top={565} height={865} label={v==='b'?'自拟钱包 · B':'自拟钱包 · C'} meta={v==='b'?'polish':'bolder'} accent="#C6BDE9"/></>;
 }else{
  content=<><Heading title={'页面做完了，\n还不满意？'}/><Stage asset="lumina-b-mobile" video={!still} offset={0} top={565} height={650} label="可以拿它试试" meta="Lumina / B"/><div data-qa="cta" style={{position:'absolute',top:1308,left:110,width:860,fontSize:38,lineHeight:1.4,color:MINT,fontWeight:600}}>github.com/pbakaus/impeccable</div></>;
 }
 return <AbsoluteFill style={{background:INK,color:WHITE,fontFamily:font,overflow:'hidden'}}>
  <div style={{position:'absolute',top:220,left:110,width:860,height:2,background:'#354039'}}/>
  {content}
  <Caption sceneId={sceneId} frame={f} still={still}/>
  <div style={{position:'absolute',left:110,top:1660,width:860,height:3,background:'#27332b'}}><div style={{height:3,width:`${(s.startSec+sec)/40*100}%`,background:MINT}}/></div>
  {!still&&audio.clips.filter(c=>c.sceneId===sceneId).map(c=><Sequence key={c.file} from={Math.round(c.sceneStartSec*30)} durationInFrames={Math.ceil(c.durationSec*30)}><Audio src={staticFile(c.file)} volume={1}/></Sequence>)}
 </AbsoluteFill>
}
function Film(){return <AbsoluteFill>{project.scenes.map(s=><Sequence key={s.id} from={s.startSec*30} durationInFrames={s.durationSec*30}><Scene sceneId={s.id}/></Sequence>)}</AbsoluteFill>}
function Root(){return <><Composition id="Animatic" component={Film} durationInFrames={1200} fps={30} width={1080} height={1920}/>{project.scenes.map(s=><Composition key={s.id} id={s.id} component={Scene} defaultProps={{sceneId:s.id,still:false}} durationInFrames={s.durationSec*30} fps={30} width={1080} height={1920}/>)}</>}
registerRoot(Root);
