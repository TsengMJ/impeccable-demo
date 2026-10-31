# Optimize 收集协议（不上架）

`optimize` **不**进入 A–E 路径，也不出现在工作台变体切换。前后对比数据汇总写入根目录 **README.md**（简体）的「Optimize 前后数据」节；明细仍落在 `docs/evidence/`。

## 作法

1. 从冻结的 **B** 复制到暂存目录 `<root>/_optimize/`（Vite 忽略／不进 registry）。
2. 先记录 before 指标 → `optimize-before.json`。
3. 执行 `$impeccable optimize <root>/_optimize/index.html`。
4. 记录 after → `optimize-after.json`、`optimize-diff.json`、`OPTIMIZE-SUMMARY.md`，并回填 README 表格。
5. 各案另存 `docs/evidence/<key>/OPTIMIZE-REPORT.md` 与 `optimize-prompt.txt`。
6. **不得**注册为公开变体路径或工作台按钮。
