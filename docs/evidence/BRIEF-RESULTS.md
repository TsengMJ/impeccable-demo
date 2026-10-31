# 原創三題 A→B 第一輪結果

日期：2026-11-01。接續 Codex credit 中斷後由 Cursor 完成。主專案 remote：`https://github.com/TsengMJ/impeccable-demo`。

## 方法

1. **A／無 skill**：在隔離目錄（無 `AGENTS.md` / `.agents/` / hooks）由本地 Task 子代理只讀 `prompt-a.txt` 生成，再匯入 `experiments/<key>/a/`。
2. **凍結 A**：`docs/evidence/a-freeze-hashes.json`。
3. **B／polish**：逐 byte 複製 A → `experiments/<key>/b/`，執行 `$impeccable polish experiments/<key>/b/index.html`（原文 `docs/evidence/<key>/b-polish-prompt.txt`）。A 未被修改。
4. 工作台以 A=`baseline`、B=`route` 切換比較。

限制：A 組仍由本對話啟動的子代理產出，不是全新 IDE 視窗；標記為「控制目錄無 skill 檔 + 禁止讀取 skill + 未跑 `$impeccable`」。B 多一輪修改，差異不能全部歸因於 skill。

| ID | A | B | 指令 | 報告 |
|---|---|---|---|---|
| W01 | `/experiments/wallet/a/` | `/experiments/wallet/b/` | polish | `docs/evidence/wallet/` |
| T01 | `/experiments/tea/a/` | `/experiments/tea/b/` | polish | `docs/evidence/tea/` |
| F01 | `/experiments/festival/a/` | `/experiments/festival/b/` | polish | `docs/evidence/festival/` |

各題 `B-REPORT.md` 與 `b-polish-detector.json` 記錄實際變更與 detector 結果；勿用「完成」取代未做的截圖／對比審計。
