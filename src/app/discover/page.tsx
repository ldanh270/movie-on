import GenreCard from "@/components/features/genre-card"
import { GenreService } from "@/services/genre.service"

import { Film } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

/**
 * Discover Page - Browse Movies by Genre
 *
 * SOLID Principles:
 * - Single Responsibility: Compose genre grid và fetch data
 * - Dependency Inversion: Phụ thuộc vào GenreService abstraction
 */
export const metadata: Metadata = {
    title: "Discover Movies - MovieOn",
    description: "Browse movies by genre. Find your next favorite movie.",
}

export default async function Discover() {
    // Fetch all genres
    const genres = await GenreService.getAllGenres()

    // Fetch movie counts for each genre (parallel)
    const genresWithCounts = await Promise.all(
        genres.map(async (genre) => ({
            ...genre,
            movieCount: await GenreService.getMovieCountByGenre(genre.id),
        })),
    )

    // Handle empty state
    if (genres.length === 0) {
        return (
            <main className="container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-muted mb-4 rounded-full p-6">
                        <Film className="text-muted-foreground h-16 w-16" />
                    </div>
                    <h1 className="text-3xl font-bold">No Genres Available</h1>
                    <p className="text-muted-foreground mt-2 max-w-md">
                        We{"'"}re currently updating our genre collection. Please check back later.
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="container mx-auto px-4 py-12 md:px-8">
            {/* Header Section */}
            <div className="mb-12 space-y-4 select-none">
                <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-lg p-2.5">
                        <Film className="h-7 w-7 text-white" strokeWidth={2} />
                    </div>
                    <h1 className="font-title text-4xl font-bold md:text-5xl">Discover Movies</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                    Explore our extensive collection of movies across various genres. Find your next
                    favorite film by browsing through different categories.
                </p>
                <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                    <span className="text-primary text-sm font-semibold">
                        {genres.length} Genres
                    </span>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">
                        {genresWithCounts.reduce((sum, g) => sum + g.movieCount, 0)} Movies
                    </span>
                </div>
            </div>

            {/* Genre Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {genresWithCounts.map((genre) => (
                    <GenreCard
                        key={genre.id}
                        genre={genre}
                        movieCount={genre.movieCount}
                        className="animate-fade-in-up"
                    />
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center select-none">
                <p className="text-muted-foreground">
                    Can{"'"}t find what you{"'"}re looking for?{" "}
                    <Link href="/" className="text-primary font-semibold hover:underline">
                        Explore Trending Movies
                    </Link>
                </p>
            </div>
        </main>
    )
}
