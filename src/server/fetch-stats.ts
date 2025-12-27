import type { Request, Response } from "express";
import { StatsRequest } from "../config.js";
import {
  clearIgStoriesForUsername,
  clearOgImagesForUsername,
  clearRendersForUsername,
  getResetAttempts,
  registerResetAttempt,
} from "./db.js";
import { sendDiscordMessage } from "./discord.js";
import { getStatsFromGitHubOrCache } from "./get-portfolio-stats.js";

export const statsEndPoint = async (request: Request, response: Response) => {
  if (request.method === "OPTIONS") {
    return response.end();
  }

  try {
    const { username, refreshCache } = StatsRequest.parse(request.body);

    await getStatsFromGitHubOrCache({
      username,
    });

    if (refreshCache) {
      const resetCount = await getResetAttempts(username);
      if (resetCount > 3) {
        throw new Error("Only three reset attempts possible");
      }

      await registerResetAttempt(username);
      await clearRendersForUsername({ username });
      await clearOgImagesForUsername({ username });
      await clearIgStoriesForUsername({ username });
    }

    return response.json({});
  } catch (err) {
    response.json({ error: (err as Error).message });
  }
};
