import HeroSlider from "@/components/features/hero-slider"
import MovieCarousel from "@/components/features/movie-carousel"
import { MovieService } from "@/services/movie.service"

import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "MovieOn - Watch Movies Online",
    description: "Discover and watch trending movies, new releases, and popular films.",
}

/**
 * Home Page - Server Component
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ compose các feature components và fetch data
 * - Dependency Inversion: Phụ thuộc vào MovieService abstraction
 *
 * Note: Fetch data từ Supabase thay vì mock data
 */
export default async function Home() {
    try {
        // Fetch data từ database (Server-side)
        const [trendingMovies, newReleases, popularMovies] = await Promise.all([
            MovieService.getTrendingMovies(10),
            MovieService.getNewReleases(10),
            MovieService.getPopularMovies(10),
        ])

        // Handle case: không có movies
        if (trendingMovies.length === 0 && newReleases.length === 0 && popularMovies.length === 0) {
            return (
                <main className="container mx-auto px-4 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">No movies available</h1>
                        <p className="text-muted-foreground mt-2">Please check back later.</p>
                    </div>
                </main>
            )
        }

        return (
            <main className="">
                {/* Hero Section - Slider với Top 5 Trending Movies */}
                {trendingMovies.length > 0 && (
                    <HeroSlider movies={trendingMovies.slice(0, 5)} autoPlayInterval={5000} />
                )}

                {/* Content Sections */}
                <div className="container mx-auto space-y-12 px-4 py-12 md:px-8">
                    {/* Trending Movies */}
                    {trendingMovies.length > 0 && (
                        <MovieCarousel title="Trending Now" movies={trendingMovies} />
                    )}

                    {/* New Releases */}
                    {newReleases.length > 0 && (
                        <MovieCarousel title="New Releases" movies={newReleases} />
                    )}

                    {/* Popular Movies */}
                    {popularMovies.length > 0 && (
                        <MovieCarousel title="Popular on MovieOn" movies={popularMovies} />
                    )}
                </div>
            </main>
        )
    } catch (error) {
        console.error("Error loading movies:", error)
        return (
            <main className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500">Error Loading Movies</h1>
                    <p className="text-muted-foreground mt-2">
                        Something went wrong. Please try again later.
                    </p>
                </div>
            </main>
        )
    }
}
