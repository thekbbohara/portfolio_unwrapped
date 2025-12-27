import React, { useMemo } from "react";
import { StarsFlying, getHitIndexes } from "./StarsFlying";

export const Stars: React.FC<{ totalDividends: number }> = ({ totalDividends }) => {
    const hitIndices = useMemo(() => {
        return getHitIndexes({
            starsDisplayed: totalDividends,
            starsGiven: totalDividends,
            seed: "random-seed",
        });
    }, [totalDividends]);

    return <StarsFlying starsGiven={totalDividends} hitIndices={hitIndices} />;
};
