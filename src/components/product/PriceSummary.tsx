import { Market } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    markets: Market[];
};

const PriceSummary = ({ markets }: Props) => {
    if (!markets || markets.length === 0) return null;

    const minPrice = Math.min(...markets.map((m) => m.min));
    const maxPrice = Math.max(...markets.map((m) => m.max));
    const avgPrice = Math.round(
        markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
            markets.length
    );

    const minMarket = markets.find((m) => m.min === minPrice);
    const maxMarket = markets.find((m) => m.max === maxPrice);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
                দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                    <p className="text-xs text-gray-600 mb-2">সর্বনিম্ন দাম</p>
                    <p className="text-2xl font-bold text-[#16a34a] mb-1">
                        {toBanglaNumber(minPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-500">
                        {minMarket?.market || ""} বাজার
                    </p>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                    <p className="text-xs text-gray-600 mb-2">সর্বোচ্চ দাম</p>
                    <p className="text-2xl font-bold text-[#dc2626] mb-1">
                        {toBanglaNumber(maxPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-500">
                        {maxMarket?.market || ""} বাজার
                    </p>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <p className="text-xs text-gray-600 mb-2">গড় দাম</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                        {toBanglaNumber(avgPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-500">
                        প্রতি কেজি-এর হিসাব
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceSummary;