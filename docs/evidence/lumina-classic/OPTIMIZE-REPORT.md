# Lumina Classic — optimize (from B, `_optimize/` only)

## Prompt
See `optimize-prompt.txt`. Applied `$impeccable optimize` to `demos/lumina-classic/_optimize/` after copying frozen B.

## Bottleneck hypothesis
Inter loaded five weights including unused **500**. Below-fold sections lack containment; font CSS blocked render.

## Changes
- Inter weights **400 / 600 / 700 / 800** (dropped unused 500).
- Non-blocking font stylesheet + `display=swap`.
- `content-visibility: auto` on logos / features / CTA / footer.

## Metrics
| Metric | Before (B) | After | Δ |
|---|---:|---:|---:|
| Bytes | 13621 | 13782 | +161 (+1.2%) |
| Font weight requests | 5 | 4 | −1 (−20%) |
| Unique weights | 5 | 4 | −1 |
| `https://` refs | 3 | 3 | 0 |
| Motion decls | 2 | 2 | 0 |

## Caveats
- Source bytes +1.2% from containment CSS; font request count is the intended win.
- No runtime CWV measurement in this pass.
- A–E untouched; not a public variant.