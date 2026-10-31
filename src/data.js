import luminaPrompt from '../docs/prompts/lumina.md?raw';
import classicPrompt from '../docs/prompts/lumina-classic.md?raw';
import walletPrompt from '../docs/prompts/wallet.md?raw';
import teaPrompt from '../docs/prompts/tea.md?raw';
import festivalPrompt from '../docs/prompts/festival.md?raw';
import { cases as routes } from '../scripts/cases.mjs';

export const source = { repository: 'https://github.com/pbakaus/impeccable', commit: '2f97a85a4a87a80066a693bd3546b092bd300772', skillVersion: '4.8.0', engineVersion: '0.1.18' };

const matrixNote = '矩陣：A 原圖 → B polish；C／D／E 各自從 B 分叉（bolder／distill／animate）。optimize 只寫證據、不上架。詳見 docs/evidence/VARIANT-MATRIX.md。';

export const entries = [
  { key: 'lumina', kind: 'official', title: 'Lumina', subtitle: '官方主版本', type: 'SaaS · A–E 矩陣',
    description: '暖色、襯線字與置中 Hero。比較 A 原圖與 B polish，以及從 B 分出的 bolder／distill／animate。',
    command: 'polish', raw: luminaPrompt,
    checks: ['A 是否仍對齊凍結 baseline？', 'B polish 是否保留文案與品牌？', 'C／D／E 是否各自可辨、且未覆寫 B？'],
    note: `官方 A 對齊 public/baselines/lumina。${matrixNote}` },
  { key: 'lumina-classic', kind: 'official', title: 'Lumina Classic', subtitle: '官方 classic 版本', type: 'SaaS · A–E 矩陣',
    description: '深色霓虹起點。B 改為對 A 的 polish；舊的「直接 distill A」另存為證據，不佔 D 位。',
    command: 'polish', raw: classicPrompt,
    checks: ['B 是否為 polish 而非舊 distill？', 'D distill 是否從 B 分叉？', 'C／E 是否保留經典識別？'],
    note: `官方 A 對齊 public/baselines/lumina-classic。舊 distill-from-A 在 docs/evidence/lumina-classic/legacy-distill-from-A/。${matrixNote}` },
  { key: 'wallet', kind: 'brief', title: 'AEGIS', subtitle: 'Web3 Agentic Wallet', type: '複雜產品 · A–E 矩陣',
    description: '授權與控制。A 無 skill；B polish；再從 B 測 bolder／distill／animate。',
    command: 'polish', raw: walletPrompt,
    checks: ['10 秒內看懂 Agent 權限邊界？', 'C／D／E 互動規則是否仍正確？', '有無假審計或收益承諾？'],
    note: `無真實錢包。${matrixNote}` },
  { key: 'tea', kind: 'brief', title: '山間製茶', subtitle: '台灣精品茶訂閱', type: '品牌敘事 · A–E 矩陣',
    description: '中文茶訂閱。A 無 skill；B polish；C／D／E 從 B 分叉。',
    command: 'polish', raw: teaPrompt,
    checks: ['仍像台灣茶品牌？', '方案價格互動在各變體是否一致？', 'D 是否過度刪掉必要資訊？'],
    note: `示範商品。${matrixNote}` },
  { key: 'festival', kind: 'brief', title: 'OFFGRID', subtitle: '離線聲場・實驗音樂祭', type: '視覺表現 · A–E 矩陣',
    description: '海報式資訊密度。A 無 skill；B polish；C／D／E 從 B 分叉。',
    command: 'polish', raw: festivalPrompt,
    checks: ['日期場地票價是否仍一眼可見？', 'E 動效是否尊重 reduced-motion？', 'D 是否誤刪時刻表可用性？'],
    note: `虛構活動。${matrixNote}` },
].map(entry => ({ ...entry, ...routes[entry.key] }));
