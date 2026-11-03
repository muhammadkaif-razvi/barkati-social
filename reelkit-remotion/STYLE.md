# BARKATI reel STYLE.md

The look of every BARKATI reel (Raza, 3 Nov 2026). The Remotion kit already does all of this when `"theme": "noir"` is used, so normally you only write the props JSON.

| | Rule |
|---|---|
| BRAND | Top bar: `● BARKATI.IN` left, checklist meter right (label + steps, e.g. `WEBSITE CHECKLIST 3/5`). Never Mujeeb Technologies. |
| FORMAT | 1080×1920 · 30 fps · 25–42 s · faceless motion graphics · no music. |
| CANVAS | Noir #14130F with slow drifting stars and a vignette. One big outline "ghost" word drifting behind each scene. |
| COLOURS | Text #F4F1EA · muted #9A958A · cards #FBF8F1 / #1E1C18 · accent Electric Cyan #00C2FF · Deep Navy #0A1A3F on light cards. |
| HEADLINES | Manrope 800, 84–112 px, left. One accent word per headline (`*word*`): Instrument Serif italic. Numbered points start with a cyan number ("03"). |
| LABELS | JetBrains-style mono 700, 22–30 px, caps, letter spacing 2–3. |
| CAPTIONS | 3 words at a time (balanced chunks), Manrope 800 68 px, y 1400. Spoken word on a cyan box, earlier words white, next words grey. Every scene has a `cap` line (Roman Hinglish) because most people watch muted. |
| LAYOUT | Top bar y 230 · headline from y 330 · one phone/card block · caption y 1400. Keep the right 150 px and the bottom 300 px free (Instagram buttons and caption). |
| PACING | Hook fully on screen at frame 0 (it is also the cover). A new scene starts on the first word of its line. Something moves every 0.5–1.5 s. No empty frames. Each scene 2–6.5 s. |
| MOTION | Words rise in, cards spring in and bob, phone screen slowly zooms. Push + blur between scenes (enter from the right, leave to the left). |
| SOUND | Viraj voice first (ElevenLabs FmBhnvP58BK0vz65OOj7), enhanced. Effects on every hit: whoosh on each cut, pop on each card, rise on a new phone, key ticks + ding on the CTA. No music. Master −14 LUFS. |
| CTA | Headline → comment box types `DEMO` → Post button → line "Comment karo DEMO…" → DM card "BARKATI · DM / Aapka free homepage demo". Keyword is always DEMO. |

## Scene recipe for a "checklist" reel (like the noir interior-designer reel)
1. `hook` — pain question + 1–2 business illustrations, kicker = the niche.
2. 3–5 × `feature` — `num`, headline with one accent word, a phone screen (badge, illustration, title, button) and 1–2 floating cards; `meterStep` 1…5.
3. `phone` — "Ye sab, ek website mein" with a labelled **Sample design** from barkati.in.
4. `cta`.

## Before rendering
- Preview stills (`sh preview.sh`), look at every one: no overlap, nothing clipped, nothing in the safe zones, picture matches the line.
- Fit to the voice (`node scripts/fit.mjs`), then check the printed durations against the real pauses (`ffmpeg -af silencedetect=n=-35dB:d=0.3`) and fix a wrong boundary by hand.
- After rendering: −14 LUFS (ebur128) and 3 frames checked.
