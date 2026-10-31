# Lumina Classic Version E — Impeccable animate report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `demos/lumina-classic/e/` (forked from polished B; motion only)  
**Command:** `$impeccable animate demos/lumina-classic/e/index.html`  
**Prompt log:** `docs/evidence/lumina-classic/e-animate-prompt.txt`  
**Detector:** `docs/evidence/lumina-classic/e-animate-detector.json`

Substitution note: ran as an animate subagent with the fixed classic brief; no interactive decision probe.

## Motion thesis

**Neon ignition** — violet/cyan orbs and the hero gradient come online as Lumina powers up; supporting feedback is a one-shot CTA pulse and capped icon stroke reveals.

## Top motion moves

1. **Focal:** hero orbs ignite (scale/opacity) + headline neon sweep (gradient position / brightness).
2. **Brand spark:** logo drop-shadow neon flash once on load.
3. **Feedback / list:** primary CTA ring pulse once; feature icon strokes draw with ≤0.5s stagger.

All authored sequences gated under `prefers-reduced-motion: no-preference`. Default CSS keeps content visible; reduced-motion path settles to static final states (orbs on, strokes complete, no transforms).

## Preserved

Layout, copy, links, colors, Inter, and polished B structure — motion only. `a/` / `b/` untouched.

## Detector

| Finding | Notes |
|--------|--------|
| `gradient-text` ×5 | Incumbent neon classic — kept |
| `overused-font` Inter | Classic continuity |

## Remaining issues

1. Icon stroke-draw runs on load (not scroll-linked); acceptable for this short landing.
2. Google Fonts network dependency.
3. Offer `/impeccable init` — no PRODUCT.md / DESIGN.md.
