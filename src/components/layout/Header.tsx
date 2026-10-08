import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import AuthButtons from "@/components/auth/AuthButtons";
import { formatBanglaDate } from "@/lib/formatDate";
import { fetchWithRevalidate } from "@/lib/api";
import { Product, Category } from "@/types/product";

const Header = async () => {
    const products = await fetchWithRevalidate<Product[]>("/products", 300);
    const categories = await fetchWithRevalidate<Category[]>(
        "/categories",
        3600
    );

    const today = formatBanglaDate();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#16a34a] rounded-lg flex items-center justify-center text-white text-xl">
                        🛒
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            বাজার দর
                        </h1>
                        <p className="text-xs text-gray-500">{today}</p>
                    </div>
                </Link>

                <AuthButtons />
            </div>

            <NavLinks categories={categories || []} />

            <Marquee products={products || []} />
        </header>
    );
};

export default Header;