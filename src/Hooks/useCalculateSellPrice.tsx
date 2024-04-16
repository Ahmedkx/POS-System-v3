const useCalculateSellPrice = (number: number) => {
    let percentage = 20; // Starting percentage
    let totalAdjustment = 0;
    for (let i = 1; i <= number; i += 100) {
        const applyTo = Math.min(100, number - (i - 1));
        const adjustment = applyTo * (percentage / 100);
        totalAdjustment += adjustment;

        // Update percentage for next iteration, not below 10%
        percentage = Math.max(10, percentage - 1);
    }
    // let sellPrice = Math.ceil((number + totalAdjustment) / 5) * 5;
    let sellPrice = Math.ceil(number + totalAdjustment);
    return sellPrice;
};

export default useCalculateSellPrice;
