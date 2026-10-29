import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  atOr,
  BIcon,
  BODY,
  Card,
  CORAL,
  CYAN,
  f,
  GREEN,
  Illus,
  IllusTile,
  MONO,
  NAVY,
  Sfx,
  ThemedIllus,
  Top,
  usePop,
  useRise,
  useSceneDur,
  useTheme,
} from "../theme";
import type { Scene } from "../types";

type S<T extends Scene["type"]> = Extract<Scene, { type: T }>;

const Block: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const r = useRise(at, 30, 10);
  return <div style={{ ...r, ...style }}>{children}</div>;
};

/** Phone showing a generic sample website that assembles block by block. */
export const Phone: React.FC<{ s: S<"phone"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const phone = usePop(0.1);
  const step = Math.max(0.25, (dur - 1.2) / 6);
  const at = (i: number) => 0.4 + i * step;
  const [b1, b2] = s.site.buttons ?? ["Call karo", "WhatsApp"];
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={84} />
      <div
        style={{
          alignSelf: "center",
          scale: interpolate(phone, [0, 1], [0.8, 1]),
          rotate: `${interpolate(frame, [0, f(dur)], [-2, 2])}deg`,
          opacity: Math.min(1, phone),
          width: 520,
          height: 880,
          borderRadius: 64,
          background: "#050D22",
          padding: 20,
          boxShadow: "0 40px 120px rgba(0,194,255,0.35)",
          border: "4px solid #22396E",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", height: "100%", borderRadius: 48, background: "#F4F7FC", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Block at={at(0)} style={{ background: NAVY, padding: "46px 30px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 32, color: "#FFFFFF" }}>{s.site.name}</div>
            <div style={{ fontFamily: MONO, fontSize: 30, color: CYAN }}>☰</div>
          </Block>
          <Block at={at(1)} style={{ padding: "30px 30px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 42, color: NAVY, lineHeight: 1.15 }}>{s.site.tagline}</div>
            <div style={{ height: 14, width: "80%", background: "#D5DEEE", borderRadius: 7 }} />
            <div style={{ height: 14, width: "60%", background: "#D5DEEE", borderRadius: 7 }} />
          </Block>
          <Block at={at(2)} style={{ padding: "6px 30px", display: "flex", gap: 16 }}>
            <div style={{ flex: 1, background: NAVY, color: "#FFFFFF", fontFamily: BODY, fontWeight: 600, fontSize: 28, borderRadius: 20, padding: "22px 0", textAlign: "center" }}>{b1}</div>
            <div style={{ flex: 1, background: GREEN, color: "#04220F", fontFamily: BODY, fontWeight: 600, fontSize: 28, borderRadius: 20, padding: "22px 0", textAlign: "center" }}>{b2}</div>
          </Block>
          <Block at={at(3)} style={{ margin: "22px 30px 0", height: 190, borderRadius: 22, background: "#DCEBF7", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#C3D9EC 3px, transparent 3px), linear-gradient(90deg, #C3D9EC 3px, transparent 3px)", backgroundSize: "56px 56px" }} />
            <div style={{ position: "absolute", left: 200, top: 50, width: 56, height: 56, borderRadius: "50% 50% 50% 0", rotate: "-45deg", background: CORAL }} />
            <div style={{ position: "absolute", left: 16, bottom: 12, fontFamily: BODY, fontWeight: 600, fontSize: 26, color: NAVY }}>Maps location</div>
          </Block>
          <Block at={at(4)} style={{ margin: "20px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ height: 56, borderRadius: 14, background: "#FFFFFF", border: "3px solid #D5DEEE" }} />
            <div style={{ height: 58, borderRadius: 14, background: CYAN, color: NAVY, fontFamily: BODY, fontWeight: 700, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {s.site.form ?? "Enquiry bhejo"}
            </div>
          </Block>
          <Block at={at(5)} style={{ marginTop: "auto", padding: 16, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: NAVY }}>
            <BIcon size={36} />
            <div style={{ fontFamily: MONO, fontWeight: 500, fontSize: 22, color: "#9FB3D9" }}>{s.site.label ?? "Sample design"}</div>
          </Block>
        </div>
      </div>
      <Sfx name="pop" at={0.1} volume={0.3} />
      {[1, 2, 3, 4].map((i) => (
        <Sfx key={i} name="tick" at={at(i)} volume={0.18} />
      ))}
    </>
  );
};

/** WhatsApp-style enquiry chat. */
export const Chat: React.FC<{ s: S<"chat"> }> = ({ s }) => {
  const dur = useSceneDur();
  const n = s.messages.length;
  const box = useRise(0.2, 40);
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={84} />
      <div style={{ ...box, borderRadius: 40, overflow: "hidden", border: "4px solid #22396E", background: "#ECE5DD" }}>
        <div style={{ background: "#075E54", padding: "26px 32px", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Illus name="shop" size={50} />
          </div>
          <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 38, color: "#FFFFFF" }}>{s.title ?? "Your Business"}</div>
        </div>
        <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 20, minHeight: 420 }}>
          {s.messages.map((m, i) => {
            const at = atOr(m.at, i, n, dur, 0.5);
            return <Bubble key={i} at={at} mine={m.from === "shop"} text={m.text} />;
          })}
        </div>
      </div>
      {s.messages.map((m, i) => (
        <Sfx key={i} name="pop" at={atOr(m.at, i, n, dur, 0.5)} volume={0.3} />
      ))}
    </>
  );
};

const Bubble: React.FC<{ at: number; mine: boolean; text: string }> = ({ at, mine, text }) => {
  const p = usePop(at);
  return (
    <div
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "82%",
        background: mine ? "#DCF8C6" : "#FFFFFF",
        borderRadius: 26,
        padding: "20px 26px",
        fontFamily: BODY,
        fontWeight: 500,
        fontSize: 38,
        color: "#111B21",
        lineHeight: 1.3,
        opacity: Math.min(1, p),
        scale: interpolate(p, [0, 1], [0.7, 1]),
        transformOrigin: mine ? "right bottom" : "left bottom",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      {text}
    </div>
  );
};

/** Myth vs fact / pehle vs baad: left column gets struck, right column ticks. */
export const Versus: React.FC<{ s: S<"versus"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const strikeAt = Math.min(dur * 0.4, dur - 1.2);
  const rightAt = strikeAt + 0.35;
  const left = useRise(0.3, 40);
  const right = useRise(rightAt, 40);
  const strike = interpolate(frame, [f(strikeAt), f(strikeAt) + 8], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const col = (title: string, items: string[], bad: boolean): React.ReactNode => (
    <Card style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, padding: "30px 28px", border: `4px solid ${bad ? "rgba(255,90,95,0.6)" : CYAN}` }}>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, color: bad ? CORAL : t.hi }}>{(bad ? "❌ " : "✅ ") + title}</div>
      {items.map((it, i) => (
        <div key={i} style={{ position: "relative", fontFamily: BODY, fontWeight: 600, fontSize: 40, color: bad ? t.muted : t.fg, lineHeight: 1.2 }}>
          {it}
          {bad ? <div style={{ position: "absolute", left: 0, top: "52%", height: 5, width: `${strike}%`, background: CORAL, borderRadius: 3 }} /> : null}
        </div>
      ))}
    </Card>
  );
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={84} />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={left}>{col(s.left.title, s.left.items, true)}</div>
        <div style={right}>{col(s.right.title, s.right.items, false)}</div>
      </div>
      <Sfx name="type" at={strikeAt} volume={0.4} />
      <Sfx name="ding" at={rightAt} volume={0.25} />
    </>
  );
};

/** Customer journey: 2–4 steps with arrows that draw in. */
export const Flow: React.FC<{ s: S<"flow"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const n = s.steps.length;
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={84} />
      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "flex-start" }}>
        {s.steps.map((st, i) => {
          const at = atOr(st.at, i, n, dur, 0.4);
          const p = usePopSafe(at);
          const arrow = interpolate(frame, [f(at) + 4, f(at) + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <React.Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 30, opacity: Math.min(1, p), scale: interpolate(p, [0, 1], [0.7, 1]), transformOrigin: "left center" }}>
                <IllusTile name={st.illus} size={150} />
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 52, color: t.fg }}>{st.label}</div>
              </div>
              {i < n - 1 ? (
                <div style={{ marginLeft: 70, width: 10, height: 64 * arrow, background: CYAN, borderRadius: 5, margin: "10px 0 10px 70px" }} />
              ) : null}
              <Sfx name="pop" at={at} volume={0.3} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
// hooks inside map are fine here because the step count is fixed per render
const usePopSafe = usePop;

/** Free illustration row/grid with labels; cross = red ✗ at that second (loss moment). */
export const IllusScene: React.FC<{ s: S<"illus"> }> = ({ s }) => {
  const frame = useCurrentFrame();
  const dur = useSceneDur();
  const t = useTheme();
  const n = s.items.length;
  const size = n <= 2 ? 330 : n === 3 ? 250 : 210;
  return (
    <>
      <Top kicker={s.kicker} head={s.head} sub={s.sub} size={88} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center" }}>
        {s.items.map((it, i) => {
          const at = atOr(it.at, i, n, dur, 0.3);
          const p = usePopSafe(at);
          const bob = Math.sin((frame - f(at)) / 9) * 8;
          const crossP = it.cross === undefined ? 0 : interpolate(frame, [f(it.cross), f(it.cross) + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: Math.min(1, p) * (1 - crossP * 0.45), scale: interpolate(p, [0, 1], [0.3, 1]), translate: `0px ${bob}px`, position: "relative" }}>
              <ThemedIllus name={it.illus} size={size} />
              {it.label ? (
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 40, color: it.bad ? CORAL : t.fg, background: t.card, border: `3px solid ${t.cardBorder}`, borderRadius: 999, padding: "8px 24px" }}>{it.label}</div>
              ) : null}
              {it.cross !== undefined ? (
                <div style={{ position: "absolute", top: size * 0.1, left: "50%", marginLeft: -size * 0.32, width: size * 0.64, height: size * 0.64, scale: crossP }}>
                  <Illus name="cross" size={size * 0.64} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {s.items.map((it, i) => (
        <React.Fragment key={i}>
          <Sfx name="pop" at={atOr(it.at, i, n, dur, 0.3)} volume={0.25} />
          {it.cross !== undefined ? <Sfx name="type" at={it.cross} volume={0.5} /> : null}
        </React.Fragment>
      ))}
    </>
  );
};
