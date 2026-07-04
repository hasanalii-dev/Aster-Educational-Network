export function PageSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Header Skeleton */}
            <div className="w-full h-[80px] border-b border-gray-100 flex items-center justify-between px-6 md:px-12 animate-pulse">
                <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                <div className="hidden md:flex gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-20 h-4 bg-gray-100 rounded-md"></div>
                    ))}
                </div>
            </div>

            {/* Hero Skeleton */}
            <div className="w-full h-[50vh] md:h-[60vh] bg-gray-50 animate-pulse flex flex-col items-center justify-center gap-6 px-4">
                <div className="w-3/4 max-w-2xl h-12 md:h-16 bg-gray-200 rounded-xl"></div>
                <div className="w-1/2 max-w-md h-6 bg-gray-200 rounded-md mt-4"></div>
                <div className="w-1/3 max-w-sm h-6 bg-gray-200 rounded-md"></div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-[1360px] mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
                    <div className="flex flex-col gap-6">
                        <div className="w-24 h-6 bg-gray-200 rounded-md mb-4"></div>
                        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-5/6 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-full h-32 bg-gray-100 rounded-2xl mt-4"></div>
                    </div>
                    <div className="w-full h-80 bg-gray-100 rounded-[32px]"></div>
                </div>
            </div>
        </div>
    );
}
