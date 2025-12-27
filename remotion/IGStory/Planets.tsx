import type { TopSector } from "../../src/config";
import { SectorPlanet } from "../TopSectors/SectorPlanet";
import { PANE_TEXT_COLOR } from "../TopSectors/Pane";
import { computePlanetInfo } from "../TopSectors/constants";

export const Planets: React.FC<{
  topSector: TopSector;
}> = ({ topSector }) => {
  const planetInfo = computePlanetInfo(topSector);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 30,
        flexDirection: "row",
        overflow: "hidden",
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: `1px solid rgb(183, 171, 239)`,
      }}
    >
      <SectorPlanet
        planetInfo={planetInfo}
        style={{
          height: 100,
          marginBottom: 10,
          flexShrink: 0,
        }}
      />
      <div style={{ width: 30 }} />
      <div>
        <div
          style={{
            color: PANE_TEXT_COLOR,
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
            color: PANE_TEXT_COLOR,
            fontSize: 30,
            fontWeight: "bold",
            whiteSpace: "nowrap",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
            width: "100%",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {planetInfo.name}
        </div>
      </div>
    </div>
  );
};
