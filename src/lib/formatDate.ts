const banglaMonths = [
    "বৈশাখ",
    "জ্যৈষ্ঠ",
    "আষাঢ়",
    "শ্রাবণ",
    "ভাদ্র",
    "আশ্বিন",
    "কার্তিক",
    "অগ্রহায়ণ",
    "পৌষ",
    "মাঘ",
    "ফাল্গুন",
    "চৈত্র",
];

const banglaDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
];

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const toBanglaNumber = (value: number | string): string => {
    return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};

export const formatBanglaDate = (date: Date = new Date()): string => {
    const monthIndex = date.getMonth();
    const banglaMonth = banglaMonths[monthIndex];
    const day = toBanglaNumber(date.getDate());
    const year = toBanglaNumber(date.getFullYear() - 593);
    const dayName = banglaDays[date.getDay()];

    return `${dayName}, ${day} ${banglaMonth}, ${year}`;
};