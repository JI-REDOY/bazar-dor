const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
                <p>
                    <span className="font-semibold text-gray-900">
                        বাজার দর
                    </span>{" "}
                    — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>
                <p className="text-xs text-gray-500 text-center md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত
                    হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;