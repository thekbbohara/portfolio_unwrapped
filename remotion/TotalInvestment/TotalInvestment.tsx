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

    // Dynamic Background Pulse
    const gradientPulse = interpolate(frame, [0, 60, 120], [0.8, 1.2, 0.8], {
        extrapolateRight: "loop",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#000",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                opacity, // Apply combined opacity
            }}
        >
            {/* 1. Cinematic Background: Moving Light Leaks/Aurora */}
            {/* Uses a blurred gradient moving slowly */}
            <AbsoluteFill
                style={{
                    background: "radial-gradient(circle at center, #1a2a6c, #b21f1f, #fdbb2d)", // Deep Cinematic Gradient
                    filter: "blur(80px)",
                    transform: `scale(${gradientPulse * 1.5}) rotate(${frame / 2}deg)`,
                    opacity: 0.3,
                }}
            />

            {/* Dark Overlay to keep text readable */}
            <AbsoluteFill style={{ background: "rgba(0,0,0,0.6)" }} />

            {/* 2. Main Typography Container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 10,
                    // opacity, // Removed here, applied to container
                    transform: `scale(${scale})`,
                }}
            >
                {/* Intro Label */}
                <div
                    style={{
                        fontSize: 40,
                        fontFamily: "Mona Sans",
                        fontWeight: 600,
                        color: "rgba(255, 255, 255, 0.6)",
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: 12,
                        transform: `translateY(${interpolate(frame, [0, 30], [20, 0], { extrapolateRight: "clamp" })}px)`,
                    }}
                >
                    Total Investment
                </div>

                {/* Main Value - Kinetic Typography style */}
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
                            WebkitTextStroke: "2px rgba(255, 215, 0, 0.3)", // Gold stroke glow
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
                            textShadow: "0 0 50px rgba(255, 230, 200, 0.3)", // Subtle warm glow
                            letterSpacing: -4,
                            transform: `translateY(${interpolate(frame, [0, 40], [50, 0], { easing: Easing.out(Easing.cubic) })}px)`,
                            clipPath: `polygon(0 0, 100% 0, 100% ${interpolate(frame, [10, 50], [0, 100])}%, 0 100%)`, // Reveal effect
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
