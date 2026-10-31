# 三題無 skill A 組隔離準備與匯入

日期：2026-11-01。主專案 remote：`git@github.com:TsengMJ/impeccable-demo.git`。

## 隔離目錄

| 題目 | 目錄 | Prompt SHA-256（前綴） |
|---|---|---|
| W01 | `…/impeccable-control-wallet/` | `be4e91f8…` |
| T01 | `…/impeccable-control-tea/` | `6ec27043…` |
| F01 | `…/impeccable-control-festival/` | `afeccca3…` |

控制目錄無 `AGENTS.md`、`.agents/`、`.codex/`、`.claude/`。`prompt-a.txt` 為對應 brief 去標題正文。

## 主專案路徑

| 題目 | A | B polish | 證據 |
|---|---|---|---|
| W01 | `experiments/wallet/a/` | `experiments/wallet/b/` 完成 | `docs/evidence/wallet/` |
| T01 | `experiments/tea/a/` | `experiments/tea/b/` 完成 | `docs/evidence/tea/` |
| F01 | `experiments/festival/a/` | `experiments/festival/b/` 完成 | `docs/evidence/festival/` |

A 凍結雜湊：`docs/evidence/a-freeze-hashes.json`（三題均通過覆核，B 未覆寫 A）。總結見 `BRIEF-RESULTS.md`。
