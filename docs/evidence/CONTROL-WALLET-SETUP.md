# W01 / AEGIS 无 skill A 组准备纪录

2026-10-31 建立隔离工作目录：`/Users/tsengmingchun/Documents/LAB/impeccable-control-wallet/`。这是暂时的 A 组生成环境；最后的 A、B 页仍须汇回本专案各自的 URL，对使用者维持一个 Vite 前端专案。

已复制同版 `package.json`、`package-lock.json`（Vite 8.3.5、Playwright 1.64.1），建立最小的两页 Vite 设定与尚未生成的 `experiments/wallet/index.html`。`npm ci` 与 `npm run build` 通过。该目录及其祖先没有 `AGENTS.md`、`.agents/`、`.codex/`、`.claude/` 或 hooks 目录；目前全域 `~/.codex/skills/` 没有 SKILL.md，`~/.codex/config.toml` 没有 Impeccable hook 设定。**新任务启动后仍要再次确认其实际载入的 skills／plugins／hooks**，本次目录检查不能替代新任务的上下文检查。

`prompt-a.txt` 是 `docs/prompts/wallet.md` 去掉 Markdown 标题后的完整无 skill 版本，没有 `$impeccable` 呼叫。两边产生的 Prompt SHA-256 均为 `be4e91f8f47a12d4991b877e57c04d112590e0cfe7cc613426141f56be87b18a`。尚未把预留页当作 A 成果，也尚未执行任何生成。

新任务应开在上述隔离目录，并先开始萤幕录影。为保留额外操作指令的出处，启动讯息建议逐字使用：

```text
这是 AEGIS 的无 skill A 组。请先确认此任务没有载入 Impeccable 或其他设计 skill、plugin、hook，也不要读取相邻专案。请完整读取本目录的 prompt-a.txt，将它当成页面需求原文执行；只修改 experiments/wallet/。请记录实际模型／推理设定、额外指令、素材来源、任何人工修补与检查结果。完成后执行 npm run build，回报页面与剩余问题。
```

正式执行时要在录影中展示 `prompt-a.txt` 全文；上述启动讯息和 Prompt 均属 A 组的实际指令，不能只记录其中一份。若新任务显示 Impeccable 已载入，停止该 A 组并重建隔离，不能将输出标记为无 skill。

目前主专案占用 5173；在隔离目录预览时可用 `npx vite --host 127.0.0.1 --port 5174 --strictPort`。完成 A 后先封存其来源、完整对话与 1440／390px 截图和录影，再汇入主专案的 A 路径。B 必须从 A 的逐 byte 副本开始，另外选一条路径，保存实际执行的 Impeccable 指令和所有修改。A、B 验证完才可宣称 W01 完成。
