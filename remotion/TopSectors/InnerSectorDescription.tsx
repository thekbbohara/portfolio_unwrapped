import React, { useMemo } from "react";
import type { z } from "zod";
import type { sectorSchema } from "../../src/config";
import {
  HORIZONTAL_PADDING,
  INNER_BORDER_RADIUS,
  InnerSectorPercentage,
} from "./InnerSectorPercentage";
import { OLD_PANE_BACKGROUND, PANE_BORDER } from "./Pane";
import { computePlanetInfo, mapLanguageToPlanet } from "./constants";

const label: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: OLD_PANE_BACKGROUND,
  border: PANE_BORDER,
  paddingLeft: HORIZONTAL_PADDING,
  borderRadius: INNER_BORDER_RADIUS + HORIZONTAL_PADDING,
  lineHeight: 1,
};

const num: React.CSSProperties = {
  fontSize: 60,
  color: "white",
  fontWeight: 800,
  width: 80,
  height: 80,
  background: "rgba(255, 255, 255, 0.1)",
  border: PANE_BORDER,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  borderRadius: INNER_BORDER_RADIUS,
  marginRight: HORIZONTAL_PADDING,
  fontFamily: "Mona Sans",
};

const sectorBaseStyle: React.CSSProperties = {
  fontSize: 74,
  fontFamily: "Mona Sans",
  fontWeight: 800,
};

export const InnerSectorDescription: React.FC<{
  readonly sector: z.infer<typeof sectorSchema>;
  readonly position: number;
}> = ({ sector, position }) => {
  const sectorStyle = useMemo(() => {
    return {
      ...sectorBaseStyle,
      color: computePlanetInfo(sector).textColor,
    };
  }, [sector]);

  return (
    <div style={label}>
      <div style={num}>{position}</div>
      <div
        style={{
          padding: `${HORIZONTAL_PADDING}px ${HORIZONTAL_PADDING}px`,
        }}
      >
        <div style={sectorStyle}>
          {sector.name}
        </div>
      </div>
      <div
        style={{
          height: "100%",
          width: 1,
          borderLeft: PANE_BORDER,
        }}
      />
      <InnerSectorPercentage sector={sector} />
    </div>
  );
};
