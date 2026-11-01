# 简体中文转换留证（2026-11-01）

本次把五个案例的 A–E 页面、五个案例入口、工作台、录影说明、README、Prompt 转写稿及脚本中的项目自有中文统一转为简体。茶页和 OFFGRID 页面同时改用简体字形字体，中文页面的 `lang` 改为 `zh-Hans`，新录影使用 `zh-CN` 浏览器语言。未修改第三方 Impeccable skill 或官方冻结的 `public/baselines/`。

这是统一施加在各版上的**文字本地化**，不是新的 Impeccable 执行结果。A／B／C／D／E 的来源关系保持原样；茶与 OFFGRID 的 A 仍代表先前未使用 skill 的生成版本，但当前页面字节已与当时不同。

## Prompt 与原始素材

当前 `docs/prompts/` 是供后续重跑的简体需求稿，茶与 OFFGRID 的语言要求已改为简体。`docs/evidence/<案例>/*-prompt.txt` 则是**历史指令的简体转写稿**，保留原有需求语义，包括当时要求使用繁体中文的句子；不要当成当时在 Cursor/Codex 输入的逐字原文。原始繁体 Prompt、报告及页面保存在转换前的 Git 提交 [`91642f3`](https://github.com/TsengMJ/impeccable-demo/commit/91642f3)，本地可用 `git show 91642f3:docs/evidence/tea/prompt-a.txt` 核对。本机旧版 `recordings/runs/` 快照也保留了当时的 Prompt。

旧版录影和各变体目录中的 `_checks/` 截图是历史素材，其中可能出现繁体字。当前简体页面的录影、截图和逐片来源哈希见 [新录影索引](../../recordings/MATRIX-INDEX.md) 与 [录影稽核](CAPTURE-AUDIT.json)。新录影对应的本机来源副本是 [`source-freeze-2026-11-01T02-14-24-724Z`](../../recordings/source-freeze-2026-11-01T02-14-24-724Z/freeze.json)；该目录与影片默认不进入 Git，剪辑前需另行备份。旧 optimize 字节统计仍是转换前的测试数据。

## 验证

- OpenCC `t2s` 再次扫描项目自有的可编辑文字，未发现可继续转换的繁体候选文件。
- `npm run verify`、`npm run build`、`npm run test:smoke` 通过。
- [15 组交互状态](INTERACTION-VALIDATION.json)全部通过；[60 段页面录影](CAPTURE-AUDIT.json)均与本轮来源副本匹配，浏览器与来源完整性警示为 0。原有的 3 项手机水平溢出仍在：官方 Lumina A、Classic A、OFFGRID D；不要把简体转换剪成这些问题已修复。

录影只记录页面与操作，不包含生成过程。剪片时应把「原始繁体生成成果」与「本次简体本地化后的重录成果」标成不同时间点。
