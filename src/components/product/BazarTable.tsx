import { Market } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    markets: Market[];
};

const BazarTable = ({ markets }: Props) => {
    if (!markets || markets.length === 0) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-5">
                বাজারভিত্তিক আজকের দাম
            </h2>

            {/* Desktop: Table */}
            <div className="hidden md:block">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left py-3.5 px-4 font-semibold text-gray-700 rounded-l-lg">
                                বাজার
                            </th>
                            <th className="text-left py-3.5 px-4 font-semibold text-gray-700">
                                জেলা
                            </th>
                            <th className="text-right py-3.5 px-4 font-semibold text-gray-700">
                                সর্বনিম্ন
                            </th>
                            <th className="text-right py-3.5 px-4 font-semibold text-gray-700">
                                সর্বোচ্চ
                            </th>
                            <th className="text-right py-3.5 px-4 font-semibold text-gray-700 rounded-r-lg">
                                গড়
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((market, idx) => {
                            const avg = Math.round(
                                (market.min + market.max) / 2
                            );
                            const isEven = idx % 2 === 1;
                            return (
                                <tr
                                    key={idx}
                                    className={`border-b border-gray-100 last:border-b-0 transition-colors ${
                                        isEven
                                            ? "bg-gray-50 hover:bg-gray-100"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    <td className="py-3.5 px-4 text-gray-900 font-medium">
                                        {market.market}
                                    </td>
                                    <td className="py-3.5 px-4 text-gray-600">
                                        {market.division}
                                    </td>
                                    <td className="py-3.5 px-4 text-right text-gray-700">
                                        {toBanglaNumber(market.min)} টাকা
                                    </td>
                                    <td className="py-3.5 px-4 text-right text-gray-700">
                                        {toBanglaNumber(market.max)} টাকা
                                    </td>
                                    <td className="py-3.5 px-4 text-right font-semibold text-gray-900">
                                        {toBanglaNumber(avg)} টাকা
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile: Cards */}
            <div className="md:hidden space-y-3">
                {markets.map((market, idx) => {
                    const avg = Math.round((market.min + market.max) / 2);
                    return (
                        <div
                            key={idx}
                            className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {market.market}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {market.division}
                                    </p>
                                </div>
                                <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">
                                    #{toBanglaNumber(idx + 1)}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="text-center bg-white rounded-lg py-2 border border-gray-100">
                                    <p className="text-gray-500 mb-1">
                                        সর্বনিম্ন
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {toBanglaNumber(market.min)}
                                    </p>
                                </div>
                                <div className="text-center bg-white rounded-lg py-2 border border-gray-100">
                                    <p className="text-gray-500 mb-1">
                                        সর্বোচ্চ
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {toBanglaNumber(market.max)}
                                    </p>
                                </div>
                                <div className="text-center bg-white rounded-lg py-2 border border-gray-100">
                                    <p className="text-gray-500 mb-1">গড়</p>
                                    <p className="font-semibold text-[#16a34a]">
                                        {toBanglaNumber(avg)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BazarTable;