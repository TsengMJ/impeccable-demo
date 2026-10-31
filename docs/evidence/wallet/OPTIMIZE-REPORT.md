# Wallet (AEGIS) — optimize (from B, `_optimize/` only)

## Prompt
See `optimize-prompt.txt`. Applied `$impeccable optimize` to `experiments/wallet/_optimize/` after copying frozen B.

## Bottleneck hypothesis
Three Google Font families; Syne included unused **600**. Infinite hero SVG animations keep compositing after scroll-away. Below-fold sections fully laid out; hash-link handlers re-query `matchMedia` every click.

## Changes
- Syne trimmed to **700 / 800** (dropped 600); mono/sans unchanged.
- Non-blocking font CSS + `display=swap`.
- `content-visibility: auto` on `.section`; sandbox forced `visible` so focus/scroll targets stay accurate.
- IntersectionObserver pauses hero infinite animations when off-screen.
- Cached `prefers-reduced-motion` MediaQueryList for smooth-scroll fallback.

## Metrics
| Metric | Before (B) | After | Δ |
|---|---:|---:|---:|
| Bytes | 44382 | 45190 | +808 (+1.8%) |
| Font weight requests | 8 | 7 | −1 (−12.5%) |
| Unique weights | 5 | 5 | 0 |
| `https://` refs | 3 | 3 | 0 |
| Motion decls | 9 | 9 | 0 |

## Caveats
- Source grew from IO helper + containment CSS; runtime CPU when scrolled past hero should improve.
- Motion declaration count unchanged (animations paused, not removed).
- Interactions and copy preserved. A–E untouched.