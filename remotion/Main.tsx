import React, { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  random,
  staticFile,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import { type compositionSchema } from "../src/config";
import type { Rocket } from "../src/config";
import { VIDEO_FPS } from "../types/constants";
import {
  CONTRIBUTIONS_SCENE_DURATION,
  CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION,
  CONTRIBUTIONS_SCENE_EXIT_TRANSITION,
  PortfolioSummaryScene,
} from "./PortfolioSummary";
// import {
//   DividendsAndValues,
//   getDividendsAndValuesDuration,
// } from "./DividendsAndValues";
import { END_SCENE_DURATION, EndScene } from "./EndScene";
// import {
//   ISSUES_EXIT_DURATION,
//   Transactions,
//   getTransactionsDuration,
// } from "./Transactions";
import {
  OPENING_SCENE_LENGTH,
  OPENING_SCENE_OUT_OVERLAP,
  OpeningScene,
} from "./Opening";
import { isMobileDevice } from "./Opening/devices";
import { AllPlanets, getDurationOfAllPlanets } from "./TopSectors/AllPlanets";
import { TOP_LANGUAGES_EXIT_DURATION } from "./TopSectors/PlaneScaleWiggle";
import { injectFont } from "./font";
// import { TopCompany } from "./TopCompany/TopCompany";
import { TopCompaniesList } from "./TopCompanies/TopCompaniesList";
import { TotalInvestment } from "./TotalInvestment/TotalInvestment";
import { ProfitLoss } from "./ProfitLoss/ProfitLoss";

type Schema = z.infer<typeof compositionSchema>;

injectFont();

const GENERIC_SCENE_DURATION = 90; // 3 seconds @ 30fps

export const calculateDuration = ({
  topSectors,
}: z.infer<typeof compositionSchema>) => {
  const topSectorsScene = topSectors
    ? getDurationOfAllPlanets({
      topSectors,
      fps: VIDEO_FPS,
    }) - TOP_LANGUAGES_EXIT_DURATION
    : 0;

  // New Duration Calculation for: Name -> Sector -> Company -> Total -> Profit/Loss
  return (
    OPENING_SCENE_LENGTH +
    topSectorsScene +
    GENERIC_SCENE_DURATION + // Top Company
    CONTRIBUTIONS_SCENE_DURATION + // Portfolio Summary (Total Investment)
    GENERIC_SCENE_DURATION // Profit/Loss
  );
};

export const mainCalculateMetadataScene: CalculateMetadataFunction<
  z.infer<typeof compositionSchema>
> = ({ props }) => {
  return {
    durationInFrames: calculateDuration(props),
    props,
  };
};

const getMusicDuration = (durationInSeconds: number) => {
  let sec = 24;
  if (durationInSeconds < 24) return 24;

  while (sec < 57) {
    if (Math.abs(sec - durationInSeconds) <= 1) {
      return sec;
    }

    sec += 2;
  }

  return 56;
};

const getSoundtrack = (durationInFrames: number, rocket: Rocket) => {
  const FPS = 30;
  const blueThemeUrlPrefix = "/blue_theme_music/blue_theme_music_";
  const orangeThemeUrlPrefix = "/red_theme_music/red_theme_music_";
  const yellowThemeUrlPrefix = "/gold_theme_music/gold_theme_music_";
  const postfix = ".mp3";

  const prefix = {
    blue: blueThemeUrlPrefix,
    orange: orangeThemeUrlPrefix,
    yellow: yellowThemeUrlPrefix,
  };

  const durationInSecond = durationInFrames / FPS;

  const adjustedDuration = getMusicDuration(durationInSecond);
  const url = prefix[rocket] + adjustedDuration + postfix;

  return staticFile(url);
};

export const getMainAssetsToPrefetch = (
  durationInFrames: number,
  rocket: Rocket,
) => {
  return [getSoundtrack(durationInFrames, rocket)];
};

export const Main: React.FC<Schema> = ({
  corner,
  topSectors,
  showHelperLine,
  username,
  planet,
  dailyTransactionCount,
  totalPortfolioValue,
  longestProfitableStreak,
  openingSceneStartAngle,
  rocket,
  topCompany,
  profitOrLoss,
  sampleDividends,
}) => {
  const { durationInFrames } = useVideoConfig();

  const soundTrack = useMemo(() => {
    return getSoundtrack(durationInFrames, rocket);
  }, [durationInFrames, rocket]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060842",
      }}
    >
      <Audio src={soundTrack} />
      <Series>
        {/* 1. Name */}
        <Series.Sequence durationInFrames={OPENING_SCENE_LENGTH}>
          <OpeningScene
            startAngle={openingSceneStartAngle}
            login={username}
            rocket={rocket}
          />
        </Series.Sequence>

        {/* 2. Top Sectors */}
        {topSectors ? (
          <Series.Sequence
            durationInFrames={getDurationOfAllPlanets({
              topSectors,
              fps: VIDEO_FPS,
            })}
            offset={-OPENING_SCENE_OUT_OVERLAP}
          >
            <AllPlanets
              corner={corner}
              topSectors={topSectors}
              showHelperLine={showHelperLine}
              login={username}
              rocket={rocket}
              octocatSeed={random(username)}
            />
          </Series.Sequence>
        ) : null}

        {/* 3. Top Companies List */}
        <Series.Sequence
          durationInFrames={GENERIC_SCENE_DURATION}
          offset={
            topSectors
              ? -TOP_LANGUAGES_EXIT_DURATION
              : -OPENING_SCENE_OUT_OVERLAP
          }
        >
          <TopCompaniesList
            companies={sampleDividends}
          />
        </Series.Sequence>

        {/* 4. Contribution Graph (Health) */}
        <Series.Sequence
          durationInFrames={CONTRIBUTIONS_SCENE_DURATION}
          offset={-CONTRIBUTIONS_SCENE_ENTRANCE_TRANSITION}
        >
          <AbsoluteFill style={{ background: "black" }}>
            <PortfolioSummaryScene
              longestProfitableStreak={longestProfitableStreak || 0}
              totalPortfolioValue={totalPortfolioValue || 0}
              rocket={rocket}
              dailyTransactionCount={dailyTransactionCount}
              planet={planet}
              username={username}
            />
          </AbsoluteFill>
        </Series.Sequence>

        {/* 5. Total Investment */}
        <Series.Sequence
          durationInFrames={GENERIC_SCENE_DURATION}
          offset={-30} // Smooth Cross-Fade
        >
          <TotalInvestment amount={totalPortfolioValue} />
        </Series.Sequence>

        {/* 5. Profit/Loss */}
        <Series.Sequence
          durationInFrames={GENERIC_SCENE_DURATION}
          offset={-30} // Smooth Cross-Fade Exit of Total Investment (which fades out in last 15-30 frames)
        >
          <ProfitLoss profitOrLoss={profitOrLoss} />
        </Series.Sequence>

      </Series>
      {isMobileDevice() ? null : (
        <Sequence from={durationInFrames - 230}>
          <Audio startFrom={170} src={staticFile("landing.mp3")} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
