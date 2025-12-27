import React, { useMemo } from "react";
import { Series, random } from "remotion";
import { SectorPlanet } from "./SectorPlanet";
import { computePlanetInfo } from "./constants";
import { sectorSchema } from "../../src/config";
import { z } from "zod";

const mockSectors: z.infer<typeof sectorSchema>[] = [
  { name: "Banking", percent: 30, color: "#FFD700" },
  { name: "Hydropower", percent: 25, color: "#00BFFF" },
  { name: "Insurance", percent: 20, color: "#FF69B4" },
  { name: "Finance", percent: 15, color: "#32CD32" },
  { name: "Investment", percent: 10, color: "#8A2BE2" },
  { name: "Manufacturing", percent: 5, color: "#FF4500" },
];

const planets = mockSectors.map((sector) => computePlanetInfo(sector));

export const getRotatingPlanetsToPrefetch = (): string[] => {
  return []; // No assets to prefetch for now
};

const planetStyle: React.CSSProperties = {
  width: 110,
  height: 110,
};

export const RotatingPlanet: React.FC<{
  readonly randomSeed: string;
}> = ({ randomSeed }) => {
  const sortedRandomly = useMemo(() => {
    return planets.slice().sort((a) => {
      // Use name as seed supplement since we don't have source to distinguish
      return 0.5 - random(randomSeed + "seed" + planets.indexOf(a));
    });
  }, [randomSeed]);

  return (
    <div>
      <Series>
        {sortedRandomly.map((Planet, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Series.Sequence key={i} durationInFrames={16} layout="none">
            <SectorPlanet planetInfo={Planet} style={planetStyle} />
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
