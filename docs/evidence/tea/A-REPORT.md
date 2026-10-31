# Version A Report — 山間製茶 (no-skill control)

**Model:** Cursor Task subagent inherit  
**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable-control-tea/`  
**Entry:** `/experiments/tea/`  
**Isolation verified:** no `AGENTS.md`, no `.agents/`, no `.codex/`, no `.claude/` in control dir; no Impeccable skill/playbook loaded for this run.

## Visual decisions

- **Direction:** Cool mountain mist — sage/forest greens (`#e8efe6` fog, `#1f4a3a` ridge) with amber tea accent (`#b86a2e`). Intentionally not cream paper + English italic serif + terracotta.
- **Typography:** Google Fonts **Noto Serif TC** for brand/headlines; **Noto Sans TC** for UI/body. Chinese-first hierarchy; English only as light assist (none in hero tagline).
- **Hero:** Full-bleed SVG of layered ridges + tea cup with steam (CSS animation, disabled under `prefers-reduced-motion`). Brand name as hero signal; core line「把一座山，留給一杯茶。」; CTAs link to `#plans` / `#brew`.
- **Teas:** Inline SVG tin/liquor illustrations (green for 烏龍, russet for 紅玉) — no empty image frames, no invented farmers/awards/altitude.
- **Layout:** Section rhythm (teas → steps → brew → plans → FAQ); sticky header; single plan card with quarterly/annual toggle rather than SaaS feature-card grid.
- **Motion:** Steam rise on hero cup; transitions on buttons/tabs; reduced-motion kills animations/transitions.

## Asset sources

| Asset | Origin |
|-------|--------|
| Hero mountain + cup SVG | Hand-authored inline SVG in `experiments/tea/index.html` (original) |
| Tea swatch SVGs (烏龍／紅玉) | Hand-authored inline SVG in `experiments/tea/index.html` (original) |
| Noto Serif TC / Noto Sans TC | Google Fonts CDN (`fonts.googleapis.com` / `fonts.gstatic.com`) |
| Photos / stock / AI images | None used |

No external brand photography. No AI image prompts.

## Extra prompts

None beyond `prompt-a.txt`.

## Build

```text
npm run build  →  success (vite 8.3.5)
dist/experiments/tea/index.html
dist/assets/index-*.css
dist/assets/index-*.js
```

`package.json` unchanged.

## Checks performed

| Check | Result |
|-------|--------|
| Isolation (no AGENTS/.agents/.codex/.claude) | Pass |
| `npm run build` | Pass (clean after `type="module"` on script) |
| Playwright load @ 1440×900, 390×844, 360×800 | Pass; screenshots in `experiments/tea/_checks/` |
| Horizontal overflow @ 360 | None (`scrollWidth === clientWidth`) |
| Plan toggle → price/ships/summary | Pass (`NT$3,600`／年; 4 shipments copy) |
| Brew toggle 烏龍→紅玉 | Pass (`90°C`, `45 秒`) |
| Brew tab ArrowRight keyboard | Pass (`aria-selected` on 紅玉) |
| Preview modal open + Escape close | Pass; copy states no payment |
| FAQ accordion open | Pass |
| Console/page errors on load | None observed |
| `prefers-reduced-motion` | CSS rules present (not separately automated) |
| 200% zoom screenshot | Captured to `_checks/zoom200-hero.png` (manual visual only) |
| Automated WCAG contrast audit | **Not run** |

## Known issues / remaining bugs

1. Hero cup sits on the right of a 1440-wide SVG; on narrow viewports it is often cropped — mountains remain the visible anchor.
2. Fonts depend on Google Fonts network; offline falls back to system Songti/PingFang stacks.
3. Mobile sticky header CTA + brand can feel tight at 360px (no overflow, but limited nav — desktop nav hidden below 880px by design).
4. No automated color-contrast or screen-reader audit beyond keyboard focus/ARIA on tabs/modal.
5. `_checks/` screenshots are local validation artifacts only, not part of the product UI.

## Files delivered

- `experiments/tea/index.html`
- `experiments/tea/styles.css`
- `experiments/tea/script.js`
- `A-REPORT.md` (this file)
- `experiments/tea/_checks/*` (viewport/interaction evidence)
