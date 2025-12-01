import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
    return (
        <main className="container mx-auto space-y-12 px-4 py-8 md:px-8 lg:py-12">
            {/* Hero Section Skeleton */}
            <section className="space-y-6">
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-64 w-full rounded-lg md:h-96" />
            </section>

            {/* Movie Sections Skeleton */}
            {[1, 2, 3].map((section) => (
                <section key={section} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="aspect-video w-full rounded-lg" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </main>
    )
}
