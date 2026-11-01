# Impeccable Test Lab

基于 Vite 的原生 HTML/CSS/JS 前端。五个案例共用同一变体矩阵：**A 原图 → B polish**；**C / D / E** 各自从 B 分叉（bolder / distill / animate）。**optimize 不上架**，只收集优化前后数据（见下方表格与 [OPTIMIZE-PROTOCOL](docs/evidence/OPTIMIZE-PROTOCOL.md)）。矩阵说明：[VARIANT-MATRIX](docs/evidence/VARIANT-MATRIX.md)。

工作台封面不是 skill 成绩。另见 [BRIEF-RESULTS](docs/evidence/BRIEF-RESULTS.md)、[AGENTS.md](AGENTS.md)、[录影手册](docs/RECORDING.md)。

**简体中文版说明（2026-11-01）：**当前 A–E 页面、工作台和项目文档的中文已统一转为简体；这是原有测试成果的文字本地化，不能算作新一轮 skill 生成。`docs/prompts/` 是供后续重跑的简体需求稿；`docs/evidence/*-prompt.txt` 是当时指令的简体转写，**不是逐字原文**。原始繁体 Prompt 与页面可从转换前的提交 `91642f3` 取得，例如 `git show 91642f3:docs/evidence/tea/prompt-a.txt`。旧录影与原始统计保留其拍摄时状态；请用下方新索引核对当前简体页面。转换范围与剪辑留证见 [简体中文转换记录](docs/evidence/LOCALIZATION-2026-11-01.md)。

```sh
npm ci
npm run dev
```

打开 http://127.0.0.1:5173/ 。正式打包：`npm run build`；预览：`npm run preview`（4173）。无后端、无账号、无 API key。

| 案例 | 单页路径 | 状态 | Prompt |
|---|---|---|---|
| D01 Lumina | `/demos/lumina/{a–e}/` | A–E 矩阵 | [lumina.md](docs/prompts/lumina.md) |
| D02 Lumina Classic | `/demos/lumina-classic/{a–e}/` | A–E 矩阵 | [lumina-classic.md](docs/prompts/lumina-classic.md) |
| W01 AEGIS | `/experiments/wallet/{a–e}/` | A–E 矩阵 | [wallet.md](docs/prompts/wallet.md) |
| T01 山间制茶 | `/experiments/tea/{a–e}/` | A–E 矩阵 | [tea.md](docs/prompts/tea.md) |
| F01 OFFGRID | `/experiments/festival/{a–e}/` | A–E 矩阵 | [festival.md](docs/prompts/festival.md) |

每个案例说明页：`/cases/<key>`。录影手册：`/guide`。一个 dev server，一页一路由；直接录影请开单页路径（不含工作台工具栏）。

## 变体定义

| 代号 | 含义 | 上架 |
|---|---|---|
| A | 原图（官方 = 冻结 baseline；原创 = 无 skill） | 是 |
| B | 对 A 执行 polish | 是 |
| C | 从 B 复制后 bolder | 是 |
| D | 从 B 复制后 distill | 是 |
| E | 从 B 复制后 animate | 是 |
| optimize | 对 B 的 `_optimize/` 暂存副本执行 | **否**（仅证据 + 下方数据） |

C / D / E 彼此独立，均从同一冻结 B 分叉，不做串烧。

## 剪辑优先看：哪些版本相对 A 变化最明显

以下是以同尺寸桌面／手机首屏、完整页面和实际操作片做的**视觉与资讯呈现判断**；「明显」不是品质分数，也不代表差异全由单一 skill 指令造成。C／D／E 都是先经过 B 的 polish，再各自分叉。各案下方的桌面／手机并排图与 [逐片录影索引](recordings/MATRIX-INDEX.md) 可直接核对。

| 案例 | 最值得先剪的 A 对照 | 具体可见差异 | 补充片段 |
|---|---|---|---|
| **Lumina** | **A→D**、**A→C** | D 把置中暖色 Hero 改成紧凑、靠左的资讯层级，首屏已露出品牌列与下一区；C 加大 Lumina 字标与暖色品牌语气。 | **A→B 手机**：导览和 CTA 从挤压／横排变成可读的折行与直排。[桌面并排](docs/evidence/boards/lumina-desktop.png) · [手机并排](docs/evidence/boards/lumina-mobile.png) |
| **Lumina Classic** | **A→D** | D 把霓虹光晕、渐层标题与卡片收成靠左、以文字和分隔线为主的版面；手机首屏能更早看到下一段资讯。 | C 的巨大 Lumina 字标也很醒目，但首屏 CTA 被推低，适合呈现「更大胆」的取舍。[桌面并排](docs/evidence/boards/lumina-classic-desktop.png) · [手机并排](docs/evidence/boards/lumina-classic-mobile.png) |
| **AEGIS / Web3 Agentic Wallet** | **A→D**、**A→C** | D 移除右侧授权闸门图与背景格线，让权限说明更早出现；C 放大 AEGIS 字标、LIMIT 闸门与控制边界。 | **A→B 手机**：内容先于图形，导览与操作 CTA 更容易看见；授权、Revoke、重新启用的操作片另收录。[桌面并排](docs/evidence/boards/wallet-desktop.png) · [手机并排](docs/evidence/boards/wallet-mobile.png) |
| **山间制茶** | **A→B 手机**、**A→D** | A 手机首屏茶杯被裁掉且文字压在深色山景上；B 把茶杯移入视野，雾层与文案对比也改善。D 进一步拿掉茶杯与装饰，改成较安静的山景文字构图。 | C 字标与山棱更强，但相对 B 的变化较细；方案切换和订阅预览有独立操作片。[桌面并排](docs/evidence/boards/tea-desktop.png) · [手机并排](docs/evidence/boards/tea-mobile.png) |
| **OFFGRID** | **A→D**、**A→C** | D 整片移除海报右侧讯号平面，把日期、场地、票价和阵容提到更早；C 则把酸绿色块与讯号图形推得更满，两者方向相反，很适合并置。 | B 对票券弹窗和手机时刻表的修正需看操作／全页片，首屏差异不大。[桌面并排](docs/evidence/boards/festival-desktop.png) · [手机并排](docs/evidence/boards/festival-mobile.png) |

**E 版要看动态影片。** 它们从 B 加入动画，降低动态模式的截图不会呈现主要差异；索引中每案都有 A／E 的正常动态桌面片。这些片只录网页，没有 Cursor/Codex 的生成过程。

**剪片时保留限制：** OFFGRID A／B／C／E 的巨大 OFFGRID 字标在 390／360px 被 Hero 裁切；D 不裁切，但 390px 水平溢出 45px、360px 溢出 75px，不能称为手机版全数通过。[实测尺寸](docs/evidence/FESTIVAL-MOBILE-BRAND.json)。官方 Lumina／Classic 的 A 手机版也有既有水平溢出，正好可作修正前素材。三题 A 是 Cursor 在隔离控制目录启动的子代理结果，并非全新 IDE 视窗；B 又多一轮修改，因此这是可观察的迭代比较，不是 skill 单独效果的因果证明。[方法限制](docs/evidence/BRIEF-RESULTS.md)。

首屏像素差异辅助数据在 [visual-diff.json](docs/evidence/boards/visual-diff.json)，它只反映同尺寸画素改动范围，不是美感评分。

## Optimize 前后数据

对各案 **B** 复制到 `_optimize/` 后执行 `$impeccable optimize`，**不**写入 A–E 路径。指标为可静态复算的源码与字体请求统计（**不是**场外 Lighthouse）。原始 JSON：[optimize-before.json](docs/evidence/optimize-before.json)、[optimize-after.json](docs/evidence/optimize-after.json)、[optimize-diff.json](docs/evidence/optimize-diff.json)；汇总：[OPTIMIZE-SUMMARY.md](docs/evidence/OPTIMIZE-SUMMARY.md)。

说明：源码字节在加入 `contain` / `content-visibility` 等后可能**略增**；本轮可观测收益主要是 **削减 Google Fonts 字重请求**（加载更轻）。`https://` 外链次数五案前后均为 3（preconnect ×2 + stylesheet）。

以下 optimize 数值取自文字转换前的原始测试，不能当作当前简体文件的字节数。

### 对比总表

| 案例 | 源码前→后 (字节) | Δ% | 字重请求前→后 | Δ | 字重种类前→后 |
|---|---:|---:|---:|---:|---:|
| Lumina | 11 810 → 11 953 | +1.2% | 8 → 6 | −2 | 5 → 3 |
| Classic | 13 621 → 13 782 | +1.2% | 5 → 4 | −1 | 5 → 4 |
| AEGIS | 44 382 → 45 190 | +1.8% | 8 → 7 | −1 | 5 → 5 |
| 山间制茶 | 37 344 → 37 975 | +1.7% | 5 → 4 | −1 | 3 → 3 |
| OFFGRID | 34 942 → 35 576 | +1.8% | 7 → 6 | −1 | 5 → 4 |

### 优化前（B 拆分）

| 案例 | 合计 | HTML | CSS | JS |
|---|---:|---:|---:|---:|
| Lumina | 11 810 | 11 810 | 0 | 0 |
| Classic | 13 621 | 13 621 | 0 | 0 |
| AEGIS | 44 382 | 15 863 | 19 338 | 9 181 |
| 山间制茶 | 37 344 | 15 687 | 15 671 | 5 986 |
| OFFGRID | 34 942 | 8 448 | 17 744 | 8 750 |

### 优化后（`_optimize/` 拆分）

| 案例 | 合计 | HTML | CSS | JS |
|---|---:|---:|---:|---:|
| Lumina | 11 953 | 11 953 | 0 | 0 |
| Classic | 13 782 | 13 782 | 0 | 0 |
| AEGIS | 45 190 | 15 899 | 19 670 | 9 621 |
| 山间制茶 | 37 975 | 15 723 | 15 864 | 6 388 |
| OFFGRID | 35 576 | 8 496 | 17 929 | 9 151 |

## 本次固定的 skill

来源：[pbakaus/impeccable](https://github.com/pbakaus/impeccable/tree/2f97a85a4a87a80066a693bd3546b092bd300772)；commit `2f97a85a4a87a80066a693bd3546b092bd300772`，skill **4.8.0**，engine **0.1.18**。

已安装至 `.agents/skills/impeccable/`（仅本项目）；未装 hooks。不要把工作台 scaffold 外观归功于 skill。来源哈希与许可证见 [docs/provenance.json](docs/provenance.json)。`vendor/impeccable/` 仅作官方上下文，勿套用到全部新题目。

## 官方 Demo 用法

`public/baselines/` 为逐 byte 冻结原件；`demos/*/a/` 与其对齐供统一切换。Lumina 与 Classic 不是同一页的前后对比。上游未公开原始生成 Prompt，记为「未知」。保留 Google Fonts 与示例 `href="#"` CTA；品牌／客户／数字均为官方示例文案。

## 录影与留证

简体本地化后重新录制 **60 段** A–E 页面卷动片（五案 × 五版 × 桌面／手机，加十段 A／E 正常动态桌面片）和 **15 段**原创题目操作片。每段有 PNG、WebM、来源 SHA-256、浏览器／尺寸／时间／错误 metadata；[完整逐片索引](recordings/MATRIX-INDEX.md)、[录影稽核](docs/evidence/CAPTURE-AUDIT.json)、[15 组操作状态验证](docs/evidence/INTERACTION-VALIDATION.json)。录制时 A–E 页面源码与当时的简体 Prompt／报告另存于 [source freeze 清单](recordings/source-freeze-2026-11-01T02-14-24-724Z/freeze.json)；素材只在本机，剪辑前请备份 `recordings/captures/`、`recordings/interactions/` 和该来源副本。

重新录制单一版本：

```sh
npm run capture -- --case wallet --take a --viewport desktop
npm run capture -- --case wallet --take d --viewport mobile
npm run capture -- --case wallet --take e --viewport desktop --motion no-preference
```

录影脚本只录无声网页卷动，操作片另有脚本；不含生成对话。影片开头可能有载入帧，剪辑可参考各 `capture.json` 的 `contentStartMs`。官方原始生成 Prompt 未公开；部分后续变体有 Prompt 原文，缺失处在逐片索引如实标记，不能用现在的 README 补写成当时的对话。

## 验证

```sh
npm run verify
npm run build
npm run test:smoke   # 需先 npm run dev
```

另见 [VALIDATION.md](docs/evidence/VALIDATION.md)、[OFFICIAL-RESULTS.md](docs/evidence/OFFICIAL-RESULTS.md)、[BRIEF-RESULTS.md](docs/evidence/BRIEF-RESULTS.md)、[录影索引](recordings/INDEX.md)。

## 社群短片制作

40 秒竖屏视频的锁定脚本、分镜、素材来源与独立 Scene 工程见 [制作交接](video/impeccable-40s/README.md)。v2 以官方 Lumina / Classic 的实际问题为主，自拟案例用于说明风格变化。预览使用本机临时旁白，尚未当作最终成片。
