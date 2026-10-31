export const cases = {
  lumina: { id: 'D01', label: 'Lumina', route: '/demos/lumina/', directory: 'demos/lumina', prompt: 'docs/prompts/lumina.md', baseline: '/baselines/lumina/index.html' },
  'lumina-classic': { id: 'D02', label: 'Lumina Classic', route: '/demos/lumina-classic/', directory: 'demos/lumina-classic', prompt: 'docs/prompts/lumina-classic.md', baseline: '/baselines/lumina-classic/index.html' },
  wallet: { id: 'W01', label: 'AEGIS', route: '/experiments/wallet/', directory: 'experiments/wallet', prompt: 'docs/prompts/wallet.md' },
  tea: { id: 'T01', label: '山間製茶', route: '/experiments/tea/', directory: 'experiments/tea', prompt: 'docs/prompts/tea.md' },
  festival: { id: 'F01', label: 'OFFGRID 離線聲場', route: '/experiments/festival/', directory: 'experiments/festival', prompt: 'docs/prompts/festival.md' },
};

export function options(args = process.argv.slice(2)) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (!args[i].startsWith('--')) throw new Error(`未知參數：${args[i]}`);
    const key = args[i].slice(2);
    result[key] = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
  }
  return result;
}

export function getCase(key) {
  const entry = cases[key];
  if (!entry) throw new Error(`--case 必須是 ${Object.keys(cases).join(' / ')}`);
  return entry;
}

export function stamp() { return new Date().toISOString().replace(/[:.]/g, '-'); }
