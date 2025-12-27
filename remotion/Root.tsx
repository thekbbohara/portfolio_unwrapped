import { Composition, Folder, Still } from "remotion";
import { compositionSchema, ogImageSchema } from "../src/config";
import {
  TOP_LANGUAGES_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { Stars } from "../vite/Home/Stars";
import { PortfolioSummaryScene } from "./PortfolioSummary";
import { jonnysContributions } from "./PortfolioSummary/jonnys-contributions";
import { END_SCENE_DURATION, EndScene, endSceneSchema } from "./EndScene";
import { CallToAction } from "./EndScene/CallToAction";
import { NativeGradient } from "./Gradients/NativeGradient";
import type { GradientType } from "./Gradients/available-gradients";
import { availableGradients } from "./Gradients/available-gradients";
import { IgStory, IgStoryContent } from "./IGStory";
import { Dividends, calculateDividendsDuration, dividendsSchema } from "./Dividends";
import { Transactions, calculateTransactionsDuration, transactionsSchema } from "./Transactions";
import { FPS } from "./Transactions/make-ufo-positions";
import { Main, mainCalculateMetadataScene } from "./Main";
import { Noise, noiseSchema } from "./Noise";
import { OgImageContent } from "./OgImage";
import { OPENING_SCENE_LENGTH, OpeningScene } from "./Opening";
import { OpeningTitle } from "./Opening/Title";
import { openingTitleSchema } from "./Opening/TitleImage";
import { PinkHighlight } from "./PinkHighlight";
import { Poof } from "./Poof";
import { PortfolioValueHistory } from "./PortfolioValueHistory/PortfolioValueHistory";
import { Tablet, tableSchema } from "./PortfolioValueHistory/Tablet";
import { TopTradingDay, topTradingDaySchema } from "./PortfolioValueHistory/TopTradingDay";
import { Wheel } from "./PortfolioValueHistory/Wheel";
import { GRAPH_DATA } from "./PortfolioValueHistory/constants";
import { PromoVideo, promoVideoSchema } from "./PromoVideo";
import { Planets } from "./PromoVideo/Planets";
import { PromoGif } from "./PromoVideo/PromoGif";
import { PATHS_COMP_HEIGHT } from "./TotalTransactions/Path";
import {
  TOTAL_TRANSACTIONS_DURATION,
  TotalTransactions,
  totalTransactionsSchema,
} from "./TotalTransactions/TotalTransactions";
import { WholePaths } from "./TotalTransactions/WholePaths";
import {
  SevenSegment,
  sevenSegmentSchema,
} from "./SevenSegment/SevenSegmentNumber";
import { SponsorshipsScene } from "./Sponsorships";
import { StarSprite } from "./StarSprite";
import {
  DividendsAndValues,
  dividendsAndValuesCalculateMetadata,
} from "./DividendsAndValues";
import {
  Shine,
  Shines,
  shineSchema,
} from "./Dividends/Shines";
import { TopSectorsCanvas, topSectorsSchema } from "./TopSectors";
import {
  AllPlanets,
  FIRST_PLACE_DURATION,
  allPlanetsSchema,
  getDurationOfAllPlanets,
} from "./TopSectors/AllPlanets";
import { FloatingOctocat } from "./TopSectors/FloatingOctocat";
import {
  PlanetScaleWiggle,
  wiggleSchema,
} from "./TopSectors/PlaneScaleWiggle";
import { PlanetScaleOut, zoomOutSchema } from "./TopSectors/PlanetScaleOut";
import {
  PlanetScaleSpiral,
  spiralSchema,
} from "./TopSectors/PlanetScaleSpiral";
import { PlanetScaleSpiralWhole } from "./TopSectors/PlanetScaleSpiralWhole";
import {
  TopSectorsTitleCard,
  topSectorsTitleCardSchema,
} from "./TopSectors/TitleCard";
import { WhiteHighlight } from "./WhiteHighlight";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="EndScene">
        <Composition
          id={"EndScene"}
          component={EndScene}
          durationInFrames={END_SCENE_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={endSceneSchema}
          defaultProps={{
            rocket: "blue",
            planet: "Ice",
          }}
        />
        <Composition
          id="CallToAction"
          component={CallToAction}
          durationInFrames={12 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            enterProgress: 1,
            exitProgress: 1,
            planet: "Ice",
          }}
        />
      </Folder>
      <Composition
        id={"Opening"}
        component={OpeningScene}
        durationInFrames={OPENING_SCENE_LENGTH}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={openingTitleSchema}
        defaultProps={{
          login: "JonnyBurger",
          startAngle: "left",
          rocket: "blue",
        }}
      />
      <Composition
        id={"OpeningTitle"}
        component={OpeningTitle}
        durationInFrames={OPENING_SCENE_LENGTH}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          login: "JonnyBurger",
          exitProgress: 0,
          startAngle: "left",
          rocket: "blue",
        }}
      />
      <Composition
        id={"Sponsorships"}
        component={SponsorshipsScene}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id={"PortfolioSummaryScene"}
        component={PortfolioSummaryScene}
        durationInFrames={END_SCENE_DURATION}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          username: "JonnyBurger",
          longestProfitableStreak: 90,
          totalPortfolioValue: 300,
          rocket: "blue",
          planet: "Ice",
          dailyTransactionCount: [],
        }}
      />

      <Folder name="Transactions">
        <Composition
          id={"Transactions0-0"}
          component={Transactions}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={transactionsSchema}
          calculateMetadata={calculateTransactionsDuration}
          defaultProps={{ sellTransactions: 0, buyTransactions: 0, rocket: "orange" }}
        />
        <Composition
          id={"Transactions2-0"}
          component={Transactions}
          durationInFrames={19 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={transactionsSchema}
          calculateMetadata={calculateTransactionsDuration}
          defaultProps={{ sellTransactions: 2, buyTransactions: 0, rocket: "blue" }}
        />
        <Composition
          id={"Transactions20-15"}
          component={Transactions}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={transactionsSchema}
          calculateMetadata={calculateTransactionsDuration}
          defaultProps={{ sellTransactions: 20, buyTransactions: 15, rocket: "orange" }}
        />
        <Composition
          id={"Transactions80-20"}
          component={Transactions}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={transactionsSchema}
          calculateMetadata={calculateTransactionsDuration}
          defaultProps={{ sellTransactions: 80, buyTransactions: 20, rocket: "yellow" }}
        />
        <Composition
          id={"Transactions500-500"}
          component={Transactions}
          durationInFrames={16 * 30}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={transactionsSchema}
          calculateMetadata={calculateTransactionsDuration}
          defaultProps={{
            sellTransactions: 3000,
            buyTransactions: 2000,
            rocket: "blue",
          }}
        />
      </Folder>
      <Composition
        id={"Transactions"}
        component={Transactions}
        durationInFrames={12 * 30}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={transactionsSchema}
        calculateMetadata={calculateTransactionsDuration}
        defaultProps={{ sellTransactions: 75, buyTransactions: 0, rocket: "blue" }}
      />

      <Composition
        id={"Poof"}
        component={Poof}
        durationInFrames={40}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          ufoScale: 1,
          x: 0,
          y: 0,
        }}
      />
      <Composition
        id={"StarSprite"}
        component={StarSprite}
        durationInFrames={40}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          transitionDuration: 30,
          burstFrame: 30,
        }}
      />
      <Composition
        id={"StarsAndProductivity"}
        component={DividendsAndValues}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={dividendsSchema}
        defaultProps={{
          totalDividends: 10,
          showCockpit: true,
          topTradingDay: "3",
          topTradingHour: "0",
          portfolioValueHistory: GRAPH_DATA,
          totalTransactions: 614,
          login: "JonnyBurger",
          sampleDividends: [],
        }}
        calculateMetadata={dividendsAndValuesCalculateMetadata}
      />
      <Composition
        id={"PortfolioValueHistory"}
        component={PortfolioValueHistory}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          portfolioValueHistory: GRAPH_DATA,
          topTradingDay: "Monday",
          topTradingHour: "4",
        }}
      />
      <Composition
        id="Wheel"
        component={Wheel}
        durationInFrames={100}
        fps={FPS}
        height={500}
        width={500}
        schema={topTradingDaySchema}
        defaultProps={{
          value: "6",
          values: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          radius: 90,
          label: "Most productive day",
          renderLabel: (value) => value,
          delay: 30,
          soundDelay: 60,
        }}
      />
      <Composition
        id="TopTradingDay"
        component={TopTradingDay}
        durationInFrames={100}
        fps={FPS}
        height={200}
        width={1080}
        schema={topTradingDaySchema}
        defaultProps={{
          value: "1",
          values: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          label: "Best Trading Day",
          radius: 90,
          renderLabel: (value) => value,
          delay: 30,
          soundDelay: 60,
        }}
      />
      <Composition
        id={"Tablet"}
        component={Tablet}
        durationInFrames={10 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={tableSchema}
        defaultProps={{
          portfolioValueHistory: GRAPH_DATA,
          enterProgress: 0,
          weekday: "6",
          hour: "0",
        }}
      />
      <Composition
        id={"SevenSegment"}
        component={SevenSegment}
        durationInFrames={40}
        fps={VIDEO_FPS}
        schema={sevenSegmentSchema}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ num: 15, fontSize: 100, max: null }}
      />
      <Folder name="PullRequests">
        <Composition
          id="WholePaths"
          component={WholePaths}
          fps={30}
          durationInFrames={250}
          height={PATHS_COMP_HEIGHT}
          width={1080}
          defaultProps={{
            extraPaths: 8,
            initialPullRequests: 0,
          }}
        />
        <Composition
          id="TotalTransactions"
          component={TotalTransactions}
          fps={30}
          durationInFrames={TOTAL_TRANSACTIONS_DURATION}
          height={1080}
          width={1080}
          schema={totalTransactionsSchema}
          defaultProps={{
            totalTransactions: 614,
          }}
        />
      </Folder>
      <Folder name="TopSectors">
        <Composition
          id={"TopSectorsTitleCard"}
          component={TopSectorsTitleCard}
          durationInFrames={TOP_LANGUAGES_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={topSectorsTitleCardSchema}
          defaultProps={{
            randomizePlanetSeed: "randomizePlanetSeed",
            pluralizeLanguages: false,
            rocket: "blue",
            randomizeOctocatSeed: 0.4,
          }}
        />
        <Composition
          id={"TopSectorsCanvas"}
          component={TopSectorsCanvas}
          schema={topSectorsSchema}
          durationInFrames={TOP_LANGUAGES_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH * 2}
          height={VIDEO_HEIGHT * 2}
          defaultProps={{
            sector1: {
              name: "Banking",
              percent: 0.5,
              color: "#ff0000",
            },
            sector2: {
              name: "Hydropower",
              percent: 0.3,
              color: "#00ff00",
            },
            sector3: null,
            rocket: "orange",
          }}
        />

        <Composition
          id={"TopSectorsZoomOut"}
          component={PlanetScaleOut}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={zoomOutSchema}
          defaultProps={{
            corner: "top-right" as const,
            sector: {
              name: "Banking",
              percent: 0.3,
              color: "#ff0000",
            },
            position: 1,
            rocket: "orange",
          }}
        />
        <Composition
          id="TopSectorsWiggle"
          component={PlanetScaleWiggle}
          schema={wiggleSchema}
          durationInFrames={FIRST_PLACE_DURATION}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            rocket: "blue",
            position: 1,
            sector: {
              name: "Hydropower",
              percent: 0.3,
              color: "#00ff00",
            },
            enterDirection: "right-counter-clockwise" as const,
          }}
        />
        <Composition
          id={"PlanetSpiralWhole"}
          component={PlanetScaleSpiralWhole}
          schema={spiralSchema}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            sector: {
              name: "Insurance",
              percent: 0.4,
              color: "#0000ff",
            },
            showHelperLine: false,
            corner: "bottom-right",
            position: 1,
            startRotationInRadians: 0,
            clockDirection: "clockwise",
            rocket: "blue",
          }}
        />
        <Composition
          id={"TopSectorsSpiral"}
          component={PlanetScaleSpiral}
          schema={spiralSchema}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            sector: { name: "Banking", percent: 0.3, color: "#ff0000" },
            showHelperLine: false,
            corner: "bottom-right",
            position: 1,
            rocket: "orange",
          }}
        />
        <Composition
          id={"FloatingOctocat"}
          component={FloatingOctocat}
          durationInFrames={150}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{}}
        />
        <Composition
          id={"AllPlanets"}
          component={AllPlanets}
          schema={allPlanetsSchema}
          durationInFrames={500}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          calculateMetadata={({ props: { topSectors } }) => {
            return {
              durationInFrames: getDurationOfAllPlanets({
                topSectors,
                fps: VIDEO_FPS,
              }),
            };
          }}
          defaultProps={{
            corner: "top-right" as const,
            topSectors: {
              sector1: { name: "Banking", percent: 0.4, color: "#ff0000" },
              sector2: { name: "Hydro", percent: 0.3, color: "#00ff00" },
              sector3: { name: "Life Insurance", percent: 0.2, color: "#0000ff" },
            },
            showHelperLine: false,
            login: "JonnyBurger",
            rocket: "blue",
            octocatSeed: 0.4,
          }}
        />
      </Folder>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={60 * 30}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        schema={compositionSchema}
        calculateMetadata={mainCalculateMetadataScene}
        defaultProps={{
          username: "Kyalin Khanal",
          corner: "bottom-left",
          topSectors: {
            sector1: {
              name: "Banking",
              percent: 0.5,
              color: "#ff0000",
            },
            sector2: {
              name: "Hydropower",
              percent: 0.3,
              color: "#00ff00",
            },
            sector3: null,
          },
          showHelperLine: false,
          planet: "Gold",
          totalDividends: 10000,
          buyTransactions: 195,
          sellTransactions: 39,
          totalTransactions: 873,
          topTradingDay: "4",
          totalPortfolioValue: 9489,
          topTradingHour: "10",
          portfolioValueHistory: [
            { value: 100, time: 0 },
            { value: 200, time: 10 },
          ],
          openingSceneStartAngle: "right",
          rocket: "yellow",
          dailyTransactionCount: [
            3, 0, 0, 0, 6, 53, 48, 52, 36, 33, 5, 28, 17, 0, 53, 30, 37, 40, 37,
          ],
          sampleDividends: [
            {
              author: "NABIL",
              name: "Nabil Bank Ltd.",
            },
            {
              author: "SHIVM",
              name: "Shivam Cements",
            },
            {
              author: "HDHPC",
              name: "Himal Dolakha Hydropower",
            },
            {
              author: "EBL",
              name: "Everest Bank Ltd.",
            },
            {
              author: "API",
              name: "Api Power Company",
            },
          ],
          longestProfitableStreak: 48,
          profitOrLoss: 15400,
          topCompany: {
            name: "Nabil Bank",
            value: 120000
          },
        }}
      />
      <Composition
        id="Stars"
        component={Stars}
        durationInFrames={10 * 30}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="Noise"
        component={Noise}
        durationInFrames={10 * 30}
        fps={FPS}
        schema={noiseSchema}
        defaultProps={{
          translateX: 0,
          translateY: 0,
        }}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Folder name="Gradients">
        {Object.keys(availableGradients).map((gradient) => {
          return (
            <Still
              key={gradient}
              id={`Gradients-${gradient}`}
              component={NativeGradient}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              defaultProps={{
                gradient: gradient as GradientType,
              }}
            />
          );
        })}
      </Folder>
      <Folder name="Dividends">
        <Composition
          id="shine"
          component={Shine}
          fps={30}
          durationInFrames={100}
          height={1080}
          width={1080}
          schema={shineSchema}
          defaultProps={{
            rotation: 0.1,
            showHelpers: false,
          }}
        />
        <Composition
          id="shines"
          component={Shines}
          fps={30}
          durationInFrames={100}
          height={1080}
          width={1080}
          defaultProps={{
            rotationShake: 0,
            xShake: 0,
            yShake: 0,
          }}
        />
        <Composition
          id={"Dividends0"}
          component={Dividends}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={dividendsSchema}
          defaultProps={{
            totalDividends: 9,
            rocket: "blue",
          }}
          calculateMetadata={calculateDividendsDuration}
        />
        <Composition
          id={"Dividends5"}
          component={Dividends}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={dividendsSchema}
          defaultProps={{
            totalDividends: 504,
            rocket: "blue",
          }}
          calculateMetadata={calculateDividendsDuration}
        />
        <Composition
          id={"Dividends50"}
          component={Dividends}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          schema={dividendsSchema}
          defaultProps={{
            totalDividends: 50,
            rocket: "blue",
          }}
          calculateMetadata={calculateDividendsDuration}
        />
      </Folder>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        width={1200}
        height={630}
        durationInFrames={15.5 * 30}
        fps={30}
        schema={promoVideoSchema}
        defaultProps={{ layout: "short" as const }}
        calculateMetadata={({ props: { layout } }) => {
          if (layout === "landscape") {
            return {
              width: 1200,
              height: 630,
            };
          }

          if (layout === "short") {
            return {
              width: 1080,
              height: 1920,
            };
          }

          throw new Error("invalid layout");
        }}
      />
      <Composition
        id="PromoGif"
        component={PromoGif}
        width={1200}
        height={630}
        durationInFrames={4 * 30}
        fps={30}
        schema={promoVideoSchema}
        defaultProps={{ layout: "landscape" as const }}
        calculateMetadata={({ props: { layout } }) => {
          if (layout === "landscape") {
            return {
              width: 1200,
              height: 630,
            };
          }

          if (layout === "short") {
            return {
              width: 1080,
              height: 1920,
            };
          }

          throw new Error("invalid layout");
        }}
      />
      <Composition
        id="PlanetPromo"
        component={Planets}
        width={1200}
        height={630}
        durationInFrames={20 * 30}
        fps={30}
        defaultProps={{
          layout: "landscape",
        }}
      />
      <Folder name="Stills">
        <Still
          width={1200}
          height={630}
          component={OgImageContent}
          id="og-image"
          schema={ogImageSchema}
          defaultProps={{
            topSector: {
              name: "Banking",
              percent: 0.3,
              color: "#ff0000",
            },
            sellTransactions: 10,
            login: "JonnyBurger",
            buyTransactions: 10,
            totalDividends: 10,
            dailyTransactionCount: [34, 0, 35],
            longestProfitableStreak: 48,
            topTradingDay: "1",
            totalPortfolioValue: 9489,
            totalTransactions: 200,
            topTradingHour: "10",
          }}
        />
        <Still
          width={600}
          height={900}
          component={IgStoryContent}
          id="ig-story-content"
          schema={ogImageSchema}
          defaultProps={{
            topSector: {
              name: "Hydropower",
              color: "#ffffff",
              percent: 0.3,
            },
            sellTransactions: 10,
            login: "JonnyBurger",
            buyTransactions: 10,
            totalDividends: 10,
            dailyTransactionCount: [265, 200, 1, 0, 3, 400, 976],
            longestProfitableStreak: 48,
            topTradingDay: "1",
            totalPortfolioValue: 9489,
            totalTransactions: 200,
            topTradingHour: "10",
          }}
        />
        <Still
          width={1036}
          height={1973}
          component={IgStory}
          id="ig-story"
          schema={ogImageSchema}
          defaultProps={{
            topSector: {
              name: "Hydropower",
              color: "#ffffff",
              percent: 0.3,
            },
            sellTransactions: 10,
            login: "JonnyBurger",
            buyTransactions: 10,
            totalDividends: 10,
            dailyTransactionCount: [265, 200, 1, 0, 3, 400, 976],
            longestProfitableStreak: 48,
            topTradingDay: "1",
            totalPortfolioValue: 9489,
            totalTransactions: 200,
            topTradingHour: "10",
          }}
        />
      </Folder>
      <Still
        component={PinkHighlight}
        id="PinkHighlight"
        width={1080}
        height={1080}
      />
      <Still
        component={WhiteHighlight}
        id="WhiteHighlight"
        width={1080}
        height={540}
      />
    </>
  );
};
