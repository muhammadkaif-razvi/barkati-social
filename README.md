# barkati-social

Images and captions for BARKATI's Instagram (@barkati_0001) and Facebook Page, scheduled through Buffer. Files here are public on purpose: Buffer downloads each image from its raw GitHub link.

## Folders

- `launch/` — the launch kit: profile photo, Facebook cover, highlight covers, WhatsApp catalog cards, 9 launch posts (+ `captions.md` / `captions.json`), 7 stories, and 3 Meta ads (feed + story).
- `weeks/<YYYY-MM-DD>/` — one folder per week (date = that week's Monday): `spec.json`, rendered PNGs, `captions.md`.
- `kit/` — the image renderer.

## Making images

```bash
cd kit && npm install          # playwright-core + fonts (Chromium must already be installed)
node render.mjs ../weeks/2026-10-26/spec.json ../weeks/2026-10-26
```

`render.mjs` prints `ok` per image, or `OVERFLOW <px>` when text runs into the footer or the story safe zone — shorten that text and render again. Exit code 2 means at least one overflow.

### Spec format

```json
{ "items": [ { "file": "post-mon", "format": "post", "layout": "list", "tag": "...", "title": "Text with *accent* words", ... } ] }
```

| field | values |
|---|---|
| `format` | `post` 1080×1440 (3:4, grid-safe) · `story` 1080×1920 · `feed` 1080×1350 (ads) · `square` 1080×1080 |
| `layout` | `hero` (title + optional `sub`, `visual`, `cta`, `sticker`) · `list` (`items:[{t,d}]`, `marker`: check / number / arrow, `note`) · `grid` (`items:[{e,t,d}]`, 2 columns, 4–8 items) · `qa` (`items:[{q,a}]`) · `versus` (`items:[{label,points[]},{label,points[]}]`, right side highlighted) |
| `visual` | `browser` · `phone` · `search` (with optional `query`) — optional `mock` = headline inside the sample site |
| `title` | wrap 1–2 words in `*…*` for the cyan accent |
| `cta` | pill text, e.g. `WhatsApp pe DEMO likho →` |
| `sticker` | dashed placeholder where Raza adds a poll / link sticker by hand (stories only) |

See `kit/example-week.json`.

## Brand rules (short)

BARKATI, all caps. Navy #0A1A3F + cyan #00C2FF. Websites only. Prices: Starter ₹2,999 · Business ₹5,999 · Growth ₹17,999 + ₹499/month · Care plan ₹199/month or ₹1,999/year (optional for Starter/Business). Free homepage demo before payment. Never: Mujeeb Technologies, invented stats/clients/testimonials, "guaranteed", apps / Google Business Profile / WhatsApp setup offers, or clinics, salons, gyms, photographers.
