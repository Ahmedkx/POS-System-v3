import React, { useState, useEffect } from "react";

export default function CalculateSellPrice({ price }) {
    // State to store the original number
    const [number, setNumber] = useState(price);
    // State to store the adjusted number
    const [adjustedNumber, setAdjustedNumber] = useState(0);

    useEffect(() => {
        // Calculate the adjusted number whenever the original number changes
        const calculateAdjustedNumber = (num) => {
            let percentage = 20; // Starting percentage
            let adjusted = num; // Default to the original number

            if (num <= 100) {
                adjusted = num * (1 + percentage / 100);
            } else {
                let remaining = num;
                while (remaining > 0) {
                    let applyPercentage = Math.min(remaining, 100); // Apply to next 100 or remainder
                    adjusted += applyPercentage * (1 + percentage / 100) - applyPercentage; // Adjust
                    remaining -= 100; // Reduce by 100 for next iteration
                    if (percentage > 10) percentage -= 1; // Decrease percentage but not below 10%
                }
            }

            return adjusted;
        };

        setAdjustedNumber(calculateAdjustedNumber(number));
    }, [number]);

    return (
        <div>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)}
                placeholder="Enter a number"
            />
            <p>Original Number: {number}</p>
            <p>Adjusted Number: {adjustedNumber.toFixed(2)}</p>
        </div>
    );
}
