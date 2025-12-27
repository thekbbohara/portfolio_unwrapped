import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import type { sectorSchema } from "../../src/config";
import { InnerSectorDescription } from "./InnerSectorDescription";

export const SectorDescription: React.FC<{
  readonly sector: z.infer<typeof sectorSchema>;
  readonly position: number;
  readonly delay: number;
  readonly duration: number;
}> = ({ sector, position, delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
    },
    delay,
    durationInFrames: 20,
  });

  const slideOut = spring({
    fps,
    frame,
    config: {
      mass: 1,
      stiffness: 50,
    },
    durationInFrames: 20,
    delay: delay + duration,
  });

  const translationY = interpolate(slideIn - slideOut, [0, 1], [300, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 50,
        transform: `translateY(${translationY}px)`,
      }}
    >
      <InnerSectorDescription sector={sector} position={position} />
    </AbsoluteFill>
  );
};
