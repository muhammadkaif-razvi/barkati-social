#!/bin/sh
# usage: sh preview.sh <props.json> <outdir> [seconds...]   → stills to look at before the full render
# With no seconds given: one still at 0.0 s (cover) and one near the end of every scene.
set -e
cd "$(dirname "$0")"
PROPS="$1"; DIR="$2"; shift 2
mkdir -p "$DIR"
BROWSER=""
for b in /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell; do [ -x "$b" ] && BROWSER="--browser-executable=$b"; done
if [ $# -eq 0 ]; then
  set -- $(node -e 'const p=require(process.argv[1]);let t=0;const o=["0.05"];for(const s of p.scenes){o.push((t+s.dur*0.85).toFixed(2));t+=s.dur}console.log(o.join(" "))' "$(realpath "$PROPS")")
fi
for s in "$@"; do
  fr=$(node -e "console.log(Math.round($s*30))")
  npx remotion still Reel "$DIR/t$s.png" --props="$PROPS" --frame=$fr $BROWSER --log=error
done
ls "$DIR"
