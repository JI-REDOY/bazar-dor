import { notFound } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";

import { fetchWithRevalidate } from "@/lib/api";
import { Category, Product } from "@/types/product";
import ProductGrid from "../ProductGrid";

type Props = {
    params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: Props) => {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        fetchWithRevalidate<Category>(`/categories/${slug}`, 3600),
        fetchWithRevalidate<Product[]>(`/products?category=${slug}`, 300),
    ]);

    if (!category) {
        notFound();
    }

    const productList = products || [];

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <CategoryHeader
                category={category}
                productCount={productList.length}
            />

            <ProductGrid products={productList} />
        </main>
    );
};

export default CategoryPage;