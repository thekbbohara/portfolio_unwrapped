import React from "react";
import { AbsoluteFill } from "remotion";

export const Actions: React.FC<{
    totalDividends: number;
}> = ({ totalDividends }) => {
    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: 200 }}>
            {/* Placeholder for dividend list */}
            <div style={{ color: "white", fontSize: 40, fontFamily: "Mona Sans" }}>
                Recent Dividends
            </div>
        </AbsoluteFill>
    );
};
