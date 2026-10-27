// BARKATI flat illustrations for story reels — original, no faces, no brand logos.
// Every entry is an SVG string on a 200x200 viewBox. Use in a spec via
//   stickers: [{ "illus": "truck", ... }]  or  visual {type:"illus"|"flow"|"stat"|"offer", ...}
// Palette: navy #0A1A3F, cyan #00C2FF, deep cyan #0E7FB0, white, light #E6EEF9,
// amber #FFB020, coral #FF5A5F, green #22C55E.
(function () {
  const N = '#0A1A3F', C = '#00C2FF', D = '#0E7FB0', W = '#ffffff', L = '#E6EEF9', A = '#FFB020', R = '#FF5A5F', G = '#22C55E';
  const sh = (cx = 100, cy = 186, rx = 70) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8" fill="${N}" opacity=".12"/>`;
  const svg = (inner) => `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const rupee = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M-14 -20 H16 M-14 -8 H16"/><path d="M-6 -20 C12 -20 12 4 -6 4 H-12 L12 26"/></g>`;
  const ILL = {
    shop: svg(`${sh()}<rect x="34" y="78" width="132" height="104" rx="6" fill="${L}"/><rect x="28" y="56" width="144" height="16" rx="4" fill="${N}"/>
      <path d="M28 70 h144 v14 a12 12 0 0 1 -24 0 a12 12 0 0 1 -24 0 a12 12 0 0 1 -24 0 a12 12 0 0 1 -24 0 a12 12 0 0 1 -24 0 a12 12 0 0 1 -24 0z" fill="${C}"/>
      <path d="M52 70 v14 a12 12 0 0 1 -24 0 M100 70 v14 a12 12 0 0 1 -24 0 M148 70 v14 a12 12 0 0 1 -24 0" fill="${W}"/>
      <rect x="46" y="104" width="52" height="40" rx="4" fill="${W}"/><rect x="52" y="124" width="12" height="14" rx="2" fill="${A}"/><rect x="68" y="118" width="12" height="20" rx="2" fill="${R}"/><rect x="84" y="128" width="9" height="10" rx="2" fill="${D}"/>
      <rect x="110" y="104" width="42" height="78" rx="4" fill="${N}"/><circle cx="144" cy="144" r="3" fill="${A}"/><rect x="60" y="40" width="80" height="16" rx="4" fill="${A}"/>`),
    hall: svg(`${sh()}<path d="M100 24 c34 0 54 22 54 44 H46 c0-22 20-44 54-44z" fill="${C}"/><circle cx="100" cy="20" r="6" fill="${A}"/>
      <rect x="30" y="68" width="140" height="112" rx="4" fill="${L}"/><rect x="24" y="64" width="152" height="10" rx="3" fill="${N}"/>
      <path d="M78 180 v-46 a22 22 0 0 1 44 0 v46z" fill="${N}"/><path d="M84 180 v-44 a16 16 0 0 1 32 0 v44z" fill="${A}" opacity=".9"/>
      <rect x="40" y="90" width="18" height="90" fill="${W}"/><rect x="142" y="90" width="18" height="90" fill="${W}"/>
      <path d="M30 84 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 30 0" fill="none" stroke="${R}" stroke-width="3"/>
      ${[40, 60, 80, 100, 120, 140, 160].map((x, i) => `<circle cx="${x}" cy="${i % 2 ? 93 : 88}" r="3.4" fill="${i % 2 ? A : C}"/>`).join('')}
      <rect x="20" y="178" width="160" height="8" rx="3" fill="${N}" opacity=".85"/>`),
    plate: svg(`${sh(100, 176, 80)}<circle cx="100" cy="110" r="74" fill="${L}"/><circle cx="100" cy="110" r="62" fill="${W}"/>
      <circle cx="74" cy="86" r="17" fill="${A}"/><circle cx="74" cy="86" r="11" fill="#F59E0B"/>
      <circle cx="126" cy="86" r="17" fill="${R}"/><circle cx="126" cy="86" r="11" fill="#E11D48" opacity=".8"/>
      <circle cx="132" cy="132" r="15" fill="${G}"/><circle cx="132" cy="132" r="9" fill="#16A34A"/>
      <path d="M58 132 c0-16 40-16 40 0 c0 14 -40 14 -40 0z" fill="#FFF3D6" stroke="#F0D9A8" stroke-width="2"/>
      <path d="M86 150 l30 -6" stroke="${D}" stroke-width="4" stroke-linecap="round"/>`),
    truck: svg(`${sh(100, 182, 80)}<rect x="20" y="70" width="104" height="86" rx="6" fill="${C}"/><rect x="34" y="84" width="34" height="28" rx="3" fill="#C98B4A"/><rect x="72" y="92" width="38" height="34" rx="3" fill="#DDA15E"/><path d="M34 98 h34 M91 92 v34" stroke="#8A5A2B" stroke-width="2"/>
      <path d="M124 92 h30 l22 26 v38 h-52z" fill="${N}"/><path d="M132 100 h20 l15 18 h-35z" fill="${L}"/>
      <rect x="18" y="150" width="160" height="10" rx="4" fill="${N}"/>
      <circle cx="54" cy="164" r="15" fill="${N}"/><circle cx="54" cy="164" r="6" fill="${L}"/><circle cx="148" cy="164" r="15" fill="${N}"/><circle cx="148" cy="164" r="6" fill="${L}"/>
      <rect x="168" y="132" width="10" height="6" rx="2" fill="${A}"/>`),
    pin: svg(`${sh(100, 182, 34)}<path d="M100 178 C70 138 48 112 48 82 a52 52 0 0 1 104 0 c0 30 -22 56 -52 96z" fill="${C}"/><path d="M100 178 C86 158 74 140 66 124" stroke="${D}" stroke-width="0" fill="none"/>
      <circle cx="100" cy="82" r="22" fill="${W}"/><circle cx="100" cy="82" r="10" fill="${N}"/>`),
    phone: svg(`${sh(100, 188, 46)}<rect x="56" y="14" width="88" height="172" rx="18" fill="${N}"/><rect x="63" y="28" width="74" height="144" rx="10" fill="${W}"/><rect x="88" y="19" width="24" height="5" rx="2.5" fill="#2A3A66"/>
      <rect x="71" y="38" width="58" height="34" rx="6" fill="${C}"/><rect x="71" y="80" width="40" height="7" rx="3" fill="${N}"/><rect x="71" y="93" width="54" height="6" rx="3" fill="${L}"/><rect x="71" y="104" width="48" height="6" rx="3" fill="${L}"/>
      <rect x="71" y="122" width="26" height="14" rx="7" fill="${G}"/><rect x="101" y="122" width="26" height="14" rx="7" fill="${N}"/><rect x="71" y="144" width="58" height="20" rx="5" fill="${L}"/>`),
    website: svg(`${sh(100, 182, 80)}<rect x="16" y="36" width="168" height="134" rx="12" fill="${W}" stroke="${N}" stroke-width="6"/><path d="M19 39 h162 v20 h-162z" fill="${N}"/>
      <circle cx="32" cy="49" r="4" fill="${R}"/><circle cx="45" cy="49" r="4" fill="${A}"/><circle cx="58" cy="49" r="4" fill="${G}"/>
      <rect x="32" y="72" width="76" height="12" rx="4" fill="${N}"/><rect x="32" y="92" width="62" height="7" rx="3" fill="${L}"/><rect x="32" y="104" width="70" height="7" rx="3" fill="${L}"/>
      <rect x="32" y="124" width="40" height="16" rx="8" fill="${C}"/><rect x="118" y="70" width="52" height="70" rx="8" fill="${C}" opacity=".35"/><path d="M128 128 l12 -16 l10 10 l8 -8 l10 14z" fill="${D}"/><circle cx="148" cy="88" r="7" fill="${A}"/>`),
    rupee: svg(`${sh(100, 184, 62)}<ellipse cx="100" cy="164" rx="56" ry="14" fill="#E39A0B"/><rect x="44" y="140" width="112" height="24" fill="#E39A0B"/><ellipse cx="100" cy="140" rx="56" ry="14" fill="${A}"/>
      <ellipse cx="100" cy="128" rx="56" ry="14" fill="#E39A0B"/><rect x="44" y="104" width="112" height="24" fill="#E39A0B"/><ellipse cx="100" cy="104" rx="56" ry="14" fill="${A}"/>
      <circle cx="100" cy="62" r="44" fill="${A}" stroke="#E39A0B" stroke-width="6"/>${rupee(100, 62, 1, '#9A5B00')}`),
    calendar: svg(`${sh(100, 184, 70)}<rect x="28" y="36" width="144" height="142" rx="14" fill="${W}" stroke="${N}" stroke-width="6"/><path d="M31 39 h138 v30 h-138z" fill="${C}"/>
      <rect x="58" y="22" width="10" height="28" rx="5" fill="${N}"/><rect x="132" y="22" width="10" height="28" rx="5" fill="${N}"/>
      ${[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${44 + c * 24}" y="${82 + r * 22}" width="14" height="12" rx="3" fill="${L}"/>`).join('')).join('')}
      <circle cx="123" cy="110" r="15" fill="none" stroke="${R}" stroke-width="5"/>`),
    clock: svg(`${sh(100, 184, 56)}<circle cx="100" cy="100" r="74" fill="${W}" stroke="${N}" stroke-width="10"/>${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<circle cx="${100 + 58 * Math.sin(a)}" cy="${100 - 58 * Math.cos(a)}" r="${i % 3 ? 3 : 5}" fill="${i % 3 ? L : N}"/>` }).join('')}
      <path d="M100 100 V58" stroke="${N}" stroke-width="8" stroke-linecap="round"/><path d="M100 100 L132 116" stroke="${C}" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="100" r="8" fill="${N}"/>`),
    stars: svg(`${[0, 1, 2, 3, 4].map(i => `<path transform="translate(${20 + i * 40} 100) scale(.9)" d="M0 -20 L6 -6 L21 -6 L9 3 L13 18 L0 9 L-13 18 L-9 3 L-21 -6 L-6 -6z" fill="${i < 4 ? A : L}" stroke="${i < 4 ? '#E39A0B' : '#C9D3E8'}" stroke-width="2"/>`).join('')}`),
    search: svg(`${sh(96, 186, 50)}<circle cx="86" cy="84" r="54" fill="${W}" stroke="${N}" stroke-width="14"/><circle cx="86" cy="84" r="40" fill="${C}" opacity=".25"/><path d="M70 66 a24 24 0 0 1 30 -6" stroke="${W}" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M126 124 L170 168" stroke="${N}" stroke-width="22" stroke-linecap="round"/>`),
    chat: svg(`${sh(100, 184, 60)}<path d="M38 40 h124 a18 18 0 0 1 18 18 v66 a18 18 0 0 1 -18 18 h-74 l-30 26 v-26 h-20 a18 18 0 0 1 -18 -18 v-66 a18 18 0 0 1 18 -18z" fill="${G}"/>
      <circle cx="70" cy="92" r="9" fill="${W}"/><circle cx="100" cy="92" r="9" fill="${W}"/><circle cx="130" cy="92" r="9" fill="${W}"/>`),
    ring: svg(`${sh(100, 186, 50)}<circle cx="100" cy="124" r="50" fill="none" stroke="${A}" stroke-width="14"/><circle cx="100" cy="124" r="50" fill="none" stroke="#E39A0B" stroke-width="3" stroke-dasharray="4 10"/>
      <path d="M78 64 h44 l14 18 l-36 30 l-36 -30z" fill="${C}"/><path d="M78 64 l8 18 h28 l8 -18 M64 82 h72 M86 82 l14 30 l14 -30" stroke="${W}" stroke-width="2.5" fill="none" opacity=".8"/>`),
    sofa: svg(`${sh(100, 184, 80)}<rect x="36" y="64" width="128" height="60" rx="18" fill="${D}"/><rect x="22" y="100" width="34" height="62" rx="12" fill="${C}"/><rect x="144" y="100" width="34" height="62" rx="12" fill="${C}"/>
      <rect x="50" y="112" width="100" height="40" rx="10" fill="${C}"/><path d="M100 114 v36" stroke="${D}" stroke-width="3"/><rect x="36" y="160" width="10" height="18" rx="3" fill="${N}"/><rect x="154" y="160" width="10" height="18" rx="3" fill="${N}"/>
      <rect x="62" y="78" width="26" height="26" rx="6" fill="${A}" transform="rotate(-8 75 91)"/>`),
    building: svg(`${sh()}<rect x="50" y="26" width="76" height="156" rx="4" fill="${N}"/><rect x="126" y="76" width="44" height="106" rx="4" fill="${D}"/>
      ${[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2].map(c => `<rect x="${60 + c * 22}" y="${38 + r * 22}" width="12" height="12" rx="2" fill="${(r + c) % 3 ? C : A}" opacity="${(r + c) % 3 ? .8 : 1}"/>`).join('')).join('')}
      ${[0, 1, 2, 3].map(r => `<rect x="136" y="${88 + r * 22}" width="24" height="10" rx="2" fill="${L}" opacity=".8"/>`).join('')}<rect x="78" y="156" width="20" height="26" rx="3" fill="${L}"/>
      <g transform="rotate(-10 40 140)"><rect x="12" y="122" width="58" height="30" rx="6" fill="${A}"/><rect x="20" y="132" width="42" height="9" rx="3" fill="${N}"/></g>`),
    sweets: svg(`${sh(100, 182, 76)}<path d="M28 96 h144 l-12 80 h-120z" fill="${R}"/><rect x="22" y="84" width="156" height="18" rx="5" fill="#E11D48"/><path d="M60 96 v76 M140 96 v76" stroke="${A}" stroke-width="6"/>
      ${[[64, 66], [92, 58], [120, 66], [78, 44], [106, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y + 10}" r="15" fill="${A}"/><circle cx="${x - 4}" cy="${y + 6}" r="3" fill="${W}" opacity=".7"/>`).join('')}`),
    car: svg(`${sh(100, 180, 82)}<path d="M18 140 v-22 a12 12 0 0 1 10 -12 l26 -6 l24 -26 a14 14 0 0 1 10 -4 h40 a14 14 0 0 1 11 5 l22 25 l14 4 a12 12 0 0 1 9 12 v24z" fill="${C}"/>
      <path d="M62 100 l20 -22 h22 v22z M112 100 v-22 h18 l18 22z" fill="${L}"/><rect x="18" y="132" width="168" height="12" rx="5" fill="${N}"/>
      <circle cx="58" cy="146" r="18" fill="${N}"/><circle cx="58" cy="146" r="7" fill="${L}"/><circle cx="148" cy="146" r="18" fill="${N}"/><circle cx="148" cy="146" r="7" fill="${L}"/><rect x="176" y="114" width="10" height="8" rx="3" fill="${A}"/>`),
    plane: svg(`<path d="M24 112 l52 -6 l40 -54 h16 l-18 52 l42 -4 l16 -18 h12 l-8 30 l8 30 h-12 l-16 -18 l-42 -4 l18 52 h-16 l-40 -54 l-52 -6z" fill="${C}" stroke="${D}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M14 150 q50 -10 92 6" stroke="${N}" stroke-width="3" stroke-dasharray="6 8" fill="none" opacity=".4"/>`),
    gift: svg(`${sh(100, 184, 70)}<rect x="36" y="90" width="128" height="90" rx="8" fill="${C}"/><rect x="28" y="70" width="144" height="28" rx="6" fill="${D}"/>
      <rect x="90" y="70" width="20" height="110" fill="${A}"/><path d="M100 70 c-10 -26 -46 -34 -46 -14 c0 14 26 14 46 14 c20 0 46 0 46 -14 c0 -20 -36 -12 -46 14z" fill="none" stroke="${A}" stroke-width="10" stroke-linejoin="round"/>`),
    key: svg(`${sh(100, 182, 60)}<circle cx="64" cy="96" r="38" fill="${A}"/><circle cx="64" cy="96" r="14" fill="${W}"/><rect x="96" y="88" width="84" height="16" rx="6" fill="${A}"/>
      <rect x="150" y="104" width="12" height="22" rx="3" fill="${A}"/><rect x="128" y="104" width="12" height="16" rx="3" fill="${A}"/><path d="M42 80 a26 26 0 0 1 20 -12" stroke="${W}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>`),
    lock: svg(`${sh(100, 186, 56)}<path d="M64 92 v-24 a36 36 0 0 1 72 0 v24" fill="none" stroke="${N}" stroke-width="14"/><rect x="40" y="88" width="120" height="92" rx="16" fill="${C}"/>
      <circle cx="100" cy="126" r="12" fill="${N}"/><rect x="95" y="128" width="10" height="26" rx="4" fill="${N}"/>`),
    chartup: svg(`${sh(100, 184, 76)}<rect x="30" y="122" width="26" height="56" rx="5" fill="${L}"/><rect x="66" y="100" width="26" height="78" rx="5" fill="${C}" opacity=".55"/><rect x="102" y="76" width="26" height="102" rx="5" fill="${C}" opacity=".8"/><rect x="138" y="48" width="26" height="130" rx="5" fill="${C}"/>
      <path d="M30 108 L76 82 L110 92 L166 34" stroke="${G}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M144 30 h26 v26" stroke="${G}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
    chartdown: svg(`${sh(100, 184, 76)}<rect x="30" y="48" width="26" height="130" rx="5" fill="${L}"/><rect x="66" y="80" width="26" height="98" rx="5" fill="${L}"/><rect x="102" y="110" width="26" height="68" rx="5" fill="${R}" opacity=".55"/><rect x="138" y="138" width="26" height="40" rx="5" fill="${R}"/>
      <path d="M30 40 L76 72 L110 64 L166 124" stroke="${R}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M144 128 h26 v-26" stroke="${R}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
    wallet: svg(`${sh(100, 184, 70)}<rect x="28" y="62" width="136" height="104" rx="16" fill="${N}"/><rect x="28" y="62" width="136" height="26" rx="12" fill="#22335F"/><rect x="118" y="100" width="56" height="34" rx="10" fill="${C}"/><circle cx="134" cy="117" r="6" fill="${W}"/>
      <circle cx="70" cy="44" r="16" fill="${A}" opacity=".9"/><circle cx="104" cy="30" r="12" fill="${A}" opacity=".6"/><circle cx="58" cy="182" r="9" fill="${A}" opacity=".7"/>`),
    bulb: svg(`<circle cx="100" cy="84" r="52" fill="${A}"/><path d="M76 120 h48 v18 h-48z" fill="#E39A0B"/><rect x="78" y="140" width="44" height="12" rx="4" fill="${N}"/><rect x="84" y="154" width="32" height="12" rx="4" fill="${N}"/>
      <path d="M86 104 l14 -26 l14 26" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>${[[-70, 0], [70, 0], [-50, -50], [50, -50], [0, -72]].map(([dx, dy]) => `<path d="M${100 + dx * .9} ${84 + dy * .9} L${100 + dx * 1.15} ${84 + dy * 1.15}" stroke="${A}" stroke-width="7" stroke-linecap="round"/>`).join('')}`),
    megaphone: svg(`${sh(100, 182, 66)}<path d="M40 84 l86 -40 v116 l-86 -40z" fill="${C}"/><rect x="24" y="80" width="26" height="44" rx="8" fill="${N}"/><path d="M52 124 l12 40 h18 l-10 -40z" fill="${N}"/><rect x="122" y="40" width="14" height="124" rx="7" fill="${D}"/>
      <path d="M152 80 q12 22 0 44 M166 66 q22 36 0 72" stroke="${A}" stroke-width="7" fill="none" stroke-linecap="round"/>`),
    board: svg(`${sh(100, 186, 60)}<rect x="94" y="96" width="12" height="88" fill="${N}"/><rect x="24" y="30" width="152" height="74" rx="10" fill="${A}"/><rect x="34" y="40" width="132" height="54" rx="6" fill="${W}"/>
      <rect x="46" y="52" width="80" height="10" rx="4" fill="${N}"/><rect x="46" y="70" width="104" height="8" rx="4" fill="${L}"/>`),
    store: svg(`${sh()}<rect x="24" y="84" width="152" height="98" rx="6" fill="${W}" stroke="${N}" stroke-width="5"/><path d="M18 84 l18 -46 h128 l18 46z" fill="${N}"/><path d="M50 38 l-8 46 M82 38 l-4 46 M118 38 l4 46 M150 38 l8 46" stroke="${C}" stroke-width="8"/>
      <rect x="40" y="104" width="60" height="78" rx="4" fill="${C}" opacity=".3"/><rect x="112" y="104" width="50" height="40" rx="4" fill="${L}"/><rect x="118" y="124" width="10" height="16" fill="${A}"/><rect x="132" y="116" width="10" height="24" fill="${R}"/><rect x="146" y="128" width="10" height="12" fill="${G}"/>`),
    box: svg(`${sh(100, 182, 70)}<path d="M100 40 l70 30 v76 l-70 30 l-70 -30 v-76z" fill="#DDA15E"/><path d="M100 70 l70 -30 M100 70 l-70 -30 M100 70 v106" stroke="#B07B3E" stroke-width="3" fill="none"/><path d="M30 70 l70 30 l70 -30" fill="none" stroke="#B07B3E" stroke-width="0"/>
      <path d="M100 40 l70 30 l-70 30 l-70 -30z" fill="#E9B97A"/><path d="M64 55 l70 30 v24" stroke="${W}" stroke-width="8" fill="none" opacity=".75"/>`),
    tick: svg(`<circle cx="100" cy="100" r="78" fill="${G}"/><path d="M62 102 l26 26 l52 -56" stroke="${W}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
    cross: svg(`<circle cx="100" cy="100" r="78" fill="${R}"/><path d="M68 68 l64 64 M132 68 l-64 64" stroke="${W}" stroke-width="16" stroke-linecap="round"/>`),
  };
  window.ILL = ILL;
  window.ILLNAMES = Object.keys(ILL);
})();
