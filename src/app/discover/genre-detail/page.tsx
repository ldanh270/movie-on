import MovieCarousel from "@/components/features/movie-carousel"
import { Button } from "@/components/ui/button"
import { GenreService } from "@/services/genre.service"
import { MovieService } from "@/services/movie.service"

import { ArrowLeft, Film } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

/**
 * Genre Detail Page - Movies filtered by genre
 *
 * SOLID Principles:
 * - Single Responsibility: Display movies của một genre cụ thể
 * - Dependency Inversion: Phụ thuộc vào MovieService & GenreService
 */

interface GenrePageProps {
    params: Promise<{ genre: string }>
}

export async function generateMetadata({ params }: GenrePageProps) {
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

export default async function GenrePage({ params }: GenrePageProps) {
    const { genre: genreSlug } = await params

    // Fetch genre info và movies
    const [genre, movies] = await Promise.all([
        GenreService.getGenreBySlug(genreSlug),
        MovieService.getMoviesByGenre(genreSlug),
    ])

    // Handle not found
    if (!genre) {
        notFound()
    }

    return (
        <main className="min-h-[calc(100vh-8.5vh)]">
            {/* Hero Section */}
            <section className="from-primary/5 to-background border-b bg-gradient-to-b py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Back Button */}
                    <Link href="/discover" className="group mb-6 inline-flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:bg-primary/10 gap-2"
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
                            <h1 className="font-title text-4xl font-bold capitalize md:text-5xl">
                                {genre.name}
                            </h1>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="bg-background/80 rounded-lg border px-4 py-2 backdrop-blur-sm">
                                <span className="text-sm font-semibold">
                                    {movies.length} Movies Available
                                </span>
                            </div>
                            {movies.length > 0 && (
                                <>
                                    <span className="text-muted-foreground">•</span>
                                    <span className="text-muted-foreground text-sm">
                                        Sorted by Rating
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
                            We don&#39t have any {genre.name} movies available right now. Check back
                            later or explore other genres.
                        </p>
                        <Link href="/discover" className="mt-6">
                            <Button>Explore Other Genres</Button>
                        </Link>
                    </div>
                ) : (
                    // Movies Grid/Carousel
                    <div className="space-y-8">
                        {/* Top Rated Section */}
                        <MovieCarousel
                            title={`Top Rated ${genre.name} Movies`}
                            movies={movies.slice(0, 10)}
                        />

                        {/* All Movies Section */}
                        {movies.length > 10 && (
                            <div className="space-y-6">
                                <h2 className="font-title text-2xl font-bold">
                                    All {genre.name} Movies
                                </h2>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                    {movies.slice(10).map((movie) => (
                                        <div
                                            key={movie.id}
                                            className="animate-fade-in-up group relative aspect-[2/3] overflow-hidden rounded-lg"
                                        >
                                            <Image
                                                src={movie.posterUrl}
                                                alt={movie.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="absolute right-0 bottom-0 left-0 p-3">
                                                    <h3 className="line-clamp-2 text-sm font-semibold text-white">
                                                        {movie.title}
                                                    </h3>
                                                    <p className="text-xs text-white/80">
                                                        {movie.releaseYear}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}
