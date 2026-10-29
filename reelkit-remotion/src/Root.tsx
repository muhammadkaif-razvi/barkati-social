import React from "react";
import { Composition } from "remotion";
import example from "../examples/common-website.json";
import { calculateReelMetadata, Reel } from "./Reel";
import { FPS, H, W } from "./theme";
import type { ReelProps } from "./types";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    width={W}
    height={H}
    fps={FPS}
    durationInFrames={600}
    defaultProps={example as ReelProps}
    calculateMetadata={calculateReelMetadata}
  />
);
