import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    dir: "up" | "down" | "flat";
    pct: number;
};

const PriceChangeBadge = ({ dir, pct }: Props) => {
    const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
    const badgeColor =
        dir === "up"
            ? "bg-red-50 text-[#dc2626]"
            : dir === "down"
            ? "bg-green-50 text-[#16a34a]"
            : "bg-gray-100 text-gray-500";

    return (
        <span
            className={`text-xs font-semibold px-2 py-1 rounded ${badgeColor}`}
        >
            {arrow} {toBanglaNumber(Math.abs(pct))}%
        </span>
    );
};

export default PriceChangeBadge;