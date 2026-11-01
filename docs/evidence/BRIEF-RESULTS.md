# 原创三题 A→B 第一轮结果

日期：2026-11-01。接续 Codex credit 中断后由 Cursor 完成。主专案 remote：`https://github.com/TsengMJ/impeccable-demo`。

## 方法

1. **A／无 skill**：在隔离目录（无 `AGENTS.md` / `.agents/` / hooks）由本地 Task 子代理只读 `prompt-a.txt` 生成，再汇入 `experiments/<key>/a/`。
2. **冻结 A**：`docs/evidence/a-freeze-hashes.json`。
3. **B／polish**：逐 byte 复制 A → `experiments/<key>/b/`，执行 `$impeccable polish experiments/<key>/b/index.html`（原文 `docs/evidence/<key>/b-polish-prompt.txt`）。A 未被修改。
4. 工作台以 A=`baseline`、B=`route` 切换比较。

限制：A 组仍由本对话启动的子代理产出，不是全新 IDE 视窗；标记为「控制目录无 skill 档 + 禁止读取 skill + 未跑 `$impeccable`」。B 多一轮修改，差异不能全部归因于 skill。

| ID | A | B | 指令 | 报告 |
|---|---|---|---|---|
| W01 | `/experiments/wallet/a/` | `/experiments/wallet/b/` | polish | `docs/evidence/wallet/` |
| T01 | `/experiments/tea/a/` | `/experiments/tea/b/` | polish | `docs/evidence/tea/` |
| F01 | `/experiments/festival/a/` | `/experiments/festival/b/` | polish | `docs/evidence/festival/` |

各题 `B-REPORT.md` 与 `b-polish-detector.json` 记录实际变更与 detector 结果；勿用「完成」取代未做的截图／对比审计。
