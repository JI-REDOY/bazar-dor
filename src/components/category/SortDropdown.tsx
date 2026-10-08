"use client";

type SortOption = "default" | "low-high" | "high-low";

type Props = {
    value: SortOption;
    onChange: (value: SortOption) => void;
};

const SortDropdown = ({ value, onChange }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">সাজান:</span>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-9 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:border-[#16a34a] transition-colors cursor-pointer"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="low-high">দাম: কম থেকে বেশি</option>
                    <option value="high-low">দাম: বেশি থেকে কম</option>
                </select>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </div>
    );
};

export default SortDropdown;