import React from "react";
import { AbsoluteFill } from "remotion";

export const Words: React.FC<{
    totalDividends: number;
}> = ({ totalDividends }) => {
    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: -200 }}>
            <div style={{ color: "white", fontSize: 60, fontWeight: "bold", fontFamily: "Mona Sans" }}>
                {totalDividends} Total Dividends
            </div>
        </AbsoluteFill>
    );
};
