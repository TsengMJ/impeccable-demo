# OFFGRID 离线声场 — Version A (no-skill control)

**Path:** `/Users/tsengmingchun/Documents/LAB/impeccable-control-festival/experiments/festival/`  
**Model:** Cursor Task subagent inherit  
**Brief:** `prompt-a.txt` only  
**Isolation check:** no `AGENTS.md`, no `.agents/`, no `.codex/`, no `.claude/` in control dir.

## Visual decisions

- **Direction:** Print / signal-poster — paper ground `#f2f0e8`, ink black, acid lime `#d6ff3a`, noise magenta `#ff3b6b`, cyan focus `#1fd6ff`. High saturation accents; asymmetric hero (copy left, geometric plane right).
- **Type:** Syne (Latin display) + Noto Sans TC (body / CJK) + IBM Plex Mono (meta). Large OFFGRID lockup with 离线声场 secondary; claim as second hierarchy.
- **Info first:** Top fiction banner; hero carries date, venue, primary CTA「查看票种」and secondary「探索阵容」before deeper sections.
- **Stage encoding:** Text labels SIGNAL / NOISE plus color chips — not color-only. Schedule rows also include「SIGNAL 舞台／NOISE 舞台」hint text.
- **No cards-as-decoration:** Lineup / tickets / FAQ use hard ink borders as poster blocks, not soft UI cards. No scarcity counters.
- **Assets:** No photos or AI images. Hero plane is pure CSS geometry (gradients, rotated square, diamond). Fonts from Google Fonts.

## Motion & `prefers-reduced-motion`

| Motion | Default | Reduced |
| --- | --- | --- |
| Hero rise-in on copy blocks | `rise-in` cascade | disabled |
| Plane square rotate | `spin-slow` 28s | disabled |
| Diamond pulse | `pulse-soft` | disabled |
| Button hover lift | `translateY(-2px)` | transform none |
| Smooth scroll | `scroll-behavior: smooth` | `auto` |

Composition (brand, claim, meta, CTAs, geometric plane) remains fully present when animation is off. No scroll-jacking, no autoplay audio, no flashing.

## Interactions implemented

- Artist expand / collapse bios (`aria-expanded`)
- Schedule filter 全部／SIGNAL／NOISE (`aria-pressed`, chronological order preserved)
- Ticket modal: name, unit price, qty 1–4, live total; early-bird `disabled`
- Disclaimer「这是设计测试，不会产生订单。」
- Escape / backdrop / close button; basic focus trap while modal open; skip link

## Extra prompts / assets

- None beyond `prompt-a.txt`.
- External: Google Fonts CSS for Syne / Noto Sans TC / IBM Plex Mono.

## Build

```text
npm run build  →  success (vite 8.3.5)
dist/experiments/festival/index.html
dist/assets/index-D-qMXJG4.css
dist/assets/index-D7USIvnq.js
```

Script marked `type="module"` so Vite bundles `app.js` into production assets.

## Checks

| Check | Result |
| --- | --- |
| Fiction label visible | pass |
| Claim / date / venue / CTAs | pass |
| 6 artists + 6 schedule slots | pass |
| SIGNAL filter → 3 visible slots | pass |
| Early bird disabled | pass |
| Bio expand + ticket modal + Escape | pass |
| Viewport 1440×900 / 390×844 / 360×800 (Playwright) | no page errors; names not horizontally clipped |
| Zoom 200% (CSS zoom smoke) | page still interactive |
| `npm run build` | pass, no script-bundle warning after module fix |

Manual contrast / focus reviewed against ink-on-paper and `:focus-visible` cyan outline; not audited with an automated WCAG tool.

## Remaining issues / notes

1. Modal focus trap is Tab-cycle only; does not restore scroll position nuances beyond `overflow: hidden` on `body`.
2. Opening one artist does not auto-close others (intentional accordion-free expand).
3. Google Fonts require network on first load; system fallbacks exist but display scale differs offline.
4. Automated checks used CSS `zoom: 2`, not browser native 200% zoom UI — native zoom may reflow slightly differently.
5. No dedicated print stylesheet.
