function useFormattedDate(timestamp: number) {
    // Check if timestamp is provided
    if (!timestamp) {
        // console.error("Timestamp is required");
        return null;
    }

    // Convert UNIX timestamp to milliseconds
    const timestampInMillis = timestamp * 1000;

    // Create a new Date object with the timestamp
    const date = new Date(timestampInMillis);

    // Get day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so January is 0, February is 1, etc.
    const year = date.getFullYear();

    // Format day and month with leading zeros if needed
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    // Format the date in "day/month/year" format
    // const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;

    return formattedDate;
}

export default useFormattedDate;
