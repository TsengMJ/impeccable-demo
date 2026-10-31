# Version B Report — 山間製茶 (Impeccable polish)

**Command:** `$impeccable polish experiments/tea/b/index.html`  
**Skill:** `.agents/skills/impeccable` (pinned) · polish playbook + craft-floor  
**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Scope:** only `experiments/tea/b/` (A frozen; other cases untouched)  
**Context:** `impeccable context --target experiments/tea/b/index.html` → incumbent refinement allowed (no PRODUCT.md / DESIGN.md); subagent brief substituted for interview probe.

## What changed (top)

1. **Hero cup on narrow screens** — Dual SVG cup groups: wide keeps right-side placement; ≤720px shows a centered, higher cup so `xMidYMid slice` no longer crops it off-frame. Soft bottom scrim lifts type over ridges without burying the cup.
2. **Sticky header at 360** — Shorter label「選方案」under 420px (full「選擇這一季的茶」kept via `aria-label`), tighter but less cramped brand/CTA spacing.
3. **Hierarchy / readability** — Removed banned hero kicker; brand leads; mist scrim + measure tweaks; darker amber/leaf tokens for AA contrast on demo labels and step numbers; tabular nums on brew/plan figures; themed `::selection`.
4. **Brand world preserved** — Cool mountain mist (sage/forest + amber), Noto Serif/Sans TC, Chinese-first; no cream + English italic serif redesign.

## Interactions preserved

Plan quarterly/annual toggle · brew tea tabs (click + ArrowLeft/Right) · preview modal (open / Escape / focus return) · FAQ `<details>` · `prefers-reduced-motion` steam/transition kill.

## Build

```text
npm run build  →  success (vite 8.3.5)
dist/experiments/tea/b/index.html
```

## Detector

One pass → `docs/evidence/tea/b-polish-detector.json` (exit 2 = findings present).

| Finding | Action |
|--------|--------|
| Low contrast `#b86a2e` / `#5d8f6a` | Fixed after scan → `--tea-amber: #9a5520`, `--tea-leaf: #3f6b4c` (no second detector run per polish rule) |
| Cramped padding on full-bleed sections / brew chrome | Intentional: `.shell` provides horizontal inset; brew-body already padded — documented exception |
| Shape-assembled hero SVG (advisory) | Kept: original brand illustration, not clip-art replacement |

## Checks performed

| Check | Result |
|-------|--------|
| Playwright 1440×900 / 390×844 / 360×800 | Pass; `_checks/*-hero.png`, `*-full.png` |
| Horizontal overflow @ 360 | None |
| Plan → annual `NT$3,600` | Pass |
| Brew → 紅玉 `90°C` | Pass |
| Brew tab ArrowRight | Pass (`aria-selected` on 紅玉) |
| Preview + Escape | Pass |
| 200% zoom hero | Captured `_checks/zoom200-hero.png` |
| `prefers-reduced-motion` | CSS present (not separately automated) |
| Automated WCAG beyond detector | Not run |

## Remaining issues

1. Google Fonts network dependency; offline falls back to Songti/PingFang stacks.
2. Hero remains authored SVG (detector advisory); no photo asset in brief.
3. Detector JSON reflects pre-token-fix scan; contrast tokens updated afterward without a second pass.
4. No PRODUCT.md / DESIGN.md yet — `/impeccable init` offered as follow-up for the lab harness.
5. `_checks/` are validation artifacts only.

## Files touched

- `experiments/tea/b/index.html`
- `experiments/tea/b/styles.css`
- `experiments/tea/b/script.js` — unchanged behavior
- `docs/evidence/tea/b-polish-detector.json`
- `docs/evidence/tea/B-REPORT.md` (this file)
- `experiments/tea/b/_checks/*` (refresh)
