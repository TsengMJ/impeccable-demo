# 五案变体矩阵（A–E + optimize 证据）

日期：2026-11-01。

当前 A–E 页面已统一转成简体中文。A 的「无 skill」身份指转换前的生成来源；文字本地化在所有版本上统一进行，原始文件见 Git 提交 `91642f3`。

| 代号 | 定义 | 上架路径 | 来源 |
|---|---|---|---|
| **A** | 原图／无 skill 对照 | `…/a/`（官方 A 对齐冻结 baseline） | 官方：`public/baselines/*` 副本；原创：隔离生成 |
| **B** | polish | `…/b/` | 由 A 复制后 `$impeccable polish` |
| **C** | bolder | `…/c/` | **由 B 复制**后 `$impeccable bolder` |
| **D** | distill | `…/d/` | **由 B 复制**后 `$impeccable distill` |
| **E** | animate | `…/e/` | **由 B 复制**后 `$impeccable animate` |
| **optimize** | 效能诊断／改善 | **不上架** | 对 B 的暂存副本执行；只写 `docs/evidence/<key>/optimize-*` |

C／D／E 彼此独立，皆从同一个冻结的 B 分叉，不做 C→D 串烧。

## 路径

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
