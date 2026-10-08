import Link from "next/link";

const NotFound = () => {
    return (
        <main className="max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                পণ্যটি পাওয়া যায়নি
            </h1>
            <p className="text-gray-600 mb-6">
                দুঃখিত, আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
            </p>
            <Link
                href="/"
                className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
};

export default NotFound;