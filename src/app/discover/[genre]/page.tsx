import MovieCard from "@/components/features/movie-card"
import { Button } from "@/components/ui/button"
import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"

import { ArrowLeft, ChevronLeft, ChevronRight, Film } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

/**
 * Genre Detail Page - Movies filtered by genre with pagination
 *
 * SOLID Principles:
 * - Single Responsibility: Display movies của một genre cụ thể
 * - Dependency Inversion: Phụ thuộc vào MovieService & GenreService
 */

interface GenrePageProps {
    params: Promise<{ genre: string }>
    searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: GenrePageProps): Promise<Metadata> {
    const { genre: genreSlug } = await params
    const genre = await GenreService.getGenreBySlug(genreSlug)

    if (!genre) {
        return {
            title: "Genre Not Found - MovieOn",
        }
    }

    return {
        title: `${genre.name} Movies - MovieOn`,
        description: `Browse the best ${genre.name} movies. Watch high-quality ${genre.name} films online.`,
    }
}

const MOVIES_PER_PAGE = 50

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
    const { genre: genreSlug } = await params
    const { page: pageParam } = await searchParams
    const currentPage = Number(pageParam) || 1

    // Fetch genre info và movies
    const [genre, allMovies] = await Promise.all([
        GenreService.getGenreBySlug(genreSlug),
        MovieService.getMoviesByGenre(genreSlug, 1000), // Fetch nhiều để tính pagination
    ])

    // Handle not found
    if (!genre) {
        notFound()
    }

    // Pagination logic
    const totalMovies = allMovies.length
    const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE)
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
    const endIndex = startIndex + MOVIES_PER_PAGE
    const movies = allMovies.slice(startIndex, endIndex)

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const showPages = 5 // Số pages hiển thị

        if (totalPages <= showPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        pages.push(1)

        let start = Math.max(2, currentPage - 1)
        let end = Math.min(totalPages - 1, currentPage + 1)

        if (currentPage <= 3) {
            end = showPages - 1
        } else if (currentPage >= totalPages - 2) {
            start = totalPages - (showPages - 2)
        }

        if (start > 2) pages.push("...")

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < totalPages - 1) pages.push("...")
        pages.push(totalPages)

        return pages
    }

    return (
        <main className="min-h-[calc(100vh-8.5vh)]">
            {/* Hero Section */}
            <section className="from-primary/5 to-background border-b bg-linear-to-b py-8 select-none md:py-12">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Back Button */}
                    <Link
                        href="/discover"
                        className="group mb-6 inline-flex items-center gap-2 select-none"
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className="group-hover:bg-primary/10 cursor-pointer gap-2"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Discover
                        </Button>
                    </Link>

                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary rounded-lg p-2.5">
                                <Film className="h-7 w-7 text-white" strokeWidth={2} />
                            </div>
                            <h1 className="font-title text-3xl font-bold capitalize md:text-4xl">
                                {genre.name} Movies
                            </h1>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="bg-background/80 rounded-lg border px-4 py-2 backdrop-blur-sm">
                                <span className="text-sm font-semibold">
                                    {totalMovies > 1 ? ` movies` : `${totalMovies} movie`}
                                </span>
                            </div>
                            {totalMovies > 0 && (
                                <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-muted-foreground text-sm">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Movies Section */}
            <section className="container mx-auto px-4 py-12 md:px-8">
                {movies.length === 0 ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-muted mb-6 rounded-full p-8">
                            <Film className="text-muted-foreground h-20 w-20" />
                        </div>
                        <h2 className="text-2xl font-bold">No Movies Found</h2>
                        <p className="text-muted-foreground mt-2 max-w-md">
                            We don&#39;t have any {genre.name} movies available right now. Check
                            back later or explore other genres.
                        </p>
                        <Link href="/discover" className="mt-6">
                            <Button>Explore Other Genres</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Movies Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    className="animate-fade-in-up"
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                {/* Previous Button */}
                                <Link
                                    href={`/discover/${genreSlug}?page=${currentPage - 1}`}
                                    className={currentPage === 1 ? "pointer-events-none" : ""}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </Link>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1">
                                    {getPageNumbers().map((pageNum, index) => {
                                        if (pageNum === "...") {
                                            return (
                                                <span
                                                    key={`ellipsis-${index}`}
                                                    className="text-muted-foreground px-2"
                                                >
                                                    ...
                                                </span>
                                            )
                                        }

                                        const isActive = pageNum === currentPage

                                        return (
                                            <Link
                                                key={pageNum}
                                                href={`/discover/${genreSlug}?page=${pageNum}`}
                                            >
                                                <Button
                                                    variant={isActive ? "default" : "outline"}
                                                    size="icon"
                                                    className="min-w-10"
                                                >
                                                    {pageNum}
                                                </Button>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Next Button */}
                                <Link
                                    href={`/discover/${genreSlug}?page=${currentPage + 1}`}
                                    className={
                                        currentPage === totalPages ? "pointer-events-none" : ""
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                {/* Page Info */}
                <div className="text-muted-foreground mt-20 text-center text-sm select-none">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalMovies)} of {totalMovies}{" "}
                    movies
                </div>
            </section>
        </main>
    )
}
