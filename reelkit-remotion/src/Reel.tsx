import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Series, staticFile } from "remotion";
import { Compare, Hook, List, Search } from "./scenes/Basic";
import { Cta, Offer, Plan, Stat } from "./scenes/Cards";
import { Chat, Flow, IllusScene, Phone, Versus } from "./scenes/Mockups";
import { Background, f, Shell, THEMES, ThemeCtx } from "./theme";
import type { ReelProps, Scene } from "./types";

export const reelFrames = (p: ReelProps) => p.scenes.reduce((a, s) => a + f(s.dur), 0);

export const calculateReelMetadata: CalculateMetadataFunction<ReelProps> = ({ props }) => ({
  durationInFrames: Math.max(30, reelFrames(props)),
});

const Body: React.FC<{ s: Scene }> = ({ s }) => {
  switch (s.type) {
    case "hook":
      return <Hook s={s} />;
    case "search":
      return <Search s={s} />;
    case "compare":
      return <Compare s={s} />;
    case "list":
      return <List s={s} />;
    case "phone":
      return <Phone s={s} />;
    case "chat":
      return <Chat s={s} />;
    case "stat":
      return <Stat s={s} />;
    case "versus":
      return <Versus s={s} />;
    case "flow":
      return <Flow s={s} />;
    case "illus":
      return <IllusScene s={s} />;
    case "offer":
      return <Offer s={s} />;
    case "plan":
      return <Plan s={s} />;
    case "cta":
      return <Cta s={s} />;
  }
};

export const Reel: React.FC<ReelProps> = (props) => {
  const theme = THEMES[props.theme ?? "navy"];
  const total = reelFrames(props);
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill>
        <Background total={total} />
        <Series>
          {props.scenes.map((s, i) => (
            <Series.Sequence key={i} name={`${i + 1} ${s.type}`} durationInFrames={f(s.dur)}>
              <Shell dur={s.dur} stickers={s.stickers} first={i === 0}>
                <Body s={s} />
              </Shell>
            </Series.Sequence>
          ))}
        </Series>
        {props.voice ? <Audio src={staticFile(props.voice)} name="Voiceover" /> : null}
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};
