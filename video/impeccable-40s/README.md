# Impeccable 40s / 制作交接

内容版本 **v2-official / LOCKED**。用户明确要求改用官方案例、把旁白改得自然，并授权改完直接锁定继续制作。旧内容稿保存在 `reference/content-v1/`。

当前产物是 **Phase 3 — Animatic**：40 秒、6 个独立 Scene。静态画面已由制作 Agent 检查，使用本机临时旁白验证节奏；视觉与正式音色仍待用户审阅。`final.mp4` 只在全部 Scene 确认后输出。

## 先看什么

- `previews/animatic-v02.mp4`：720×1280 / 30fps / H.264 + AAC 草稿。
- `script.md`、`timeline.md`：已锁定旁白、每段目的与时间。
- `storyboard.md`、`styleframes/`：6 段分镜与 11 张 1080×1920 静态审阅帧。
- `scenes.json`：内容、画面状态、素材、依赖、输出与费用记录。
- `asset-manifest.md`、`production/asset-inventory.json`：原始素材路径、来源哈希与实读时长。
- `production/preview-qa.json`：视频解码、帧数、音量检测结果。
- `previews/animatic-v02.srt`：对应临时旁白的逐句字幕。
- `post-copy.md`：发布文案与测试边界说明。

## 这版讲什么

Lumina 原版的手机导航溢出 → 本地 polish 后恢复 → 介绍 Impeccable → Classic 从装饰密集到内容突出 → 自拟案例更多是风格变化 → 给出适用时机和项目地址。

片中的 A 是官方起始 Demo，B/D 是我们的本地修改。Classic 明确标为 **A→B→D**，不称为一次 distill 的独立效果。钱包是 **B→C 风格分支**，不称为无 skill 到有 skill 的对照。没有用生成式画面冒充实测，也没有声称录到了 AI 生成过程。

## 制作与局部修改

制作工程独立于根目录前端工程。进入 `production/`：

```sh
npm ci
node prepare-assets.mjs
python3 make-guide-audio.py
npm run styleframes
npm run preview
npm run assemble
```

本机使用 macOS PingFang SC / Arial、Tingting 临时语音及现有 Playwright Chromium。`assemble.mjs` 中的 FFmpeg 路径为 macOS x64；换平台时需换成对应的 Remotion compositor 路径。

只修改 S04 的示例：

```sh
node render.mjs stills S04
node render.mjs scene S04
npm run assemble
```

先检查变更段的静态帧，再重渲染该段，最后重组现有片段。不得因一段修改重新生成其他已满意的 Scene。`src/scenes.json` 是根 `scenes.json` 的制作副本，修改时间/内容后须同步。更新旁白后重新生成受影响的语音与字幕时序；当前语音脚本默认复用已存在的 WAV，替换文本时必须明确移走对应旧 WAV。

每段状态：DRAFT 可改；IN_REVIEW 等审阅；LOCKED 禁止擅改。内容与视觉分别记录，用户授权的内容锁定不等于音色和画面已经通过最终验收。

## 成本与后续

当前新增付费 API 支出 **$0**。本地 TTS 只作为节奏参考，未购买正式配音、音乐或生成视频。Higgsfield 作为有条件选项保留；本片的真实 UI 对照不需要生成式镜头。需要付费时仍先记录 Scene、用途、模型、素材、Prompt、实际报价与验收标准。

下一步按 Scene 审阅旁白停顿、文字与画面；确认后锁定视觉，确定正式音轨，再输出 1080×1920 的 `final.mp4`。保留所有现有素材，不因后续修改覆盖原始留证。
