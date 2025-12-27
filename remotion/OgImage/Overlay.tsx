import React from "react";
import { AbsoluteFill } from "remotion";
import type { TopSector } from "../../src/config";
import { BarChart } from "./BarChart";
import { ContributionGraphic } from "./GraphData";
import { Issues } from "./Issues";
import { Planets } from "./Planets";
import { PullRequests } from "./PullRequests";
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
}> = ({
  issues,
  contributionData,
  weekdays,
  pullRequests,
  stars,
  login,
  topSector,
}) => {
    return (
      <AbsoluteFill>
        <Title login={login} />
        <Stars stars={stars} />
        <PullRequests pullRequests={pullRequests} />
        {topSector ? <Planets topSector={topSector} /> : null}
        <BarChart graphData={weekdays} />
        <ContributionGraphic graphData={contributionData} />
        <Issues issues={issues} />
      </AbsoluteFill>
    );
  };
