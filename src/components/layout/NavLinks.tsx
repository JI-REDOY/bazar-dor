"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Category } from "@/types/product";

type Props = {
    categories: Category[];
};

const NavLinks = ({ categories }: Props) => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isActive = (slug: string) => {
        if (!mounted) return false;
        return pathname === `/category/${slug}`;
    };

    return (
        <nav className="border-t border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-2 overflow-x-auto">
                <ul className="flex items-center gap-5 whitespace-nowrap">
                    {categories.map((cat) => (
                        <li key={cat.slug}>
                            <Link
                                href={`/category/${cat.slug}`}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    isActive(cat.slug)
                                        ? "text-[#16a34a]"
                                        : "text-gray-700 hover:text-[#16a34a]"
                                }`}
                            >
                                {cat.icon} {cat.nameBn}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavLinks;