import { Product } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

const unitLabel = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";
    return unit;
};

type Props = {
    products: Product[];
};

const Marquee = ({ products }: Props) => {
    if (!products || products.length === 0) return null;

    const items = [...products, ...products];

    return (
        <div className="bg-gray-50 border-t border-gray-200 overflow-hidden">
            <div className="flex items-center">
                <div className="bg-[#16a34a] text-white text-xs font-bold px-3 py-2 whitespace-nowrap">
                    আজকের দাম
                </div>
                <div className="flex-1 overflow-hidden">
                    <div className="flex gap-6 animate-marquee py-2">
                        {items.map((product, idx) => {
                            const dir = product.change.dir;
                            const arrow =
                                dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
                            const color =
                                dir === "up"
                                    ? "text-[#dc2626]"
                                    : dir === "down"
                                    ? "text-[#16a34a]"
                                    : "text-gray-500";

                            return (
                                <div
                                    key={`${product.id}-${idx}`}
                                    className="flex items-center gap-1 text-sm whitespace-nowrap"
                                >
                                    <span>{product.image}</span>
                                    <span className="text-gray-800">
                                        {product.nameBn}
                                    </span>
                                    <span className="text-gray-700 font-medium">
                                        {toBanglaNumber(product.today)} টাকা/
                                        {unitLabel(product.unit)}
                                    </span>
                                    <span className={`font-bold ${color}`}>
                                        {arrow}{" "}
                                        {toBanglaNumber(
                                            Math.abs(product.change.pct)
                                        )}
                                        %
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marquee;