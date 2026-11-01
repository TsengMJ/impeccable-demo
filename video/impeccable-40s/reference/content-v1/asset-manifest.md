# 现有素材清单 / Asset manifest v1

所有主素材来自本地 2026-11-01 简体重录。视频已实际读取媒体元数据；来源文件存在，SHA-256 记录在 [asset-inventory.json](production/asset-inventory.json)。复用原件，不额外复制整套视频。路径相对仓库根目录。

| Asset ID | 用途 | 媒体规格 | 目录 |
|---|---|---|---|
| tea-a-mobile | S01、S03：原版；茶杯被裁出手机画面、文字叠在较深山景上。 | 390×844，12.04s，无声 | `recordings/captures/2026-11-01T02-17-29-770Z-tea-a-mobile-a375c361/` |
| tea-b-mobile | S01、S02、S03、S06：打磨后；杯子进入视野，文字区域更清楚。 | 390×844，13.44s，无声 | `recordings/captures/2026-11-01T02-17-43-351Z-tea-b-mobile-876c1b29/` |
| wallet-a-mobile | S04：原版起点，装饰图在信息之前。 | 390×844，15.08s，无声 | `recordings/captures/2026-11-01T02-16-16-227Z-wallet-a-mobile-1d393785/` |
| wallet-b-mobile | S04：中间版；标清先 polish，避免把 A→D 当成单步。 | 390×844，12.00s，无声 | `recordings/captures/2026-11-01T02-16-33-242Z-wallet-b-mobile-ad90ffc9/` |
| wallet-d-mobile | S04：精简版；权限段在首屏出现，展示信息顺序。 | 390×844，12.92s，无声 | `recordings/captures/2026-11-01T02-16-59-295Z-wallet-d-mobile-4590e5c2/` |
| festival-d-mobile | S05：边界证据；保留 390px 的视口右边缘与溢出。 | 390×844，11.60s，无声 | `recordings/captures/2026-11-01T02-19-11-861Z-festival-d-mobile-92ae8c49/` |

每个目录含 `clip.webm`（录影）、`viewport.png`（首屏）、`full-page.png`（全页）和 `capture.json`（来源/尺寸/错误记录）。六组都没有录制中的源码变化或浏览器错误。

## 证据对应

| 可讲的事实 | 证据文件（仓库根相对路径） |
|---|---|
| 茶页的杯子与手机文字调整 | `docs/evidence/tea/B-REPORT.md`；tea A/B 首屏原图 |
| 钱包 D 从 B 复制，移除装饰，保留权限相关内容 | `docs/evidence/wallet/D-REPORT.md`；wallet A/B/D 首屏原图 |
| 音乐节 D 手机横向溢出 | `docs/evidence/FESTIVAL-MOBILE-BRAND.json`；`docs/evidence/CAPTURE-AUDIT.json`；festival D 原图 |
| 多轮迭代及控制实验限制 | `docs/evidence/BRIEF-RESULTS.md`；`docs/evidence/VARIANT-MATRIX.md` |
| 简体版素材的来源与时间点 | `docs/evidence/LOCALIZATION-2026-11-01.md` |

## 未选入主片

- 官方 Lumina 与 Classic、bolder、animate 和 optimize：这支 40 秒片不再扩充能力清单；保留给下一支。
- 桌面横屏录影：这次选手机证据，避免缩小后看不清。
- GitHub Stars、性能分数、模型生成耗时：没有加入叙事。
- 原始繁体截图：本片不与简体版本混剪，避免字形差异被误当作 skill 效果。

## 待定素材与费用

- 旁白：普通话、自然分享语气，音色未定。脚本确认后先验证时长；没有提交语音任务。
- 音乐：未采购、未生成；不让配乐成为理解内容的前提。
- 生成式视频：当前无必要，现有真实画面足够。
- Higgsfield：用户允许需要时使用按量付费；当前支出 $0。任何提交前须记录 Scene ID、必要性、endpoint、输入、Prompt、规格、费用估算和验收标准。
- 风格帧 / 预览 / final.mp4：尚未制作，等待内容和后续画面确认。

## 原始规范

用户附件原文保存在 `reference/social-video-rules-original.md`，仅为原始依据，保留原文用字。所有新文案使用简体。
