import luminaPrompt from '../docs/prompts/lumina.md?raw';
import classicPrompt from '../docs/prompts/lumina-classic.md?raw';
import walletPrompt from '../docs/prompts/wallet.md?raw';
import teaPrompt from '../docs/prompts/tea.md?raw';
import festivalPrompt from '../docs/prompts/festival.md?raw';
import { cases as routes } from '../scripts/cases.mjs';

export const source = { repository: 'https://github.com/pbakaus/impeccable', commit: '2f97a85a4a87a80066a693bd3546b092bd300772', skillVersion: '4.8.0', engineVersion: '0.1.18' };

const matrixNote = '矩阵：A 原图 → B polish；C／D／E 各自从 B 分叉（bolder／distill／animate）。optimize 只写证据、不上架。详见 docs/evidence/VARIANT-MATRIX.md。';

export const entries = [
  { key: 'lumina', kind: 'official', title: 'Lumina', subtitle: '官方主版本', type: 'SaaS · A–E 矩阵',
    description: '暖色、衬线字与置中 Hero。比较 A 原图与 B polish，以及从 B 分出的 bolder／distill／animate。',
    command: 'polish', raw: luminaPrompt,
    checks: ['A 是否仍对齐冻结 baseline？', 'B polish 是否保留文案与品牌？', 'C／D／E 是否各自可辨、且未覆写 B？'],
    note: `官方 A 对齐 public/baselines/lumina。${matrixNote}` },
  { key: 'lumina-classic', kind: 'official', title: 'Lumina Classic', subtitle: '官方 classic 版本', type: 'SaaS · A–E 矩阵',
    description: '深色霓虹起点。B 改为对 A 的 polish；旧的「直接 distill A」另存为证据，不占 D 位。',
    command: 'polish', raw: classicPrompt,
    checks: ['B 是否为 polish 而非旧 distill？', 'D distill 是否从 B 分叉？', 'C／E 是否保留经典识别？'],
    note: `官方 A 对齐 public/baselines/lumina-classic。旧 distill-from-A 在 docs/evidence/lumina-classic/legacy-distill-from-A/。${matrixNote}` },
  { key: 'wallet', kind: 'brief', title: 'AEGIS', subtitle: 'Web3 Agentic Wallet', type: '复杂产品 · A–E 矩阵',
    description: '授权与控制。A 无 skill；B polish；再从 B 测 bolder／distill／animate。',
    command: 'polish', raw: walletPrompt,
    checks: ['10 秒内看懂 Agent 权限边界？', 'C／D／E 互动规则是否仍正确？', '有无假审计或收益承诺？'],
    note: `无真实钱包。${matrixNote}` },
  { key: 'tea', kind: 'brief', title: '山间制茶', subtitle: '台湾精品茶订阅', type: '品牌叙事 · A–E 矩阵',
    description: '中文茶订阅。A 无 skill；B polish；C／D／E 从 B 分叉。',
    command: 'polish', raw: teaPrompt,
    checks: ['仍像台湾茶品牌？', '方案价格互动在各变体是否一致？', 'D 是否过度删掉必要资讯？'],
    note: `示范商品。${matrixNote}` },
  { key: 'festival', kind: 'brief', title: 'OFFGRID', subtitle: '离线声场・实验音乐祭', type: '视觉表现 · A–E 矩阵',
    description: '海报式资讯密度。A 无 skill；B polish；C／D／E 从 B 分叉。',
    command: 'polish', raw: festivalPrompt,
    checks: ['日期场地票价是否仍一眼可见？', 'E 动效是否尊重 reduced-motion？', 'D 是否误删时刻表可用性？'],
    note: `虚构活动。${matrixNote}` },
].map(entry => ({ ...entry, ...routes[entry.key] }));
