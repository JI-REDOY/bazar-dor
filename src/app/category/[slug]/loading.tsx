const Loading = () => {
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            {/* Category Header Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
                <div className="flex-1">
                    <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>

            {/* Sort Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 mt-6 mb-6 flex items-center justify-end">
                <div className="h-9 w-40 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Count Skeleton */}
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-4" />

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-2xl p-5"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-gray-200 animate-pulse" />
                            <div className="flex-1">
                                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Loading;