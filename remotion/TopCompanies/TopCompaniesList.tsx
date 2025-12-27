import React from "react";
import {
    AbsoluteFill,
    Sequence,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z } from "zod";
import { PANE_TEXT_COLOR } from "../TopSectors/Pane";
import { PaneEffect } from "../PaneEffect";

// Re-using the sampleDividends structure as our "Top Companies" list
export const topCompaniesListSchema = z.object({
    companies: z.array(z.object({
        name: z.string(), // Ticker, e.g. NABIL
        author: z.string(), // Full Name, e.g. Nabil Bank
    })),
});

const CompanyCard: React.FC<{
    name: string;
    fullName: string;
    index: number;
    progress: number;
}> = ({ name, fullName, index, progress }) => {
    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const translateY = interpolate(progress, [0, 1], [50, 0]);
    const scale = interpolate(progress, [0, 1], [0.8, 1]);

    return (
        <div
            style={{
                width: 800,
                height: 120,
                marginBottom: 30,
                borderRadius: 20,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                padding: "0 40px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                justifyContent: "space-between"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
                <div
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${["#FF6B6B", "#4ECDC4", "#45B7D1"][index % 3]}, #2c3e50)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "white",
                        fontFamily: "Mona Sans",
                    }}
                >
                    {index + 1}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        color: "white",
                        fontFamily: "Mona Sans"
                    }}>
                        {fullName}
                    </span>
                    <span style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "Mona Sans"
                    }}>
                        {name}
                    </span>
                </div>
            </div>
            <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#4ECDC4",
                fontFamily: "Mona Sans"
            }}>
                Top Holding
            </div>
        </div>
    );
};

export const TopCompaniesList: React.FC<{
    companies: z.infer<typeof topCompaniesListSchema>["companies"];
}> = ({ companies }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill>
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", // Dark gradient background
                }}
            >
                <div style={{
                    fontSize: 70,
                    fontWeight: 900,
                    color: "transparent",
                    marginBottom: 60,
                    fontFamily: "Mona Sans",
                    background: "linear-gradient(to right, #f857a6, #ffc3a0)",
                    WebkitBackgroundClip: "text",
                    textTransform: "uppercase",
                    letterSpacing: 4,
                    opacity: interpolate(frame, [0, 20], [0, 1])
                }}>
                    Top Companies
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {companies.slice(0, 5).map((company, index) => {
                        const progress = spring({
                            fps,
                            frame: frame - (index * 10) - 20, // Staggered delay
                            config: {
                                damping: 15,
                                stiffness: 100,
                            }
                        });

                        return (
                            <CompanyCard
                                key={company.name}
                                name={company.name}
                                fullName={company.author}
                                index={index}
                                progress={progress}
                            />
                        );
                    })}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
