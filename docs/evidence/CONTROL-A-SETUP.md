# 三题无 skill A 组隔离准备与汇入

日期：2026-11-01。主专案 remote：`git@github.com:TsengMJ/impeccable-demo.git`。

## 隔离目录

| 题目 | 目录 | Prompt SHA-256（前缀） |
|---|---|---|
| W01 | `…/impeccable-control-wallet/` | `be4e91f8…` |
| T01 | `…/impeccable-control-tea/` | `6ec27043…` |
| F01 | `…/impeccable-control-festival/` | `afeccca3…` |

控制目录无 `AGENTS.md`、`.agents/`、`.codex/`、`.claude/`。`prompt-a.txt` 为对应 brief 去标题正文。

## 主专案路径

| 题目 | A | B polish | 证据 |
|---|---|---|---|
| W01 | `experiments/wallet/a/` | `experiments/wallet/b/` 完成 | `docs/evidence/wallet/` |
| T01 | `experiments/tea/a/` | `experiments/tea/b/` 完成 | `docs/evidence/tea/` |
| F01 | `experiments/festival/a/` | `experiments/festival/b/` 完成 | `docs/evidence/festival/` |

A 冻结杂凑：`docs/evidence/a-freeze-hashes.json`（三题均通过覆核，B 未覆写 A）。总结见 `BRIEF-RESULTS.md`。
