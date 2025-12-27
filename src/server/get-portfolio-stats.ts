import { getMockPortfolioStats } from "./mock-portfolio-stats";

export const getStatsFromGitHubOrCache = async ({
  username,
}: {
  username: string;
}) => {
  return getMockPortfolioStats(username);
};
