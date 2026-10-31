# Impeccable Test Lab

基于 Vite 的原生 HTML/CSS/JS 前端。五个案例共用同一变体矩阵：**A 原图 → B polish**；**C / D / E** 各自从 B 分叉（bolder / distill / animate）。**optimize 不上架**，只收集优化前后数据（见下方表格与 [OPTIMIZE-PROTOCOL](docs/evidence/OPTIMIZE-PROTOCOL.md)）。矩阵说明：[VARIANT-MATRIX](docs/evidence/VARIANT-MATRIX.md)。

工作台封面不是 skill 成绩。另见 [BRIEF-RESULTS](docs/evidence/BRIEF-RESULTS.md)、[AGENTS.md](AGENTS.md)、[录影手册](docs/RECORDING.md)。

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

## 剪輯優先看：哪些版本相對 A 變化最明顯

以下是以同尺寸桌面／手機首屏、完整頁面和實際操作片做的**視覺與資訊呈現判斷**；「明顯」不是品質分數，也不代表差異全由單一 skill 指令造成。C／D／E 都是先經過 B 的 polish，再各自分叉。各案下方的桌面／手機並排圖與 [逐片錄影索引](recordings/MATRIX-INDEX.md) 可直接核對。

| 案例 | 最值得先剪的 A 對照 | 具體可見差異 | 補充片段 |
|---|---|---|---|
| **Lumina** | **A→D**、**A→C** | D 把置中暖色 Hero 改成緊湊、靠左的資訊層級，首屏已露出品牌列與下一區；C 加大 Lumina 字標與暖色品牌語氣。 | **A→B 手機**：導覽和 CTA 從擠壓／橫排變成可讀的折行與直排。[桌面並排](docs/evidence/boards/lumina-desktop.png) · [手機並排](docs/evidence/boards/lumina-mobile.png) |
| **Lumina Classic** | **A→D** | D 把霓虹光暈、漸層標題與卡片收成靠左、以文字和分隔線為主的版面；手機首屏能更早看到下一段資訊。 | C 的巨大 Lumina 字標也很醒目，但首屏 CTA 被推低，適合呈現「更大膽」的取捨。[桌面並排](docs/evidence/boards/lumina-classic-desktop.png) · [手機並排](docs/evidence/boards/lumina-classic-mobile.png) |
| **AEGIS / Web3 Agentic Wallet** | **A→D**、**A→C** | D 移除右側授權閘門圖與背景格線，讓權限說明更早出現；C 放大 AEGIS 字標、LIMIT 閘門與控制邊界。 | **A→B 手機**：內容先於圖形，導覽與操作 CTA 更容易看見；授權、Revoke、重新啟用的操作片另收錄。[桌面並排](docs/evidence/boards/wallet-desktop.png) · [手機並排](docs/evidence/boards/wallet-mobile.png) |
| **山間製茶** | **A→B 手機**、**A→D** | A 手機首屏茶杯被裁掉且文字壓在深色山景上；B 把茶杯移入視野，霧層與文案對比也改善。D 進一步拿掉茶杯與裝飾，改成較安靜的山景文字構圖。 | C 字標與山稜更強，但相對 B 的變化較細；方案切換和訂閱預覽有獨立操作片。[桌面並排](docs/evidence/boards/tea-desktop.png) · [手機並排](docs/evidence/boards/tea-mobile.png) |
| **OFFGRID** | **A→D**、**A→C** | D 整片移除海報右側訊號平面，把日期、場地、票價和陣容提到更早；C 則把酸綠色塊與訊號圖形推得更滿，兩者方向相反，很適合並置。 | B 對票券彈窗和手機時刻表的修正需看操作／全頁片，首屏差異不大。[桌面並排](docs/evidence/boards/festival-desktop.png) · [手機並排](docs/evidence/boards/festival-mobile.png) |

**E 版要看動態影片。** 它們從 B 加入動畫，降低動態模式的截圖不會呈現主要差異；索引中每案都有 A／E 的正常動態桌面片。這些片只錄網頁，沒有 Cursor/Codex 的生成過程。

**剪片時保留限制：** OFFGRID A／B／C／E 的巨大 OFFGRID 字標在 390／360px 被 Hero 裁切；D 不裁切，但 390px 水平溢出 45px、360px 溢出 75px，不能稱為手機版全數通過。[實測尺寸](docs/evidence/FESTIVAL-MOBILE-BRAND.json)。官方 Lumina／Classic 的 A 手機版也有既有水平溢出，正好可作修正前素材。三題 A 是 Cursor 在隔離控制目錄啟動的子代理結果，並非全新 IDE 視窗；B 又多一輪修改，因此這是可觀察的迭代比較，不是 skill 單獨效果的因果證明。[方法限制](docs/evidence/BRIEF-RESULTS.md)。

首屏像素差異輔助數據在 [visual-diff.json](docs/evidence/boards/visual-diff.json)，它只反映同尺寸畫素改動範圍，不是美感評分。

## Optimize 前后数据

对各案 **B** 复制到 `_optimize/` 后执行 `$impeccable optimize`，**不**写入 A–E 路径。指标为可静态复算的源码与字体请求统计（**不是**场外 Lighthouse）。原始 JSON：[optimize-before.json](docs/evidence/optimize-before.json)、[optimize-after.json](docs/evidence/optimize-after.json)、[optimize-diff.json](docs/evidence/optimize-diff.json)；汇总：[OPTIMIZE-SUMMARY.md](docs/evidence/OPTIMIZE-SUMMARY.md)。

说明：源码字节在加入 `contain` / `content-visibility` 等后可能**略增**；本轮可观测收益主要是 **削减 Google Fonts 字重请求**（加载更轻）。`https://` 外链次数五案前后均为 3（preconnect ×2 + stylesheet）。

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

本輪已完成 **60 段** A–E 頁面捲動片（五案 × 五版 × 桌面／手機，加十段 A／E 正常動態桌面片）和 **15 段**原創題目操作片。每段有 PNG、WebM、來源 SHA-256、瀏覽器／尺寸／時間／錯誤 metadata；[完整逐片索引](recordings/MATRIX-INDEX.md)、[錄影稽核](docs/evidence/CAPTURE-AUDIT.json)、[15 組操作狀態驗證](docs/evidence/INTERACTION-VALIDATION.json)。當下 A–E 原始碼及已存在的 Prompt／報告另存於 [source freeze 清單](recordings/source-freeze-2026-10-31T18-08-14-085Z/freeze.json)；素材只在本機，剪輯前請備份 `recordings/captures/`、`recordings/interactions/` 和該來源副本。

重新錄製單一版本：

```sh
npm run capture -- --case wallet --take a --viewport desktop
npm run capture -- --case wallet --take d --viewport mobile
npm run capture -- --case wallet --take e --viewport desktop --motion no-preference
```

錄影腳本只錄無聲網頁捲動，操作片另有腳本；不含生成對話。影片開頭可能有載入幀，剪輯可參考各 `capture.json` 的 `contentStartMs`。官方原始生成 Prompt 未公開；部分後續變體有 Prompt 原文，缺失處在逐片索引如實標記，不能用現在的 README 補寫成當時的對話。

## 验证

```sh
npm run verify
npm run build
npm run test:smoke   # 需先 npm run dev
```

另见 [VALIDATION.md](docs/evidence/VALIDATION.md)、[OFFICIAL-RESULTS.md](docs/evidence/OFFICIAL-RESULTS.md)、[BRIEF-RESULTS.md](docs/evidence/BRIEF-RESULTS.md)、[录影索引](recordings/INDEX.md)。
