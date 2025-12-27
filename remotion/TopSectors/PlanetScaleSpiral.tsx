import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { z } from "zod";
import { cornerType, sectorSchema, rocketSchema } from "../../src/config";
import { Gradient } from "../Gradients/NativeGradient";
import { isMobileDevice } from "../Opening/devices";
import { SectorDescription } from "./SectorDescription";
import { PlanetScaleSpiralWhole } from "./PlanetScaleSpiralWhole";
import { computePlanetInfo } from "./constants";
import {
  deriveClockDirectionFromEnterDirection,
  deriveEnterDirectionFromCorner,
  deriveStartRotationFromEnterDirection,
} from "./corner";

export const spiralSchema = z.object({
  sector: sectorSchema,
  showHelperLine: z.boolean(),
  corner: cornerType,
  position: z.number().int(),
  rocket: rocketSchema,
});

export const PlanetScaleSpiral: React.FC<z.infer<typeof spiralSchema>> = ({
  sector,
  showHelperLine,
  corner,
  position,
  rocket,
}) => {
  const frame = useCurrentFrame();

  const zoomOutProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const scale = interpolate(zoomOutProgress, [0, 1], [1.5, 1]);

  const style: React.CSSProperties = useMemo(() => {
    return {
      transform: `scale(${scale})`,
    };
  }, [scale]);

  const enterDirection = deriveEnterDirectionFromCorner(corner);
  const clockDirection = deriveClockDirectionFromEnterDirection(enterDirection);
  const startRotation = deriveStartRotationFromEnterDirection(enterDirection);

  const planetInfo = computePlanetInfo(sector);

  return (
    <AbsoluteFill>
      {isMobileDevice() ? null : (
        <Audio startFrom={30} src={staticFile("fly-in-circles.mp3")} />
      )}
      {isMobileDevice() ? null : (
        <Sequence from={35}>
          <Audio src={staticFile("third-whoosh.mp3")} />
        </Sequence>
      )}
      <AbsoluteFill style={{ opacity: planetInfo.opacity }}>
        <Gradient gradient={planetInfo.gradient} />
      </AbsoluteFill>
      <AbsoluteFill style={style}>
        <PlanetScaleSpiralWhole
          rocket={rocket}
          startRotationInRadians={startRotation}
          showHelperLine={showHelperLine}
          sector={sector}
          clockDirection={clockDirection}
        />
      </AbsoluteFill>
      <Sequence from={40}>
        <SectorDescription
          delay={0}
          duration={90}
          sector={sector}
          position={position}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
