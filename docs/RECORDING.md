# 录影与测试手册

## 素材身份先说清楚

**2026-11-01 更新：**五案 A–E 现已完成并录制，请先看 [新素材索引](../recordings/MATRIX-INDEX.md)、[README 剪辑选片建议](../README.md#剪辑优先看哪些版本相对-a-变化最明显) 与 [录影稽核](evidence/CAPTURE-AUDIT.json)。以下较早的操作流程仍保留作方法与重跑参考；不能把旧的「待生成」状态当成当前进度。

当前页面已统一为简体中文，旧录影仍代表转换前的页面。`docs/prompts/` 是新的简体需求稿，`docs/evidence/*-prompt.txt` 是历史指令的简体转写；要核对当时逐字输入，请查看转换前的 Git 提交 `91642f3`，或本机旧版 `recordings/runs/` 快照。

- 五案 A–E 已上架，C／D／E 各自从 B 分叉；60 段页面片与 15 段操作片已留证。
- 工作台、题目封面和预留页都不是用 Impeccable 完整流程生成的测试结果。
- 官方 Lumina 主版本与 classic 是两个起始范例，不能剪成同一页的改善前后。
- 官方原始生成 Prompt 未公开；本地 D01/D02 是我们新拟的修改 Prompt。
- D01／D02 已读取 Impeccable skill 与 playbook，执行 polish／distill 类型的修改；没有在独立新对话贴上 slash 指令。完整执行限制见 `docs/evidence/OFFICIAL-RESULTS.md`。先前的 engine-probe 只证明引擎能启动。

## 必须遵守的前后比较（使用者后续确认）

三个原创题目已依下列顺序建立 A–E。此流程仍是重跑时必须遵守的比较原则：

1. **A／未使用 Impeccable**：在干净的新对话与隔离专案，用相同 Brief 生成完整可操作页面。检查本地、全域、外挂与 hooks 都没有载入 Impeccable，也不能带入本对话已读到的 skill 规则。只移除 `$impeccable` 前缀不算隔离。若无法确认隔离，不得标成无 skill 对照。
2. **冻结 A**：保存实际 Prompt、模型与推理设定、素材、工具条件、程式码、桌面／手机截图与录影。现在的预留页不算 A。
3. **B／使用 Impeccable 改善**：复制 A，在副本套用一个明确的 skill 指令。保留产品需求与模型设定，记录额外指令、skill 问答、图片生成与人工修补；不得覆盖 A。
4. **并排交付**：将 A、B 汇入同一个前端专案的两个独立路径，扩充现有案例与录影 registry，验证两份都可开启；以相同尺寸、卷动节奏和互动情境录制前后素材。两份成果与纪录齐全才算该题完成。

这是「同一页使用 skill 改善前后」的比较；B 多了一轮修改，不能把差异全部归因于 skill。若另外测「有／无 skill 从零生成」，另设 C 组，使用同样的空白起点与 Brief，不混作 A→B 的改善成果。

三题 A 是 Cursor 在隔离控制目录启动的子代理结果，并非全新 IDE 视窗；方法限制见 `docs/evidence/BRIEF-RESULTS.md`。工作台展示原始 Brief；矩阵内 B–E 使用另行记录的 skill 指令。A–E 各有独立路径；capture 现支援 `--take a|b|c|d|e`，并在 metadata 保存来源杂凑。

## 三个题目为什么这样选

| ID | 内容与转换目标 | 能力边界 | 可观测失败 |
|---|---|---|---|
| W01 AEGIS | Agentic wallet，让进阶用户进入权限 sandbox | 抽象产品理解、信任表达、互动状态一致 | 看起来像交易所、假审计、Revoke 无效、上限规则错误 |
| T01 山间制茶 | 台湾茶季订阅，选择方案并预览 | 中文品牌叙事、素材、非 SaaS 结构 | 全部品牌变米色、图片空缺、中文层级差、价格未更新 |
| F01 OFFGRID | 虚构音乐祭，找演出与票种 | 大胆构图、高密度资讯、混排、动态降级 | 日期被藏、时刻表手机溢出、长名称截断、减少动态后消失 |

完整产品内容在 `docs/prompts/`；这些品牌与价格、活动均为虚构测试设定。

## 建议测试顺序与完整呼叫

1. D01：完整要求存于 `docs/prompts/lumina.md`，首行 `$impeccable polish demos/lumina/index.html`。本轮已由代理读取本地 skill 与 polish playbook 执行；没有独立对话贴上整份 Prompt。不可在影片中宣称录下了 slash 指令。
2. D02：完整要求存于 `docs/prompts/lumina-classic.md`，首行 `$impeccable distill demos/lumina-classic/index.html`。同样是在此对话读取 skill 与 distill playbook 后执行。
3. W01 / T01 / F01：先依上节完成无 skill 的 A 并冻结，再在 A 的副本执行选定 skill 指令得到 B。工作台「使用 Impeccable」的完整生成 Prompt 保留供独立 C 组使用，不能跳过 A。`scripts/prompt.mjs` 是共用的组合规则，snapshot 与画面相同。
4. 后续单轮：audit / critique 先评估，adapt 测手机，bolder 测变化。每一轮都从已记录快照开始，不要一次贴三个修改指令。

工作台后续按钮复制的**完整格式**如下（由 `followupPrompt` 统一产生）：

```text
$impeccable <command> <directory>/index.html

只处理 <route>，遵守 docs/prompts/<case>.md 的原始产品事实与范围限制。先记录此完整 Prompt；不得修改官方 baseline 或其他页面。回报实际检查证据、额外指令与未解决问题。
```

命令不限于以上；自订指令先存成 UTF-8 `.txt`，后续记录用 `--prompt` 指向该档。不要覆盖上一轮 Prompt。

## 每轮实际操作

以下是重跑单轮时的快照／录影工具范例；现有 A–E 成果与原始码副本已在新素材索引。阶段名称与 mode 应如实标记，例如 `a-no-skill` 配 `--mode plain`、`b-polish` 配该轮的完整 `--prompt`。

终端机 A：

```sh
npm run dev
```

终端机 B：

```sh
# 第一次安装录影用浏览器
npx playwright install chromium

# 保存起点，输出唯一资料夹
npm run snapshot -- --case wallet --phase before --model "实际模型与设定" --note "首轮，尚未生成"
```

开始 macOS 萤幕录影（Shift + Command + 5），录下案例名、完整 Prompt、贴上与送出、skill 的互动选择、生成、任何错误与修补。模型名称／推理设定应从你实际使用的介面抄录；本次工具无法替你证明 UI 所选设定。

完成后：

```sh
npm run build
npm run snapshot -- --case wallet --phase after --model "实际模型与设定" --transcript docs/my-session.md --note "如有额外要求，在 transcript 原文记录"
# 省略 --transcript 也能保存，但必须在 observations.md 诚实注记没有完整对话纪录。

# RUN_DIRECTORY 请替换成上一条真正输出的快照路径
npm run capture -- --case wallet --take b --viewport desktop --run RUN_DIRECTORY
npm run capture -- --case wallet --take b --viewport mobile --run RUN_DIRECTORY
```

后续指令使用与工作台完全一致的 Prompt：

```sh
npm run snapshot -- --case wallet --phase before-adapt --model "实际模型" --command adapt
# 复制工作台 adapt Prompt、执行、记录对话
npm run snapshot -- --case wallet --phase after-adapt --model "实际模型" --command adapt
```

自订／额外 Prompt 要逐字保存：

```sh
npm run snapshot -- --case tea --phase after-polish --model "实际模型" --prompt docs/my-exact-prompt.txt --transcript docs/my-session.md
```

`--prompt` 预设 `--mode exact`，不增加 skill 前缀、不剥除标题。内建 Brief 预设 `skill`，对照组可用 `--mode plain`。`run.json` 的 status 永远表示「快照」，不是完成宣告。实际执行、得分与结论填在 observations.md。

## 素材输出

- `recordings/runs/<UTC>-<case>-<phase>-<uuid>/`：prompt.txt、brief.md、source/、package/lockfile、context/、provenance.json、run.json、observations.md，及选填 transcript.md。
- `recordings/captures/<UTC>-<case>-<take>-<viewport>-<uuid>/`：viewport.png、full-page.png、clip.webm、capture.json。
- `capture.json` 含 URL、时间、尺寸、browser 版本、卷动时间点、console error、资源失败和来源快照关联。
- 目前自动影片是无声页面卷动 B-roll，非滑鼠互动演示、非 Codex 对话录影、非效能 benchmark。开头可能有载入帧，使用 contentStartMs 裁掉；headless 录影可能有时间量化，最终剪辑以播放器时间轴为准。
- `--take a|b|c|d|e` 分别录五个公开变体；`baseline`／`working` 仍是旧版 a／b 别名。
- 桌面 1440×900、手机 390×844、DPR 1、zh-CN、Asia/Taipei、light、reduced-motion；手机模式是窄 viewport，没有模拟触控或特定手机装置。
- reduced-motion 是为固定比较而设；要测完整动画，请另用正常动态的实际浏览器录制，标注模式，不能拿这份影片断言动画好坏。
- Google Fonts 需要网路，字型载入若失败会记录。若要固定离线字型，另开一轮处理并记录差异，不动官方原始码基准。
- `--run` 比对的是本地来源，请搭配 dev server；若用 preview 或自订 --base，需自己确认刚 build 的版本与快照相同。
- 快照保留单页目录；新页面须把资产放在自己的目录，不要依赖未记录的外部共享档。第三方 CDN 与 font 的内容未被快照封存。

## 建议分镜（每个案例约 60–120 秒，可按成片调整）

| 片段 | 拍摄内容 | 剪辑时可用的旁白重点 |
|---|---|---|
| A 题目 | 案例名、目的、测试条件 5–8 秒 | 这次要测哪个能力，什么算失败 |
| B 起点 | 官方原始版／真正无 skill 对照，首屏与全页 10–15 秒 | 起点是什么；尚未生成要明说 |
| C 指令 | 完整 Prompt，停留首段与限制，另提供可读全文 | 模型、skill、需求和工具条件 |
| D 过程 | 送出、必要问答、生成、报错、修补 | 不把多轮包装成一键完成 |
| E 结果 | 相同 viewport 与卷动节奏的结果 | 具体指出改善与倒退 |
| F 功能 | 手动演示 sandbox／方案／时刻表，含失败边界 | 画面之外，功能是否真的成立 |
| G 手机 | 390px 与 360px、200% 缩放、键盘焦点 | 响应式和可及性是否过关 |
| H 结论 | 依六维度与证据给分 | 只总结实际观察，不过度归因 |

## 评分规则

每一项 1–5 分，未测填「未测」，不要当作 0 或默认通过。

| 维度 | 1 分 | 3 分 | 5 分 |
|---|---|---|---|
| 辨识度 | 通用模板、主题不明 | 能辨识主题，部分惯用模式 | 具体品牌语言与一致构图 |
| 内容层级 | 主资讯难找 | 核心资讯清楚、次级仍乱 | 首屏与全页阅读顺序清楚 |
| 需求完成 | 大量遗漏或捏造 | 主要需求成立、细节遗漏 | 所有 Brief 条件可验证 |
| 互动正确 | 假按钮或状态错误 | 主流程可用、边界失败 | 正常与阻挡／撤销等边界一致 |
| 响应式 | 溢出或不可用 | 手机可用、构图妥协 | 多尺寸和缩放均维持阅读 |
| 可及性 | 键盘不可操作／文字不清 | 部分焦点或对比问题 | 键盘、标签、对比、降级有证据 |

一人主观评分不是可及性认证。每项附素材时间码与具体例子，尽可能让第二位观察者盲评。

## 想测 skill 的因果效果

1. 建立两个干净的同版专案副本、新对话、相同模型／推理设定／工具／素材／时间预算。
2. 无 skill 对照组不得载入 `.agents/skills/impeccable`、全域同名 skill、外挂或 hooks，也不要把 skill 规则带入 prompt/context。需先确认全域安装情况；本工作台切换 plain 只移除呼叫语法，不会自动隔离。
3. 两组使用相同原始 Brief；只差 skill 的载入与呼叫。记录 skill 自己询问的选择和额外图片生成。
4. 若模型、图片或手动介入不同，不宣称只因 skill 改善。三题只能形成案例观察，不能直接推广到所有网站。
5. 目前这个已读过 skill 文件的对话不适合作为干净「无 skill」对照。
