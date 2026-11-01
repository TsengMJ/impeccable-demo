# 官方 Demo 第一轮测试结果

日期：2026-10-31。此档记录已执行的 D01 / D02，以及录影剪辑所需的来源关系。完整 Prompt 在 `docs/prompts/` 与各轮快照的 `prompt.txt`。本轮是使用者在既有 Codex 对话中指示开始实现，代理读取本地 Impeccable skill 的指令与对应 playbook 后实作；**没有另开新对话贴上 `$impeccable ...` 作为独立 UI 指令**。影片中应照此描述，不能把本轮说成录到 slash 指令的一键生成。

| ID | 官方起点 | 本轮指令与范围 | 工作副本 | 验证重点 |
|---|---|---|---|---|
| D01 | `public/baselines/lumina/index.html` | `docs/prompts/lumina.md`，`$impeccable polish demos/lumina/index.html` | `demos/lumina/index.html` | 手机排版、焦点、保留文案与连结 |
| D02 | `public/baselines/lumina-classic/index.html` | `docs/prompts/lumina-classic.md`，`$impeccable distill demos/lumina-classic/index.html` | `demos/lumina-classic/index.html` | 移除装饰、保持内容与 CTA |

两个原始档仍与上游固定 commit 的 SHA-256 相符，没有被这次修改覆盖。所有原始产品、客户、投资与 SOC 2 等宣称属官方虚构 Demo 文案，未在本轮查证；CTA 仍保留原本的 `href="#"` 示范连结。

## D01 / Lumina polish

- 使用者要求保留品牌、原始文字、顺序与连结。代理没有加入新宣称或改写文案。
- 变更：导航在窄萤幕折行、功能卡改为可读的单栏、CTA 在手机上纵向排列；补上键盘焦点、44px 导航点击高度与 reduced-motion 处理；三个 emoji 图示换成同一笔画风格的 SVG。
- 390px 前：页面实际宽 698px。后：390px。320、360、390、600、720、768、1024、1440px 的页面宽均等于视窗宽，没有连结跑到右侧画面外。`lumina-polish-browser.json` 记录程式比对的原始文字与所有连结一致；第一个 Tab 焦点有可见 outline。`npm run build` 通过。
- Impeccable 侦测器在完成后报 8 项 warning：icon-tile-stack ×3、italic-serif-display、hero-eyebrow-chip、overused-font ×2、cream-palette。这些大多是原始页的字型、配色与结构；为遵守只做 polish、保留品牌与文案的要求，本轮未把其余样式全部改掉。侦测器 exit code 2 代表发现问题，不能说是「0 finding」。原始页在这次没有单独的 detector 计数，故不宣称 warning 数下降了多少。
- 证据：`lumina-polish-browser.json`、`lumina-polish-detector.json`、`screenshots/lumina-before-mobile-390.png`、`screenshots/lumina-after-mobile-390.png`、`screenshots/lumina-after-desktop-1440.png`。
- 来源快照：`recordings/runs/2026-10-31T15-28-35-821Z-lumina-before-polish-af0beb1b/` 与 `recordings/runs/2026-10-31T15-32-28-760Z-lumina-after-polish-04c3cf82/`。

## D02 / Classic distill

- 保留原有 h1、说明段、六个客户名称、三项功能的标题与说明、投资文字、CTA 文字、所有连结与 footer。程式比对详见 `lumina-classic-distill-browser.json`。
- 删减纯装饰：英雄与底部的多层光晕、渐层文字、发光按钮、玻璃卡片、emoji 与重复的「Powered by AI」眉标。该资讯仍出现在原有 lede 与 footer。功能资讯由三张卡变成三列，方便扫读。
- 390px 前：页面实际宽 694px。后：390px；320–1440px 检查均无水平溢出。首个键盘焦点有可见 outline；`npm run build` 通过。
- 完成后的 detector 报 1 项 overused-font warning，因延续官方 Inter 字型。这是风格提醒，非本轮必须改用新字型的功能错误。原始版未在本轮跑 detector 计数，故不把 1 项和假设的原始数字比较。
- 证据：`lumina-classic-distill-browser.json`、`lumina-classic-distill-focus.json`、`lumina-classic-distill-detector.json`、`screenshots/lumina-classic-after-desktop-1440.png`、`screenshots/lumina-classic-after-mobile-390.png`。
- 来源快照：`recordings/runs/2026-10-31T15-33-43-607Z-lumina-classic-before-distill-51bf0bc2/` 与 `recordings/runs/2026-10-31T15-35-31-699Z-lumina-classic-after-distill-6058da42/`。

## 可剪辑素材

`recordings/INDEX.md` 列出两案各 4 段 WebM：原始桌面、原始手机、结果桌面、结果手机；每段有首屏 PNG、全页 PNG 和 capture.json。自动 WebM 仅录无声的网页卷动，不包含这次 Codex 对话与编辑过程。`recordings/runs/` 保留精确 Prompt 与来源码，但没有完整对话逐字稿；不要把未录下的生成过程编成真人在场的画面。

## 评估范围

这两案能评估既有页面的 polish / distill 一轮效果，尤其官方 mobile overflow 的修正。它们不能证明 Impeccable 比无 skill 的相同模型更好，因为没有在干净环境跑对照组。后续三题需先做真正的无 skill A 再做 B；规则见 `docs/RECORDING.md`。

## 工作台状态更新

官方页修改后，另外更新了工作台 `src/data.js`、`src/main.js`、`src/guide.js`，把 D01／D02 显示为「第一轮完成」并提供冻结原始版／结果切换；三个自订题目仍标为待生成。这些是测试工具的文字与导航修正，不计入 D01／D02 页面效果。`README.md`、`docs/RECORDING.md` 同步改成实际进度。`npm run verify`、`npm run build`、`npm run test:smoke` 通过；后者确认 5 条案例路由、Prompt 复制／下载、预览切换、390／360px 工作台无溢出与浏览器无 JS error。

AEGIS 的 A 组隔离工作目录已准备，尚未生成页面。准备证据与下一步见 `docs/evidence/CONTROL-WALLET-SETUP.md`。
