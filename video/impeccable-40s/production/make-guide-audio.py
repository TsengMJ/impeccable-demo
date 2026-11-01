from pathlib import Path
import subprocess,json,re,wave
here=Path(__file__).resolve().parent
project=json.loads((here/'../scenes.json').read_text())
phrases={
'S01':['这页第一眼还行吧？','一到手机，右边的导航直接没了。'],
'S02':['我用这个设计技能打磨了一遍，','导航和按钮就顺多了。'],
'S03':['它叫 Impeccable，','开源的，直接配合编程 AI 改界面。'],
'S04':['还有这个，','光晕、渐变、发光按钮，','全挤在一起。','打磨完再精简，','内容终于没被装饰抢走。'],
'S05':['我们自己那几页，','本来就没太多问题，','更多是在换风格。'],
'S06':['所以，页面已经做出来，','但总觉得哪儿不对，','我会先拿它试试。']}
clips=[]
for s in project['scenes']:
 durations=[]
 for i,text in enumerate(phrases[s['id']]):
  name=f"{s['id']}-{i+1:02}"
  out=here/'public/audio'/f'{name}.wav'
  if not out.exists():
   subprocess.run(['say','-v','Tingting','-r','190','-o',str(out),'--file-format=WAVE','--data-format=LEI16@24000',text],check=True,timeout=20)
  with wave.open(str(out)) as w:dur=w.getnframes()/w.getframerate()
  durations.append((name,text,dur))
 total=sum(d for n,t,d in durations)
 print(s['id'],'speech',round(total,3),'budget',s['durationSec'],flush=True)
 gap=.08
 start=.12
 if total+gap*(len(durations)-1)+start>s['durationSec']:raise Exception(f"{s['id']} exceeds scene; adjust story pacing, do not speed voice")
 for name,text,dur in durations:
  clips.append({'sceneId':s['id'],'file':f'audio/{name}.wav','text':text,'sceneStartSec':round(start,4),'durationSec':round(dur,4),'globalStartSec':round(s['startSec']+start,4),'globalEndSec':round(s['startSec']+start+dur,4)})
  start+=dur+gap
(here/'src/guide-audio.json').write_text(json.dumps({'type':'LOCAL_TEMP_GUIDE','voice':'Tingting','rate':190,'costUsd':0,'clips':clips},ensure_ascii=False,indent=2)+'\n')
(here/'../previews/guide-voice-note.md').write_text('临时旁白由本机 Tingting 生成，仅用于检验内容和剪辑节奏；尚未选择正式音色。每句字幕绑定对应音频片段的真实长度。费用 $0。\n')
