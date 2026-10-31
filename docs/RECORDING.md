# 錄影與測試手冊

## 素材身份先說清楚

- 目前已完成 2 份官方起始頁的第一輪修改與前後素材；3 份新題目、工作台與留證工具已準備，三題的頁面仍待生成。
- 工作台、題目封面和預留頁都不是用 Impeccable 完整流程生成的測試結果。
- 官方 Lumina 主版本與 classic 是兩個起始範例，不能剪成同一頁的改善前後。
- 官方原始生成 Prompt 未公開；本地 D01/D02 是我們新擬的修改 Prompt。
- D01／D02 已讀取 Impeccable skill 與 playbook，執行 polish／distill 類型的修改；沒有在獨立新對話貼上 slash 指令。完整執行限制見 `docs/evidence/OFFICIAL-RESULTS.md`。先前的 engine-probe 只證明引擎能啟動。

## 必須遵守的前後比較（使用者後續確認）

三個題目皆已接受，但頁面尚未實作。後續每題必須依下列順序執行，不能只做有 skill 的漂亮結果：

1. **A／未使用 Impeccable**：在乾淨的新對話與隔離專案，用相同 Brief 生成完整可操作頁面。檢查本地、全域、外掛與 hooks 都沒有載入 Impeccable，也不能帶入本對話已讀到的 skill 規則。只移除 `$impeccable` 前綴不算隔離。若無法確認隔離，不得標成無 skill 對照。
2. **凍結 A**：保存實際 Prompt、模型與推理設定、素材、工具條件、程式碼、桌面／手機截圖與錄影。現在的預留頁不算 A。
3. **B／使用 Impeccable 改善**：複製 A，在副本套用一個明確的 skill 指令。保留產品需求與模型設定，記錄額外指令、skill 問答、圖片生成與人工修補；不得覆蓋 A。
4. **並排交付**：將 A、B 匯入同一個前端專案的兩個獨立路徑，擴充現有案例與錄影 registry，驗證兩份都可開啟；以相同尺寸、捲動節奏和互動情境錄製前後素材。兩份成果與紀錄齊全才算該題完成。

這是「同一頁使用 skill 改善前後」的比較；B 多了一輪修改，不能把差異全部歸因於 skill。若另外測「有／無 skill 從零生成」，另設 C 組，使用同樣的空白起點與 Brief，不混作 A→B 的改善成果。

AEGIS 的隔離目錄已建立（見 `docs/evidence/CONTROL-WALLET-SETUP.md`），仍須在新任務確認實際隔離；三題都尚未生成 A/B。工作台預設展示無 skill 的 A Prompt；skill Prompt 只供另開的從零生成 C 組使用。A 未完成與凍結前不得直接執行 B。現有 snapshot/capture 工具會保存單一路徑的狀態，尚不會自動建立或隔離 A/B 環境，正式開始前必須補上兩個成果路徑與對應錄影支援。

## 三個題目為什麼這樣選

| ID | 內容與轉換目標 | 能力邊界 | 可觀測失敗 |
|---|---|---|---|
| W01 AEGIS | Agentic wallet，讓進階用戶進入權限 sandbox | 抽象產品理解、信任表達、互動狀態一致 | 看起來像交易所、假審計、Revoke 無效、上限規則錯誤 |
| T01 山間製茶 | 台灣茶季訂閱，選擇方案並預覽 | 中文品牌敘事、素材、非 SaaS 結構 | 全部品牌變米色、圖片空缺、中文層級差、價格未更新 |
| F01 OFFGRID | 虛構音樂祭，找演出與票種 | 大膽構圖、高密度資訊、混排、動態降級 | 日期被藏、時刻表手機溢出、長名稱截斷、減少動態後消失 |

完整產品內容在 `docs/prompts/`；這些品牌與價格、活動均為虛構測試設定。

## 建議測試順序與完整呼叫

1. D01：完整要求存於 `docs/prompts/lumina.md`，首行 `$impeccable polish demos/lumina/index.html`。本輪已由代理讀取本地 skill 與 polish playbook 執行；沒有獨立對話貼上整份 Prompt。不可在影片中宣稱錄下了 slash 指令。
2. D02：完整要求存於 `docs/prompts/lumina-classic.md`，首行 `$impeccable distill demos/lumina-classic/index.html`。同樣是在此對話讀取 skill 與 distill playbook 後執行。
3. W01 / T01 / F01：先依上節完成無 skill 的 A 並凍結，再在 A 的副本執行選定 skill 指令得到 B。工作台「使用 Impeccable」的完整生成 Prompt 保留供獨立 C 組使用，不能跳過 A。`scripts/prompt.mjs` 是共用的組合規則，snapshot 與畫面相同。
4. 後續單輪：audit / critique 先評估，adapt 測手機，bolder 測變化。每一輪都從已記錄快照開始，不要一次貼三個修改指令。

工作台後續按鈕複製的**完整格式**如下（由 `followupPrompt` 統一產生）：

```text
$impeccable <command> <directory>/index.html

只處理 <route>，遵守 docs/prompts/<case>.md 的原始產品事實與範圍限制。先記錄此完整 Prompt；不得修改官方 baseline 或其他頁面。回報實際檢查證據、額外指令與未解決問題。
```

命令不限於以上；自訂指令先存成 UTF-8 `.txt`，後續記錄用 `--prompt` 指向該檔。不要覆蓋上一輪 Prompt。

## 每輪實際操作

以下是本專案匯入成果後的單輪快照／錄影工具範例，不能在 A 尚未生成時把主專案的 wallet 預留頁截成無 skill 成果；必須先滿足上方前後比較流程。階段名稱與 mode 應如實標記，例如 `a-no-skill` 配 `--mode plain`、`b-polish` 配該輪的完整 `--prompt`。

終端機 A：

```sh
npm run dev
```

終端機 B：

```sh
# 第一次安裝錄影用瀏覽器
npx playwright install chromium

# 保存起點，輸出唯一資料夾
npm run snapshot -- --case wallet --phase before --model "實際模型與設定" --note "首輪，尚未生成"
```

開始 macOS 螢幕錄影（Shift + Command + 5），錄下案例名、完整 Prompt、貼上與送出、skill 的互動選擇、生成、任何錯誤與修補。模型名稱／推理設定應從你實際使用的介面抄錄；本次工具無法替你證明 UI 所選設定。

完成後：

```sh
npm run build
npm run snapshot -- --case wallet --phase after --model "實際模型與設定" --transcript docs/my-session.md --note "如有額外要求，在 transcript 原文記錄"
# 省略 --transcript 也能保存，但必須在 observations.md 誠實註記沒有完整對話紀錄。

# RUN_DIRECTORY 請替換成上一條真正輸出的快照路徑
npm run capture -- --case wallet --take after --viewport desktop --run RUN_DIRECTORY
npm run capture -- --case wallet --take after --viewport mobile --run RUN_DIRECTORY
```

後續指令使用與工作台完全一致的 Prompt：

```sh
npm run snapshot -- --case wallet --phase before-adapt --model "實際模型" --command adapt
# 複製工作台 adapt Prompt、執行、記錄對話
npm run snapshot -- --case wallet --phase after-adapt --model "實際模型" --command adapt
```

自訂／額外 Prompt 要逐字保存：

```sh
npm run snapshot -- --case tea --phase after-polish --model "實際模型" --prompt docs/my-exact-prompt.txt --transcript docs/my-session.md
```

`--prompt` 預設 `--mode exact`，不增加 skill 前綴、不剝除標題。內建 Brief 預設 `skill`，對照組可用 `--mode plain`。`run.json` 的 status 永遠表示「快照」，不是完成宣告。實際執行、得分與結論填在 observations.md。

## 素材輸出

- `recordings/runs/<UTC>-<case>-<phase>-<uuid>/`：prompt.txt、brief.md、source/、package/lockfile、context/、provenance.json、run.json、observations.md，及選填 transcript.md。
- `recordings/captures/<UTC>-<case>-<take>-<viewport>-<uuid>/`：viewport.png、full-page.png、clip.webm、capture.json。
- `capture.json` 含 URL、時間、尺寸、browser 版本、捲動時間點、console error、資源失敗和來源快照關聯。
- 目前自動影片是無聲頁面捲動 B-roll，非滑鼠互動演示、非 Codex 對話錄影、非效能 benchmark。開頭可能有載入幀，使用 contentStartMs 裁掉；headless 錄影可能有時間量化，最終剪輯以播放器時間軸為準。
- `--take baseline` 僅對官方兩頁可用，讀凍結原始版；其他 take 讀工作副本。待生成頁會拒絕錄製成成果。
- 桌面 1440×900、手機 390×844、DPR 1、zh-TW、Asia/Taipei、light、reduced-motion；手機模式是窄 viewport，沒有模擬觸控或特定手機裝置。
- reduced-motion 是為固定比較而設；要測完整動畫，請另用正常動態的實際瀏覽器錄製，標註模式，不能拿這份影片斷言動畫好壞。
- Google Fonts 需要網路，字型載入若失敗會記錄。若要固定離線字型，另開一輪處理並記錄差異，不動官方原始碼基準。
- `--run` 比對的是本地來源，請搭配 dev server；若用 preview 或自訂 --base，需自己確認剛 build 的版本與快照相同。
- 快照保留單頁目錄；新頁面須把資產放在自己的目錄，不要依賴未記錄的外部共享檔。第三方 CDN 與 font 的內容未被快照封存。

## 建議分鏡（每個案例約 60–120 秒，可按成片調整）

| 片段 | 拍攝內容 | 剪輯時可用的旁白重點 |
|---|---|---|
| A 題目 | 案例名、目的、測試條件 5–8 秒 | 這次要測哪個能力，什麼算失敗 |
| B 起點 | 官方原始版／真正無 skill 對照，首屏與全頁 10–15 秒 | 起點是什麼；尚未生成要明說 |
| C 指令 | 完整 Prompt，停留首段與限制，另提供可讀全文 | 模型、skill、需求和工具條件 |
| D 過程 | 送出、必要問答、生成、報錯、修補 | 不把多輪包裝成一鍵完成 |
| E 結果 | 相同 viewport 與捲動節奏的結果 | 具體指出改善與倒退 |
| F 功能 | 手動演示 sandbox／方案／時刻表，含失敗邊界 | 畫面之外，功能是否真的成立 |
| G 手機 | 390px 與 360px、200% 縮放、鍵盤焦點 | 響應式和可及性是否過關 |
| H 結論 | 依六維度與證據給分 | 只總結實際觀察，不過度歸因 |

## 評分規則

每一項 1–5 分，未測填「未測」，不要當作 0 或默認通過。

| 維度 | 1 分 | 3 分 | 5 分 |
|---|---|---|---|
| 辨識度 | 通用模板、主題不明 | 能辨識主題，部分慣用模式 | 具體品牌語言與一致構圖 |
| 內容層級 | 主資訊難找 | 核心資訊清楚、次級仍亂 | 首屏與全頁閱讀順序清楚 |
| 需求完成 | 大量遺漏或捏造 | 主要需求成立、細節遺漏 | 所有 Brief 條件可驗證 |
| 互動正確 | 假按鈕或狀態錯誤 | 主流程可用、邊界失敗 | 正常與阻擋／撤銷等邊界一致 |
| 響應式 | 溢出或不可用 | 手機可用、構圖妥協 | 多尺寸和縮放均維持閱讀 |
| 可及性 | 鍵盤不可操作／文字不清 | 部分焦點或對比問題 | 鍵盤、標籤、對比、降級有證據 |

一人主觀評分不是可及性認證。每項附素材時間碼與具體例子，盡可能讓第二位觀察者盲評。

## 想測 skill 的因果效果

1. 建立兩個乾淨的同版專案副本、新對話、相同模型／推理設定／工具／素材／時間預算。
2. 無 skill 對照組不得載入 `.agents/skills/impeccable`、全域同名 skill、外掛或 hooks，也不要把 skill 規則帶入 prompt/context。需先確認全域安裝情況；本工作台切換 plain 只移除呼叫語法，不會自動隔離。
3. 兩組使用相同原始 Brief；只差 skill 的載入與呼叫。記錄 skill 自己詢問的選擇和額外圖片生成。
4. 若模型、圖片或手動介入不同，不宣稱只因 skill 改善。三題只能形成案例觀察，不能直接推廣到所有網站。
5. 目前這個已讀過 skill 文件的對話不適合作為乾淨「無 skill」對照。
