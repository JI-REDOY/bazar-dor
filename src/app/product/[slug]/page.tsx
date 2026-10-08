import { notFound } from "next/navigation";
import Link from "next/link";
import ProductHeader from "@/components/product/ProductHeader";
import PriceSummary from "@/components/product/PriceSummary";
import BazarTable from "@/components/product/BazarTable";
import { fetchWithRevalidate } from "@/lib/api";
import { Product } from "@/types/product";

type Props = {
    params: Promise<{ slug: string }>;
};

const ProductPage = async ({ params }: Props) => {
    const { slug } = await params;

    const products = await fetchWithRevalidate<Product[]>("/products", 300);

    if (!products) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <p className="text-gray-500">ডেটা লোড করা যায়নি।</p>
            </div>
        );
    }

    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Link href="/" className="hover:text-[#16a34a]">
                    হোম
                </Link>
                <span>›</span>
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-[#16a34a]"
                >
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-900 font-medium">
                    {product.nameBn}
                </span>
            </nav>

            <ProductHeader product={product} />

            <div className="mt-6">
                <PriceSummary markets={product.markets} />
            </div>

            <div className="mt-6">
                <BazarTable markets={product.markets} />
            </div>
        </main>
    );
};

export default ProductPage;