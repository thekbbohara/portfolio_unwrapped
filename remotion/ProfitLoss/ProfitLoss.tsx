import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z } from "zod";
import { PANE_TEXT_COLOR } from "../TopSectors/Pane";

export const profitLossSchema = z.object({
    profitOrLoss: z.number(),
});

export const ProfitLoss: React.FC<{
    profitOrLoss: number;
}> = ({ profitOrLoss }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const isProfit = profitOrLoss >= 0;
    const color = isProfit ? "#00ff88" : "#ff4d4d"; // Neon Green / Red
    const label = isProfit ? "NET PROFIT" : "NET LOSS";
    const bgGradient = isProfit
        ? "radial-gradient(circle at center, rgba(0, 255, 136, 0.15) 0%, rgba(0,0,0,0) 70%)"
        : "radial-gradient(circle at center, rgba(255, 77, 77, 0.15) 0%, rgba(0,0,0,0) 70%)";

    const progress = spring({
        fps,
        frame,
        config: { damping: 12 },
        delay: 10,
    });

    const numberProgress = spring({
        fps,
        frame: frame - 20,
        config: { damping: 20 },
    });

    const displayValue = Math.floor(numberProgress * Math.abs(profitOrLoss));

    const scale = interpolate(progress, [0, 1], [3, 1]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const blur = interpolate(progress, [0, 1], [20, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <AbsoluteFill
                style={{
                    background: bgGradient,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        transform: `scale(${scale})`,
                        opacity,
                        filter: `blur(${blur}px)`,
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            color: "white",
                            fontFamily: "Mona Sans",
                            margin: 0,
                            letterSpacing: 10,
                            textShadow: `0 0 20px ${color}80`
                        }}
                    >
                        {label}
                    </h1>

                    <div
                        style={{
                            fontSize: 180,
                            fontWeight: 900,
                            color: color,
                            fontFamily: "Mona Sans",
                            lineHeight: 1,
                            marginTop: 20,
                            textShadow: `0 0 40px ${color}40`,
                            display: "flex",
                            alignItems: "center",
                            gap: 15
                        }}
                    >
                        <span style={{ fontSize: 100, opacity: 0.7 }}>{isProfit ? "+" : "-"}</span>
                        <span>{displayValue.toLocaleString()}</span>
                    </div>

                    <div style={{
                        fontSize: 40,
                        color: "#888",
                        fontWeight: 600,
                        marginTop: 20,
                        fontFamily: "Mona Sans",
                        letterSpacing: 2
                    }}>
                        NRS Total
                    </div>

                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
