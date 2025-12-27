import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { z } from "zod";
import type { sectorSchema } from "../../src/config";
import { computePlanetInfo } from "./constants";

export const INNER_BORDER_RADIUS = 10;
export const HORIZONTAL_PADDING = 20;

const num2: React.CSSProperties = {
  fontSize: 50,
  fontWeight: 500,
  color: "white",
  marginLeft: 30,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  borderRadius: INNER_BORDER_RADIUS,
  marginRight: HORIZONTAL_PADDING,
  fontFamily: "Mona Sans",
};

export const InnerSectorPercentage: React.FC<{
  sector: z.infer<typeof sectorSchema>;
}> = ({ sector }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countUp = Math.round(
    spring({
      fps,
      frame,
      config: {
        damping: 200,
      },
      delay: 10,
    }) *
    sector.percent *
    100,
  );

  return (
    <div
      style={{
        ...num2,
        color: computePlanetInfo(sector).textColor,
        marginRight: 30,
        width: 90,
        textAlign: "revert",
      }}
    >
      {countUp}%
    </div>
  );
};
