# Lumina Classic Version D — Impeccable distill report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `demos/lumina-classic/d/` (forked from polished B; strip to essence)  
**Command:** `$impeccable distill demos/lumina-classic/d/index.html`  
**Prompt log:** `docs/evidence/lumina-classic/d-distill-prompt.txt`  
**Detector:** `docs/evidence/lumina-classic/d-distill-detector.json`

Substitution note: ran as a distill subagent with the fixed classic brief; no interactive decision probe.

## Top removals / simplifications

1. **Decorative chrome out** — Dual hero orbs, glass/blur nav + cards, hover lifts, and CTA radial field removed; one quiet violet wash remains under the hero.
2. **Linear features** — Three-up glass cards → single-column rule-separated list; icons stay inline beside titles without card containers.
3. **Solid hierarchy** — Centered marketing layout → left-aligned narrow measure; gradient text reduced to logo only; pills/buttons use 8px radius; solid white headings.

## Preserved

All copy and `#` demo links; dark `#0a0a14` base; purple/pink CTA gradient + cyan icon accent; Inter; customer names; nav structure.

## Detector

| Finding | Notes |
|--------|--------|
| `gradient-text` ×2 | Logo + (residual) — down from B’s ×5; intentional neon mark |
| `overused-font` Inter | Classic continuity |

## Remaining issues

1. Distilled page is quieter by design; classic neon identity is present but no longer maximal.
2. Google Fonts network dependency.
3. Offer `/impeccable init` — no PRODUCT.md / DESIGN.md.
