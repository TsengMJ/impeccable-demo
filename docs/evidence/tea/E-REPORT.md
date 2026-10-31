# 山間製茶 Version E — Impeccable animate report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `experiments/tea/e/` (independent fork from polished B)  
**Command used:** `$impeccable animate experiments/tea/e/index.html`  
**Prompt log:** `docs/evidence/tea/e-animate-prompt.txt`  
**Detector:** `docs/evidence/tea/e-animate-detector.json`  
**Substitution note:** ran as animate subagent with fixed brief; no interactive decision probe.

## Motion thesis

**Mist lifts; the cup holds the mountain’s breath.** Hero vista desaturates-clear, mist band settles into place, steam lines arrive then keep rising. Brand + tagline soft-focus settle. Brew panel briefly softens on tea-tab change as feedback.

## Reduced-motion behavior

| Motion | Default | `prefers-reduced-motion: reduce` |
| --- | --- | --- |
| Vista clear / mist lift / brand settle | one-shot hero entrance | off; full opacity, no blur |
| Steam rise | infinite | static mid opacity |
| Brew panel swap | opacity/blur pulse | no swap effect |
| Smooth scroll | on | `auto` |

No scroll-jacking, flashing, or autoplay audio.

## Procedure

1. Read `reference/animate.md` + `reference/craft-floor.md`
2. Edited `index.html` / `styles.css` / `script.js` under `e/` only
3. Detector → `e-animate-detector.json`
4. `npm run build` (pass)

## Detector summary

6× `cramped-padding` warnings (section / brew-panel flush edges — pre-existing shell layout) + 1 advisory `shape-assembled-illustration` (hero SVG world). Animate did not redesign section padding.

## Known issues

1. Cramped-padding hits match B’s full-bleed hero/section shell pattern; content still inset via `.shell`.
2. Hero cup SVG transform attributes mean cup motion is opacity/steam-based only (CSS transform would override placement).
3. Viewport screenshots not re-captured in this run.
