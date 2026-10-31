import './style.css';
import { entries, source } from './data.js';
import { formatPrompt, followupPrompt } from '../scripts/prompt.mjs';
import { guideContent } from './guide.js';

const app = document.querySelector('#app');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6"/></svg>';
const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 5h11v11M19 5 5 19" stroke="currentColor" stroke-width="1.6"/></svg>';
let filter = 'all';

function header(active = 'cases') {
  return `<a class="skip" href="#main">跳至內容</a><header class="header"><a href="/" class="brand" aria-label="Impeccable Test Lab 首頁"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>impeccable<span class="brand-divider">/</span><span class="brand-sub">test lab</span></a><nav aria-label="主選單"><a href="/" ${active === 'cases' ? 'aria-current="page"' : ''}>測試案例</a><a href="/guide" ${active === 'guide' ? 'aria-current="page"' : ''}>錄影手冊</a><a href="${source.repository}" target="_blank" rel="noreferrer">官方 Repo ${external}</a></nav></header>`;
}
function footer() {
  return `<footer class="footer"><span>獨立測試工作台 · 非官方網站</span><span>Skill ${source.skillVersion} <span class="dot-sep">/</span> Source <a href="${source.repository}/tree/${source.commit}" target="_blank" rel="noreferrer"><code>${source.commit.slice(0, 7)}</code> ${external}</a></span></footer><div id="toast" role="status" aria-live="polite"></div>`;
}
function preview(entry) {
  if (entry.kind === 'official') return `<div class="specimen ${entry.key}"><div class="mini-nav"><b>Lumina</b><span>Product &nbsp; Solutions &nbsp; Pricing</span><span class="mini-pill">Get started</span></div><div class="mini-content"><span class="mini-kicker">THE FUTURE OF WORK</span><strong>${entry.key === 'lumina' ? 'Build faster with <em>intelligent</em> workflows for modern teams' : 'Build faster with<br>intelligent workflows'}</strong><p>The AI-native platform that brings everything together.</p><span class="mini-cta">${entry.key === 'lumina' ? 'Start free trial' : 'Join the waitlist'} →</span></div><span class="preview-caption">示意縮圖 · 開啟前後比較</span></div>`;
  if (entry.key === 'wallet') return `<div class="specimen wallet"><div class="concept-top"><span>AEGIS</span><span>BRIEF / W01</span></div><div class="wallet-word">Delegate the task.<br><span>Keep the control.</span></div><div class="permission-line"><span>AGENT</span><i></i><span>YOUR RULES</span><i></i><span>WALLET</span></div><span class="preview-caption">題目封面 · 非生成結果</span></div>`;
  if (entry.key === 'tea') return `<div class="specimen tea"><div class="concept-top"><span>山間製茶</span><span>BRIEF / T01</span></div><div class="tea-word">一山。<br><span>一杯。</span></div><div class="tea-side">把一座山，留給一杯茶。</div><span class="preview-caption">題目封面 · 非生成結果</span></div>`;
  return `<div class="specimen festival"><div class="concept-top"><span>離線聲場</span><span>BRIEF / F01</span></div><div class="festival-word">OFF<br><span>GRID</span><svg aria-hidden="true" viewBox="0 0 100 100"><path d="M15 85 85 15H22M85 15v63" fill="none" stroke="currentColor" stroke-width="12"/></svg></div><span class="preview-caption">題目封面 · 非生成結果</span></div>`;
}
function card(entry) {
  return `<article class="case-card"><a class="preview-link" href="/cases/${entry.key}" aria-label="查看 ${entry.title} ${entry.subtitle}">${preview(entry)}</a><div class="card-info"><div class="card-meta"><span><code>${entry.id}</code> ${entry.type}</span><span class="status ${entry.kind}">${entry.kind === 'official' ? '第一輪完成' : '待生成'}</span></div><h3><a href="/cases/${entry.key}">${entry.title} ${arrow}</a></h3><div class="card-sub">${entry.subtitle}</div><p>${entry.description}</p><div class="card-bottom"><span>${entry.kind === 'official' ? '$impeccable ' + entry.command : '完整 Brief + Prompt'}</span><a href="/cases/${entry.key}">${entry.kind === 'official' ? '比較前後' : '查看題目'} ${arrow}</a></div></div></article>`;
}
function home() {
  document.title = 'Impeccable / Test Lab';
  app.innerHTML = `${header()}<main id="main"><section class="intro"><div><h1>把設計能力，<br>放上<span class="accent-word">試驗台。</span></h1><p>從官方範例到全新命題，記錄每一句 Prompt、<br class="desktop-break">每一次迭代，以及漂亮畫面背後的能力邊界。</p><a class="text-link" href="/guide">查看錄影與比較流程 ${arrow}</a></div><aside class="session-sheet" aria-label="測試工作台狀態"><div class="sheet-top"><span class="live-dot"></span>本地測試環境<span>SESSION 001</span></div><dl><div><dt>官方案例</dt><dd>02<span>第一輪完成</span></dd></div><div><dt>原創命題</dt><dd>03<span>待生成</span></dd></div></dl><div class="sheet-bottom"><span>Vite + HTML / CSS / JS</span><span>可重現 · 可錄影</span></div></aside></section><section class="cases-section" aria-labelledby="cases-heading"><div class="section-bar"><h2 id="cases-heading">測試案例 <span>05</span></h2><div class="filters" role="group" aria-label="篩選案例"><button data-filter="all" aria-pressed="${filter === 'all'}">全部 <span>5</span></button><button data-filter="official" aria-pressed="${filter === 'official'}">官方 Demo <span>2</span></button><button data-filter="brief" aria-pressed="${filter === 'brief'}">原創題目 <span>3</span></button></div></div><div class="case-grid">${entries.filter(e => filter === 'all' || e.kind === filter).map(card).join('')}</div></section><section class="method-strip"><span class="method-number">A → B</span><div><h2>讓差異有跡可循。</h2><p>官方原始版保留不動。每次只測一個變因，Prompt、程式碼與錄影一起存檔。</p></div><a href="/guide" class="button secondary">查看測試方法 ${arrow}</a></section></main>${footer()}`;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter; home();
    document.querySelector(`[data-filter="${filter}"]`).focus({ preventScroll: true });
  }));
}
function detail(entry) {
  document.title = `${entry.title} / Impeccable Test Lab`;
  app.innerHTML = `${header()}<main id="main" class="detail-main"><a href="/" class="back-link">← 所有測試案例</a><section class="detail-heading"><div><div class="detail-id"><code>${entry.id}</code><span>${entry.type}</span><span class="status ${entry.kind}">${entry.kind === 'official' ? '第一輪完成 · 可比較前後' : 'Brief 已就緒 · 待生成'}</span></div><h1>${entry.title}<span>${entry.subtitle}</span></h1><p>${entry.description}</p></div><a class="button primary" href="${entry.route}" target="_blank" rel="noreferrer">${entry.kind === 'official' ? '開啟結果頁' : '開啟預留頁面'} ${external}</a></section><div class="notice">${entry.note}</div>${entry.kind === 'official' ? `<section class="preview-section"><div class="section-bar"><h2>相同起點，逐步比較。</h2><a class="text-link" href="${entry.baseline}" target="_blank" rel="noreferrer">開啟凍結原始版 ${external}</a></div><div class="preview-toolbar"><div class="segmented" role="group" aria-label="預覽版本"><button data-version="baseline" aria-pressed="true">原始版</button><button data-version="working" aria-pressed="false">工作副本</button></div><span id="preview-label">凍結的官方原始碼</span><div class="segmented" role="group" aria-label="預覽尺寸"><button data-width="1440" aria-pressed="true">桌面 1440</button><button data-width="390" aria-pressed="false">手機 390</button></div></div><div class="frame-stage"><div class="frame-space"><iframe title="${entry.title} 預覽" src="${entry.baseline}" sandbox="allow-scripts allow-same-origin" class="demo-frame"></iframe></div></div><p class="caption">原始版是凍結的官方頁面；工作副本是本輪結果。預覽依可用空間等比例縮放；錄影請開啟獨立頁面，或使用 capture 指令。</p></section>` : `<div class="brief-banner">${preview(entry)}<div><h2>這次，要測什麼？</h2><ol>${entry.checks.map(c => `<li>${c}</li>`).join('')}</ol><p>封面只是題目識別。正式生成保留給錄影，未記錄任何測試成績。</p></div></div>`}<section class="prompt-layout"><div class="prompt-main"><div class="section-bar"><h2>完整需求 Prompt</h2><button class="button primary" id="copy-prompt">複製 Prompt ${arrow}</button></div>${entry.kind === 'brief' ? `<div class="prompt-options"><label for="prompt-mode">執行模式</label><select id="prompt-mode"><option value="plain">A：無 skill 生成 Prompt</option><option value="skill">獨立 C 組：使用 Impeccable 從零生成</option></select></div><p class="caption">A 必須在不載入 Impeccable 的隔離專案與新對話執行。凍結 A 後，複製到 B，再用明確的 skill 指令修改；下拉選單的 skill Prompt 是另一次從零生成的 C 組。</p>` : ''}<pre id="prompt-text" tabindex="0">${escape(formatPrompt(entry.raw, entry.kind === 'brief' ? 'plain' : 'skill'))}</pre><div class="prompt-footer"><code>${entry.prompt}</code><button id="download-prompt" class="text-button">下載 .txt</button></div></div><aside class="test-sidebar"><h2>拍攝觀察點</h2><ul class="check-list">${entry.checks.map(c => `<li>${c}</li>`).join('')}</ul><h3>後續測試指令</h3><p>以下只供複製，尚未執行。每次修改前先做快照。</p>${['audit', 'adapt', ...(entry.kind === 'brief' ? ['bolder'] : ['critique'])].map(command => `<button class="command-copy" data-command="${command}"><code>$impeccable ${command}</code><span>複製</span></button>`).join('')}<p class="caption">audit / critique 為評估；adapt / bolder 會修改頁面，應分開錄一輪。</p><a class="text-link" href="/guide">如何留下完整證據 ${arrow}</a></aside></section><section class="record-strip"><div><h2>保存每輪的真實起點。</h2><p>快照會保存實際 Prompt、來源碼、版本資訊與 SHA-256。它不會替你執行 skill。</p></div><pre>npm run snapshot -- --case ${entry.key} --phase before --model "填入實際模型"</pre></section></main>${footer()}`;
  let mode = entry.kind === 'brief' ? 'plain' : 'skill';
  document.querySelector('#prompt-mode')?.addEventListener('change', event => {
    mode = event.target.value; document.querySelector('#prompt-text').textContent = formatPrompt(entry.raw, mode);
  });
  document.querySelector('#copy-prompt').addEventListener('click', () => copy(formatPrompt(entry.raw, mode)));
  document.querySelector('#download-prompt').addEventListener('click', () => download(`${entry.id}-${mode}-prompt.txt`, formatPrompt(entry.raw, mode)));
  document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => copy(followupPrompt(entry, entry.key, button.dataset.command))));
  if (entry.kind === 'official') setupPreview(entry);
}
let observer;
function setupPreview(entry) {
  let width = 1440;
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
  document.querySelectorAll('[data-version]').forEach(button => button.addEventListener('click', () => {
    const baseline = button.dataset.version === 'baseline'; frame.src = baseline ? entry.baseline : entry.route;
    document.querySelector('#preview-label').textContent = baseline ? '凍結的官方原始碼' : '第一輪修改結果';
    document.querySelectorAll('[data-version]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  }));
  observer = new ResizeObserver(size); observer.observe(stage); size();
}
function guide() {
  document.title = '錄影手冊 / Impeccable Test Lab';
  app.innerHTML = `${header('guide')}${guideContent}${footer()}`;
}
let toastTimer;
function toast(message) {
  const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2600);
}
async function copy(value) {
  try { await navigator.clipboard.writeText(value); toast('已複製完整 Prompt'); }
  catch { toast('無法存取剪貼簿，請選取 Prompt 文字或下載 .txt'); }
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
      document.title = '找不到頁面 / Impeccable Test Lab';
      app.innerHTML = `${header()}<main id="main" class="not-found"><h1>這個案例還不存在。</h1><a class="button primary" href="/">回到測試案例 ${arrow}</a></main>${footer()}`;
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
