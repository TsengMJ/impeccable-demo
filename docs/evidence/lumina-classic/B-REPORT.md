# Lumina Classic Version B — Impeccable polish report

**Workspace:** `/Users/tsengmingchun/Documents/LAB/impeccable`  
**Target:** `demos/lumina-classic/b/index.html` (skill treatment of frozen A)  
**Command used:** `$impeccable polish demos/lumina-classic/b/index.html`  
**Model note:** Cursor Task subagent inherit + impeccable polish  
**Extra prompts:** none beyond the polish task brief  
**Manual fixes:** none beyond polish pass edits  

Substitution note: ran as a polish subagent with the fixed classic brief; no interactive decision probe. Did not copy from `docs/evidence/lumina-classic/legacy-distill-from-A/`.

## Procedure followed

1. Read `reference/polish.md` and `reference/craft-floor.md`
2. Ran `impeccable context --target demos/lumina-classic/b/index.html`
3. Inspected frozen B copy (byte-identical to A / baseline) — preserved dark neon classic identity
4. Polished hierarchy, mobile overflow, focus, reduced-motion, craft-floor issues in place
5. Ran detector once (after final contrast/icon tweaks) → `docs/evidence/lumina-classic/b-polish-detector.json`
6. Attempted `npm run build` (fails on current uncommitted `vite.config.js` empty-input bug); verified production build with a corrected in-memory collector (same page set) — emits `dist/demos/lumina-classic/b/index.html`

## Changes (refinement, not redesign)

### Hierarchy / craft-floor

- Removed hero eyebrow chip (`🚀 Powered by AI`) — craft-floor ban; “Powered by AI” remains in the lede / footer
- Replaced emoji icon tiles (⚡🔒📈) and logo sparkle with inline SVG marks beside headings
- Softened feature cards to left-aligned content, 16px radius, side-by-side icon + title
- CTA / pill gradients darkened (`#6d28d9` → `#9d174d`) so white label contrast clears WCAG AA
- CTA / pill elevation moved to offset neutral shadows (kept purple/pink fills for neon world)
- Themed browser surfaces: `::selection`, `caret-color`, underline offset, violet focus rings

### Responsive / a11y / interaction

- Sticky-nav `scroll-padding-top`; nav wraps under brand ≤960px (links stay visible)
- Feature grid → single column on mid/narrow; CTAs stack full-width ≤560px
- Hero glow orbs use `min(..., vw)` to avoid horizontal overflow
- Touch-friendlier control heights (~44–48px)
- `prefers-reduced-motion`: collapse transitions; disable hover lifts; `scroll-behavior: auto`
- Muted text moved to solid `#b7b4c8` (tinted from the purple world, not gray-on-dark)

### Preserved from A

- Brand name Lumina; all body / feature / trust / footer copy
- All `#` demo links and CTA labels (`Join the waitlist`, `Watch demo`, `Get early access`, `Get started`, `Sign in`)
- Six customer names; dark neon purple/pink/cyan atmosphere; Inter face; gradient display type

## Checks

| Check | Result |
| --- | --- |
| `npm run build` | **Fail** — uncommitted recursive `vite.config.js` builds `./demos/...` paths that fail the `demos/` filter → empty `input` / Rolldown `INVALID_OPTION` |
| Corrected collector build | **Pass** (vite 8.3.5); emits `dist/demos/lumina-classic/b/index.html` |
| Detector | See summary; saved to `b-polish-detector.json` |
| A / baseline hash | Unchanged `6f4b4217e2bfde02f4e82cdd21343566d496ca63` |
| Viewport screenshots | Not captured in this subagent run |
| Keyboard / reduced-motion | Implemented in CSS; not device-tested |

## Detector summary

Command:

```bash
.agents/skills/impeccable/scripts/impeccable detect --json \
  demos/lumina-classic/b/index.html
```

Findings after polish (exit 2 = findings present):

| Severity | Antipattern | Notes |
| --- | --- | --- |
| warning | `gradient-text` (×5) | Incumbent neon classic display / logo treatment — kept intentionally |
| warning | `overused-font` (Inter) | Frozen classic typeface — kept for A→B continuity |

Cleared in this pass vs first detector run: `low-contrast` on pink CTAs, `dark-glow` CTA/icon halos, `icon-tile-stack` on feature cards. No `hero-eyebrow-chip`.

## Known issues / limits

1. `npm run build` remains broken until harness `vite.config.js` path collection is fixed (out of polish scope).
2. Gradient display type + Inter remain detector warnings by design (classic world continuity).
3. Google Fonts still need network on first load; system fallbacks declared.
4. Official `#` links are demo placeholders — unchanged.
5. Offer `/impeccable init` afterward — no PRODUCT.md / DESIGN.md in this harness project.

## Files touched

- `demos/lumina-classic/b/index.html`
- `docs/evidence/lumina-classic/b-polish-detector.json`
- `docs/evidence/lumina-classic/B-REPORT.md` (this file)
- `dist/` via corrected collector build (harness output; A source untouched)

**Not modified:** `demos/lumina-classic/a/`, `public/baselines/`, `docs/evidence/lumina-classic/legacy-distill-from-A/`, or other cases.
