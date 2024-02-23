import { useState, useEffect } from "react";

const useCalculateSellPrice = (number: number) => {
    const [adjustedNumber, setAdjustedNumber] = useState(0);

    useEffect(() => {
        const calculateAdjustedNumber = () => {
            let percentage = 20; // Starting percentage
            let totalAdjustment = 0;
            for (let i = 1; i <= number; i += 100) {
                const applyTo = Math.min(100, number - (i - 1));
                const adjustment = applyTo * (percentage / 100);
                totalAdjustment += adjustment;

                // Update percentage for next iteration, not below 10%
                percentage = Math.max(10, percentage - 1);
            }
            return number + totalAdjustment;
        };

        setAdjustedNumber(calculateAdjustedNumber);
    }, [number]);

    return adjustedNumber;
};

export default useCalculateSellPrice;
