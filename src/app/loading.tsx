const Loading = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Hero Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="h-6 w-40 bg-gray-200 rounded-full animate-pulse mb-4" />
                    <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-6" />
                    <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
            </div>

            {/* Section Skeleton */}
            <div className="mt-10">
                <div className="h-7 w-56 bg-gray-200 rounded animate-pulse mb-5" />
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
            </div>
        </div>
    );
};

export default Loading;