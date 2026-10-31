# Optimize before → after (all 5 cases)

Private `_optimize/` copies from frozen **B**. Not registered as a public A–E variant.

**Font weight requests** = count of weight entries in Google Fonts CSS URLs (family×weight slots).  
**Motion** = `@keyframes` + `animation:` + `transition:` decls in html+css.  
**Bytes** = local html+css+js only (exclude `_checks`). Source bytes often rise slightly from containment/IO helpers; the intended wins are fewer font files and lower runtime work.

| Case | Bytes before→after | Bytes Δ | Font weight reqs | Font Δ | `https://` refs | Motion decls |
|---|---:|---:|---:|---:|---:|---:|
| lumina | 11810 → 11953 | +143 (+1.2%) | 8 → 6 | −2 (−25%) | 3 → 3 | 2 → 2 |
| lumina-classic | 13621 → 13782 | +161 (+1.2%) | 5 → 4 | −1 (−20%) | 3 → 3 | 2 → 2 |
| wallet | 44382 → 45190 | +808 (+1.8%) | 8 → 7 | −1 (−12.5%) | 3 → 3 | 9 → 9 |
| tea | 37344 → 37975 | +631 (+1.7%) | 5 → 4 | −1 (−20%) | 3 → 3 | 4 → 4 |
| festival | 34942 → 35576 | +634 (+1.8%) | 7 → 6 | −1 (−14.3%) | 3 → 3 | 13 → 13 |

## Shared treatments
- Fewer unused Google Font weights; non-blocking font CSS (`media=print` + onload) with `display=swap`.
- `content-visibility: auto` on below-fold sections (interactive regions kept visible where needed).
- Wallet / tea / festival: pause infinite hero animations when off-screen (IntersectionObserver).
- Wallet: cache reduced-motion MQ; festival: cheaper focusable filter (no style recalc thrash).

## Artifacts
- Per case: `docs/evidence/<key>/optimize-prompt.txt`, `OPTIMIZE-REPORT.md`
- Aggregate: `optimize-before.json`, `optimize-after.json`, `optimize-diff.json`
- Working trees: `demos/*/ _optimize/`, `experiments/*/ _optimize/` (Vite ignores `_optimize`)
