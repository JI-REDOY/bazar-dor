const Loading = () => {
    return (
        <main className="max-w-6xl mx-auto px-4 py-6">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-4" />

            {/* Product Header Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gray-200 animate-pulse shrink-0" />
                    <div className="flex-1">
                        <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
                <div className="bg-gray-50 rounded-2xl px-6 py-4 min-w-[160px]">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2 mx-auto" />
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-2 mx-auto" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2 mx-auto" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse mx-auto" />
                </div>
            </div>

            {/* Price Summary Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-5" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
                        >
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-3" />
                            <div className="h-7 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bazar Table Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
                <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-5" />
                <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-10 bg-gray-100 rounded animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Loading;