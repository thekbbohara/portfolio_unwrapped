import { AbsoluteFill } from "remotion";
import { z } from "zod";
import type { Rocket } from "../../src/config";
import { sectorSchema } from "../../src/config";
import { TopSectorsRocket } from "./Rocket";

export const topSectorsSchema = z.object({
  sector1: sectorSchema,
  sector2: sectorSchema.or(z.null()),
  sector3: sectorSchema.or(z.null()),
});

export const TopSectorsCanvas: React.FC<{
  style?: React.CSSProperties;
  rocket: Rocket;
}> = (props) => {
  return (
    <AbsoluteFill style={props.style}>
      <TopSectorsRocket rocket={props.rocket} />
    </AbsoluteFill>
  );
};
