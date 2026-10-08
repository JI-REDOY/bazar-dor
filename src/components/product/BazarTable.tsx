import { Market } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    markets: Market[];
};

const BazarTable = ({ markets }: Props) => {
    if (!markets || markets.length === 0) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
                বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-3 font-semibold text-gray-700">
                                বাজার
                            </th>
                            <th className="text-left py-3 px-3 font-semibold text-gray-700">
                                জেলা
                            </th>
                            <th className="text-right py-3 px-3 font-semibold text-gray-700">
                                সর্বনিম্ন
                            </th>
                            <th className="text-right py-3 px-3 font-semibold text-gray-700">
                                সর্বোচ্চ
                            </th>
                            <th className="text-right py-3 px-3 font-semibold text-gray-700">
                                গড়
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {markets.map((market, idx) => {
                            const avg = Math.round(
                                (market.min + market.max) / 2
                            );
                            return (
                                <tr
                                    key={idx}
                                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                >
                                    <td className="py-3 px-3 text-gray-900 font-medium">
                                        {market.market}
                                    </td>
                                    <td className="py-3 px-3 text-gray-600">
                                        {market.division}
                                    </td>
                                    <td className="py-3 px-3 text-right text-gray-700">
                                        {toBanglaNumber(market.min)} টাকা
                                    </td>
                                    <td className="py-3 px-3 text-right text-gray-700">
                                        {toBanglaNumber(market.max)} টাকা
                                    </td>
                                    <td className="py-3 px-3 text-right font-semibold text-gray-900">
                                        {toBanglaNumber(avg)} টাকা
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BazarTable;