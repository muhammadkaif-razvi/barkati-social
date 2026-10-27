# BARKATI reel kit (story reels with illustrations, sound effects, NO music)

BARKATI's own copy of the story-reel kit (forked from the shared kit on 27 Oct 2026). Use THIS folder for BARKATI reels; never put Mujeeb Technologies anything in here.

Text-led 1080x1920 story reels: words pop in, highlighter swipes, camera punch-in + drift, screen shake, swipe/slide/zoom transitions, phone/browser/chat mockups, **flat illustrations (illus.js)**, emoji or illustration stickers, pills, progress bar. Sound = procedural sound effects from audio.py (typing, clicks, pops, whooshes, dings) + optional voiceover. **Never music.**
Colours: Deep Navy #0A1A3F + Electric Cyan #00C2FF (`"theme": "local"`).

## Setup (fresh container)
1. `cd reelkit && npm init -y && npm i @fontsource/playfair-display@5.1.0 @fontsource/inter@5.1.0 playwright-core@1.48.2` (pip install numpy scipy if missing; ffmpeg needed).
2. Fonts next to story.html: `cp node_modules/@fontsource/playfair-display/files/playfair-display-latin-{400,700,900}-{italic,normal}.woff2 node_modules/@fontsource/inter/files/inter-latin-{400,500,600,700,800,900}-normal.woff2 .`
3. Logo: render `barkati-logo-horizontal.svg` to PNG with the headless shell (2x), crop to the alpha bbox → `barkati-logo-tight.png`. Final scene: `"brand": true, "brandWide": true, "brandLogo": "barkati-logo-tight.png", "brandH": 64`.
4. Emoji need "Noto Color Emoji" (`fc-list | grep -i emoji`).
5. Preview: `node render.mjs spec.json pv/p --preview 2.5,8,12` → pv/p-2.5.png … Render: `node render.mjs spec.json silent.mp4`, then `python3 audio.py mix spec.json silent.mp4 mixed.mp4 [vo_aligned.wav]`, then loudness: `ffmpeg -y -i mixed.mp4 -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=7 -c:a aac -b:a 192k -ar 48000 -movflags +faststart final.mp4`. One render per shell command (background if needed).
6. Voice: `python3 audio.py fitvo spec.json vo.mp3 spec.timed.json vo_aligned.wav` stretches scene durations to the voice; render spec.timed.json.

## Spec format
`{"theme":"local","style":"editorial"|"dark"|"bold","layout":"stack"|"flip"|"center"|"poster","transition":"swipe"|"slide"|"zoom","decor":"stars"|"shapes"|"lines"|"dots"|"brackets"|"none","bgx":"blobs"|"paper"|"dots"|"mesh"|"split","scenes":[...]}`
Scene: `{dur, bg:"light"|"blue", lines, vo, top?, visual?, visTop?, stickers?, pills?, shakeAt?, layout?, brand…}`
- lines: `[[ [text, style], … ], …]`, style "" | "accent" (1–2 words, huge + highlighter) | "big" | "soft".
- stickers: emoji `{emoji, x, y, size, at, rot}` **or illustration** `{illus:"truck", x, y, size(≈160–360), at, anim, rot}`.
- pills: `{text, y, at, x?, rot?, hot?}`.

### Visual types
Mockups: `profile`, `search`, `chat`, `browser`, `tabs`, `calc` (words only), `list`, `versus`, `comment`, `chart` — same as before.
New (BARKATI):
- **illus** — free scene of illustrations: `{type:"illus", h:700, items:[{name, x (centre, 0–900), y (top), size, at, anim, label?, labelStyle?:"hot"|"bad", cross?:<sec>, dim?:true, dimAt?:<sec>, rot?}]}`.
  `cross` draws a red ✗ over the item at that second (loss moment); `dimAt` greys it out.
- **flow** — a path with drawn arrows (2–4 steps): `{type:"flow", at, step, steps:[{illus, label}]}` e.g. Google → Website → WhatsApp → Visit.
- **stat** — a REAL number with count-up: `{type:"stat", value, prefix?, suffix?, decimals?, label, source, chip?, illus?}`. `source` is mandatory and must be a real, verified source (shown on screen as "Source: …"). Never invent a figure.
- **plan** — price card: `{type:"plan", name, price, note?, badge?, items[]}` (only real BARKATI prices from claude/local-brand.md).
- **offer** — "khushkhabri" card with gift + confetti: `{type:"offer", title, sub?, ribbon?:"Khushkhabri", illus?:"gift"}` (only real offers: free homepage demo, founding offer).

### Illustration names (illus.js, flat, no faces, no brand logos)
shop, store, hall, plate, sweets, truck, box, car, plane, building, sofa, ring, pin, phone, website, search, chat, calendar, clock, stars, rupee, wallet, chartup, chartdown, gift, key, lock, bulb, megaphone, board, tick, cross.
Animations (`anim`): pop (default, bounce + gentle bob), drop (falls in), drive / driveR (enters from left / right — vehicles), float, pulse, wiggle, spin, fade.
In the "dark" style illustrations sit on white tiles automatically.

## Script → picture → motion (pick the visual that SHOWS the line)
| Line is about | Visual | Motion |
|---|---|---|
| Hook | big text + illustration stickers (business type) + audience pill | word pop, sticker drop/wiggle |
| A business type (caterer, hall, mover…) | illus: hall / plate / truck / shop / sofa / ring / building / car | drop / drive |
| Loss ("nuksaan") | illus with `cross` + `dimAt`, or chartdown, wallet | red ✗ draws, item greys out, shake |
| Customer journey | flow: search → website → chat → shop | steps pop, arrows draw |
| Google search | search mockup | typing, results |
| WhatsApp / enquiry | chat mockup | bubbles, stamp |
| Website point | browser / tabs | page opens, toast |
| Real data / proof | stat (with source) | count-up, ding |
| Checklist | list | ticks |
| Myth vs fact / pehle vs baad | versus | strike-through |
| Plan / price | plan card | price pops, ticks |
| Offer / khushkhabri | offer card | gift wiggle, confetti |
| Ownership (domain, code) | illus: key + lock + website | pop |
| CTA | comment "DEMO" + logo | typing, send, ding |
Max ~12 words on screen per scene; preview every scene and fix overlaps before rendering. Never faces, never a real business name.

## Retention rules + Instagram safe zones (from the 20–27 Oct numbers: avg watch ≈ 4.7 s)
- **Scene 1 is instant**: its text is fully on screen by ~0.5 s (built in; set `"slowHook": true` only if you really want the slow reveal). Voice starts at once. The first frame must already read as the hook — it is also the cover/thumbnail.
- **Short and fast**: reel #1 15–22 s, reel #2 25–35 s; each scene 2.5–4 s; something new every ~1.5 s. Cut any scene that only repeats the previous one.
- **Fill the frame**: mockups/cards should cover ~55–70% of the height. Use `"visScale": 1.1–1.2` on small cards (plan, stat, tabs, comment, versus) and bigger illustration sizes (300–420) rather than leaving empty space.
- **Safe zones**: keep all important text and cards between y≈220 and y≈1480, and away from the right 150 px (Instagram's like/comment/share buttons). Flip-layout text now sits at bottom 420 by default and the brand pill at bottom 430 — don't push them lower.
- **Loop**: let the last line lead back into the first ("…aur isliye, pehla sawaal phir se:") where it fits, so a rewatch feels natural.
- **Big readable text**: nothing smaller than ~28 px inside mockups; if a mockup row needs smaller text, cut words instead.
