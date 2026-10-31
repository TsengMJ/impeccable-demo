# 實際驗證紀錄

日期：2026-10-31。範圍：測試工作台、Demo 匯入、Prompt 留證與錄影工具；不是 Impeccable 設計能力評估。

| 檢查 | 結果 | 證據 |
|---|---|---|
| npm run build | 通過，6 個 HTML entry，2 個原始 baseline 由 public 複製 | dist/ 可重新產生；production-routes.json |
| npm run verify | 通過，2 個 baseline SHA-256 與固定上游完全一致、5 個路徑／Prompt 存在、skill 版本一致 | provenance.json、verify.mjs |
| 官方原始碼與工作副本 | 匯入時相同，沒有執行 polish / distill | 源碼及 imported 快照 |
| 五個案例獨立 URL | 通過 | smoke.json |
| Prompt 顯示、剪貼簿、後續指令與純文字下載 | 通過，與快照共用的 formatPrompt / followupPrompt 完全一致 | smoke.json |
| 工作台篩選 | 通過，全部 5、官方 2、原創 3 | smoke.json |
| 原始／工作副本與 1440／390 預覽切換 | 通過 | smoke.json |
| 工作台／Brief／預留頁手機 390、360px | 沒有水平溢出 | smoke.json、screenshots/ |
| 鍵盤入口 | 第一個焦點為 skip link | smoke.json；未宣稱完整 WCAG 審計 |
| 瀏覽器 JavaScript error | smoke 全程未發現 pageerror | smoke.json |
| 打包後路徑 | 10 個抽查 URL 成功，含所有獨立頁、兩個 baseline、首頁、guide、wallet case | production-routes.json |
| snapshot | 五個案例均實際產生精確 Prompt、來源碼、manifest | recordings/INDEX.md |
| capture | 兩個官方 baseline × 桌面／手機，4 個影片、8 張截圖 | recordings/INDEX.md |
| WebM 解碼 | 4 段皆可解碼，影片尺寸符合 1440×900 或 390×844 | video-verification.json |
| 錄影中的 JS / 網路錯誤 | 四份 capture.json 均無 pageErrors / networkFailures | 各素材 capture.json |
| npm 安裝 audit 摘要 | 最終固定依賴安裝時 0 vulnerabilities | Vite 8.3.5、Playwright 1.64.1、package-lock.json |

## 目視檢查

已查看工作台桌面全頁、wallet Brief 手機全頁與 Lumina 原始首屏。文字、卡片、Prompt 閱讀區與控制按鈕沒有觀察到遮擋。完整截圖留在 screenshots/；這不等於完整可及性或跨瀏覽器認證。

## 保留的原始問題

兩個官方 Demo 在 390px 均有水平溢出。原始 `href="#"` CTA 沒有真正業務功能。這些保持不動，作為後續測試輸入，沒有提前修好後冒充原始頁。

## 本輪曾修正的問題

1. Vite dev server 的 public 子資料夾 URL 沒有自動解析 index.html，會進入工作台 fallback。baseline registry 已改成明確的 `/baselines/<case>/index.html`；開啟、iframe、錄影與 production routes 已驗證。
2. 第一輪 smoke 過早讀取尚未完成渲染的卡片數（0）；加入明確等待 UI ready 的條件，之後完整通過。沒有把該次失敗冒充通過。
3. 最初套件版本的 npm 安裝摘要有一項 high，改為查得的目前固定版本後安裝摘要為 0。
4. 安裝尚未完成時 context launcher 找不到檔案；未執行。安裝完成後只檢查 engine-probe，沒有追認成 init 或任何設計流程。

## 未執行

- 三個新題目的頁面生成。
- 兩個官方頁面的 skill 修改。
- skill hooks、正式 audit / critique、無 skill 對照組、評分。
- 真實手機、Safari / Firefox、完整螢幕閱讀器與 200% 縮放測試。
- 不存在本次搭建過程的完整錄影；只有後續生成的官方頁面 B-roll。
