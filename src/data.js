import luminaPrompt from '../docs/prompts/lumina.md?raw';
import classicPrompt from '../docs/prompts/lumina-classic.md?raw';
import walletPrompt from '../docs/prompts/wallet.md?raw';
import teaPrompt from '../docs/prompts/tea.md?raw';
import festivalPrompt from '../docs/prompts/festival.md?raw';
import { cases as routes } from '../scripts/cases.mjs';

export const source = { repository: 'https://github.com/pbakaus/impeccable', commit: '2f97a85a4a87a80066a693bd3546b092bd300772', skillVersion: '4.8.0', engineVersion: '0.1.18' };
export const entries = [
  { key: 'lumina', kind: 'official', title: 'Lumina', subtitle: '官方主版本', type: 'SaaS · 排版與細節',
    description: '暖色、襯線字與置中 Hero。用 polish 觀察：保留原有風格時，精修能走多遠？',
    command: 'polish', raw: luminaPrompt,
    checks: ['是否保留原本的視覺身份與所有文案？', 'Hero、CTA 與功能區的層級是否更清楚？', '390px 手機版的導覽和文字能否完整使用？'],
    note: '官方起始範例；這不是本次 skill 生成結果。原始生成 Prompt 未公開。' },
  { key: 'lumina-classic', kind: 'official', title: 'Lumina Classic', subtitle: '官方 classic 版本', type: 'SaaS · 刪減與聚焦',
    description: '深色、霓虹漸層與發光按鈕。用 distill 測試：減少裝飾後，還剩下多少辨識度？',
    command: 'distill', raw: classicPrompt,
    checks: ['是否真的刪除視覺噪音，而非只更換顏色？', '有沒有誤刪核心文案或 CTA？', '簡化後的內容順序和手機閱讀是否合理？'],
    note: '官方起始範例；主版本與 classic 不是一組 Before／After。' },
  { key: 'wallet', kind: 'brief', title: 'AEGIS', subtitle: 'Web3 Agentic Wallet', type: '複雜產品 · 信任設計',
    description: '讓 Agent 執行任務，讓人保有控制權。用可操作的權限演示解釋抽象產品。',
    command: 'build', raw: walletPrompt,
    checks: ['10 秒內看懂 Agent 可以做什麼、不能做什麼？', '上限、操作類型、撤銷是否真正影響模擬結果？', '能否避免收益承諾、假審計標章與金融模板？'],
    note: '僅需求 Brief 已完成，Landing Page 尚未生成。無真實錢包或交易。' },
  { key: 'tea', kind: 'brief', title: '山間製茶', subtitle: '台灣精品茶訂閱', type: '品牌敘事 · 感官表達',
    description: '把一座山，留給一杯茶。測試中文敘事、實物感與訂閱資訊能否同時成立。',
    command: 'build', raw: teaPrompt,
    checks: ['不看名稱，還能辨識出這是台灣茶品牌嗎？', '季付、年付與取消規則是否清楚且互動一致？', '是否依賴英文大字或米色模板掩蓋中文排版問題？'],
    note: '僅需求 Brief 已完成，Landing Page 尚未生成。商品與售價均為測試設定。' },
  { key: 'festival', kind: 'brief', title: 'OFFGRID', subtitle: '離線聲場・實驗音樂祭', type: '視覺表現 · 資訊密度',
    description: '把訊號關掉，把感官打開。挑戰海報式構圖、繁中混排和真正可讀的時刻表。',
    command: 'build', raw: festivalPrompt,
    checks: ['視覺夠強烈時，日期、地點、票價是否仍一眼可見？', '舞台篩選、長名稱與票券總價是否正確？', '窄螢幕與減少動態模式是否仍保有完整設計？'],
    note: '僅需求 Brief 已完成，Landing Page 尚未生成。這是虛構活動。' },
].map(entry => ({ ...entry, ...routes[entry.key] }));
