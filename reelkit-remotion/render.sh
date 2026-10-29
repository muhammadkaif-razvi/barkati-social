#!/bin/sh
# usage: sh render.sh <props.json> <out.mp4>
# Renders the "Reel" composition with the given props, normalises loudness to -14 LUFS,
# and writes <out>_cover.jpg (frame 2, the hook = cover).
set -e
cd "$(dirname "$0")"
PROPS="$1"; OUT="$2"
[ -n "$PROPS" ] && [ -n "$OUT" ] || { echo "usage: sh render.sh props.json out.mp4"; exit 1; }
BROWSER=""
for b in /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell; do [ -x "$b" ] && BROWSER="--browser-executable=$b"; done
TMP="${OUT%.mp4}.raw.mp4"
npx remotion render Reel "$TMP" --props="$PROPS" --codec=h264 --crf=18 $BROWSER --log=error
ffmpeg -y -loglevel error -i "$TMP" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=7 -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$OUT"
rm -f "$TMP"
npx remotion still Reel "${OUT%.mp4}_cover.jpg" --props="$PROPS" --frame=2 --image-format=jpeg $BROWSER --log=error
ffprobe -v error -show_entries format=duration,size -of default=nw=1 "$OUT"
