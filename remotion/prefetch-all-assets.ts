import { prefetch, staticFile } from "remotion";
import type { Planet, Rocket, TopSector } from "../src/config";
import { contributionSceneAssets } from "./PortfolioSummary";
import { prefetchLandingAssets } from "./EndScene";
import { getTransactionsAssetsToPrefetch } from "./Transactions";
import { getMainAssetsToPrefetch } from "./Main";
import { getOpeningAssetsToPrefetch } from "./Opening";
import { getPortfolioValueHistoryAssetToPrefetch } from "./PortfolioValueHistory/PortfolioValueHistory";
import { getPathAssetsToPrefetch } from "./TotalTransactions/Path";
import { getSevenSegmentAssetsToPrefetch } from "./SevenSegment/SevenSegmentNumber";
import { getSideRocketSource } from "./Spaceship";
import { starsAssetsToPreload } from "./Dividends/Star";
import { getTopSectorAssetsToPrefetch } from "./TopSectors/AllPlanets";
import { getFrontRocketSource } from "./TopSectors/svgs/FrontRocketSource";

const collectAllAssetsToPrefetch = ({
  rocket,
  planetType,
  durationInFrames,
  sector1,
  sector2,
  sector3,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
  sector1: TopSector | null;
  sector2: TopSector | null;
  sector3: TopSector | null;
}): string[] => {
  const sideRocket = getSideRocketSource(rocket);
  const frontRocket = getFrontRocketSource(rocket);

  return [
    sideRocket,
    frontRocket,
    staticFile("WhiteHighlight.png"),
    staticFile("PinkHighlight.png"),
    ...getMainAssetsToPrefetch(durationInFrames, rocket),
    ...getTopSectorAssetsToPrefetch({ sector1, sector2, sector3 }),
    ...getOpeningAssetsToPrefetch(rocket),
    ...getTransactionsAssetsToPrefetch(),
    ...starsAssetsToPreload(),
    ...getPortfolioValueHistoryAssetToPrefetch(),
    ...getSevenSegmentAssetsToPrefetch(),
    ...prefetchLandingAssets(planetType),
    ...contributionSceneAssets(),
    ...getPathAssetsToPrefetch(),
  ];
};

export const prefetchAllAssets = ({
  rocket,
  onProgress,
  onError,
  planetType,
  durationInFrames,
  sector1,
  sector2,
  sector3,
}: {
  rocket: Rocket;
  planetType: Planet;
  durationInFrames: number;
  onProgress: (percentage: number) => void;
  onError: (error: Error) => void;
  sector1: TopSector | null;
  sector2: TopSector | null;
  sector3: TopSector | null;
}) => {
  const assets = collectAllAssetsToPrefetch({
    rocket,
    planetType,
    durationInFrames,
    sector1,
    sector2,
    sector3,
  });

  let assetsLoaded = 0;

  const reportProgress = () => {
    const progress = assetsLoaded / assets.length;
    onProgress(progress);
  };

  assets.forEach((asset) => {
    prefetch(asset)
      .waitUntilDone()
      .then(() => {
        assetsLoaded++;
        reportProgress();
      })
      .catch((err) => onError(err));
  });
};
