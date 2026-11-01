# 实际验证纪录

日期：2026-10-31。范围：测试工作台、Demo 汇入、Prompt 留证与录影工具；不是 Impeccable 设计能力评估。

| 检查 | 结果 | 证据 |
|---|---|---|
| npm run build | 通过，6 个 HTML entry，2 个原始 baseline 由 public 复制 | dist/ 可重新产生；production-routes.json |
| npm run verify | 通过，2 个 baseline SHA-256 与固定上游完全一致、5 个路径／Prompt 存在、skill 版本一致 | provenance.json、verify.mjs |
| 官方原始码与工作副本 | 汇入时相同，没有执行 polish / distill | 源码及 imported 快照 |
| 五个案例独立 URL | 通过 | smoke.json |
| Prompt 显示、剪贴簿、后续指令与纯文字下载 | 通过，与快照共用的 formatPrompt / followupPrompt 完全一致 | smoke.json |
| 工作台筛选 | 通过，全部 5、官方 2、原创 3 | smoke.json |
| 原始／工作副本与 1440／390 预览切换 | 通过 | smoke.json |
| 工作台／Brief／预留页手机 390、360px | 没有水平溢出 | smoke.json、screenshots/ |
| 键盘入口 | 第一个焦点为 skip link | smoke.json；未宣称完整 WCAG 审计 |
| 浏览器 JavaScript error | smoke 全程未发现 pageerror | smoke.json |
| 打包后路径 | 10 个抽查 URL 成功，含所有独立页、两个 baseline、首页、guide、wallet case | production-routes.json |
| snapshot | 五个案例均实际产生精确 Prompt、来源码、manifest | recordings/INDEX.md |
| capture | 两个官方 baseline × 桌面／手机，4 个影片、8 张截图 | recordings/INDEX.md |
| WebM 解码 | 4 段皆可解码，影片尺寸符合 1440×900 或 390×844 | video-verification.json |
| 录影中的 JS / 网路错误 | 四份 capture.json 均无 pageErrors / networkFailures | 各素材 capture.json |
| npm 安装 audit 摘要 | 最终固定依赖安装时 0 vulnerabilities | Vite 8.3.5、Playwright 1.64.1、package-lock.json |

## 目视检查

已查看工作台桌面全页、wallet Brief 手机全页与 Lumina 原始首屏。文字、卡片、Prompt 阅读区与控制按钮没有观察到遮挡。完整截图留在 screenshots/；这不等于完整可及性或跨浏览器认证。

## 保留的原始问题

两个官方 Demo 在 390px 均有水平溢出。原始 `href="#"` CTA 没有真正业务功能。这些保持不动，作为后续测试输入，没有提前修好后冒充原始页。

## 本轮曾修正的问题

1. Vite dev server 的 public 子资料夹 URL 没有自动解析 index.html，会进入工作台 fallback。baseline registry 已改成明确的 `/baselines/<case>/index.html`；开启、iframe、录影与 production routes 已验证。
2. 第一轮 smoke 过早读取尚未完成渲染的卡片数（0）；加入明确等待 UI ready 的条件，之后完整通过。没有把该次失败冒充通过。
3. 最初套件版本的 npm 安装摘要有一项 high，改为查得的目前固定版本后安装摘要为 0。
4. 安装尚未完成时 context launcher 找不到档案；未执行。安装完成后只检查 engine-probe，没有追认成 init 或任何设计流程。

## 未执行

- 三个新题目的页面生成。
- 两个官方页面的 skill 修改。
- skill hooks、正式 audit / critique、无 skill 对照组、评分。
- 真实手机、Safari / Firefox、完整萤幕阅读器与 200% 缩放测试。
- 不存在本次搭建过程的完整录影；只有后续生成的官方页面 B-roll。
