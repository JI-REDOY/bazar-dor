import { Category } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    category: Category;
    productCount: number;
};

const CategoryHeader = ({ category, productCount }: Props) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
                {category.icon}
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {category.nameBn}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {toBanglaNumber(productCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
                </p>
            </div>
        </div>
    );
};

export default CategoryHeader;