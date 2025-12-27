import type { TopSector } from "../../src/config";
import { SectorPlanet } from "../TopSectors/SectorPlanet";
import { computePlanetInfo } from "../TopSectors/constants";

export const Planets: React.FC<{
  topSector: TopSector;
}> = ({ topSector }) => {
  const planetInfo = computePlanetInfo(topSector);

  return (
    <div
      style={{
        position: "absolute",
        top: 158,
        left: 1090,
        width: 360,
        height: 175,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 20,
        flexDirection: "column",
      }}
    >
      <SectorPlanet
        planetInfo={planetInfo}
        style={{
          height: 100,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          color: "white",
          fontFamily: "Mona Sans",
          fontSize: 18,
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        Top Sector
      </div>
      <div
        style={{
          fontFamily: "Mona Sans",
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {planetInfo.name}
      </div>
    </div>
  );
};
