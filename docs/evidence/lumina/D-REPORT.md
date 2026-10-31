# Lumina Version D — Impeccable distill report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `demos/lumina/d/` (copy of polished B, then distill)  
**Command:** `$impeccable distill demos/lumina/d/index.html`  
**Prompt log:** `docs/evidence/lumina/d-distill-prompt.txt`  
**Detector:** `docs/evidence/lumina/d-distill-detector.json`  
**Scope:** only `demos/lumina/d/` — a/b/c/e untouched

Substitution note: ran as distill subagent with fixed official-demo brief; no interactive decision probe.

## Procedure

1. Read `reference/distill.md` + `reference/craft-floor.md`
2. `impeccable context --target demos/lumina/d/index.html` → incumbent refinement allowed
3. Distill from B copy: strip decorative noise; keep original product copy and `#` demo links
4. Detector once → `d-distill-detector.json`
5. Shared `npm run build` after all four D cases

## Removed

- Hero eyebrow / kicker (`AI-native workflows`) — craft-floor ban
- Logo accent dot
- Feature icon boxes and card chrome (warm fills, radii, borders as containers)
- Hero peach gradient plane; sticky nav blur
- Pill radii → 8px controls; hover translate on buttons
- Unused CSS weight variants / cream-warm token

## Preserved

- Brand **Lumina**, full original headline / lede / trust line
- Nav links (Product…Docs), Sign in, Get started
- Primary / secondary CTAs (`Start free trial`, `Watch demo`) and closing CTA
- Logo strip names; three feature titles + body copy
- Official `#` link behavior; footer credit
- Fraunces + Inter identity (incumbent official demo world)

## Detector

| Severity | Antipattern | Notes |
| --- | --- | --- |
| warning | `italic-serif-display` | Incumbent accent italic on “intelligent” |
| warning | `overused-font` | Inter / Fraunces from official demo — not redesigned in distill |
| warning | `cream-palette` | Incumbent cream paper retained |

## Known issues

1. Detector still flags cream + overused fonts; kept to preserve official demo identity.
2. No viewport screenshot capture in this distill run.
3. Offer `/impeccable init` afterward — harness has no PRODUCT.md / DESIGN.md.
