# OFFGRID 离线声场 — Version B (Impeccable polish)

**Path:** `experiments/festival/b/`  
**Command:** `$impeccable polish experiments/festival/b/index.html`  
**Brief facts:** `docs/prompts/festival.md` (unchanged)  
**A frozen at:** `experiments/festival/a/` (not modified)  
**Prompt log:** `docs/evidence/festival/b-polish-prompt.txt`  
**Detector:** `docs/evidence/festival/b-polish-detector.json`

Substitution note: ran as a polish subagent with the fixed festival brief; no interactive decision probe.

## Scope

Refinement only on B. Preserved signal-poster world (paper / ink / acid lime / noise magenta / cyan focus, Syne + Noto Sans TC + IBM Plex Mono, geometric hero plane). Did not flatten into a generic template.

## Top changes

1. **Ticket modal keyboard / focus trap** — panel is the dialog focus root (`tabindex="-1"`); Tab cycles only panel controls; Escape closes; background gets `inert` while open; focus restores to opener; backdrop no longer focusable.
2. **Info hierarchy** — hero facts block now surfaces 日期 → 场地 → 票价 (早鸟售完／一般／双人) before CTAs; brand lockup remains the primary poster signal.
3. **Mobile schedule** — ≤560px uses a 时间｜舞台 grid with visible field labels plus artist row; stage still named in text, not color-only.
4. **Reduced-motion integrity** — hero rise-in / plane spin / diamond pulse off; static transforms kept so geometry stays; control transitions zeroed; smooth scroll → `auto`.
5. **Craft cleanup** — removed section eyebrows and Ticket A/B/C kickers; brand tracking capped at `-0.04em`; `离线声场` min size; paper-safe `--noise-text` for brand contrast; themed `::selection`.

## Facts preserved

Fiction banner; 2027.05.22 14:00–22:00; 声场仓库; SIGNAL/NOISE lineup + times; ticket prices; early-bird disabled; FAQ answers; no scroll-jack / autoplay / flash; no scarcity counters.

## Motion & `prefers-reduced-motion`

| Motion | Default | Reduced |
| --- | --- | --- |
| Hero rise-in | cascade ease-out | off; content visible |
| Plane square rotate | 28s linear | off; `rotate(18deg)` static |
| Diamond pulse | scale/rotate | off; rest pose static |
| Button / filter / qty hover | color + optional lift | transition none; no lift |
| Smooth scroll | on | `auto` |

## Detector

`impeccable detect --json` on B HTML/CSS/JS → `docs/evidence/festival/b-polish-detector.json` (exit 2 = findings present).

Cleared during polish: undersized `离线声场`, low-contrast brand magenta on hero paper.

**Remaining (intentional / poster world):**

- `cream-palette` — committed paper ground from A
- `repeating-stripes-gradient` — hero plane signal texture
- `cramped-padding` on full-bleed banner / section rule borders — poster edge language, content still inset via `.wrap` / banner padding

## Build

```text
npm run build  →  success (vite 8.3.5)
dist/experiments/festival/b/index.html
```

## Remaining issues

1. Detector still flags cream paper + stripe plane + section rule edges; keeping them to preserve the bold poster world.
2. Google Fonts need network; offline falls back with different metrics.
3. Opening one artist does not auto-close others (unchanged accordion-free behavior).
4. No dedicated print stylesheet.
5. Offer `/impeccable init` afterward — no PRODUCT.md / DESIGN.md in this harness project.
