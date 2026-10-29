import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import React, { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import ILL from "./illus.json";
import type { Sticker } from "./types";

export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const NAVY = "#0A1A3F";
export const CYAN = "#00C2FF";
export const GREEN = "#25D366";
export const CORAL = "#FF5A5F";
export const AMBER = "#FFB020";

export const HEAD = "Manrope";
export const MONO = "JetBrains Mono";
export const BODY = "Inter";

const fonts: [string, string, string][] = [
  [HEAD, "manrope-latin-800-normal.woff2", "800"],
  [HEAD, "manrope-latin-700-normal.woff2", "700"],
  [MONO, "jetbrains-mono-latin-500-normal.woff2", "500"],
  [MONO, "jetbrains-mono-latin-700-normal.woff2", "700"],
  [BODY, "inter-latin-500-normal.woff2", "500"],
  [BODY, "inter-latin-600-normal.woff2", "600"],
  [BODY, "inter-latin-700-normal.woff2", "700"],
];
for (const [family, file, weight] of fonts) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight });
}

export type Theme = {
  name: "navy" | "light";
  bg: string;
  fg: string;
  muted: string;
  card: string;
  cardBorder: string;
  hi: string; // highlight colour for *words*
  grid: string;
  glow: string;
};

export const THEMES: Record<"navy" | "light", Theme> = {
  navy: {
    name: "navy",
    bg: NAVY,
    fg: "#FFFFFF",
    muted: "#9FB3D9",
    card: "#0F2452",
    cardBorder: "#22396E",
    hi: CYAN,
    grid: "rgba(0,194,255,0.06)",
    glow: "rgba(0,194,255,0.22)",
  },
  light: {
    name: "light",
    bg: "#F2F6FC",
    fg: NAVY,
    muted: "#4A5B80",
    card: "#FFFFFF",
    cardBorder: "#D5DEEE",
    hi: "#0091C2",
    grid: "rgba(10,26,63,0.05)",
    glow: "rgba(0,194,255,0.25)",
  },
};

export const ThemeCtx = createContext<Theme>(THEMES.navy);
export const useTheme = () => useContext(ThemeCtx);

export const SceneDur = createContext<number>(3); // seconds
export const useSceneDur = () => useContext(SceneDur);

export const f = (s: number) => Math.round(s * FPS);

/** Where the i-th of n reveals lands if the spec gave no "at" (seconds). */
export const autoAt = (i: number, n: number, dur: number, start = 0.5, endPad = 1.3) => {
  const span = Math.max(0.3, dur - start - endPad);
  return n <= 1 ? start : start + (i * span) / (n - 1);
};
export const atOr = (at: number | undefined, i: number, n: number, dur: number, start?: number) =>
  Math.min(at ?? autoAt(i, n, dur, start), Math.max(0.2, dur - 0.5));

export const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Fade + rise in at `at` seconds. */
export const useRise = (at: number, dist = 40, durF = 12) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [f(at), f(at) + durF], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return { opacity: p, translate: `0px ${(1 - p) * dist}px` } as const;
};

export const usePop = (at: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - f(at), fps, config: { damping: 12, stiffness: 180 } });
};

/** One sound effect at `at` seconds (scene-relative). */
export const Sfx: React.FC<{ name: "whoosh" | "pop" | "tick" | "ding" | "type" | "rise"; at: number; volume?: number }> = ({
  name,
  at,
  volume = 0.35,
}) => (
  <Sequence from={f(at)} durationInFrames={f(1)} layout="none" name={`sfx ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

export const Illus: React.FC<{ name: string; size: number; style?: React.CSSProperties }> = ({ name, size, style }) => {
  const svg = (ILL as Record<string, string>)[name] ?? (ILL as Record<string, string>).website;
  return <div style={{ width: size, height: size, flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: svg }} />;
};

/** Illustration on a tile so it reads on both themes. */
export const IllusTile: React.FC<{ name: string; size: number; style?: React.CSSProperties }> = ({ name, size, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
      ...style,
    }}
  >
    <Illus name={name} size={size * 0.8} />
  </div>
);

/** On the navy theme the illustrations' navy parts would vanish, so they sit on white tiles there. */
export const ThemedIllus: React.FC<{ name: string; size: number }> = ({ name, size }) => {
  const t = useTheme();
  return t.name === "navy" ? <IllusTile name={name} size={size} /> : <Illus name={name} size={size} />;
};

export const StickerLayer: React.FC<{ stickers?: Sticker[]; instant?: boolean }> = ({ stickers, instant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!stickers?.length) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {stickers.map((s, i) => {
        const at = instant ? -30 : f(s.at ?? 0.15 + i * 0.25);
        const size = s.size ?? 260;
        const p = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 160 } });
        const anim = s.anim ?? "pop";
        const bob = Math.sin((frame - at) / 9) * 8;
        let translate = `0px ${bob}px`;
        let scale = interpolate(p, [0, 1], [0.2, 1]);
        let rotate = s.rot ?? 0;
        if (anim === "drop") {
          translate = `0px ${interpolate(p, [0, 1], [-500, 0]) + bob}px`;
          scale = 1;
        } else if (anim === "drive") {
          translate = `${interpolate(p, [0, 1], [-900, 0])}px ${bob * 0.4}px`;
          scale = 1;
        } else if (anim === "wiggle") {
          rotate += Math.sin((frame - at) / 4) * 6;
        } else if (anim === "float") {
          translate = `0px ${Math.sin((frame - at) / 14) * 18}px`;
        }
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x - size / 2,
              top: s.y - size / 2,
              opacity: frame < at ? 0 : Math.min(1, p * 2),
              translate,
              scale,
              rotate: `${rotate}deg`,
              filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.25))",
            }}
          >
            <ThemedIllus name={s.illus} size={size} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Navy/light canvas with a slow-drifting glow and a faint grid. */
export const Background: React.FC<{ total: number }> = ({ total }) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  return (
    <AbsoluteFill style={{ backgroundColor: t.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${t.grid} 2px, transparent 2px), linear-gradient(90deg, ${t.grid} 2px, transparent 2px)`,
          backgroundSize: "90px 90px",
          translate: `0px ${interpolate(frame, [0, total], [0, -240])}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${t.glow} 0%, rgba(0,194,255,0) 65%)`,
          left: interpolate(frame, [0, total], [-300, 300]),
          top: interpolate(frame, [0, total / 2, total], [-200, 600, 1100]),
        }}
      />
    </AbsoluteFill>
  );
};

/** The <B> icon: cyan "<" + B made of ">" brackets. */
export const BIcon: React.FC<{ size: number; bColor?: string }> = ({ size, bColor = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round">
    <path d="M58 62 L22 100 L58 138" stroke={CYAN} />
    <path d="M98 100 H146 L174 72 L146 44 H98 V156 H152 L180 128 L152 100 H146" stroke={bColor} />
  </svg>
);

export const Logo: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const t = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 * scale }}>
      <BIcon size={120 * scale} bColor={t.fg} />
      <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 78 * scale, letterSpacing: 10 * scale, color: t.fg }}>BARKATI</div>
    </div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; at?: number; instant?: boolean }> = ({ children, at = 0, instant }) => {
  const rise = useRise(at, 20);
  const r = instant ? {} : rise;
  const t = useTheme();
  return <div style={{ ...r, fontFamily: MONO, fontWeight: 700, fontSize: 40, color: t.hi, letterSpacing: 4 }}>{children}</div>;
};

/** Headline revealed word by word; *word* = highlight colour. instant = fully visible on frame 0 (hook/cover). */
export const Headline: React.FC<{ text: string; at?: number; size?: number; step?: number; instant?: boolean }> = ({
  text,
  at = 0,
  size = 92,
  step = 3,
  instant = false,
}) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const words = text.split(" ");
  return (
    <div
      style={{
        fontFamily: HEAD,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.12,
        color: t.fg,
        letterSpacing: -1,
        scale: instant ? interpolate(frame, [0, 10], [1.05, 1], { extrapolateRight: "clamp", easing: ease }) : 1,
        transformOrigin: "left center",
      }}
    >
      {words.map((w, i) => {
        const hi = w.startsWith("*") || w.endsWith("*") || w.includes("*");
        const clean = w.replace(/\*/g, "");
        const s = f(at) + i * step;
        const p = instant
          ? 1
          : interpolate(frame, [s, s + 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              translate: `0px ${(1 - p) * 30}px`,
              color: hi ? t.hi : t.fg,
              marginRight: size * 0.26,
            }}
          >
            {clean}
          </span>
        );
      })}
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; at?: number }> = ({ children, at = 0.6 }) => {
  const r = useRise(at, 20);
  const t = useTheme();
  return <div style={{ ...r, fontFamily: BODY, fontWeight: 500, fontSize: 44, color: t.muted, lineHeight: 1.35 }}>{children}</div>;
};

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const t = useTheme();
  return (
    <div style={{ background: t.card, border: `3px solid ${t.cardBorder}`, borderRadius: 36, padding: "32px 36px", ...style }}>
      {children}
    </div>
  );
};

/**
 * Scene wrapper: safe area (text/cards between y≈220 and y≈1480, right 150 px kept clear for
 * Instagram buttons), quick fade at both ends, whoosh at the start, stickers on top.
 */
export const Shell: React.FC<{
  dur: number;
  children: React.ReactNode;
  stickers?: Sticker[];
  first?: boolean;
  align?: "center" | "start";
}> = ({ dur, children, stickers, first, align = "center" }) => {
  const frame = useCurrentFrame();
  const total = f(dur);
  const opacity = first
    ? interpolate(frame, [total - 5, total], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, 5, total - 5, total], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drift = interpolate(frame, [0, total], [1, 1.025]);
  return (
    <SceneDur.Provider value={dur}>
      <AbsoluteFill style={{ opacity, scale: drift }}>
        <AbsoluteFill
          style={{
            padding: "220px 150px 440px 90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: align === "center" ? "center" : "flex-start",
            gap: 44,
          }}
        >
          {children}
        </AbsoluteFill>
        <StickerLayer stickers={stickers} instant={first} />
      </AbsoluteFill>
      {first ? null : <Sfx name="whoosh" at={0} volume={0.3} />}
    </SceneDur.Provider>
  );
};

/** Kicker + headline + sub block used by most scenes. */
export const Top: React.FC<{ kicker?: string; head?: string; sub?: string; size?: number; instant?: boolean }> = ({
  kicker,
  head,
  sub,
  size,
  instant,
}) => (
  <>
    {kicker ? (
      <Kicker at={0} instant={instant}>
        {kicker}
      </Kicker>
    ) : null}
    {head ? <Headline text={head} at={instant ? 0 : 0.1} size={size} instant={instant} /> : null}
    {sub ? <Sub at={instant ? 0.3 : 0.7}>{sub}</Sub> : null}
  </>
);
