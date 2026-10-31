# 官方 Demo 第一輪測試結果

日期：2026-10-31。此檔記錄已執行的 D01 / D02，以及錄影剪輯所需的來源關係。完整 Prompt 在 `docs/prompts/` 與各輪快照的 `prompt.txt`。本輪是使用者在既有 Codex 對話中指示開始實現，代理讀取本地 Impeccable skill 的指令與對應 playbook 後實作；**沒有另開新對話貼上 `$impeccable ...` 作為獨立 UI 指令**。影片中應照此描述，不能把本輪說成錄到 slash 指令的一鍵生成。

| ID | 官方起點 | 本輪指令與範圍 | 工作副本 | 驗證重點 |
|---|---|---|---|---|
| D01 | `public/baselines/lumina/index.html` | `docs/prompts/lumina.md`，`$impeccable polish demos/lumina/index.html` | `demos/lumina/index.html` | 手機排版、焦點、保留文案與連結 |
| D02 | `public/baselines/lumina-classic/index.html` | `docs/prompts/lumina-classic.md`，`$impeccable distill demos/lumina-classic/index.html` | `demos/lumina-classic/index.html` | 移除裝飾、保持內容與 CTA |

兩個原始檔仍與上游固定 commit 的 SHA-256 相符，沒有被這次修改覆蓋。所有原始產品、客戶、投資與 SOC 2 等宣稱屬官方虛構 Demo 文案，未在本輪查證；CTA 仍保留原本的 `href="#"` 示範連結。

## D01 / Lumina polish

- 使用者要求保留品牌、原始文字、順序與連結。代理沒有加入新宣稱或改寫文案。
- 變更：導航在窄螢幕折行、功能卡改為可讀的單欄、CTA 在手機上縱向排列；補上鍵盤焦點、44px 導航點擊高度與 reduced-motion 處理；三個 emoji 圖示換成同一筆畫風格的 SVG。
- 390px 前：頁面實際寬 698px。後：390px。320、360、390、600、720、768、1024、1440px 的頁面寬均等於視窗寬，沒有連結跑到右側畫面外。`lumina-polish-browser.json` 記錄程式比對的原始文字與所有連結一致；第一個 Tab 焦點有可見 outline。`npm run build` 通過。
- Impeccable 偵測器在完成後報 8 項 warning：icon-tile-stack ×3、italic-serif-display、hero-eyebrow-chip、overused-font ×2、cream-palette。這些大多是原始頁的字型、配色與結構；為遵守只做 polish、保留品牌與文案的要求，本輪未把其餘樣式全部改掉。偵測器 exit code 2 代表發現問題，不能說是「0 finding」。原始頁在這次沒有單獨的 detector 計數，故不宣稱 warning 數下降了多少。
- 證據：`lumina-polish-browser.json`、`lumina-polish-detector.json`、`screenshots/lumina-before-mobile-390.png`、`screenshots/lumina-after-mobile-390.png`、`screenshots/lumina-after-desktop-1440.png`。
- 來源快照：`recordings/runs/2026-10-31T15-28-35-821Z-lumina-before-polish-af0beb1b/` 與 `recordings/runs/2026-10-31T15-32-28-760Z-lumina-after-polish-04c3cf82/`。

## D02 / Classic distill

- 保留原有 h1、說明段、六個客戶名稱、三項功能的標題與說明、投資文字、CTA 文字、所有連結與 footer。程式比對詳見 `lumina-classic-distill-browser.json`。
- 刪減純裝飾：英雄與底部的多層光暈、漸層文字、發光按鈕、玻璃卡片、emoji 與重複的「Powered by AI」眉標。該資訊仍出現在原有 lede 與 footer。功能資訊由三張卡變成三列，方便掃讀。
- 390px 前：頁面實際寬 694px。後：390px；320–1440px 檢查均無水平溢出。首個鍵盤焦點有可見 outline；`npm run build` 通過。
- 完成後的 detector 報 1 項 overused-font warning，因延續官方 Inter 字型。這是風格提醒，非本輪必須改用新字型的功能錯誤。原始版未在本輪跑 detector 計數，故不把 1 項和假設的原始數字比較。
- 證據：`lumina-classic-distill-browser.json`、`lumina-classic-distill-focus.json`、`lumina-classic-distill-detector.json`、`screenshots/lumina-classic-after-desktop-1440.png`、`screenshots/lumina-classic-after-mobile-390.png`。
- 來源快照：`recordings/runs/2026-10-31T15-33-43-607Z-lumina-classic-before-distill-51bf0bc2/` 與 `recordings/runs/2026-10-31T15-35-31-699Z-lumina-classic-after-distill-6058da42/`。

## 可剪輯素材

`recordings/INDEX.md` 列出兩案各 4 段 WebM：原始桌面、原始手機、結果桌面、結果手機；每段有首屏 PNG、全頁 PNG 和 capture.json。自動 WebM 僅錄無聲的網頁捲動，不包含這次 Codex 對話與編輯過程。`recordings/runs/` 保留精確 Prompt 與來源碼，但沒有完整對話逐字稿；不要把未錄下的生成過程編成真人在場的畫面。

## 評估範圍

這兩案能評估既有頁面的 polish / distill 一輪效果，尤其官方 mobile overflow 的修正。它們不能證明 Impeccable 比無 skill 的相同模型更好，因為沒有在乾淨環境跑對照組。後續三題需先做真正的無 skill A 再做 B；規則見 `docs/RECORDING.md`。

## 工作台狀態更新

官方頁修改後，另外更新了工作台 `src/data.js`、`src/main.js`、`src/guide.js`，把 D01／D02 顯示為「第一輪完成」並提供凍結原始版／結果切換；三個自訂題目仍標為待生成。這些是測試工具的文字與導航修正，不計入 D01／D02 頁面效果。`README.md`、`docs/RECORDING.md` 同步改成實際進度。`npm run verify`、`npm run build`、`npm run test:smoke` 通過；後者確認 5 條案例路由、Prompt 複製／下載、預覽切換、390／360px 工作台無溢出與瀏覽器無 JS error。

AEGIS 的 A 組隔離工作目錄已準備，尚未生成頁面。準備證據與下一步見 `docs/evidence/CONTROL-WALLET-SETUP.md`。
