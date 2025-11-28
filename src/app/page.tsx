import { HomeHero } from "@/components/features/home-hero"
import { MovieCarousel } from "@/components/features/movie-carousel"
import { MovieService } from "@/services/movie.service"

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
    // Fetch data từ database (Server-side)
    const [featuredMovie, trendingMovies, newReleases, popularMovies] = await Promise.all([
        MovieService.getFeaturedMovie(),
        MovieService.getTrendingMovies(10),
        MovieService.getNewReleases(10),
        MovieService.getPopularMovies(10),
    ])

    // Handle case: không có featured movie
    if (!featuredMovie) {
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
            {/* Hero Section - Featured Movie */}
            <HomeHero movie={featuredMovie} />

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
}
