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
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                {/* Left: Product info */}
                <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-green-50 flex items-center justify-center text-3xl md:text-4xl shrink-0">
                        {product.image}
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
                            {product.nameBn}
                        </h1>
                        <p className="text-xs md:text-sm text-gray-500 mb-1.5">
                            প্রতি {unitLabel(product.unit)} ·{" "}
                            {product.categoryNameBn}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                            {descText}
                        </p>
                    </div>
                </div>

                {/* Right: Price box */}
                <div className="bg-gray-50 rounded-2xl px-5 py-4 flex md:flex-col items-center md:items-center justify-between md:justify-center gap-3 md:gap-0 md:min-w-[180px]">
                    <div className="flex flex-col items-center md:mb-2">
                        <p className="text-xs text-gray-500 mb-0.5 md:mb-1">
                            আজকের দাম
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">
                            {toBanglaNumber(product.today)}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                            টাকা / {unitLabel(product.unit)}
                        </p>
                    </div>
                    <span
                        className={`inline-block text-xs md:text-sm font-bold px-2.5 md:px-3 py-1 rounded-full ${badgeColor}`}
                    >
                        {arrow} {toBanglaNumber(Math.abs(product.change.pct))}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductHeader;