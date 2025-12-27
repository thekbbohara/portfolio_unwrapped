import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Internals } from "remotion";
import { z } from "zod";
import { cornerType, rocketSchema, topSectorsSchema, sectorSchema } from "../../src/config";
import { PlanetScaleWiggle } from "./PlaneScaleWiggle";
import { PlanetScaleOut } from "./PlanetScaleOut";
import { PlanetScaleSpiral } from "./PlanetScaleSpiral";
import { getRotatingPlanetsToPrefetch } from "./RotatingPlanet";
import { TITLE_CARD_DURATION, TopSectorsTitleCard } from "./TitleCard";
import {
  deriveEnterDirectionFromCorner,
  mapEnterDirectionIntoSlideDirection,
  mapEnterDirectionToExitDirection,
  mapExitDirectionIntoSlideDirection,
} from "./corner";

export const allPlanetsSchema = z.object({
  topSectors: topSectorsSchema,
  corner: cornerType,
  showHelperLine: z.boolean(),
  login: z.string(),
  rocket: rocketSchema,
  octocatSeed: z.number(),
});

const allPlanetsTransitionTiming = springTiming({
  config: {
    damping: 200,
  },
  durationInFrames: 15,
});

export const FIRST_PLACE_DURATION = 82;
const SECOND_PLACE_DURATION = 112;
const THIRD_PLACE_DURATION = 110;

export const getDurationOfAllPlanets = ({
  fps,
  topSectors,
}: {
  topSectors: z.infer<typeof topSectorsSchema>;
  fps: number;
}) => {
  const transitionDuration = allPlanetsTransitionTiming.getDurationInFrames({
    fps,
  });
  const { sector2, sector3 } = topSectors;

  const transitionBetween1And2 = sector2 ? -transitionDuration : 0;
  const transitionBetween2And3 = sector3 ? -transitionDuration : 0;

  const thirdDuration = sector3 ? THIRD_PLACE_DURATION : 0;
  const secondDuration = sector2 ? SECOND_PLACE_DURATION : 0;

  return (
    TITLE_CARD_DURATION +
    thirdDuration +
    secondDuration +
    FIRST_PLACE_DURATION +
    transitionBetween1And2 +
    transitionBetween2And3 -
    transitionDuration
  );
};

export const getTopSectorAssetsToPrefetch = ({
  sector1,
  sector2,
  sector3,
}: {
  sector1: z.infer<typeof sectorSchema> | null;
  sector2: z.infer<typeof sectorSchema> | null;
  sector3: z.infer<typeof sectorSchema> | null;
}) => {
  return [
    ...getRotatingPlanetsToPrefetch(),
    // We might need sector specific assets later, keeping structure
    null,
  ].filter(Internals.truthy);
};

export const AllPlanets: React.FC<z.infer<typeof allPlanetsSchema>> = ({
  corner,
  showHelperLine,
  login,
  topSectors,
  rocket,
  octocatSeed,
}) => {
  const { sector1, sector2, sector3 } = topSectors;
  const enterDirection = deriveEnterDirectionFromCorner(corner);
  const exitDirection = mapEnterDirectionToExitDirection(enterDirection);

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={TITLE_CARD_DURATION}>
        <TopSectorsTitleCard
          rocket={rocket}
          pluralizeLanguages={sector2 !== null}
          randomizePlanetSeed={login}
          randomizeOctocatSeed={octocatSeed}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={allPlanetsTransitionTiming}
      />
      {sector3 ? (
        <>
          <TransitionSeries.Sequence
            key="sector3"
            durationInFrames={THIRD_PLACE_DURATION}
          >
            <PlanetScaleOut
              rocket={rocket}
              position={3}
              corner={corner}
              sector={sector3}
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene3"
            presentation={slide({
              direction: mapEnterDirectionIntoSlideDirection(enterDirection),
            })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      {sector2 ? (
        <>
          <TransitionSeries.Sequence
            key="transition2"
            style={{
              overflow: "hidden",
            }}
            durationInFrames={SECOND_PLACE_DURATION}
          >
            <PlanetScaleSpiral
              showHelperLine={showHelperLine}
              sector={sector2}
              corner={corner}
              position={2}
              rocket={rocket}
            />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            key="scene2"
            presentation={slide({
              direction: mapExitDirectionIntoSlideDirection(exitDirection),
            })}
            timing={allPlanetsTransitionTiming}
          />
        </>
      ) : null}
      <TransitionSeries.Sequence
        durationInFrames={FIRST_PLACE_DURATION}
        style={{
          overflow: "hidden",
        }}
      >
        <PlanetScaleWiggle
          enterDirection={enterDirection}
          position={1}
          sector={sector1}
          rocket={rocket}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
