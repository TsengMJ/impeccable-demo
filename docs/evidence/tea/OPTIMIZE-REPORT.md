# Tea (山間製茶) — optimize (from B, `_optimize/` only)

## Prompt
See `optimize-prompt.txt`. Applied `$impeccable optimize` to `experiments/tea/_optimize/` after copying frozen B.

## Bottleneck hypothesis
Noto CJK fonts dominate network cost. Serif requested **500 + 700** while display serif mostly needs 700. Hero steam loops forever after leave-viewport. Long page with multiple sections paints fully up front.

## Changes
- Noto Serif TC reduced to **700** only; `.hero-tagline` remapped 500→700 to match available face.
- Non-blocking font CSS + `display=swap`.
- `content-visibility: auto` on `.section` (hero stays fully visible).
- IntersectionObserver pauses `.steam` animation when hero is off-screen.

## Metrics
| Metric | Before (B) | After | Δ |
|---|---:|---:|---:|
| Bytes | 37344 | 37975 | +631 (+1.7%) |
| Font weight requests | 5 | 4 | −1 (−20%) |
| Unique weights | 3 | 3 | 0 |
| `https://` refs | 3 | 3 | 0 |
| Motion decls | 4 | 4 | 0 |

## Caveats
- Dropping one Noto Serif weight is a large **network** win for CJK; local source bytes still rose slightly.
- Tagline weight 500→700 is a minor visual change to keep one serif file.
- No CWV lab run. A–E untouched.