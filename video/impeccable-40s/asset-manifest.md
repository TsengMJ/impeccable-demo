# 素材清单 v2 · 官方案例主线

素材来自 2026-11-01 的真实页面录影。源文件保留在仓库 recordings/captures/；仅复制制作需要的 PNG 与一段 WebM 到 production/public/assets/，原件 SHA-256 和媒体信息见 production/asset-inventory.json。

| ID | Scene | 视频时长 | 原始尺寸 | 原件目录（仓库相对） |
|---|---|---|---|---|
| lumina-a-desktop | S01 | 12.44s | 1440×900 | `recordings/captures/2026-11-01T02-14-29-272Z-lumina-a-desktop-390759fe` |
| lumina-a-mobile | S01, S02 | 12.36s | 390×844 | `recordings/captures/2026-11-01T02-14-29-257Z-lumina-a-mobile-aeae482c` |
| lumina-b-mobile | S02, S03, S06 | 11.32s | 390×844 | `recordings/captures/2026-11-01T02-14-43-383Z-lumina-b-mobile-d6a31aa2` |
| lumina-classic-a-mobile | S04 | 11.52s | 390×844 | `recordings/captures/2026-11-01T02-15-15-978Z-lumina-classic-a-mobile-17754a10` |
| lumina-classic-b-mobile | S04 | 11.56s | 390×844 | `recordings/captures/2026-11-01T02-15-28-204Z-lumina-classic-b-mobile-4535ad40` |
| lumina-classic-d-mobile | S04 | 11.92s | 390×844 | `recordings/captures/2026-11-01T02-15-49-209Z-lumina-classic-d-mobile-ff8e8aad` |
| wallet-b-mobile | S05 | 12.00s | 390×844 | `recordings/captures/2026-11-01T02-16-33-242Z-wallet-b-mobile-ad90ffc9` |
| wallet-c-mobile | S05 | 13.56s | 390×844 | `recordings/captures/2026-11-01T02-16-48-715Z-wallet-c-mobile-2b959026` |

## 核验

Lumina 390px 视口：A 页面宽 698px；B 页面宽 390px。所有入选录影的源码在录制中未变化，pageErrors / networkFailures 均为空。

- 官方起点与本地修改关系：docs/evidence/OFFICIAL-RESULTS.md。
- Classic D 从 B 分叉：docs/evidence/lumina-classic/D-REPORT.md。
- 风格取舍：wallet B / C 手机首屏；这是 B→C，不冒充无 skill 对照。
- 旁白：本机 Tingting 临时音轨，成本 $0，仅用于 Animatic 校时。
- 当前未调用 Higgsfield；无生成式视频画面、无音乐采购。
- 原始 PNG 保留实际页面像素；镜头裁切与动画属于编辑加工。
