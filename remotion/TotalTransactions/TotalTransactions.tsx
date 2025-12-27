import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Gradient } from "../Gradients/NativeGradient";
import { accentColorToGradient } from "../Opening/TitleImage";
import { isMobileDevice } from "../Opening/devices";
import { PATHS_COMP_HEIGHT } from "./Path";
import { WholePaths } from "./WholePaths";
import { ANIMATE_OUT_DURATION_PR, animateOutPullRequest } from "./animate-out";

const endHeight = 1080;

export const totalTransactionsSchema = z.object({
  totalTransactions: z.number().min(0),
});

const MAX_PATHS = 30;
export const TOTAL_TRANSACTIONS_DURATION = 260; // Renamed from PULL_REQUESTS_DURATION

export const TotalTransactions: React.FC<z.infer<typeof totalTransactionsSchema>> = ({
  totalTransactions,
}) => {
  const initialOffset = PATHS_COMP_HEIGHT - endHeight;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const evolution = interpolate(frame, [0, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const offset = interpolate(evolution, [0, 1], [initialOffset, 0]);

  const style: React.CSSProperties = useMemo(() => {
    return {
      height: PATHS_COMP_HEIGHT,
      width: 1080,
      marginTop: -offset,
    };
  }, [offset]);

  const { scaleDivided, entryProgress } = animateOutPullRequest({
    fps,
    frame,
    start: TOTAL_TRANSACTIONS_DURATION - ANIMATE_OUT_DURATION_PR,
  });

  const translateY = interpolate(entryProgress, [1, 2], [0, 500]);
  const scale = interpolate(frame, [0, 60], [0, 0.05]);

  const extraPaths = Math.min(MAX_PATHS, totalTransactions);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scaleDivided + scale}) translateY(${translateY}px)`,
      }}
    >
      {isMobileDevice() ? null : (
        <Audio startFrom={40} src={staticFile("reverb.mp3")} />
      )}
      {isMobileDevice() && extraPaths > 0 ? null : (
        <Sequence from={175}>
          <Audio src={staticFile("weigh.mp3")} volume={0.6} />
        </Sequence>
      )}
      <AbsoluteFill style={style}>
        <AbsoluteFill>
          <Gradient gradient={accentColorToGradient()} />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background: "black",
            opacity: interpolate(
              frame,
              [durationInFrames - 20, durationInFrames],
              [0, 1],
            ),
          }}
        />
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame,
              [durationInFrames - 20, durationInFrames],
              [1, 0],
              {
                extrapolateLeft: "clamp",
              },
            ),
          }}
        >
          <WholePaths
            initialTransactions={Math.max(0, totalTransactions - MAX_PATHS)}
            extraPaths={Math.min(MAX_PATHS, totalTransactions)}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
