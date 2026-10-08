import Link from "next/link";
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

const ProductCard = ({ product }: Props) => {
    const dir = product.change.dir;
    const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
    const badgeColor =
        dir === "up"
            ? "text-[#dc2626]"
            : dir === "down"
            ? "text-[#16a34a]"
            : "text-gray-500";

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
                    {product.image}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                        {product.nameBn}
                    </h3>
                    <p className="text-sm text-gray-500">
                        প্রতি {unitLabel(product.unit)}
                    </p>
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {toBanglaNumber(product.today)} টাকা
                    </p>
                </div>
                <span
                    className={`text-sm font-bold px-2.5 py-1 rounded-full bg-gray-50 ${badgeColor}`}
                >
                    {arrow} {toBanglaNumber(Math.abs(product.change.pct))}%
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;