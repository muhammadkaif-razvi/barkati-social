# BARKATI reel kit — Remotion (from 30 Oct 2026)

All BARKATI daily reels are made with this kit; the old `reelkit/` (story.html) is kept only for reference.
Each reel is ONE JSON props file; Remotion renders it at 1080×1920, 30 fps. Navy #0A1A3F + cyan #00C2FF,
Manrope / JetBrains Mono / Inter (fonts are committed in `public/fonts`), the same flat illustrations as the
old kit (`src/illus.json`, built from `../reelkit/illus.js`). Sound = short sound effects that every scene adds
by itself (whoosh, tick, pop, ding, typing) + the voiceover. **Never music. No faces.**

## Setup (fresh container)
```sh
cd reelkit-remotion && npm ci          # or npm i
```
Rendering uses the pre-installed Chromium headless shell in `/opt/pw-browsers` automatically (the render
scripts pass `--browser-executable`); Remotion's own browser download is blocked in the sandbox.
`ffmpeg`/`ffprobe` are needed. If `reelkit/illus.js` changed: `node scripts/build-illus.mjs`.

## Make a reel
1. Write `work/reel<n>.json` (format below). One `vo` line per scene.
2. Voice prompt = the `vo` lines in order, joined with exactly ONE `<break time="0.7s" />` between scenes.
   Generate it, then polish: `sh ../kit/voice-enhance.sh vo<n>.mp3 vo<n>_enh.wav`.
3. Fit scene lengths to the voice (also copies the voice into `public/`):
   `node scripts/fit.mjs work/reel<n>.json vo<n>_enh.wav work/reel<n>.timed.json`
   It cuts at the (scenes − 1) longest pauses; check the printed durations look right (each 1.6–4.5 s).
4. Look before rendering: `sh preview.sh work/reel<n>.timed.json work/pv<n>` → a still at 0.05 s (cover) and
   near the end of every scene. Open each PNG and fix overlaps, empty frames, text in unsafe zones, any
   picture that doesn't match its line.
5. Render: `sh render.sh work/reel<n>.timed.json out/<date>-<n>-<topic>.mp4` (≈2–3 min per 20 s reel;
   one render per shell command). It loudness-normalises to −14 LUFS and writes `<file>_cover.jpg`.
   No voice? Skip step 3, render the JSON directly (sound effects only).
Never commit `node_modules/`, `work/`, `out/` or the voice files copied into `public/`.

## Props format
```json
{ "theme": "navy" | "light", "voice": "vo1_enh.wav" (set by fit.mjs), "scenes": [ … ] }
```
Every scene: `type`, `dur` (seconds), `vo`, optional `kicker` ("// CATERERS"), `head` (wrap words in
`*stars*` for cyan), `sub`, `stickers` (`[{illus, x, y, size≈260–340, at?, anim: pop|drop|drive|float|wiggle, rot?}]`,
x/y = centre in px). Times (`at`) are seconds from the scene start; leave them out and the kit spreads the
reveals across the scene, which keeps them inside the scene after fit.mjs changes its length.

| type | extra fields | use it for |
|---|---|---|
| `hook` | `pill?` | Scene 1 ONLY. Fully visible on frame 0 (it is the cover). Add 1–2 business-type stickers. |
| `search` | `prefix?` ("best "), `words[]` (cycles), `suffix?` (" near me") | Google search moments |
| `compare` | `good{title,url,badge}`, `bad{…}` | competitor has a website, you don't |
| `list` | `items[{illus,title,sub?}]` (2–4) | checklists, "3 cheezein", listicles |
| `phone` | `site{name,tagline,buttons?,form?,label?}` | "BARKATI mein hum…" / sample website (label defaults to "Sample design") |
| `chat` | `title?`, `messages[{from:"customer"|"shop",text}]` | WhatsApp enquiries |
| `stat` | `value`, `prefix?`, `suffix?`, `decimals?`, `label`, `source` | REAL figures only (claude/proof-data.md), source shown on screen |
| `versus` | `left{title,items[]}`, `right{title,items[]}` | myth vs sach, pehle vs baad (left gets struck through) |
| `flow` | `steps[{illus,label}]` (2–4) | customer journey (search → website → WhatsApp) |
| `illus` | `items[{illus,label?,bad?,cross?}]` (1–4) | business types, loss moments (`cross` = second the red ✗ lands) |
| `offer` | `title`, `sub?`, `ribbon?`, `illus?` | khushkhabri: free homepage demo / founding offer (real offers only) |
| `plan` | `name`, `price`, `note?`, `badge?`, `items[]` | plan days only, exact prices from claude/local-brand.md |
| `cta` | `head?`, `line?` | LAST scene, always. Types "DEMO" in a comment box, logo + barkati.in |

Illustrations: shop, store, hall, plate, sweets, truck, box, car, plane, building, sofa, ring, pin, phone,
website, search, chat, calendar, clock, stars, rupee, wallet, chartup, chartdown, gift, key, lock, bulb,
megaphone, board, tick, cross. On the navy theme they sit on white tiles automatically.

## Rules that the kit already follows (keep them when you add scene types)
- Safe area: text and cards stay between y≈220 and y≈1480 and out of the right 150 px (Instagram buttons).
- Headline ≥ 84 px, supporting text ≥ 36 px; max ~12 words on screen per scene.
- Something moves every ~1.5 s (word reveals, pops, ticks, typing, drift); no CSS transitions — everything is
  driven by `useCurrentFrame()`.
- Rotate `theme` (navy / light) across days and vary scene types between the two daily reels.

Examples: `examples/common-website.json` (navy, 6 scenes) and `examples/types-showcase.json` (light, every type).
Studio preview (optional): `npx remotion studio --no-open`.
