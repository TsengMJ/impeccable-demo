# W01 / AEGIS 無 skill A 組準備紀錄

2026-10-31 建立隔離工作目錄：`/Users/tsengmingchun/Documents/LAB/impeccable-control-wallet/`。這是暫時的 A 組生成環境；最後的 A、B 頁仍須匯回本專案各自的 URL，對使用者維持一個 Vite 前端專案。

已複製同版 `package.json`、`package-lock.json`（Vite 8.3.5、Playwright 1.64.1），建立最小的兩頁 Vite 設定與尚未生成的 `experiments/wallet/index.html`。`npm ci` 與 `npm run build` 通過。該目錄及其祖先沒有 `AGENTS.md`、`.agents/`、`.codex/`、`.claude/` 或 hooks 目錄；目前全域 `~/.codex/skills/` 沒有 SKILL.md，`~/.codex/config.toml` 沒有 Impeccable hook 設定。**新任務啟動後仍要再次確認其實際載入的 skills／plugins／hooks**，本次目錄檢查不能替代新任務的上下文檢查。

`prompt-a.txt` 是 `docs/prompts/wallet.md` 去掉 Markdown 標題後的完整無 skill 版本，沒有 `$impeccable` 呼叫。兩邊產生的 Prompt SHA-256 均為 `be4e91f8f47a12d4991b877e57c04d112590e0cfe7cc613426141f56be87b18a`。尚未把預留頁當作 A 成果，也尚未執行任何生成。

新任務應開在上述隔離目錄，並先開始螢幕錄影。為保留額外操作指令的出處，啟動訊息建議逐字使用：

```text
這是 AEGIS 的無 skill A 組。請先確認此任務沒有載入 Impeccable 或其他設計 skill、plugin、hook，也不要讀取相鄰專案。請完整讀取本目錄的 prompt-a.txt，將它當成頁面需求原文執行；只修改 experiments/wallet/。請記錄實際模型／推理設定、額外指令、素材來源、任何人工修補與檢查結果。完成後執行 npm run build，回報頁面與剩餘問題。
```

正式執行時要在錄影中展示 `prompt-a.txt` 全文；上述啟動訊息和 Prompt 均屬 A 組的實際指令，不能只記錄其中一份。若新任務顯示 Impeccable 已載入，停止該 A 組並重建隔離，不能將輸出標記為無 skill。

目前主專案占用 5173；在隔離目錄預覽時可用 `npx vite --host 127.0.0.1 --port 5174 --strictPort`。完成 A 後先封存其來源、完整對話與 1440／390px 截圖和錄影，再匯入主專案的 A 路徑。B 必須從 A 的逐 byte 副本開始，另外選一條路徑，保存實際執行的 Impeccable 指令和所有修改。A、B 驗證完才可宣稱 W01 完成。
