// BARKATI social image renderer.
// Usage:  node kit/render.mjs <spec.json> <outdir>
// spec.json = { "items": [ { "file": "post-mon-tip", "format": "post"|"story"|"feed", "layout": "...", ...fields } ] }
// Prints one line per image: "<file> <w>x<h> ok" or "<file> ... OVERFLOW <px>" (text ran into the footer / safe zone → shorten it).
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HEAD, icon, logo, browser, phone, searchBar } from './tpl.mjs';

const KIT = dirname(fileURLToPath(import.meta.url));
const SIZES = { post: [1080, 1440], story: [1080, 1920], feed: [1080, 1350], square: [1080, 1080] };
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
// *word* → cyan accent
const acc = s => esc(s).replace(/\*([^*]+)\*/g, '<span class="cy">$1</span>');

function titleSize(t, w, story) {
  const n = String(t || '').replace(/\*/g, '').length;
  const base = story ? 132 : 112;
  if (n <= 22) return base + 16;
  if (n <= 34) return base;
  if (n <= 50) return base - 16;
  if (n <= 70) return base - 30;
  return base - 42;
}

function body(it) {
  const [W, H] = SIZES[it.format] || SIZES.post;
  const story = it.format === 'story';
  const L = story ? 90 : 80;
  const top = story ? 300 : (it.format === 'feed' ? 96 : 110);
  const safeBottom = story ? H - 340 : H - 170; // content must end above this
  const ts = it.titleSize || titleSize(it.title, W, story);
  const head = `${story && it.logoTop !== false ? `<div style="margin-bottom:34px">${logo(52)}</div>` : ''}${it.tag ? `<span class="tag">${esc(it.tag)}</span>` : ''}
    <div class="h" style="font-size:${ts}px;margin-top:${it.tag ? 40 : 0}px">${acc(it.title)}</div>
    ${it.sub ? `<div class="mu" style="font:500 ${story ? 42 : 38}px/1.42 Inter;margin-top:34px;max-width:900px">${acc(it.sub)}</div>` : ''}`;
  let main = '';
  const items = it.items || [];
  if (it.layout === 'list') {
    const mk = (i) => it.marker === 'number' ? `<span class="h cy" style="flex:none;font-size:52px;width:56px">${i + 1}</span>`
      : it.marker === 'arrow' ? `<span class="cy" style="flex:none;font:700 40px 'JetBrains Mono'">→</span>`
      : `<span style="flex:none;width:56px;height:56px;border-radius:14px;border:4px solid #00C2FF"></span>`;
    main = `<div style="display:grid;gap:${story ? 24 : 20}px;margin-top:56px">${items.map((x, i) => `<div class="card" style="padding:28px 34px;display:flex;gap:26px;align-items:center">${mk(i)}<div style="min-width:0"><div style="font:600 ${story ? 42 : 38}px/1.25 Inter">${acc(x.t)}</div>${x.d ? `<div class="mu" style="font:500 ${story ? 32 : 28}px Inter;margin-top:6px">${acc(x.d)}</div>` : ''}</div></div>`).join('')}</div>
      ${it.note ? `<div class="mu" style="font:500 30px Inter;margin-top:22px">${acc(it.note)}</div>` : ''}`;
  } else if (it.layout === 'grid') {
    main = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:56px">${items.map(x => `<div class="card" style="padding:26px 28px"><div style="display:flex;gap:14px;align-items:center">${x.e ? `<span style="font-size:36px">${esc(x.e)}</span>` : ''}<span class="h" style="font-size:34px;line-height:1.12">${acc(x.t)}</span></div>${x.d ? `<div class="mu" style="font:500 27px Inter;margin-top:10px">${acc(x.d)}</div>` : ''}</div>`).join('')}</div>`;
  } else if (it.layout === 'qa') {
    main = `<div style="display:grid;gap:22px;margin-top:56px">${items.map(x => `<div class="card" style="padding:32px 38px"><div class="h" style="font-size:${story ? 46 : 40}px">${acc(x.q)}</div><div class="mu" style="font:500 ${story ? 36 : 32}px Inter;margin-top:10px">${acc(x.a)}</div></div>`).join('')}</div>`;
  } else if (it.layout === 'versus') {
    const [a, b] = items;
    main = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:56px">${[a, b].map((x, i) => `<div class="card" style="padding:30px;${i ? 'border-color:#00C2FF;background:#13306b' : ''}"><div class="m ${i ? 'cy' : 'mu'}" style="font-size:24px">${esc(x.label)}</div>${(x.points || []).map(p => `<div style="font:600 36px/1.3 Inter;margin-top:22px">${acc(p)}</div>`).join('')}</div>`).join('')}</div>`;
  }
  // visuals (hero / statement)
  let visual = '';
  if (it.visual === 'browser') visual = `<div style="margin-top:60px;display:flex;justify-content:center">${browser(story ? 820 : 780, { hero: it.mock || undefined })}</div>`;
  if (it.visual === 'phone') visual = `<div style="margin-top:56px;display:flex;justify-content:center">${phone(story ? 480 : 400, { h: story ? 520 : 420, hero: it.mock || undefined })}</div>`;
  if (it.visual === 'search') visual = `<div style="margin-top:56px">${searchBar(story ? 900 : 920, 40, it.query)}</div>`;
  if (it.sticker) visual += `<div style="margin:60px auto 0;width:700px;height:220px;border:4px dashed rgba(0,194,255,.5);border-radius:36px;display:flex;align-items:center;justify-content:center" class="m mu"><span style="font-size:26px">${esc(it.sticker)}</span></div>`;
  const cta = it.cta ? `<div class="pill" style="margin-top:56px"><span style="font-size:${story ? 42 : 38}px;padding:24px 42px">${esc(it.cta)}</span></div>` : '';
  const footer = story ? '' : `<div class="foot" style="bottom:${it.format === 'feed' ? 64 : 80}px">${logo(54)}<span class="url">barkati.in</span></div>`;
  return { W, H, safeBottom, html: `<div class="c" style="width:${W}px;height:${H}px"><div class="grid"></div>
    <div id="content" style="position:absolute;left:${L}px;right:${L}px;top:${top}px">${head}${main}${visual}${cta}</div>${footer}</div>` };
}

const [specPath, outDir = 'out'] = process.argv.slice(2);
if (!specPath) { console.error('usage: node kit/render.mjs spec.json outdir'); process.exit(1); }
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
mkdirSync(outDir, { recursive: true });
const exe = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/opt/pw-browsers/chromium/chrome-linux/chrome', '/opt/pw-browsers/chromium'].find(existsSync);
const app = await chromium.launch(exe ? { executablePath: exe } : {});
let bad = 0;
for (const it of spec.items) {
  const { W, H, safeBottom, html } = body(it);
  const tmp = join(KIT, `_tmp_${it.file}.html`);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8">${HEAD(KIT)}</head><body>${html}</body></html>`);
  const page = await app.newPage({ viewport: { width: W, height: H } });
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  // short content: move it down so the canvas doesn't look half empty
  const bottom = await page.evaluate((safe) => {
    const el = document.getElementById('content'); const r = el.getBoundingClientRect();
    const spare = safe - r.bottom; if (spare > 120) el.style.top = (r.top + spare * 0.4) + 'px';
    return Math.round(el.getBoundingClientRect().bottom);
  }, safeBottom);
  await page.screenshot({ path: join(outDir, `${it.file}.png`), clip: { x: 0, y: 0, width: W, height: H } });
  await page.close();
  const over = bottom - safeBottom;
  if (over > 0) bad++;
  console.log(it.file, `${W}x${H}`, over > 0 ? `OVERFLOW ${over}px — shorten text` : 'ok');
}
await app.close();
process.exit(bad ? 2 : 0);
