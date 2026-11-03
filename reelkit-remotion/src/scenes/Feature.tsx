import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { atOr, BODY, CYAN, f, Headline, Illus, MONO, NAVY, Sfx, usePop, useSceneDur, useTheme } from "../theme";
import type { Scene } from "../types";

type S<T extends Scene["type"]> = Extract<Scene, { type: T }>;

/** Floating info card next to the phone (label in mono + one short line, optional illustration). */
const FloatCard: React.FC<{ c: NonNullable<S<"feature">["cards"]>[number]; at: number; i: number }> = ({ c, at, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - f(at), fps, config: { damping: 13, stiffness: 170 } });
  const bob = Math.sin((frame - f(at)) / 12 + i) * 10;
  const left = c.side === "right";
  return (
    <div
      style={{
        position: "absolute",
        ...(left ? { right: -10, top: 60 } : { left: -20, bottom: 40 }),
        width: 280,
        background: "#FBF8F1",
        borderRadius: 26,
        padding: "22px 24px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        opacity: frame < f(at) ? 0 : Math.min(1, p * 1.5),
        scale: interpolate(p, [0, 1], [0.6, 1]),
        translate: `0px ${bob}px`,
        rotate: `${left ? 2 : -2}deg`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: "#0E7FB0" }}>{c.label.toUpperCase()}</div>
        {c.illus ? <Illus name={c.illus} size={56} /> : <div style={{ width: 14, height: 14, borderRadius: 7, background: CYAN }} />}
      </div>
      <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 38, lineHeight: 1.15, color: NAVY }}>{c.text}</div>
    </div>
  );
};

/** Numbered feature: "02 Site *walkthrough*" + phone with a live screen + floating cards. */
export const Feature: React.FC<{ s: S<"feature"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const phone = usePop(0.15);
  const num = usePop(0);
  const sc = s.screen ?? {};
  const secs = Math.floor(frame / 30);
  const badge = (sc.badge ?? "● LIVE").replace("{t}", `00:${String(secs).padStart(2, "0")}`);
  const zoom = interpolate(frame, [0, f(dur)], [1, 1.18]);
  const btn = usePop(Math.min(1.0, dur * 0.4));
  const cards = s.cards ?? [];
  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 26 }}>
        {s.num ? (
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 104, color: CYAN, scale: interpolate(num, [0, 1], [0.5, 1]), opacity: Math.min(1, num * 2) }}>
            {s.num}
          </div>
        ) : null}
        {s.head ? <Headline text={s.head} at={0.08} size={84} step={3} /> : null}
      </div>
      <div style={{ position: "relative", height: 820, alignSelf: "stretch" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            marginLeft: -205,
            width: 410,
            height: 780,
            borderRadius: 60,
            background: "#0B0A08",
            border: "5px solid #3A362E",
            padding: 16,
            boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 120px ${t.glow}`,
            scale: interpolate(phone, [0, 1], [0.75, 1]),
            opacity: Math.min(1, phone * 1.5),
            rotate: `${interpolate(frame, [0, f(dur)], [-1.5, 1.5])}deg`,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 46, overflow: "hidden", background: "linear-gradient(180deg, #F6F1E7 0%, #E9E1D2 100%)" }}>
            <div style={{ position: "absolute", top: 22, left: 22, background: "rgba(11,10,8,0.85)", color: "#FFFFFF", fontFamily: MONO, fontWeight: 700, fontSize: 20, padding: "8px 16px", borderRadius: 999, letterSpacing: 1 }}>
              <span style={{ color: "#FF5A5F" }}>{badge.startsWith("●") ? "● " : ""}</span>
              {badge.replace(/^●\s*/, "")}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
              {sc.illus ? (
                <div style={{ scale: zoom }}>
                  <Illus name={sc.illus} size={250} />
                </div>
              ) : null}
              {sc.title ? (
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 36, color: NAVY, textAlign: "center", padding: "0 26px", lineHeight: 1.2 }}>{sc.title}</div>
              ) : null}
            </div>
            {sc.button ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 34,
                  left: "50%",
                  translate: "-50% 0px",
                  scale: interpolate(btn, [0, 1], [0.6, 1]),
                  opacity: Math.min(1, btn * 2),
                  background: "#FFFFFF",
                  color: NAVY,
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 24,
                  padding: "14px 26px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                }}
              >
                ▶ {sc.button}
              </div>
            ) : null}
          </div>
        </div>
        {cards.map((c, i) => {
          const at = atOr(c.at, i, cards.length, dur, 0.6);
          return (
            <React.Fragment key={i}>
              <FloatCard c={c} at={at} i={i} />
              <Sfx name="pop" at={at} volume={0.3} />
            </React.Fragment>
          );
        })}
      </div>
      <Sfx name="rise" at={0} volume={0.25} />
    </>
  );
};
