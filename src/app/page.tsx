import HeroSection from "@/components/sections/HeroSection";
import TodayRisersSection from "@/components/sections/TodayRisersSection";
import TodayFallersSection from "@/components/sections/TodayFallersSection";
import AllProductsSection from "@/components/sections/AllProductsSection";
import { fetchWithRevalidate } from "@/lib/api";
import { Product } from "@/types/product";

const HomePage = async () => {
    const products = await fetchWithRevalidate<Product[]>("/products", 300);

    if (!products) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <p className="text-gray-500">ডেটা লোড করা যায়নি।</p>
            </div>
        );
    }

    const risers = [...products]
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallers = [...products]
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <>
            <HeroSection />
            <TodayRisersSection products={risers} />
            <TodayFallersSection products={fallers} />
            <AllProductsSection products={products} />
        </>
    );
};

export default HomePage;