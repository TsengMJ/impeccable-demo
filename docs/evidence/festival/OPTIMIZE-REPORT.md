# Festival (OFFGRID) — optimize (from B, `_optimize/` only)

## Prompt
See `optimize-prompt.txt`. Applied `$impeccable optimize` to `experiments/festival/_optimize/` after copying frozen B.

## Bottleneck hypothesis
Noto Sans TC included unused **500**. Hero infinite spin/pulse keeps painting after scroll. Modal focus trap called `getComputedStyle` per candidate (forced style). Below-fold sections lack containment.

## Changes
- Noto Sans TC **400 / 700** only (dropped unused 500).
- Non-blocking font CSS + `display=swap`.
- `content-visibility: auto` on `.section`.
- IntersectionObserver pauses hero plane animations when off-screen.
- Focusable filter uses `getClientRects()` instead of per-node `getComputedStyle`.

## Metrics
| Metric | Before (B) | After | Δ |
|---|---:|---:|---:|
| Bytes | 34942 | 35576 | +634 (+1.8%) |
| Font weight requests | 7 | 6 | −1 (−14.3%) |
| Unique weights | 5 | 4 | −1 |
| `https://` refs | 3 | 3 | 0 |
| Motion decls | 13 | 13 | 0 |

## Caveats
- Source +IO/CSS overhead; network font and runtime paint are the intended gains.
- Motion decl count unchanged (pause, not delete).
- Copy/interactions preserved. A–E untouched; not registered.