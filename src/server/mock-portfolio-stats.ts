import type { ProfileStats } from "../config";

export const getMockPortfolioStats = (username: string): ProfileStats => {
    return {
        username: username,
        lowercasedUsername: username.toLowerCase(),
        fetchedAt: Date.now(),
        loggedInWithGitHub: false,

        // Transactions
        totalTransactions: 152,
        buyTransactions: 80,
        sellTransactions: 72,

        // Portfolio Value
        totalPortfolioValue: 1500000, // 15 Lakhs
        portfolioValueHistory: Array.from({ length: 24 }).map((_, i) => ({
            time: i,
            value: Math.floor(Math.random() * 100000)
        })),

        // Dividends
        totalDividends: 25000,
        sampleDividends: [
            { author: "NABIL", name: "Nabil Bank Ltd." },
            { author: "EBL", name: "Everest Bank Ltd." },
            { author: "SHIVM", name: "Shivam Cements" },
            { author: "HDHPC", name: "Himal Dolakha Hydropower" },
            { author: "API", name: "Api Power Company" },
        ],

        // Streak
        longestProfitableStreak: 12,

        // Sectors
        topSectors: [
            { name: "Banking", percent: 0.45, color: "#eb4034" },
            { name: "Hydropower", percent: 0.30, color: "#34eb71" },
            { name: "Insurance", percent: 0.25, color: "#34a1eb" },
        ],

        // Activity
        dailyTransactionCount: Array.from({ length: 365 }).map(() => Math.floor(Math.random() * 5)),
        bestHours: { "11": 50, "12": 30, "13": 40 },
        topTradingDay: "3", // Wednesday
        topTradingHour: "11",
        allWeekdays: [10, 20, 30, 50, 20, 0, 0],
        // New fields
        profitOrLoss: 125000,
        topCompany: { name: "Nabil Bank", value: 45000 },
    };
};
