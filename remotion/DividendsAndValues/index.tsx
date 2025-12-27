import { useMemo } from "react";
import type { CalculateMetadataFunction } from "remotion";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import {
  TABLET_SCENE_ENTER_ANIMATION,
  TABLET_SCENE_ENTER_ANIMATION_DELAY,
  TABLET_SCENE_HIDE_ANIMATION,
  TABLET_SCENE_LENGTH,
  Tablet,
} from "../PortfolioValueHistory/Tablet";
import {
  TOTAL_TRANSACTIONS_DURATION,
  TotalTransactions,
  totalTransactionsSchema,
} from "../TotalTransactions/TotalTransactions";
import { Dividends, dividendsSchema, getDividendsDuration } from "../Dividends";

const PULL_REQUESTS_DURATION = TOTAL_TRANSACTIONS_DURATION; // Map for legacy if needed, or just use TOTAL_TRANSACTIONS_DURATION directly in function

const TABLET_ENTER_DURATION = 45;

const getTimeUntilTabletHides = (totalDividends: number) => {
  return getDividendsDuration(totalDividends) + TABLET_SCENE_LENGTH;
};

export const getDividendsAndValuesDuration = ({
  totalDividends,
}: {
  totalDividends: number;
}) => {
  return getTimeUntilTabletHides(totalDividends) + PULL_REQUESTS_DURATION;
};

export const dividendsAndValuesCalculateMetadata: CalculateMetadataFunction<
  z.infer<typeof dividendsSchema>
> = ({ props }) => {
  return {
    durationInFrames: getDividendsAndValuesDuration({
      totalDividends: props.totalDividends,
    }),
  };
};

export const DividendsAndValues: React.FC<
  z.infer<typeof dividendsSchema> &
  z.infer<typeof totalTransactionsSchema> & {
    portfolioValueHistory: any; // Fix type
    topTradingDay: string;
    topTradingHour: string;
  }
> = ({
  totalDividends,
  totalTransactions,
  portfolioValueHistory,
  topTradingDay,
  topTradingHour,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const starFlyDuration = useMemo(() => {
      return getDividendsDuration(totalDividends);
    }, [totalDividends]);

    const timeUntilTabletHides = useMemo(() => {
      return starFlyDuration + TABLET_SCENE_LENGTH;
    }, [starFlyDuration]);

    const zoomTransition =
      spring({
        fps,
        frame,
        delay: starFlyDuration,
        config: {
          damping: 200,
        },
        durationInFrames: TABLET_ENTER_DURATION,
      }) -
      spring({
        fps,
        frame,
        delay: starFlyDuration + TABLET_SCENE_LENGTH,
        config: {
          damping: 200,
        },
        durationInFrames: TABLET_SCENE_HIDE_ANIMATION,
      });

    const translateX = zoomTransition * 270;
    const translateY = zoomTransition * -270;
    const scale = 1 + zoomTransition * 0.5;

    const style: React.CSSProperties = useMemo(() => {
      return {
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity: 1 - zoomTransition * 0.7,
      };
    }, [translateX, translateY, scale, zoomTransition]);

    const timeUntilTabletIsEntered =
      starFlyDuration +
      TABLET_SCENE_ENTER_ANIMATION_DELAY +
      TABLET_SCENE_ENTER_ANIMATION;

    return (
      <AbsoluteFill style={{}}>
        {frame < timeUntilTabletIsEntered || frame > timeUntilTabletHides ? (
          <AbsoluteFill style={style}>
            <Dividends
              totalDividends={totalDividends}
              rocket="blue" // Default or passed prop
            />
          </AbsoluteFill>
        ) : null}
        <Sequence
          from={starFlyDuration}
          durationInFrames={TABLET_SCENE_LENGTH + TABLET_SCENE_HIDE_ANIMATION}
        >
          <Tablet
            // Need to update Tablet props to match new schema eventually
            topTradingDay={topTradingDay}
            enterProgress={zoomTransition}
            portfolioValueHistory={portfolioValueHistory}
            topTradingHour={topTradingHour}
          />
        </Sequence>
        <Sequence from={timeUntilTabletHides}>
          <TotalTransactions totalTransactions={totalTransactions} />
        </Sequence>
      </AbsoluteFill>
    );
  };
