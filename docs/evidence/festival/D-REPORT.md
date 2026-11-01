# OFFGRID Version D — Impeccable distill report

**Target:** `experiments/festival/d/` (copy of polished B, then distill)  
**Command:** `$impeccable distill experiments/festival/d/index.html`  
**Brief:** `docs/prompts/festival.md`  
**Prompt log:** `docs/evidence/festival/d-distill-prompt.txt`  
**Detector:** `docs/evidence/festival/d-distill-detector.json`  
**Scope:** only `experiments/festival/d/` — a/b/c/e untouched

Substitution note: ran as distill subagent with fixed festival brief; no interactive decision probe.

## Removed

- Hero decorative plane (striped field, spinning square, diamond pulse, date mark collage)
- Dual-column hero scaffold → single information column
- Section ledes that restated controls already visible (阵容 / 时刻表 / 票种)
- Ticket card lime wash + sold-ticket stripe pattern
- Footer restating the claim already in the hero
- Rise-in cascade tied to the denser hero composition

## Preserved

- Fiction banner「虚构活动・设计测试」
- Brand **OFFGRID / 离线声场**, claim「把讯号关掉，把感官打开。」
- Hero facts: 2027.05.22 14:00–22:00, 声场仓库, ticket prices
- CTAs 查看票种 / 探索阵容
- Six artists on SIGNAL/NOISE with expand intros; schedule filter 全部／SIGNAL／NOISE
- Tickets: early sold-out disabled, general/duo preview modal with qty 1–4 + total + disclaimer
- FAQ (age / food / accessibility); keyboard modal trap; `prefers-reduced-motion`
- Poster type stack (Syne + Noto Sans TC + IBM Plex Mono) and ink/paper tokens

## Detector

| Finding | Notes |
| --- | --- |
| `cream-palette` | Committed paper ground from A/B world |
| `cramped-padding` | Banner / section edge language; content inset via `.wrap` |

`repeating-stripes-gradient` from B cleared with hero plane + sold-ticket stripe removal.

## Known issues

1. Cream + cramped-padding remain intentional for the paper poster system.
2. No viewport screenshots in this distill run.
3. Google Fonts network dependency unchanged.
4. Offer `/impeccable init` afterward.
