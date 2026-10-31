# OFFGRID 離線聲場 Version E — Impeccable animate report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `experiments/festival/e/` (independent fork from polished B)  
**Command used:** `$impeccable animate experiments/festival/e/index.html`  
**Prompt log:** `docs/evidence/festival/e-animate-prompt.txt`  
**Detector:** `docs/evidence/festival/e-animate-detector.json`  
**Substitution note:** ran as animate subagent with fixed brief; no interactive decision probe.

## Motion thesis

**Going offline — SIGNAL and NOISE fall out of sync.** Brand lockup cuts in via horizontal clip wipe; claim soft-drops into focus. Hero plane SIGNAL square orbits one way while the NOISE diamond counter-drifts on a different period. Artist bios expand with grid-row continuity; filter press scales briefly.

## Reduced-motion behavior

| Motion | Default | `prefers-reduced-motion: reduce` |
| --- | --- | --- |
| Brand / claim / facts / date cut-in | authored entrance | off; final static composition |
| SIGNAL orbit / NOISE drift | continuous counter-phase | off; rest poses kept |
| Artist bio open | grid-template-rows + opacity | instant (transitions zeroed) |
| Filter / button feedback | short | none |
| Smooth scroll | on | `auto` |

No scroll-jacking, flashing, or autoplay audio.

## Procedure

1. Read `reference/animate.md` + `reference/craft-floor.md`
2. Edited `styles.css` under `e/` (HTML/JS structure preserved; bio already wrapped in `<p>`)
3. Detector → `e-animate-detector.json`
4. `npm run build` (pass)

## Detector summary

5× `cramped-padding` (banner / section edge language from poster world), 1× `cream-palette` (committed paper ground), 1 advisory `repeating-stripes-gradient` (hero plane texture). Matches B intentional exceptions.

## Known issues

1. Poster edge / stripe findings retained as visual-world continuity from A→B.
2. Continuous plane animations are intentionally gentle; still disabled entirely under reduced motion.
3. Viewport screenshots not re-captured in this run.
