import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  atOr,
  BODY,
  Card,
  CORAL,
  f,
  GREEN,
  IllusTile,
  MONO,
  NAVY,
  Sfx,
  Top,
  usePop,
  useRise,
  useSceneDur,
  useTheme,
} from "../theme";
import type { Scene } from "../types";

type S<T extends Scene["type"]> = Extract<Scene, { type: T }>;

/** Scene 1: the complete hook, fully readable on frame 0 (it is also the cover). */
export const Hook: React.FC<{ s: S<"hook"> }> = ({ s }) => {
  const t = useTheme();
  const pill = { opacity: 1 };
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={108} instant />
      {s.pill ? (
        <div
          style={{
            ...pill,
            alignSelf: "flex-start",
            fontFamily: BODY,
            fontWeight: 700,
            fontSize: 42,
            color: NAVY,
            background: t.hi === "#0091C2" ? "#00C2FF" : t.hi,
            borderRadius: 999,
            padding: "14px 34px",
          }}
        >
          {s.pill}
        </div>
      ) : null}
    </>
  );
};

const SearchIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 L21 21" />
  </svg>
);

/** Google-style search bar typing "<prefix> <word> <suffix>", the word cycling. */
export const Search: React.FC<{ s: S<"search"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const bar = useRise(0.25, 60);
  const prefix = s.prefix ?? "best ";
  const typeEnd = 0.4 + prefix.length * 0.035;
  const typeN = Math.floor(interpolate(frame, [f(0.4), f(typeEnd)], [0, prefix.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const wordsStart = typeEnd + 0.1;
  const per = Math.max(0.35, (dur - wordsStart - 0.6) / Math.max(1, s.words.length));
  const idx = Math.min(s.words.length - 1, Math.max(0, Math.floor((frame / 30 - wordsStart) / per)));
  const showWord = frame >= f(wordsStart);
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} />
      <div
        style={{
          ...bar,
          background: "#FFFFFF",
          borderRadius: 999,
          padding: "36px 44px",
          display: "flex",
          alignItems: "center",
          gap: 26,
          border: t.name === "light" ? `3px solid ${t.cardBorder}` : "none",
          boxShadow: "0 30px 80px rgba(0,194,255,0.35)",
        }}
      >
        <SearchIcon />
        <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 52, color: NAVY, whiteSpace: "nowrap", overflow: "hidden" }}>
          {prefix.slice(0, typeN)}
          {showWord ? <span style={{ color: "#0077B6" }}>{s.words[idx]}</span> : null}
          {showWord ? (s.suffix ?? " near me") : null}
          <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0, color: "#00C2FF" }}>|</span>
        </div>
      </div>
      {s.words.map((_, i) => (
        <Sfx key={i} name="tick" at={wordsStart + i * per} volume={0.2} />
      ))}
    </>
  );
};

const ResultCard: React.FC<{ at: number; title: string; url: string; badge: string; ok: boolean }> = ({ at, title, url, badge, ok }) => {
  const p = usePop(at);
  const frame = useCurrentFrame();
  const t = useTheme();
  const glow = ok ? interpolate(Math.sin((frame - f(at)) / 5), [-1, 1], [0.25, 0.6]) : 0;
  return (
    <Card
      style={{
        scale: interpolate(p, [0, 1], [0.85, 1]),
        opacity: Math.min(1, p) * (ok ? 1 : 0.6),
        border: `4px solid ${ok ? "#00C2FF" : t.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: ok ? `0 0 70px rgba(0,194,255,${glow})` : "none",
      }}
    >
      <div style={{ fontFamily: MONO, fontWeight: 500, fontSize: 34, color: ok ? t.hi : t.muted }}>{url}</div>
      <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 58, color: t.fg }}>{title}</div>
      <div
        style={{
          alignSelf: "flex-start",
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: 38,
          padding: "10px 26px",
          borderRadius: 999,
          background: ok ? GREEN : "rgba(255,90,95,0.18)",
          color: ok ? "#04220F" : CORAL,
        }}
      >
        {badge}
      </div>
    </Card>
  );
};

/** Two results: one that has it (glows), one that doesn't (dim). */
export const Compare: React.FC<{ s: S<"compare"> }> = ({ s }) => {
  const dur = useSceneDur();
  const goodAt = 0.35;
  const badAt = s.badAt ?? Math.min(dur * 0.45, dur - 0.8);
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} />
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <ResultCard at={goodAt} {...s.good} ok />
        <ResultCard at={badAt} {...s.bad} ok={false} />
      </div>
      <Sfx name="pop" at={goodAt} />
      <Sfx name="pop" at={badAt} volume={0.25} />
    </>
  );
};

const ListItem: React.FC<{ at: number; illus: string; title: string; sub?: string }> = ({ at, illus, title, sub }) => {
  const r = useRise(at, 50, 10);
  const tick = usePop(at + 0.25);
  const t = useTheme();
  return (
    <Card style={{ ...r, display: "flex", alignItems: "center", gap: 30, padding: "28px 30px" }}>
      <IllusTile name={illus} size={120} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 50, color: t.fg, lineHeight: 1.12 }}>{title}</div>
        {sub ? <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 36, color: t.muted }}>{sub}</div> : null}
      </div>
      <div
        style={{
          scale: tick,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "#00C2FF",
          color: NAVY,
          fontFamily: BODY,
          fontWeight: 700,
          fontSize: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        ✓
      </div>
    </Card>
  );
};

/** Checklist / listicle: 2–4 items with illustration tiles and ticks. */
export const List: React.FC<{ s: S<"list"> }> = ({ s }) => {
  const dur = useSceneDur();
  const n = s.items.length;
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {s.items.map((it, i) => {
          const at = atOr(it.at, i, n, dur, 0.6);
          return (
            <React.Fragment key={i}>
              <ListItem at={at} {...it} />
              <Sfx name="tick" at={at + 0.25} volume={0.4} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
