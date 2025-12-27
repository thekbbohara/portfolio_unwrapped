import { getLength, scalePath, translatePath } from "@remotion/paths";
import { getContrast } from "polished/";
import { staticFile } from "remotion";
import type { z } from "zod";
import type { sectorSchema } from "../../src/config";
import { TOP_LANGUAGES_DURATION } from "../../types/constants";
import type { GradientType } from "../Gradients/available-gradients";
import { PANE_BACKGROUND } from "./Pane";
const ACTION_DURATION = 60;

export const PLANET_1_POSITION = 0.55;
export const PLANET_2_POSITION = 0.75;
export const PLANET_3_POSITION = 0.9;

const MOVING_DURATION = TOP_LANGUAGES_DURATION - 3 * ACTION_DURATION;

export const firstPushEnd = MOVING_DURATION * PLANET_1_POSITION;
export const secondPushStart = firstPushEnd + ACTION_DURATION;
export const secondPushEnd =
  secondPushStart + MOVING_DURATION * (PLANET_2_POSITION - PLANET_1_POSITION);
export const thirdPushStart = secondPushEnd + ACTION_DURATION;
export const thirdPushEnd =
  thirdPushStart + MOVING_DURATION * (PLANET_3_POSITION - PLANET_2_POSITION);
export const fourthPushStart = thirdPushEnd + ACTION_DURATION;
export const fourthPushEnd =
  fourthPushStart + MOVING_DURATION * (1 - PLANET_3_POSITION);

const rocketPath =
  "M0 383.197C0 383.197 122.605 305.419 256.825 311.307C391.046 317.195 435.355 489.512 542.043 469.885C648.731 450.259 775.896 249.638 884.477 269.363C1087.1 269.363 1141.3 269.363 1263.91 269.363C1386.51 269.363 1460.08 332.168 1439.43 402.824C1418.78 473.48 1450.18 578.372 1549.99 550.895C1649.79 523.417 1601.18 442.077 1680.33 383.197C1759.49 324.318 1831.42 484.373 1766.37 591.24C1594.3 873.864 1497.93 618.718 1315.53 830.686C1216.59 945.698 1226.05 1129.01 1098.71 1164.34C971.376 1199.67 809.193 1010.76 754.559 1129.01C708.872 1227.93 485.889 1127.6 394 1154.29C285.333 1185.89 354.638 1551.45 394 1591.95C433.362 1632.46 535.963 1655.62 640.5 1635.5C743.746 1641.39 834.065 1498.5 1048.3 1473C1245.76 1579.51 1072.76 1581.94 1142.45 1729.46C1212.14 1876.98 1265.27 1704.01 1355.52 1682.42C1429.52 1664.75 1563.21 1900.15 1595.91 1776.5C1646.93 1583.67 1607.97 1439 1823.5 1413.5C2039.03 1388 2076.01 1475.52 2203 1413.5";

const scale = 0.5;
export const newPath = translatePath(
  scalePath(rocketPath, 1 / scale, 1 / scale),
  -300,
  0,
);
export const complexCurvePathLength = getLength(newPath);

export type PlanetInfo = {
  source: string | null;
  gradient: GradientType;
  textColor: string;
  name: string;
  opacity: number;
  customPlanetColor: string | null;
};

export const computePlanetInfo = (
  sector: z.infer<typeof sectorSchema>,
): PlanetInfo => {
  // If we had specific sector icons, we would map them here.
  // For now, treat all sectors as generic planets with their color.

  if (sector.color === null) {
    return {
      gradient: "white",
      textColor: "white",
      name: sector.name,
      opacity: 0.3,
      customPlanetColor: "gray",
      source: null,
    };
  }

  const isGoodContrast = getContrast(PANE_BACKGROUND, sector.color);

  return {
    gradient: "white",
    textColor: isGoodContrast > 2 ? sector.color : "white",
    name: sector.name,
    opacity: 0.3,
    customPlanetColor: sector.color,
    source: null,
  };
};
