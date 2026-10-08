import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/product";

type Props = {
    products: Product[];
};

const TodayFallersSection = ({ products }: Props) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-4 pt-10">
            <div className="flex items-center gap-2 mb-5">
                <span className="text-[#16a34a] text-lg">▼</span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    আজ দাম কমেছে
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default TodayFallersSection;