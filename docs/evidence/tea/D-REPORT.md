# 山间制茶 Version D — Impeccable distill report

**Target:** `experiments/tea/d/` (copy of polished B, then distill)  
**Command:** `$impeccable distill experiments/tea/d/index.html`  
**Brief:** `docs/prompts/tea.md`  
**Prompt log:** `docs/evidence/tea/d-distill-prompt.txt`  
**Detector:** `docs/evidence/tea/d-distill-detector.json`  
**Scope:** only `experiments/tea/d/` — a/b/c/e untouched

Substitution note: ran as distill subagent with fixed tea brief; no interactive decision probe.

## Removed

- Dual responsive cup groups + steam animation layers in hero SVG (kept simplified ridge atmosphere)
- Tea swatch illustration SVGs (decorative cups beside product text)
- Step ornamental `01/02/03` labels; steps use a plain ordered list
- Brew hint fluff (not required by brief); redundant plan summary paragraph that restated the bullet list
- Restating section ledes on steps / brew

## Preserved

- Brand **山间制茶**, core line「把一座山，留给一杯茶。」, both CTAs
- Demo disclaimer; two teas with required facts (name, 50g, flavor, origin)
- Three steps content; brew tabs with 乌龙 95°C/150ml/60s and 红玉 90°C/150ml/45s
- Plans: 季付 NT$980 / 年付 NT$3,600, shipping rules, cancel rule, 预览订阅 modal (no payment)
- FAQ (保存 / 寄送 / 取消); Chinese-first Noto serif/sans world
- Interactions in `script.js` (plan toggle, brew tabs + arrows, modal Escape/focus)

## Detector

| Finding | Notes |
| --- | --- |
| `cramped-padding` (×6) | Full-bleed hero / section shells; content still inset via `.shell` — same class of intentional exception as B |

Shape-assembled hero advisory from B cleared by simplifying the SVG.

## Known issues

1. Detector still flags full-bleed padding pattern.
2. Hero remains geometric SVG ridges (no photo asset in brief).
3. No fresh `_checks/` screenshots in this distill run.
4. Offer `/impeccable init` afterward.
