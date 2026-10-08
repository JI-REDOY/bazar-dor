import Image from "next/image";
import Link from "next/link";
import { formatBanglaDate } from "@/lib/formatDate";

const HeroSection = () => {
    const today = formatBanglaDate();

    return (
        <section className="max-w-6xl mx-auto px-4 pt-6">
            <div className="bg-white border border-gray-200 rounded-2xl px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <span className="inline-block bg-green-50 text-[#16a34a] text-xs font-medium px-3 py-1 rounded-full mb-4">
                        {today}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link
                        href="#সব-পণ্য"
                        className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={320}
                        height={320}
                        className="w-auto h-auto max-w-full object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;