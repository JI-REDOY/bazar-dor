const Loading = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-10">
            {/* Title Skeleton */}
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6" />

            {/* Info Card Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-[72px] h-[72px] rounded-full bg-gray-200 animate-pulse shrink-0" />
                    <div className="flex-1">
                        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>

            {/* Form Skeleton */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-5" />
                <div className="space-y-4">
                    <div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                    </div>
                    <div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                    </div>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse mt-5" />
            </div>
        </main>
    );
};

export default Loading;