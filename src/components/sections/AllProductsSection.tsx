import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/product";
import { toBanglaNumber } from "@/lib/banglaNumber";

type Props = {
    products: Product[];
};

const AllProductsSection = ({ products }: Props) => {
    if (!products || products.length === 0) return null;

    return (
        <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 pt-12 pb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                সব পণ্য
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default AllProductsSection;