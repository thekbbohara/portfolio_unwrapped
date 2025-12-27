import React from "react";
import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Easing,
    Img,
    staticFile,
} from "remotion";
import { z } from "zod";

export const totalInvestmentSchema = z.object({
    amount: z.number(),
});

export const TotalInvestment: React.FC<z.infer<typeof totalInvestmentSchema>> = ({
    amount,
}) => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();
    const width = useVideoConfig().width;
    const durationInFrames = useVideoConfig().durationInFrames; // Get duration from config if available, or assume standard length

    // 1. Smooth Transition from "Warp"
    // Instead of flash, we have text "emerge" from the depth
    const scale = interpolate(frame, [0, 40], [0.5, 1], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // 1. Entrance Fade In
    const entranceOpacity = interpolate(frame, [0, 20], [0, 1]);

    // 2. Exit Fade Out
    // Assuming component length is 90 frames (GENERIC_SCENE_DURATION), fade out in last 15 frames
    const exitOpacity = interpolate(frame, [75, 90], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
    });

    const opacity = entranceOpacity * exitOpacity;

    // Format currency (e.g. NRS 15,00,000)
    const formattedAmount = new Intl.NumberFormat('en-NP', {
        style: 'currency',
        currency: 'NPR',
        maximumFractionDigits: 0,
    }).format(amount).replace("NPR", "NRS");

    // Generate a consistent bullish path for the chart
    const pathData = `M 0 ${height} L 0 ${height * 0.8} C ${width * 0.2} ${height * 0.8}, ${width * 0.2} ${height * 0.6}, ${width * 0.4} ${height * 0.6} C ${width * 0.6} ${height * 0.6}, ${width * 0.6} ${height * 0.3}, ${width} ${height * 0.2} L ${width} ${height} Z`;
    const linePathData = `M 0 ${height * 0.8} C ${width * 0.2} ${height * 0.8}, ${width * 0.2} ${height * 0.6}, ${width * 0.4} ${height * 0.6} C ${width * 0.6} ${height * 0.6}, ${width * 0.6} ${height * 0.3}, ${width} ${height * 0.2}`;

    const chartDraw = interpolate(frame, [0, 50], [width, 0], { extrapolateRight: "clamp" });
    const chartOpacity = interpolate(frame, [0, 20], [0, 0.6]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#02040a", // Dark financial blue/black
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                opacity,
            }}
        >
            {/* 1. Share Market Background: Grid */}
            <AbsoluteFill
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                    opacity: 0.3,
                    transform: `perspective(1000px) rotateX(60deg) translateY(${frame * 0.5}px)`, // Moving floor effect
                    transformOrigin: "bottom",
                }}
            />

            {/* 2. Stock Chart Asset (SVG) */}
            <svg
                width={width}
                height={height}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    opacity: chartOpacity,
                    zIndex: 0,
                }}
            >
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 255, 136, 0.6)" /> {/* Green/Bullish */}
                        <stop offset="100%" stopColor="rgba(0, 255, 136, 0)" />
                    </linearGradient>
                </defs>

                {/* Area Fill */}
                <path
                    d={pathData}
                    fill="url(#chartGradient)"
                    style={{ opacity: 0.3 }}
                />

                {/* Line Stroke with Draw Animation */}
                <path
                    d={linePathData}
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="8"
                    strokeDasharray={width * 2}
                    strokeDashoffset={chartDraw}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 15px rgba(0, 255, 136, 0.6))" }}
                />
            </svg>

            {/* Dark Overlay/Vignette */}
            <AbsoluteFill style={{ background: "radial-gradient(circle, rgba(2,4,10,0.1) 20%, rgba(2,4,10,0.9) 100%)" }} />

            {/* 3. Main Typography Container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 10,
                    transform: `scale(${scale})`,
                }}
            >
                {/* Intro Label */}
                <div
                    style={{
                        fontSize: 40,
                        fontFamily: "Mona Sans",
                        fontWeight: 600,
                        color: "#00ff88", // Green for growth
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: 12,
                        textShadow: "0 0 20px rgba(0, 255, 136, 0.4)",
                        transform: `translateY(${interpolate(frame, [0, 30], [20, 0], { extrapolateRight: "clamp" })}px)`,
                    }}
                >
                    Total Investment
                </div>

                {/* Main Value */}
                <div style={{ position: "relative" }}>
                    {/* Glow Layer */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            fontSize: 120,
                            fontFamily: "Mona Sans",
                            fontWeight: 900,
                            color: "transparent",
                            WebkitTextStroke: "2px rgba(0, 255, 136, 0.5)", // Green glow
                            filter: "blur(10px)",
                            transform: "scale(1.05)",
                        }}
                    >
                        {formattedAmount}
                    </div>

                    {/* Actual Text */}
                    <div
                        style={{
                            fontSize: 120,
                            fontFamily: "Mona Sans",
                            fontWeight: 900,
                            color: "#fff",
                            textShadow: "0 0 40px rgba(0, 255, 136, 0.3)",
                            letterSpacing: -4,
                            transform: `translateY(${interpolate(frame, [0, 40], [50, 0], { easing: Easing.out(Easing.cubic) })}px)`,
                            clipPath: `polygon(0 0, 100% 0, 100% ${interpolate(frame, [10, 50], [0, 100])}%, 0 100%)`,
                        }}
                    >
                        {formattedAmount}
                    </div>
                </div>
            </div>

            {/* 3. Foreground Particles/Dust (Subtle) */}
            <Img
                src={staticFile("shinystaroutline.png")}
                style={{
                    position: "absolute",
                    top: "30%",
                    left: "20%",
                    width: 20,
                    height: 20,
                    opacity: interpolate(frame, [0, 50], [0, 0.5]),
                    transform: `translateY(${frame * -1}px)`,
                }}
            />
            <Img
                src={staticFile("shinystaroutline.png")}
                style={{
                    position: "absolute",
                    bottom: "30%",
                    right: "20%",
                    width: 30,
                    height: 30,
                    opacity: interpolate(frame, [0, 50], [0, 0.3]),
                    transform: `translateY(${frame * -2}px)`,
                }}
            />

        </AbsoluteFill>
    );
};
