// BARKATI social kit templates. Every image = {name, w, h, body}
export const HEAD = (kit = '.') => { const NM = kit + '/node_modules/@fontsource'; return `
<link rel="stylesheet" href="${NM}/manrope/800.css"><link rel="stylesheet" href="${NM}/manrope/700.css">
<link rel="stylesheet" href="${NM}/inter/400.css"><link rel="stylesheet" href="${NM}/inter/500.css"><link rel="stylesheet" href="${NM}/inter/600.css"><link rel="stylesheet" href="${NM}/inter/700.css">
<link rel="stylesheet" href="${NM}/jetbrains-mono/500.css"><link rel="stylesheet" href="${NM}/jetbrains-mono/700.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--navy:#0A1A3F;--navy2:#12275A;--navy3:#1B3573;--cyan:#00C2FF;--mute:#A9B8DD;--white:#fff}
html,body{background:var(--navy);color:#fff;font-family:Inter,sans-serif}
.c{position:relative;overflow:hidden;background:var(--navy)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:60px 60px}
.h{font-family:Manrope,sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1.02}
.m{font-family:'JetBrains Mono',monospace;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
.cy{color:var(--cyan)}
.mu{color:var(--mute)}
.tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:var(--cyan);border:2px solid rgba(0,194,255,.5);border-radius:999px;padding:10px 22px}
.pill{display:inline-flex;align-items:center;gap:14px;background:var(--cyan);color:var(--navy);font-family:Manrope;font-weight:800;border-radius:999px}
.card{background:var(--navy2);border:2px solid rgba(255,255,255,.08);border-radius:28px}
.foot{position:absolute;left:80px;right:80px;display:flex;align-items:center;justify-content:space-between}
.foot .url{font-family:'JetBrains Mono';font-weight:700;font-size:28px;color:var(--mute);letter-spacing:.04em}
</style>`; };

const ICON_PATHS = (navy = '#FFFFFF') => `<path d="M58 62 L22 100 L58 138" stroke="#00C2FF"/><path d="M98 100 H146 L174 72 L146 44 H98 V156 H152 L180 128 L152 100 H146" stroke="${navy}"/>`;
export const icon = (size, b = '#FFFFFF', sw = 18) => `<svg width="${size}" height="${size}" viewBox="12 34 178 132" style="display:block"><g fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS(b)}</g></svg>`;
const WORD = 'M483.84615384615387 274.0V186.0H519.0461538461539Q528.457264957265 186.0 534.2628205128206 189.75833333333333Q540.0683760683761 193.51666666666665 542.757264957265 199.2Q545.4461538461538 204.88333333333333 545.4461538461538 210.6888888888889Q545.4461538461538 218.08333333333334 542.1155982905983 222.97222222222223Q538.7850427350428 227.86111111111111 532.9794871794873 229.51111111111112V226.45555555555555Q541.2294871794873 228.16666666666669 545.3544871794873 234.09444444444446Q549.4794871794873 240.02222222222224 549.4794871794873 247.35555555555555Q549.4794871794873 255.23888888888888 546.5767094017094 261.22777777777776Q543.6739316239316 267.21666666666664 537.7461538461539 270.60833333333335Q531.8183760683761 274.0 522.8350427350427 274.0ZM500.71282051282054 258.35555555555555H521.1239316239316Q524.4850427350427 258.35555555555555 527.1128205128205 256.9194444444445Q529.7405982905983 255.48333333333335 531.2378205128205 252.88611111111112Q532.7350427350427 250.2888888888889 532.7350427350427 246.74444444444444Q532.7350427350427 243.6277777777778 531.4517094017094 241.18333333333334Q530.1683760683761 238.73888888888888 527.571153846154 237.30277777777778Q524.9739316239317 235.86666666666667 521.1239316239316 235.86666666666667H500.71282051282054ZM500.71282051282054 220.34444444444443H518.8017094017094Q521.6128205128206 220.34444444444443 523.8128205128205 219.36666666666667Q526.0128205128206 218.38888888888889 527.2961538461539 216.34166666666667Q528.5794871794872 214.29444444444445 528.5794871794872 211.05555555555554Q528.5794871794872 207.02222222222224 526.0739316239317 204.27222222222224Q523.5683760683761 201.52222222222224 518.8017094017094 201.52222222222224H500.71282051282054ZM567.8128205128205 274.0 594.7017094017094 186.0H619.5128205128206L646.4017094017094 274.0H629.2905982905983L605.3350427350427 196.38888888888889H608.5128205128206L584.9239316239316 274.0ZM583.9461538461538 255.66666666666666V240.14444444444445H630.3905982905983V255.66666666666666ZM669.6239316239316 274.0V186.0H706.7794871794872Q708.0628205128205 186.0 710.232264957265 186.09166666666667Q712.4017094017095 186.18333333333334 714.1128205128206 186.48888888888888Q721.9961538461539 187.7111111111111 727.0378205128205 191.68333333333334Q732.0794871794872 195.65555555555557 734.4628205128205 201.675Q736.8461538461538 207.69444444444446 736.8461538461538 215.0888888888889Q736.8461538461538 226.15 731.3461538461538 234.0027777777778Q725.8461538461538 241.85555555555555 714.1128205128206 243.6888888888889L706.7794871794872 244.17777777777778H686.2461538461539V274.0ZM719.2461538461539 274.0 701.8905982905983 238.1888888888889 719.0017094017094 234.88888888888889 738.0683760683761 274.0ZM686.2461538461539 228.65555555555557H706.0461538461539Q707.3294871794872 228.65555555555557 708.857264957265 228.53333333333333Q710.3850427350428 228.4111111111111 711.6683760683761 228.04444444444445Q715.0294871794872 227.1277777777778 716.8628205128205 224.95833333333334Q718.6961538461538 222.7888888888889 719.3989316239316 220.13055555555556Q720.1017094017094 217.47222222222223 720.1017094017094 215.0888888888889Q720.1017094017094 212.70555555555555 719.3989316239316 210.04722222222222Q718.6961538461538 207.38888888888889 716.8628205128205 205.21944444444443Q715.0294871794872 203.05 711.6683760683761 202.13333333333333Q710.3850427350428 201.76666666666665 708.857264957265 201.64444444444445Q707.3294871794872 201.52222222222224 706.0461538461539 201.52222222222224H686.2461538461539ZM763.7350427350427 274.0V186.0H780.357264957265V226.57777777777778L813.8461538461538 186.0H834.1350427350427L797.3461538461538 229.38888888888889L836.4572649572649 274.0H815.4350427350428L780.357264957265 233.9111111111111V274.0ZM851.1239316239316 274.0 878.0128205128206 186.0H902.8239316239317L929.7128205128205 274.0H912.6017094017094L888.6461538461539 196.38888888888889H891.8239316239317L868.2350427350427 274.0ZM867.257264957265 255.66666666666666V240.14444444444445H913.7017094017094V255.66666666666666ZM973.3461538461538 274.0V201.52222222222224H945.6017094017093V186.0H1017.7128205128205V201.52222222222224H989.968376068376V274.0ZM1040.9350427350428 274.0V186.0H1057.557264957265V274.0Z';
// horizontal lockup, height h (icon + wordmark), white on navy by default
export const logo = (h = 56, col = '#FFFFFF') => `<svg height="${h}" viewBox="98 60 960 230" style="display:block"><g transform="translate(98.00 60.77) scale(1.6923)" fill="none" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS(col)}</g><path d="${WORD}" fill="${col}"/></svg>`;

// generic sample site in a browser frame
export const browser = (w, opts = {}) => {
  const s = w / 800; // scale relative to 800 design width
  const name = opts.name || 'Your Business';
  return `<div style="width:${w}px;border-radius:${22 * s}px;background:#fff;overflow:hidden;box-shadow:0 ${30 * s}px ${80 * s}px rgba(0,0,0,.45);color:#0A1A3F;font-family:Inter">
  <div style="display:flex;align-items:center;gap:${10 * s}px;padding:${16 * s}px ${20 * s}px;background:#EEF2FA">
    <i style="width:${14 * s}px;height:${14 * s}px;border-radius:50%;background:#ff6159"></i><i style="width:${14 * s}px;height:${14 * s}px;border-radius:50%;background:#ffbd2e"></i><i style="width:${14 * s}px;height:${14 * s}px;border-radius:50%;background:#28c941"></i>
    <div style="flex:1;margin-left:${14 * s}px;background:#fff;border-radius:${10 * s}px;padding:${8 * s}px ${16 * s}px;font:500 ${18 * s}px 'JetBrains Mono';color:#56607d">🔒 yourbusiness.in</div>
  </div>
  <div style="padding:${28 * s}px ${34 * s}px ${34 * s}px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${26 * s}px"><b style="font:800 ${26 * s}px Manrope">${name}</b><span style="display:flex;gap:${18 * s}px;font:600 ${16 * s}px Inter;color:#56607d"><span>Services</span><span>Rates</span><span>Photos</span><span>Contact</span></span></div>
    <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:${26 * s}px;align-items:center">
      <div>
        <div style="font:800 ${40 * s}px/1.08 Manrope;letter-spacing:-.02em">${opts.hero || 'Rates, timings aur location — sab ek page pe.'}</div>
        <div style="margin-top:${20 * s}px;display:flex;gap:${12 * s}px">
          <span style="background:#25D366;color:#fff;font:700 ${17 * s}px Inter;padding:${12 * s}px ${20 * s}px;border-radius:${12 * s}px">WhatsApp</span>
          <span style="border:${2 * s}px solid #0A1A3F;font:700 ${17 * s}px Inter;padding:${10 * s}px ${20 * s}px;border-radius:${12 * s}px">Call now</span>
        </div>
      </div>
      <div style="height:${190 * s}px;border-radius:${16 * s}px;background:linear-gradient(135deg,#cfe9f7,#9fd3ee);position:relative">
        <div style="position:absolute;left:${16 * s}px;bottom:${16 * s}px;background:#fff;border-radius:${10 * s}px;padding:${8 * s}px ${12 * s}px;font:700 ${14 * s}px Inter">📍 Map · Open 10–8</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${14 * s}px;margin-top:${26 * s}px">
      ${['Service 1', 'Service 2', 'Service 3'].map(t => `<div style="background:#F2F5FB;border-radius:${12 * s}px;padding:${16 * s}px"><div style="width:${34 * s}px;height:${8 * s}px;border-radius:9px;background:#00C2FF;margin-bottom:${10 * s}px"></div><b style="font:700 ${16 * s}px Inter">${t}</b><div style="height:${8 * s}px;width:80%;background:#dde3ef;border-radius:9px;margin-top:${10 * s}px"></div></div>`).join('')}
    </div>
  </div></div>`;
};

// phone frame holding a mobile version of the sample site
export const phone = (w, opts = {}) => {
  const s = w / 400;
  return `<div style="width:${w}px;border-radius:${54 * s}px;background:#050d22;padding:${14 * s}px;box-shadow:0 ${30 * s}px ${80 * s}px rgba(0,0,0,.5);border:${2 * s}px solid rgba(255,255,255,.15)">
  <div style="border-radius:${42 * s}px;background:#fff;overflow:hidden;color:#0A1A3F;height:${opts.h ? opts.h * s : 760 * s}px;position:relative">
    <div style="height:${34 * s}px;display:flex;justify-content:center;align-items:center"><i style="width:${90 * s}px;height:${22 * s}px;border-radius:99px;background:#050d22"></i></div>
    <div style="padding:${14 * s}px ${22 * s}px">
      <div style="font:500 ${13 * s}px 'JetBrains Mono';color:#56607d;background:#EEF2FA;border-radius:${10 * s}px;padding:${8 * s}px ${12 * s}px">🔒 yourbusiness.in</div>
      <div style="font:800 ${22 * s}px Manrope;margin:${18 * s}px 0 ${4 * s}px">${opts.name || 'Your Business'}</div>
      <div style="font:500 ${14 * s}px Inter;color:#56607d">${opts.sub || 'Your City · Open 10 AM – 8 PM'}</div>
      <div style="height:${170 * s}px;border-radius:${16 * s}px;background:linear-gradient(135deg,#cfe9f7,#9fd3ee);margin:${16 * s}px 0"></div>
      <div style="font:800 ${26 * s}px/1.1 Manrope;letter-spacing:-.02em">${opts.hero || 'Rates, timing aur location ek jagah.'}</div>
      <div style="display:grid;gap:${10 * s}px;margin-top:${18 * s}px">
        <span style="background:#25D366;color:#fff;text-align:center;font:700 ${17 * s}px Inter;padding:${14 * s}px;border-radius:${14 * s}px">WhatsApp pe enquiry</span>
        <span style="border:${2 * s}px solid #0A1A3F;text-align:center;font:700 ${17 * s}px Inter;padding:${12 * s}px;border-radius:${14 * s}px">📞 Call now</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:${10 * s}px;margin-top:${16 * s}px">
        ${['Services', 'Rates', 'Photos', 'Location'].map(t => `<div style="background:#F2F5FB;border-radius:${12 * s}px;padding:${14 * s}px;font:700 ${15 * s}px Inter">${t}</div>`).join('')}
      </div>
    </div>
  </div></div>`;
};

export const foot = (bottom = 70, extra = 'barkati.in') => `<div class="foot" style="bottom:${bottom}px">${logo(54)}<span class="url">${extra}</span></div>`;

export const searchBar = (w, fs, q = 'your business near me') => `<div style="width:${w}px;background:#fff;border-radius:999px;padding:${fs * .9}px ${fs * 1.4}px;display:flex;align-items:center;gap:${fs * .7}px;box-shadow:0 20px 60px rgba(0,0,0,.4)"><svg width="${fs * 1.3}" height="${fs * 1.3}" viewBox="0 0 24 24" fill="none" stroke="#56607d" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg><span style="font:500 ${fs}px Inter;color:#0A1A3F">${q}</span><span style="width:3px;height:${fs * 1.2}px;background:#00C2FF"></span></div>`;
