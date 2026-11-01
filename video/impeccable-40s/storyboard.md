# Storyboard v2 · 静态画面先行

内容已按用户授权锁定。风格：深墨底、暖白标题、少量珊瑚红指出问题、薄荷绿指出改善；真实网页为主体。1080×1920，中文标题 76–90px，字幕 52px，标签 34–38px。重点放在 x=110–970、y=250–1620，底部留给平台 UI。字体使用本机 PingFang SC 与 Arial，不额外购买字体。

字幕使用短句，位于底部独立区域，不与网页标签重叠。原网页长英文不是要求观众阅读的正文；需要看导航与 CTA 时裁切放大。原版与修改版保持同一放大倍率；镜头下移与固定裁切在每段标明。

## S01 · 0–5s / 5 秒

- **Core Message：**官方起点在手机上的实际问题
- **Voiceover：**这页第一眼还行吧？一到手机，右边的导航直接没了。
- **Assets：**lumina-a-desktop, lumina-a-mobile
- **Layout：**先给桌面 1 秒，再切真实手机截图。放大导航区域，保留右侧视口边界；698px / 390px 只在后半段出现。
- **Animation：**同机位切换；不把桌面图缩窄冒充响应式网页。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S01-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

## S02 · 5–11s / 6 秒

- **Core Message：**polish 修正可见的手机排版问题
- **Voiceover：**我用这个设计技能打磨了一遍，导航和按钮就顺多了。
- **Assets：**lumina-a-mobile, lumina-b-mobile
- **Layout：**同位置 A→B；先看到导航恢复，再向下移动镜头看两个 CTA 改成直排。
- **Animation：**对位切换，随后一次缓慢下移。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S02-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

## S03 · 11–17s / 6 秒

- **Core Message：**产品是什么，用来做什么
- **Voiceover：**它叫 Impeccable，开源的，直接配合编程 AI 改界面。
- **Assets：**lumina-b-mobile
- **Layout：**名称大字只出现一次；下半画面保留真实完成态，不用一屏功能卡。
- **Animation：**镜头缓慢下移；留出读名称的停顿。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S03-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

## S04 · 17–28s / 11 秒

- **Core Message：**Classic 的装饰与信息层级变化
- **Voiceover：**还有这个，光晕、渐变、发光按钮，全挤在一起。打磨完再精简，内容终于没被装饰抢走。
- **Assets：**lumina-classic-a-mobile, lumina-classic-b-mobile, lumina-classic-d-mobile
- **Layout：**同一手机视口、同一放大倍率，先 A 从标题下移到按钮、短暂 B、再 D；明示 A→B→D，不把累计修改写成仅 distill 的效果。
- **Animation：**A 4.5 秒内下移镜头（截图源坐标 100→350px），B 停 1.5 秒，D 停 5 秒。B/D 回到源坐标 100px。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S04-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

## S05 · 28–34s / 6 秒

- **Core Message：**如实解释自拟案例的有限增益
- **Voiceover：**我们自己那几页，本来就没太多问题，更多是在换风格。
- **Assets：**wallet-b-mobile, wallet-c-mobile
- **Layout：**一组钱包 B / C 风格分支，作为次要证据；不称为可用性提升，不展示安全性结论。
- **Animation：**对位切换，保持相同截图范围。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S05-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

## S06 · 34–40s / 6 秒

- **Core Message：**给出适用时机与项目入口
- **Voiceover：**所以，页面已经做出来，但总觉得哪儿不对，我会先拿它试试。
- **Assets：**lumina-b-mobile
- **Layout：**回到 Lumina 完成态，播放真实页面录影的稳定段；末 3 秒保留仓库地址。
- **Animation：**播放现有页面滚动录影；仓库地址始终固定，方便阅读。
- **Transition：**段内短切换，段间直接切，保持总长 40 秒。
- **Production Method：**Remotion，已有真实 PNG/WebM + 程序化字幕/标注；无生成式产品画面。
- **Style Frames：**`styleframes/S06-r01-01.png`，对照段另有 `-02.png`（S04 有 `-03.png`）。
- **验收：**先看信息焦点与手机字号，再检查原版/修改版标签和相同裁切。未看过静态图不可进入动画渲染。

