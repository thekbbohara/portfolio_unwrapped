import React from "react";
import { AbsoluteFill } from "remotion";
import type { TopSector } from "../../src/config";
import {
  BoxHighlight,
  PinkHighlightBox,
} from "../../vite/HomeBox/BoxHighlight";
import { PANE_BACKGROUND } from "../TopSectors/Pane";
import { BarChart } from "./BarChart";
import { ContributionGraphic } from "./GraphData";
import { Issues } from "./Issues";
import { Planets } from "./Planets";
import { Stars } from "./Stars";
import { Title } from "./Title";

export const Overlay: React.FC<{
  readonly issues: number;
  readonly contributionData: number[];
  readonly weekdays: number[];
  readonly pullRequests: number;
  readonly stars: number;
  readonly login: string;
  readonly topSector: TopSector | null;
  readonly longestStreak: number;
  readonly totalContributions: number;
}> = ({
  issues,
  contributionData,
  weekdays,
  pullRequests,
  stars,
  login,
  topSector,
  longestStreak,
  totalContributions,
}) => {
    return (
      <AbsoluteFill
        style={{
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 30,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <BoxHighlight />
        <PinkHighlightBox />
        <div
          style={{
            background: PANE_BACKGROUND,
            borderRadius: 10,
            height: "100%",
            width: "100%",
          }}
        >
          <Title login={login} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: `1px solid rgb(183, 171, 239)`,
            }}
          >
            <Stars stars={stars} label="Repos starred" icon="stars" />
            <div
              style={{
                width: 1,
                height: 160,
                backgroundColor: "rgb(183, 171, 239)",
              }}
            />
            <Stars stars={pullRequests} label="PRs merged" icon="pulls" />
          </div>
          <Issues issues={issues} />
          {topSector ? <Planets topSector={topSector} /> : null}
          <div
            style={{
              borderBottom: `1px solid rgb(183, 171, 239)`,
            }}
          >
            <BarChart graphData={weekdays} />
          </div>
          <ContributionGraphic
            login={login}
            longestStreak={longestStreak}
            totalContributions={totalContributions}
            graphData={contributionData}
          />
        </div>
      </AbsoluteFill>
    );
  };
