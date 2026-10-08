"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/cards/ProductCard";

import { Product } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";
import SortDropdown from "@/components/category/SortDropdown";

type SortOption = "default" | "low-high" | "high-low";

type Props = {
    products: Product[];
};

const ProductGrid = ({ products }: Props) => {
    const [sort, setSort] = useState<SortOption>("default");

    const sortedProducts = useMemo(() => {
        const list = [...products];
        if (sort === "low-high") {
            list.sort((a, b) => a.today - b.today);
        } else if (sort === "high-low") {
            list.sort((a, b) => b.today - a.today);
        }
        return list;
    }, [products, sort]);

    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                    এই ক্যাটাগরিতে কোনো পণ্য নেই।
                </p>
                <a
                    href="/"
                    className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                    হোম পেজে ফিরে যান
                </a>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-3 mt-6 mb-6 flex items-center justify-end">
                <SortDropdown value={sort} onChange={setSort} />
            </div>

            <p className="text-sm text-gray-500 mb-4">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default ProductGrid;