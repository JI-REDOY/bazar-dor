"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";
import SortDropdown from "@/components/category/SortDropdown";
import ProductCard from "@/components/cards/ProductCard";
import { Category, Product } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";
import { API_BASE_URL } from "@/lib/api";

type SortOption = "default" | "low-high" | "high-low";

const CategoryPage = () => {
    const params = useParams();
    const slug = params?.slug as string;

    const [products, setProducts] = useState<Product[] | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [sort, setSort] = useState<SortOption>("default");
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/categories/${slug}`),
                    fetch(`${API_BASE_URL}/products?category=${slug}`),
                ]);

                if (!catRes.ok) {
                    setNotFound(true);
                    return;
                }

                const catData = await catRes.json();
                const prodData = await prodRes.json();

                setCategory(catData);
                setProducts(Array.isArray(prodData) ? prodData : []);
            } catch (err) {
                console.error(err);
                setNotFound(true);
            }
        };
        if (slug) load();
    }, [slug]);

    const sortedProducts = useMemo(() => {
        if (!products) return [];
        const list = [...products];
        if (sort === "low-high") {
            list.sort((a, b) => a.today - b.today);
        } else if (sort === "high-low") {
            list.sort((a, b) => b.today - a.today);
        }
        return list;
    }, [products, sort]);

    if (notFound) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    ক্যাটাগরি পাওয়া যায়নি
                </h1>
                <p className="text-gray-600 mb-6">
                    দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
                </p>
                <a
                    href="/"
                    className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    হোম পেজে ফিরে যান
                </a>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            {category && (
                <CategoryHeader
                    category={category}
                    productCount={products?.length || 0}
                />
            )}

            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-3 mt-6 mb-6 flex items-center justify-end">
                <SortDropdown value={sort} onChange={setSort} />
            </div>

            {products && products.length > 0 && (
                <p className="text-sm text-gray-500 mb-4">
                    মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            )}

            {products && products.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 mb-4">
                        এই ক্যাটাগরিতে কোনো পণ্য নেই।
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                        হোম পেজে ফিরে যান
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default CategoryPage;