const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBanglaNumber = (value: number | string): string => {
    return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

export const formatBanglaPrice = (value: number): string => {
    const formatted = value.toLocaleString("en-IN");
    return toBanglaNumber(formatted);
};