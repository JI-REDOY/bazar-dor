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
    product: Product;
};

const ProductHeader = ({ product }: Props) => {
    const dir = product.change.dir;
    const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
    const badgeColor =
        dir === "up"
            ? "bg-red-50 text-[#dc2626]"
            : dir === "down"
            ? "bg-green-50 text-[#16a34a]"
            : "bg-gray-100 text-gray-500";

    const diff = Math.abs(product.today - product.yesterday);
    const descText =
        dir === "up"
            ? `গতকালের তুলনায় আজ দাম বেড়েছে: ${toBanglaNumber(diff)} টাকা`
            : dir === "down"
            ? `গতকালের তুলনায় আজ দাম কমেছে: ${toBanglaNumber(diff)} টাকা`
            : "গতকালের তুলনায় দাম অপরিবর্তিত আছে";

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center text-4xl shrink-0">
                    {product.image}
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {product.nameBn}
                    </h1>
                    <p className="text-sm text-gray-500 mb-2">
                        প্রতি {unitLabel(product.unit)} ·{" "}
                        {product.categoryNameBn}
                    </p>
                    <p className="text-sm text-gray-600">{descText}</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl px-6 py-4 text-center min-w-[160px]">
                <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                    {toBanglaNumber(product.today)}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                    টাকা / {unitLabel(product.unit)}
                </p>
                <span
                    className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${badgeColor}`}
                >
                    {arrow} {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
            </div>
        </div>
    );
};

export default ProductHeader;