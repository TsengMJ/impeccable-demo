/** @typedef {{ id: string, label: string, root: string, prompt: string, variants: Record<string,string>, baseline?: string, gate?: string, directory: string, route: string }} CaseEntry */

const brief = (id, label, root, prompt) => {
  const variants = Object.fromEntries(['a', 'b', 'c', 'd', 'e'].map(v => [v, `/${root}/${v}/`]));
  return {
    id, label, root, prompt, variants, gate: `/${root}/`,
    baseline: variants.a + 'index.html',
    directory: `${root}/b`,
    route: variants.b,
  };
};

const official = (id, label, root, prompt) => {
  const variants = Object.fromEntries(['a', 'b', 'c', 'd', 'e'].map(v => [v, `/${root}/${v}/`]));
  return {
    id, label, root, prompt, variants,
    // Immutable upstream freeze remains the provenance A; demos/*/a mirrors it for uniform switching.
    baseline: variants.a + 'index.html',
    directory: `${root}/b`,
    route: variants.b,
  };
};

export const cases = {
  lumina: official('D01', 'Lumina', 'demos/lumina', 'docs/prompts/lumina.md'),
  'lumina-classic': official('D02', 'Lumina Classic', 'demos/lumina-classic', 'docs/prompts/lumina-classic.md'),
  wallet: brief('W01', 'AEGIS', 'experiments/wallet', 'docs/prompts/wallet.md'),
  tea: brief('T01', '山间制茶', 'experiments/tea', 'docs/prompts/tea.md'),
  festival: brief('F01', 'OFFGRID 离线声场', 'experiments/festival', 'docs/prompts/festival.md'),
};

export const variantMeta = {
  a: { label: 'A · 原图', command: null },
  b: { label: 'B · polish', command: 'polish' },
  c: { label: 'C · bolder', command: 'bolder' },
  d: { label: 'D · distill', command: 'distill' },
  e: { label: 'E · animate', command: 'animate' },
};

export function options(args = process.argv.slice(2)) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (!args[i].startsWith('--')) throw new Error(`未知参数：${args[i]}`);
    const key = args[i].slice(2);
    result[key] = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
  }
  return result;
}

export function getCase(key) {
  const entry = cases[key];
  if (!entry) throw new Error(`--case 必须是 ${Object.keys(cases).join(' / ')}`);
  return entry;
}

export function stamp() { return new Date().toISOString().replace(/[:.]/g, '-'); }
