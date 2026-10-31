# 五案變體矩陣（A–E + optimize 證據）

日期：2026-11-01。

| 代號 | 定義 | 上架路徑 | 來源 |
|---|---|---|---|
| **A** | 原圖／無 skill 對照 | `…/a/`（官方 A 對齊凍結 baseline） | 官方：`public/baselines/*` 副本；原創：隔離生成 |
| **B** | polish | `…/b/` | 由 A 複製後 `$impeccable polish` |
| **C** | bolder | `…/c/` | **由 B 複製**後 `$impeccable bolder` |
| **D** | distill | `…/d/` | **由 B 複製**後 `$impeccable distill` |
| **E** | animate | `…/e/` | **由 B 複製**後 `$impeccable animate` |
| **optimize** | 效能診斷／改善 | **不上架** | 對 B 的暫存副本執行；只寫 `docs/evidence/<key>/optimize-*` |

C／D／E 彼此獨立，皆從同一個凍結的 B 分叉，不做 C→D 串燒。

## 路徑

| Case | 根 |
|---|---|
| D01 Lumina | `/demos/lumina/{a,b,c,d,e}/` |
| D02 Classic | `/demos/lumina-classic/{a,b,c,d,e}/` |
| W01 | `/experiments/wallet/{a,b,c,d,e}/` |
| T01 | `/experiments/tea/{a,b,c,d,e}/` |
| F01 | `/experiments/festival/{a,b,c,d,e}/` |

官方不可变原件仍在 `public/baselines/`；`demos/*/a/` 为其逐 byte 工作副本供统一切换。

## 进度（2026-11-01）

| Case | A | B | C | D | E | optimize |
|---|---|---|---|---|---|---|
| Lumina | ✓ | ✓ | ✓ | ✓ | ✓ | 数据已入 README |
| Classic | ✓ | ✓ | ✓ | ✓ | ✓ | 数据已入 README |
| AEGIS | ✓ | ✓ | ✓ | ✓ | ✓ | 数据已入 README |
| 山间制茶 | ✓ | ✓ | ✓ | ✓ | ✓ | 数据已入 README |
| OFFGRID | ✓ | ✓ | ✓ | ✓ | ✓ | 数据已入 README |

五案 A–E 路径与证据报告已齐；optimize 前后数据已写入 README（简体）与 `docs/evidence/optimize-*.json`，不上架。
