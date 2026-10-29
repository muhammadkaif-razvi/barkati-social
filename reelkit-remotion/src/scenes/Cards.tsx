import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  AMBER,
  BODY,
  Card,
  CYAN,
  f,
  Headline,
  Illus,
  Logo,
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

/** A REAL figure with count-up. `source` is mandatory and shown on screen. */
export const Stat: React.FC<{ s: S<"stat"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const card = useRise(0.2, 50);
  const v = interpolate(frame, [f(0.3), f(1.3)], [0, s.value], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 3) });
  const num = v.toLocaleString("en-IN", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 });
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={84} />
      <Card style={{ ...card, display: "flex", flexDirection: "column", gap: 18, padding: "50px 44px", border: `4px solid ${CYAN}` }}>
        <div style={{ fontFamily: HEADFONT, fontWeight: 800, fontSize: 190, color: t.hi, lineHeight: 1 }}>
          {s.prefix ?? ""}
          {num}
          {s.suffix ?? ""}
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 50, color: t.fg, lineHeight: 1.2 }}>{s.label}</div>
        <div style={{ fontFamily: MONO, fontWeight: 500, fontSize: 30, color: t.muted }}>Source: {s.source}</div>
      </Card>
      <Sfx name="rise" at={0.3} volume={0.3} />
      <Sfx name="ding" at={1.3} volume={0.3} />
    </>
  );
};
const HEADFONT = "Manrope";

/** "Khushkhabri" card — only real offers (free homepage demo, founding offer). */
export const Offer: React.FC<{ s: S<"offer"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const p = usePop(0.2);
  const gift = usePop(0.5);
  return (
    <>
      <Top kicker={s.kicker} head={s.head} size={88} />
      <Card style={{ scale: interpolate(p, [0, 1], [0.8, 1]), opacity: Math.min(1, p), display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "44px 40px", border: `4px solid ${AMBER}`, position: "relative" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, color: NAVY, background: AMBER, borderRadius: 999, padding: "10px 30px" }}>{s.ribbon ?? "Khushkhabri"}</div>
        <div style={{ scale: gift, rotate: `${Math.sin(frame / 4) * 5}deg` }}>
          <Illus name={s.illus ?? "gift"} size={260} />
        </div>
        <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 56, color: t.fg, textAlign: "center", lineHeight: 1.15 }}>{s.title}</div>
        {s.sub ? <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 40, color: t.muted, textAlign: "center" }}>{s.sub}</div> : null}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const d = interpolate(frame, [f(0.5), f(1.4)], [0, 380 + (i % 3) * 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const o = interpolate(frame, [f(0.5), f(0.6), f(1.6)], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={i} style={{ position: "absolute", left: "50%", top: "40%", width: 18, height: 30, borderRadius: 4, background: [CYAN, AMBER, "#22C55E", "#FF5A5F"][i % 4], opacity: o, translate: `${Math.cos(a) * d}px ${Math.sin(a) * d}px`, rotate: `${i * 40 + frame * 6}deg` }} />;
        })}
      </Card>
      <Sfx name="ding" at={0.5} volume={0.35} />
    </>
  );
};

/** Price card — only exact prices from claude/local-brand.md, only on plan days. */
export const Plan: React.FC<{ s: S<"plan"> }> = ({ s }) => {
  const dur = useSceneDur();
  const t = useTheme();
  const card = useRise(0.2, 50);
  const price = usePop(0.6);
  return (
    <>
      <Top kicker={s.kicker} head={s.head} size={84} />
      <Card style={{ ...card, display: "flex", flexDirection: "column", gap: 18, padding: "40px 40px", border: `4px solid ${CYAN}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 52, color: t.fg }}>{s.name}</div>
          {s.badge ? <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 28, color: NAVY, background: CYAN, borderRadius: 999, padding: "8px 22px" }}>{s.badge}</div> : null}
        </div>
        <div style={{ fontFamily: HEADFONT, fontWeight: 800, fontSize: 130, color: t.hi, scale: price, transformOrigin: "left center", lineHeight: 1 }}>{s.price}</div>
        {s.note ? <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 36, color: t.muted }}>{s.note}</div> : null}
        {s.items.map((it, i) => {
          const at = 0.9 + (i * Math.max(0.2, dur - 1.8)) / Math.max(1, s.items.length);
          return <PlanItem key={i} at={at} text={it} />;
        })}
      </Card>
      <Sfx name="ding" at={0.6} volume={0.3} />
    </>
  );
};
const PlanItem: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const r = useRise(at, 20, 8);
  const t = useTheme();
  return (
    <div style={{ ...r, fontFamily: BODY, fontWeight: 600, fontSize: 40, color: t.fg }}>
      <span style={{ color: "#22C55E" }}>✓ </span>
      {text}
    </div>
  );
};

/** Final scene: fixed "DEMO" keyword typed into a comment box, then logo + barkati.in. */
export const Cta: React.FC<{ s: S<"cta"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const demoAt = Math.min(1.4, dur * 0.35);
  const box = useRise(0.5, 50);
  const typeN = Math.floor(interpolate(frame, [f(demoAt) - 8, f(demoAt) + 4], [0, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const send = usePop(demoAt + 0.2);
  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [1, 1.04]);
  const line = useRise(demoAt + 0.5, 20);
  const logo = useRise(Math.min(demoAt + 1.0, dur - 1.2), 40, 16);
  return (
    <>
      <Headline text={s.head ?? "Free *demo* chahiye?"} at={0} size={112} step={3} />
      <div
        style={{
          ...box,
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: t.card,
          border: `4px solid ${CYAN}`,
          borderRadius: 999,
          padding: "24px 24px 24px 48px",
          scale: frame > f(demoAt + 0.2) ? pulse : 1,
        }}
      >
        <div style={{ flex: 1, fontFamily: MONO, fontWeight: 700, fontSize: 80, color: t.fg, letterSpacing: 8 }}>
          {"DEMO".slice(0, typeN)}
          <span style={{ color: CYAN, opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }}>|</span>
        </div>
        <div style={{ scale: interpolate(send, [0, 1], [0.6, 1]), background: CYAN, color: NAVY, borderRadius: 999, padding: "24px 38px", fontFamily: BODY, fontWeight: 700, fontSize: 42 }}>Post</div>
      </div>
      <div style={{ ...line, fontFamily: BODY, fontWeight: 600, fontSize: 50, color: t.fg, lineHeight: 1.3 }}>
        {s.line ?? (
          <>
            Comment karo <span style={{ color: t.hi }}>DEMO</span> — free homepage demo
          </>
        )}
      </div>
      <div style={{ ...logo, marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <Logo scale={0.9} />
        <div style={{ fontFamily: MONO, fontWeight: 500, fontSize: 40, color: t.hi }}>barkati.in</div>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} name="type" at={demoAt - 0.27 + i * 0.1} volume={0.35} />
      ))}
      <Sfx name="ding" at={demoAt + 0.2} volume={0.4} />
    </>
  );
};
