#!/bin/sh
# usage: enhance.sh in.(mp3|wav) out.wav  — BARKATI voice polish: clean lows, warm body, clear presence, steady level, -14 LUFS
ffmpeg -hide_banner -loglevel error -y -i "$1" -af "\
highpass=f=80,\
afftdn=nf=-30:nr=6,\
equalizer=f=220:t=q:w=1.0:g=1.5,\
equalizer=f=450:t=q:w=1.2:g=-2,\
equalizer=f=3200:t=q:w=1.0:g=2.5,\
equalizer=f=7000:t=q:w=1.5:g=-1.5,\
highshelf=f=11000:g=1.5,\
acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,\
loudnorm=I=-14:TP=-1.5:LRA=7" -ar 48000 -ac 1 "$2"
