import React from "react";
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { rocketSchema } from "../../src/config";
import { VIDEO_FPS } from "../../types/constants";
import { Gradient } from "../Gradients/NativeGradient";
import { Noise } from "../Noise";
import { RocketComponent } from "../Transactions/Rocket";
import { Actions } from "./Actions";
import { Stars } from "./Stars";
import { Words } from "./Words";
import { YellowHighlight } from "./YellowHighlight";

export const dividendsSchema = z.object({
  totalDividends: z.number().min(0),
  rocket: rocketSchema,
});

export const getDividendsDuration = (totalDividends: number) => {
  if (totalDividends === 0) {
    return 150;
  }
  return 200 + Math.min(100, totalDividends * 5);
};

export const calculateDividendsDuration: CalculateMetadataFunction<
  z.infer<typeof dividendsSchema>
> = ({ defaultProps: { totalDividends } }) => {
  return {
    durationInFrames: getDividendsDuration(totalDividends),
  };
};

export const Dividends: React.FC<z.infer<typeof dividendsSchema>> = ({
  totalDividends,
  rocket,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Gradient gradient="beamed" />
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <Noise translateX={-10} translateY={-5} />
      </AbsoluteFill>
      <Stars totalDividends={totalDividends} />
      <AbsoluteFill>
        <Words totalDividends={totalDividends} />
        {totalDividends > 0 ? (
          <AbsoluteFill style={{}}>
            <YellowHighlight />
          </AbsoluteFill>
        ) : null}
        <Actions totalDividends={totalDividends} />
        {totalDividends > 0 ? (
          <RocketComponent
            rocket={rocket}
            shots={[]}
            jumpIn={0}
          />
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
