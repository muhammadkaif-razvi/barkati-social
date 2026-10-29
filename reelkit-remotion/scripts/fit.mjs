// Fit scene durations to the voiceover.
// usage: node scripts/fit.mjs <props.json> <voice.(wav|mp3)> <props.timed.json>
// - copies the voice into public/ (as <basename>.wav, 48 kHz) and sets "voice"
// - finds the pauses between scene lines (the voice prompt has ONE 0.7 s break between scenes),
//   takes the (scenes-1) longest pauses in time order as scene boundaries, and rewrites each "dur"
// - falls back to splitting by word count of each scene's "vo" if not enough pauses are found
// - last scene (CTA) gets at least 1.6 s after the voice ends and lasts ≥ 3.5 s
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [, , inProps, voice, outProps] = process.argv;
if (!inProps || !voice || !outProps) {
  console.error("usage: node scripts/fit.mjs props.json voice.mp3 props.timed.json");
  process.exit(1);
}
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const props = JSON.parse(fs.readFileSync(inProps, "utf8"));
const n = props.scenes.length;

const name = path.basename(voice).replace(/\.[^.]+$/, "") + ".wav";
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", voice, "-ar", "48000", "-ac", "1", path.join(root, "public", name)]);
props.voice = name;

const log = spawnSync("ffmpeg", ["-hide_banner", "-i", voice, "-af", "silencedetect=n=-35dB:d=0.35", "-f", "null", "-"], {
  encoding: "utf8",
}).stderr;
const total = Number(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", voice], { encoding: "utf8" }).trim(),
);

const starts = [...log.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end: ([\d.]+)/g)].map((m) => Number(m[1]));
const sil = starts
  .map((s, i) => ({ s, e: ends[i] ?? total, d: (ends[i] ?? total) - s }))
  .filter((x) => x.s > 0.3 && x.e < total - 0.2); // ignore leading/trailing silence
// speech end = start of trailing silence if any
const trailing = starts.length && (ends[starts.length - 1] === undefined || ends[starts.length - 1] >= total - 0.05) ? starts[starts.length - 1] : total;

let cuts; // times where scene i+1 starts
if (sil.length >= n - 1) {
  cuts = [...sil]
    .sort((a, b) => b.d - a.d)
    .slice(0, n - 1)
    .sort((a, b) => a.s - b.s)
    .map((x) => Math.max(x.s + 0.15, x.e - 0.12));
  console.log(`fit: ${n - 1} boundaries from pauses`);
} else {
  const words = props.scenes.map((s) => Math.max(1, (s.vo ?? "").split(/\s+/).filter(Boolean).length));
  const sum = words.reduce((a, b) => a + b, 0);
  let acc = 0;
  cuts = words.slice(0, -1).map((w) => ((acc += w), (acc / sum) * trailing));
  console.log(`fit: only ${sil.length} pauses found — split by word count`);
}

const bounds = [0, ...cuts];
props.scenes.forEach((s, i) => {
  const start = bounds[i];
  const end = i < n - 1 ? bounds[i + 1] : Math.max(trailing + 1.6, start + 3.5);
  s.dur = Math.round(Math.max(1.6, end - start) * 100) / 100;
});
fs.writeFileSync(outProps, JSON.stringify(props, null, 2));
const len = props.scenes.reduce((a, s) => a + s.dur, 0);
console.log(`fit: voice ${total.toFixed(2)} s, reel ${len.toFixed(2)} s → ${props.scenes.map((s) => s.dur).join(" | ")}`);
