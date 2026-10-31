# Lumina — optimize (from B, `_optimize/` only)

## Prompt
See `optimize-prompt.txt`. Applied `$impeccable optimize` to `demos/lumina/_optimize/` after copying frozen B.

## Bottleneck hypothesis
Primary cost is **Google Fonts**: Fraunces variable opsz axis with five weights (300–700) plus Inter. Below-fold sections paint eagerly with no containment.

## Changes
- Trimmed Fraunces to weights **400 / 500 / 600** (dropped unused 300 & 700); kept Inter 400–600.
- Font stylesheet loads non-blocking (`media="print"` → `onload` swap to `all`); `display=swap` retained.
- `content-visibility: auto` + `contain-intrinsic-size` on logos / features / CTA / footer.

## Metrics (source html only)
| Metric | Before (B) | After | Δ |
|---|---:|---:|---:|
| Bytes | 11810 | 11953 | +143 (+1.2%) |
| Font weight requests | 8 | 6 | −2 (−25%) |
| Unique weights | 5 | 3 | −2 |
| `https://` refs | 3 | 3 | 0 |
| Motion decls | 2 | 2 | 0 |

## Caveats
- Local source bytes rose slightly from containment CSS; **network font payload** should drop more than source size suggests.
- No Lighthouse / CWV run in this pass — deltas are static/source metrics.
- Product copy and interactions unchanged. A–E untouched; not registered in registry.