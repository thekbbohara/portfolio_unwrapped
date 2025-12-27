import { zColor } from "@remotion/zod-types";
import { random } from "remotion/no-react";
import { z } from "zod";

export const SITE_NAME = `unwrapped2025`;
export const RAM = 1200;
export const DISK = 10240;
export const TIMEOUT = 120;

const availablePlanets = ["Ice", "Silver", "Gold", "Leafy", "Fire"] as const;
export type Planet = (typeof availablePlanets)[number];

export const PlanetEnum = z.enum(availablePlanets);

export const LanguagesEnum = z.enum([
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust",
  "C",
  "C++",
  "Ruby",
  "PHP",
  "Nix",
  "C#",
]);

export const cornerTypeValues = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export const cornerType = z.enum(cornerTypeValues);
export type Corner = z.infer<typeof cornerType>;

export const languageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("other"),
    name: z.string(),
    color: zColor().or(z.null()),
    percent: z.number(),
  }),
  z.object({
    type: z.literal("designed"),
    name: LanguagesEnum,
    percent: z.number(),
  }),
]);

export type TopLanguage = z.infer<typeof languageSchema>;

const days = ["0", "1", "2", "3", "4", "5", "6"] as const;
export const topWeekdaySchema = z.enum(days);

const hours = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
] as const;

export const topHourSchema = z.enum(hours);

export type Hour = (typeof hours)[number];

export type Weekday = (typeof days)[number];

// Replaces languageSchema
export const sectorSchema = z.object({
  name: z.string(),
  percent: z.number(),
  color: z.string(),
});
export type TopSector = z.infer<typeof sectorSchema>;

export const topSectorsSchema = z.object({
  sector1: sectorSchema,
  sector2: sectorSchema.or(z.null()),
  sector3: sectorSchema.or(z.null()),
});

export const portfolioValueHistorySchema = z.object({
  time: z.number(),
  value: z.number(),
});

export const rocketValues = ["blue", "orange", "yellow"] as const;
export const rocketSchema = z.enum(rocketValues);
export type Rocket = z.infer<typeof rocketSchema>;

export const openingSceneStartAngle = z.enum(["left", "right"]);
export const compositionSchema = z.object({
  topSectors: topSectorsSchema.or(z.null()),
  corner: cornerType,
  showHelperLine: z.boolean(),
  username: z.string(),
  planet: PlanetEnum,

  totalDividends: z.number(),
  buyTransactions: z.number(),
  sellTransactions: z.number(),
  totalTransactions: z.number(),

  topTradingDay: topWeekdaySchema,
  topTradingHour: topHourSchema,

  portfolioValueHistory: z.array(portfolioValueHistorySchema),

  openingSceneStartAngle,
  rocket: rocketSchema,

  dailyTransactionCount: z.array(z.number()),
  totalPortfolioValue: z.number(),
  longestProfitableStreak: z.number(),

  sampleDividends: z.array(z.object({
    author: z.string(),
    name: z.string()
  })),

  profitOrLoss: z.number(),
  topCompany: z.object({
    name: z.string(),
    value: z.number(),
  }),
});

export const RenderRequest = z.object({
  username: z.string(),
  theme: rocketSchema,
});

export type RenderResponse =
  | {
    type: "video-available";
    url: string;
  }
  | {
    type: "render-running";
    progress: number;
  }
  | {
    type: "render-error";
    error: string;
  };

export const ProgressRequest = z.object({
  username: z.string(),
  theme: z.string(),
});

export const StatsRequest = z.object({
  username: z.string(),
  refreshCache: z.boolean().optional().default(false),
});

export const generateRandomCorner = ({
  lowercasedUsername,
}: {
  lowercasedUsername: string;
}): Corner => {
  const randomSeed = random(lowercasedUsername);

  const index = Math.floor(randomSeed * cornerTypeValues.length);

  return cornerTypeValues[index];
};

export type ProfileStats = {
  totalTransactions: number;
  username: string;
  lowercasedUsername: string;
  buyTransactions: number;
  sellTransactions: number;
  fetchedAt: number;
  loggedInWithGitHub: boolean;
  totalDividends: number;
  sampleDividends: {
    author: string; // Keeping 'author' for now to minimize breakage, maybe map to 'Symbol'?
    name: string; // Keeping 'name' for now
  }[];
  longestProfitableStreak: number;
  totalPortfolioValue: number;
  topSectors: Array<{
    name: string;
    color: string;
    percent: number;
  }>;
  bestHours: Record<string, number>;
  topTradingDay: Weekday;
  topTradingHour: Hour;
  portfolioValueHistory: { time: number; value: number }[];
  dailyTransactionCount: number[];
  allWeekdays: number[];
  profitOrLoss: number;
  topCompany: {
    name: string;
    value: number;
  };
};

export type CompositionParameters = z.infer<typeof compositionSchema>;

const computePlanet = (userStats: ProfileStats): z.infer<typeof PlanetEnum> => {
  if (userStats.totalPortfolioValue > 5000000) {
    return PlanetEnum.Enum.Gold;
  }

  if (userStats.totalPortfolioValue > 2000000) {
    return PlanetEnum.Enum.Silver;
  }

  if (userStats.totalPortfolioValue > 500000) {
    return PlanetEnum.Enum.Fire;
  }

  if (userStats.totalPortfolioValue > 100000) {
    return PlanetEnum.Enum.Leafy;
  }

  return PlanetEnum.Enum.Ice;
};

export const parseTopSector = (topSector: {
  name: string;
  color: string;
  percent: number;
}): z.infer<typeof sectorSchema> => {
  return {
    name: topSector.name,
    percent: topSector.percent,
    color: topSector.color,
  };
};

export const parseTopLanguage = (topLanguage: {
  languageName: string;
  color: string | null;
  percent: number;
}): z.infer<typeof languageSchema> => {
  try {
    const lang = LanguagesEnum.parse(topLanguage.languageName);
    return {
      type: "designed",
      name: lang,
      percent: topLanguage.percent,
    };
  } catch (e) {
    return {
      type: "other",
      color: topLanguage.color ?? "black",
      name: topLanguage.languageName,
      percent: topLanguage.percent,
    };
  }
};

export const computeCompositionParameters = (
  userStats: ProfileStats,
  rocketPreference: Rocket | null,
): CompositionParameters => {
  const defaultRocket =
    rocketValues[
    Math.floor(
      random(userStats.lowercasedUsername + "rocket") * rocketValues.length,
    )
    ];

  return {
    username: userStats.username,
    corner: generateRandomCorner({
      lowercasedUsername: userStats.lowercasedUsername,
    }),
    topSectors:
      userStats.topSectors.length > 0
        ? {
          sector1: parseTopSector(userStats.topSectors[0]),
          sector2:
            userStats.topSectors.length > 1
              ? parseTopSector(userStats.topSectors[1])
              : null,
          sector3:
            userStats.topSectors.length > 2
              ? parseTopSector(userStats.topSectors[2])
              : null,
        }
        : null,
    showHelperLine: false,
    planet: computePlanet(userStats),
    totalDividends: userStats.totalDividends,
    buyTransactions: userStats.buyTransactions,
    sellTransactions: userStats.sellTransactions,
    totalTransactions: userStats.totalTransactions,
    topTradingDay: userStats.topTradingDay,
    topTradingHour: userStats.topTradingHour,

    portfolioValueHistory: userStats.portfolioValueHistory,

    openingSceneStartAngle:
      random(userStats.lowercasedUsername + "startAngle") > 0.5
        ? "left"
        : "right",
    rocket: rocketPreference ? rocketPreference : defaultRocket,
    dailyTransactionCount: userStats.dailyTransactionCount,
    totalPortfolioValue: userStats.totalPortfolioValue,
    longestProfitableStreak: userStats.longestProfitableStreak,
    sampleDividends: userStats.sampleDividends,
    profitOrLoss: userStats.profitOrLoss,
    topCompany: userStats.topCompany,
  };
};

export const ogImageSchema = z.object({
  issues: z.number(),
  stars: z.number(),
  contributionData: z.array(z.number()),
  pullRequests: z.number(),
  weekdays: z.array(z.number()),
  login: z.string(),
  topSector: sectorSchema.or(z.null()),
  longestStreak: z.number(),
  totalContributions: z.number(),
});
