import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { z } from "zod";
import { PANE_TEXT_COLOR } from "../TopSectors/Pane";
import { Gradient } from "../Gradients/NativeGradient";
import { PaneEffect } from "../PaneEffect";

export const topCompanySchema = z.object({
    name: z.string(),
    value: z.number(),
});

export const TopCompany: React.FC<{
    name: string;
    value: number;
}> = ({ name, value }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        fps,
        frame,
        config: {
            damping: 200,
        },
        delay: 10,
    });

    const opacity = interpolate(progress, [0, 1], [0, 1]);
    const scale = interpolate(progress, [0, 1], [0.8, 1]);
    const translate = interpolate(progress, [0, 1], [50, 0]);

    return (
        <AbsoluteFill>
            <AbsoluteFill
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <PaneEffect
                    innerRadius={50}
                    padding={20}
                    pinkHighlightOpacity={0.2}
                    whiteHighlightOpacity={1}
                    style={{}}
                >
                    <div
                        style={{
                            opacity,
                            transform: `scale(${scale}) translateY(${translate}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 50,
                            borderRadius: 20,
                            background: "rgba(0,0,0,0.5)",
                            border: "2px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: "bold",
                                color: PANE_TEXT_COLOR,
                                marginBottom: 20,
                                fontFamily: "Mona Sans",
                            }}
                        >
                            Top Company
                        </div>
                        <div
                            style={{
                                fontSize: 100,
                                fontWeight: 900,
                                background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontFamily: "Mona Sans",
                                marginBottom: 10,
                            }}
                        >
                            {name}
                        </div>
                        <div
                            style={{
                                fontSize: 40,
                                color: "#aaa",
                                fontFamily: "Mona Sans",
                            }}
                        >
                            NRS {value.toLocaleString()}
                        </div>
                    </div>
                </PaneEffect>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
