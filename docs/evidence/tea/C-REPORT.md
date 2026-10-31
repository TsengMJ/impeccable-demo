# 山間製茶 Version C — Impeccable bolder report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `experiments/tea/c/` (copied from polished B; amplify only)  
**Command:** `$impeccable bolder experiments/tea/c/index.html`  
**Prompt log:** `docs/evidence/tea/c-bolder-prompt.txt`  
**Detector:** `docs/evidence/tea/c-bolder-detector.json`

Substitution note: ran as a bolder subagent with the fixed brief; no interactive decision probe.

## Top 3 amplifications

1. **Brand + tagline conviction** — Serif hero brand up to ~`5.5rem` with wider tracking; tagline larger and ridge-green, tighter measure so the line holds as a peak.
2. **Mountain / terrace motif** — Stronger ridge opacity and terrace strokes in the owned SVG; lighter top scrim so ridges read; steam rise pushed.
3. **Brew + plan figure peaks** — Brew params as ridge-topped figure tiles with larger serif numbers; plan amount ridge-colored and scaled; tea names / step rules thickened in the same vocabulary.

## Preserved

All Chinese product facts, brew tabs, plan toggle, preview modal, FAQ details, demo disclaimers. No new fonts/colors. Script JS untouched. `a/` `b/` `d/` `e/` untouched.

## Detector

| Finding | Notes |
|--------|--------|
| `cramped-padding` on full-bleed sections / brew chrome | Intentional; `.shell` / brew-body still inset content |
| `shape-assembled-illustration` | Committed mountain+cup SVG world |

## Remaining issues

1. Hero remains authored SVG (no photo in brief).
2. Google Fonts network dependency.
3. `_checks/` screenshots are pre-bolder B-era captures; not refreshed in this pass.
