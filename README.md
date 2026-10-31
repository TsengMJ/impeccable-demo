# Impeccable Test Lab

一個 Vite + 原生 HTML/CSS/JS 前端專案。兩個官方 Demo 已從凍結原始版完成第一輪 polish／distill，可在工作台切換前後；三個新題目的 Brief / Prompt 已備妥，頁面尚未生成。工作台、題目封面和預留頁都不是 skill 測試結果。

後續三題必須先在乾淨環境生成無 Impeccable 的 A，凍結後再複製並用 skill 改善成 B，保留兩條可比較的頁面路徑與完整素材。現在尚未生成 A/B；AEGIS 的隔離目錄已備妥，但尚未在乾淨新任務確認 skill／plugin／hook 載入情況或生成 A。不能直接跳到有 skill 的版本。流程已列為 [專案規則](AGENTS.md)、[錄影手冊](docs/RECORDING.md) 與 [AEGIS A 組準備紀錄](docs/evidence/CONTROL-WALLET-SETUP.md)。

```sh
npm ci
npm run dev
```

開啟 http://127.0.0.1:5173/ 。正式打包：`npm run build`；預覽打包結果：`npm run preview`（4173）。無後端、無帳號、無 API key。

| 案例 | 單頁路徑 | 來源 / 狀態 | Prompt |
|---|---|---|---|
| D01 Lumina | `/demos/lumina/` | 官方原始版 → polish 第一輪完成 | [lumina.md](docs/prompts/lumina.md) |
| D02 Lumina Classic | `/demos/lumina-classic/` | 官方原始版 → distill 第一輪完成 | [lumina-classic.md](docs/prompts/lumina-classic.md) |
| W01 AEGIS | `/experiments/wallet/` | Web3 Agentic Wallet，待生成 | [wallet.md](docs/prompts/wallet.md) |
| T01 山間製茶 | `/experiments/tea/` | 台灣精品茶訂閱，待生成 | [tea.md](docs/prompts/tea.md) |
| F01 OFFGRID | `/experiments/festival/` | 繁中實驗音樂祭，待生成 | [festival.md](docs/prompts/festival.md) |

每個案例的說明頁：`/cases/<案例 key>`，例如 `/cases/wallet`。錄影手冊：`/guide`。一個 dev server，每頁一條路徑。直接錄影使用單頁路徑，畫面不含工作台工具列。

## 本次固定的 skill

來源：[pbakaus/impeccable](https://github.com/pbakaus/impeccable/tree/2f97a85a4a87a80066a693bd3546b092bd300772)；commit `2f97a85a4a87a80066a693bd3546b092bd300772`，skill **4.8.0**，engine **0.1.18**。

已用 skill-installer 安裝至 `.agents/skills/impeccable/`，限本專案；未安裝 hooks。官方兩案已在現有對話讀取該 skill 與 playbook 後完成第一輪，詳見[官方結果與執行限制](docs/evidence/OFFICIAL-RESULTS.md)。本輪沒有另開對話貼上 `$impeccable ...` 作為獨立 UI 指令；不要把工作台 scaffold 的外觀歸功於 skill。

完整來源、原始碼 SHA-256、版本和安裝方式在 [docs/provenance.json](docs/provenance.json)。`vendor/impeccable/` 保留官方 license、notice 與 Demo 原始設計上下文；不要讓其中的品牌方向套用到全部新題目。

## 官方 Demo 的正確用法

來源 repo 在這次固定版本中公開兩份獨立起始頁。`public/baselines/` 是逐 byte 複製的凍結原始碼，`demos/` 是已修改的結果。Lumina 與 Classic 彼此不是 before / after；每案自己的 baseline 與工作副本才是本輪前後。原始生成 Prompt 未在匯入的來源中公開，記為「未知」，沒有編造。

官網另有互動示範與展示案例；上游 `AGENTS.md` 說明官網位於另一個 private repo，本專案不聲稱已匯入那些完整頁面。

保留原始 Google Fonts 連結與 `href="#"` 示例 CTA。字型首次載入需要網路；CTA 沒有真正的註冊或購買功能。官方手機版問題保留在凍結基準；本輪工作副本已修正水平溢出。頁面中的品牌／客戶／數字是官方範例文案，不代表本次查證。

## 錄影與留證

詳見 [docs/RECORDING.md](docs/RECORDING.md)，包含分鏡、評分表、對照方法、命名規則和完整命令。

```sh
npx playwright install chromium
npm run snapshot -- --case wallet --phase before --model "填入實際模型"
# 在 Codex 貼上工作台的完整 Prompt 並生成頁面
npm run snapshot -- --case wallet --phase after --model "填入實際模型"
npm run capture -- --case wallet --take after --viewport desktop
npm run capture -- --case wallet --take after --viewport mobile
```

- snapshot 保存精確 Prompt、當下頁面原始碼、lockfile、context、雜湊、人工觀察表；不會執行 skill。
- capture 保存 PNG + WebM + 實際路徑、尺寸、時間和 console/network 問題；不會錄到 Codex 對話。開始生成前，用 macOS 螢幕錄影錄製對話。
- 自訂 Prompt：`--prompt /path/to/exact-prompt.txt`，預設逐 byte 保存，請在執行前就存原文。
- 後續指令：`--command audit` 等，使用與工作台複製按鈕完全相同的文字。
- 有了快照路徑，再給 capture 加 `--run recordings/runs/<id>`，工具會先比對來源碼，防止錯把別輪的影片關聯過來。
- 檔案只寫本地，沒有上傳；錄影與快照預設 gitignored，剪輯前請自行備份。

## 驗證

```sh
npm run verify       # 官方基準 hash、頁面、Prompt 與版本契約
npm run build
npm run test:smoke   # 先啟動 npm run dev；檢查路由、切換、複製、下載與手機版
```

初始準備檢查在 [VALIDATION.md](docs/evidence/VALIDATION.md)；官方第一輪結果在 [OFFICIAL-RESULTS.md](docs/evidence/OFFICIAL-RESULTS.md)，影片與截圖在 [錄影索引](recordings/INDEX.md)。三個自訂題目未完成 A/B 前，不對其能力作結論。
