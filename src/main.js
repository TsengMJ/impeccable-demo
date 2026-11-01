import './style.css';
import { entries, source } from './data.js';
import { formatPrompt, followupPrompt } from '../scripts/prompt.mjs';
import { variantMeta } from '../scripts/cases.mjs';
import { guideContent } from './guide.js';

const app = document.querySelector('#app');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6"/></svg>';
const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h11v11M19 5 5 19" stroke="currentColor" stroke-width="1.6"/></svg>';
let filter = 'all';

function header(active = 'cases') {
  return `<a class="skip" href="#main">跳至内容</a><header class="header"><a href="/" class="brand" aria-label="Impeccable Test Lab 首页"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>impeccable<span class="brand-divider">/</span><span class="brand-sub">test lab</span></a><nav aria-label="主选单"><a href="/" ${active === 'cases' ? 'aria-current="page"' : ''}>测试案例</a><a href="/guide" ${active === 'guide' ? 'aria-current="page"' : ''}>录影手册</a><a href="${source.repository}" target="_blank" rel="noreferrer">官方 Repo ${external}</a></nav></header>`;
}
function footer() {
  return `<footer class="footer"><span>独立测试工作台 · 非官方网站</span><span>Skill ${source.skillVersion} <span class="dot-sep">/</span> Source <a href="${source.repository}/tree/${source.commit}" target="_blank" rel="noreferrer"><code>${source.commit.slice(0, 7)}</code> ${external}</a></span></footer><div id="toast" role="status" aria-live="polite"></div>`;
}
function preview(entry) {
  if (entry.kind === 'official') return `<div class="specimen ${entry.key}"><div class="mini-nav"><b>Lumina</b><span>Product &nbsp; Solutions &nbsp; Pricing</span><span class="mini-pill">Get started</span></div><div class="mini-content"><span class="mini-kicker">THE FUTURE OF WORK</span><strong>${entry.key === 'lumina' ? 'Build faster with <em>intelligent</em> workflows for modern teams' : 'Build faster with<br>intelligent workflows'}</strong><p>The AI-native platform that brings everything together.</p><span class="mini-cta">${entry.key === 'lumina' ? 'Start free trial' : 'Join the waitlist'} →</span></div><span class="preview-caption">示意缩图 · 开启前后比较</span></div>`;
  if (entry.key === 'wallet') return `<div class="specimen wallet"><div class="concept-top"><span>AEGIS</span><span>BRIEF / W01</span></div><div class="wallet-word">Delegate the task.<br><span>Keep the control.</span></div><div class="permission-line"><span>AGENT</span><i></i><span>YOUR RULES</span><i></i><span>WALLET</span></div><span class="preview-caption">题目封面 · 非生成结果</span></div>`;
  if (entry.key === 'tea') return `<div class="specimen tea"><div class="concept-top"><span>山间制茶</span><span>BRIEF / T01</span></div><div class="tea-word">一山。<br><span>一杯。</span></div><div class="tea-side">把一座山，留给一杯茶。</div><span class="preview-caption">题目封面 · 非生成结果</span></div>`;
  return `<div class="specimen festival"><div class="concept-top"><span>离线声场</span><span>BRIEF / F01</span></div><div class="festival-word">OFF<br><span>GRID</span><svg aria-hidden="true" viewBox="0 0 100 100"><path d="M15 85 85 15H22M85 15v63" fill="none" stroke="currentColor" stroke-width="12"/></svg></div><span class="preview-caption">题目封面 · 非生成结果</span></div>`;
}
function isOfficial(entry) { return entry.kind === 'official'; }
function hasMatrix(entry) { return Boolean(entry.variants?.a && entry.variants?.b); }
function statusText(entry, detail = false) {
  if (hasMatrix(entry)) return detail ? 'A–E 已上架 · 录影已留证' : 'A–E 矩阵';
  return detail ? 'Brief 已就绪 · 待生成' : '待生成';
}
function card(entry) {
  return `<article class="case-card"><a class="preview-link" href="/cases/${entry.key}" aria-label="查看 ${entry.title} ${entry.subtitle}">${preview(entry)}</a><div class="card-info"><div class="card-meta"><span><code>${entry.id}</code> ${entry.type}</span><span class="status ${entry.kind}">${statusText(entry)}</span></div><h3><a href="/cases/${entry.key}">${entry.title} ${arrow}</a></h3><div class="card-sub">${entry.subtitle}</div><p>${entry.description}</p><div class="card-bottom"><span>A–E · polish／bolder／distill／animate</span><a href="/cases/${entry.key}">比较变体 ${arrow}</a></div></div></article>`;
}
function home() {
  document.title = 'Impeccable / Test Lab';
  app.innerHTML = `${header()}<main id="main"><section class="intro"><div><h1>把设计能力，<br>放上<span class="accent-word">试验台。</span></h1><p>五案同一矩阵：A 原图、B polish，再从 B 分出 C bolder／D distill／E animate。<br class="desktop-break">optimize 只收集证据，不上架。</p><a class="text-link" href="/guide">查看录影与比较流程 ${arrow}</a></div><aside class="session-sheet" aria-label="测试工作台状态"><div class="sheet-top"><span class="live-dot"></span>本地测试环境<span>SESSION 001</span></div><dl><div><dt>官方案例</dt><dd>02<span>A–E 矩阵</span></dd></div><div><dt>原创命题</dt><dd>03<span>A–E 矩阵</span></dd></div></dl><div class="sheet-bottom"><span>Vite + HTML / CSS / JS</span><span>可重现 · 可录影</span></div></aside></section><section class="cases-section" aria-labelledby="cases-heading"><div class="section-bar"><h2 id="cases-heading">测试案例 <span>05</span></h2><div class="filters" role="group" aria-label="筛选案例"><button data-filter="all" aria-pressed="${filter === 'all'}">全部 <span>5</span></button><button data-filter="official" aria-pressed="${filter === 'official'}">官方 Demo <span>2</span></button><button data-filter="brief" aria-pressed="${filter === 'brief'}">原创题目 <span>3</span></button></div></div><div class="case-grid">${entries.filter(e => filter === 'all' || e.kind === filter).map(card).join('')}</div></section><section class="method-strip"><span class="method-number">A–E</span><div><h2>让差异有迹可循。</h2><p>C／D／E 各自从冻结的 B 分叉，不做串烧。optimize 结果只进 evidence。</p></div><a href="/guide" class="button secondary">查看测试方法 ${arrow}</a></section></main>${footer()}`;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter; home();
    document.querySelector(`[data-filter="${filter}"]`).focus({ preventScroll: true });
  }));
}
function compareSection(entry) {
  const buttons = Object.entries(variantMeta).map(([letter, meta], i) =>
    `<button data-variant="${letter}" aria-pressed="${i === 0}">${meta.label}</button>`).join('');
  const links = Object.entries(entry.variants).map(([letter, route]) =>
    `<a href="${route}" target="_blank" rel="noreferrer">${letter.toUpperCase()}</a>`).join(' · ');
  return `<section class="preview-section"><div class="section-bar"><h2>A–E 变体比较</h2><span class="text-link">开新分页：${links}</span></div><div class="preview-toolbar"><div class="segmented" role="group" aria-label="预览变体">${buttons}</div><span id="preview-label">${variantMeta.a.label}</span><div class="segmented" role="group" aria-label="预览尺寸"><button data-width="1440" aria-pressed="true">桌面 1440</button><button data-width="390" aria-pressed="false">手机 390</button></div></div><div class="frame-stage"><div class="frame-space"><iframe title="${entry.title} 预览" src="${entry.variants.a}" sandbox="allow-scripts allow-same-origin" class="demo-frame"></iframe></div></div><p class="caption">C／D／E 皆由 B 独立复制后套用单一指令。optimize 不上架。预览缩放仅供扫读；正式录影请开独立路径。</p></section>`;
}
function detail(entry) {
  document.title = `${entry.title} / Impeccable Test Lab`;
  const bodyLead = hasMatrix(entry)
    ? compareSection(entry)
    : `<div class="brief-banner">${preview(entry)}<div><h2>这次，要测什么？</h2><ol>${entry.checks.map(c => `<li>${c}</li>`).join('')}</ol></div></div>`;
  app.innerHTML = `${header()}<main id="main" class="detail-main"><a href="/" class="back-link">← 所有测试案例</a><section class="detail-heading"><div><div class="detail-id"><code>${entry.id}</code><span>${entry.type}</span><span class="status ${entry.kind}">${statusText(entry, true)}</span></div><h1>${entry.title}<span>${entry.subtitle}</span></h1><p>${entry.description}</p></div><a class="button primary" href="${entry.route}" target="_blank" rel="noreferrer">开启 B · polish ${external}</a></section><div class="notice">${entry.note}</div>${bodyLead}<section class="prompt-layout"><div class="prompt-main"><div class="section-bar"><h2>${entry.kind === 'brief' ? '原始需求 Prompt（A）' : entry.key === 'lumina-classic' ? '早期官方 distill Prompt' : '早期官方 polish Prompt'}</h2><button class="button primary" id="copy-prompt">复制 Prompt ${arrow}</button></div>${entry.kind === 'brief' ? `<div class="prompt-options"><label for="prompt-mode">执行模式</label><select id="prompt-mode"><option value="plain">A：无 skill 生成 Prompt</option><option value="skill">独立从零：使用 Impeccable</option></select></div><p class="caption">矩阵内 B–E 已用明确 skill 指令；此处 skill 选项仅供另一次从零生成实验。</p>` : ''}<pre id="prompt-text" tabindex="0">${escape(formatPrompt(entry.raw, entry.kind === 'brief' ? 'plain' : 'skill'))}</pre>${entry.kind === 'official' ? `<p class="caption">此栏保存较早的官方测试要求；本矩阵 B–E 的指令证据与缺漏情况请看 recordings/MATRIX-INDEX.md，勿把此文当成 B 的完整贴上对话。</p>` : ''}<div class="prompt-footer"><code>${entry.prompt}</code><button id="download-prompt" class="text-button">下载 .txt</button></div></div><aside class="test-sidebar"><h2>拍摄观察点</h2><ul class="check-list">${entry.checks.map(c => `<li>${c}</li>`).join('')}</ul><h3>后续测试指令</h3><p>复制后请对准正确变体目录。optimize 只写证据。</p>${['audit', 'adapt', 'critique', 'optimize'].map(command => `<button class="command-copy" data-command="${command}"><code>$impeccable ${command}</code><span>复制</span></button>`).join('')}<a class="text-link" href="/guide">如何留下完整证据 ${arrow}</a></aside></section><section class="record-strip"><div><h2>保存每轮的真实起点。</h2><p>快照会保存实际 Prompt、来源码、版本资讯与 SHA-256。</p></div><pre>npm run snapshot -- --case ${entry.key} --phase before --model "填入实际模型"</pre></section></main>${footer()}`;
  let mode = entry.kind === 'brief' ? 'plain' : 'skill';
  document.querySelector('#prompt-mode')?.addEventListener('change', event => {
    mode = event.target.value; document.querySelector('#prompt-text').textContent = formatPrompt(entry.raw, mode);
  });
  document.querySelector('#copy-prompt').addEventListener('click', () => copy(formatPrompt(entry.raw, mode)));
  document.querySelector('#download-prompt').addEventListener('click', () => download(`${entry.id}-${mode}-prompt.txt`, formatPrompt(entry.raw, mode)));
  document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => copy(followupPrompt(entry, entry.key, button.dataset.command))));
  if (hasMatrix(entry)) setupPreview(entry);
}
let observer;
function setupPreview(entry) {
  let width = 1440;
  let letter = 'a';
  const frame = document.querySelector('.demo-frame');
  const stage = document.querySelector('.frame-stage');
  const space = document.querySelector('.frame-space');
  function size() {
    const scale = Math.min(1, (stage.clientWidth - 32) / width);
    const height = width === 390 ? 844 : 900;
    space.style.width = `${width * scale}px`; space.style.height = `${height * scale}px`;
    frame.style.width = `${width}px`; frame.style.height = `${height}px`; frame.style.transform = `scale(${scale})`;
  }
  document.querySelectorAll('[data-width]').forEach(button => button.addEventListener('click', () => {
    width = Number(button.dataset.width);
    document.querySelectorAll('[data-width]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); size();
  }));
  document.querySelectorAll('[data-variant]').forEach(button => button.addEventListener('click', () => {
    letter = button.dataset.variant;
    frame.src = entry.variants[letter];
    document.querySelector('#preview-label').textContent = variantMeta[letter].label;
    document.querySelectorAll('[data-variant]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  }));
  observer = new ResizeObserver(size); observer.observe(stage); size();
}
function guide() {
  document.title = '录影手册 / Impeccable Test Lab';
  app.innerHTML = `${header('guide')}${guideContent}${footer()}`;
}
let toastTimer;
function toast(message) {
  const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2600);
}
async function copy(value) {
  try { await navigator.clipboard.writeText(value); toast('已复制完整 Prompt'); }
  catch { toast('无法存取剪贴簿，请选取 Prompt 文字或下载 .txt'); }
}
function download(name, value) {
  const url = URL.createObjectURL(new Blob([value], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function render() {
  observer?.disconnect();
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') home();
  else if (path === '/guide') guide();
  else {
    const entry = entries.find(e => `/cases/${e.key}` === path);
    if (entry) detail(entry);
    else {
      document.title = '找不到页面 / Impeccable Test Lab';
      app.innerHTML = `${header()}<main id="main" class="not-found"><h1>这个案例还不存在。</h1><a class="button primary" href="/">回到测试案例 ${arrow}</a></main>${footer()}`;
    }
  }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin || url.hash || !(url.pathname === '/' || url.pathname === '/guide' || url.pathname.startsWith('/cases/'))) return;
  event.preventDefault(); history.pushState(null, '', url.pathname); render(); window.scrollTo(0, 0);
  document.querySelector('h1')?.setAttribute('tabindex', '-1'); document.querySelector('h1')?.focus({ preventScroll: true });
});
window.addEventListener('popstate', render);
render();
