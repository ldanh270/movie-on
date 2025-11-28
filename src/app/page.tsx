import { HomeHero } from "@/components/features/home-hero"
import { MovieCarousel } from "@/components/features/movie-carousel"
import { FEATURED_MOVIE, NEW_RELEASES, POPULAR_MOVIES, TRENDING_MOVIES } from "@/data/mock-movies"

/**
 * Home Page
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ compose các feature components
 * - Open/Closed: Dễ dàng thêm sections mới
 * - Dependency Inversion: Phụ thuộc vào abstractions (components)
 *
 * Layout Structure:
 * - Hero Section: Featured movie với backdrop image
 * - Trending Section: Carousel của trending movies
 * - New Releases Section: Carousel của phim mới
 * - Popular Section: Carousel của phim popular
 */
export default function Home() {
    return (
        <main className="min-h-screen w-full">
            {/* Hero Section - Featured Movie */}
            <HomeHero movie={FEATURED_MOVIE} />

            {/* Content Sections */}
            <div className="container mx-auto space-y-12 px-4 py-12 md:px-8">
                {/* Trending Movies */}
                <MovieCarousel title="Trending Now" movies={TRENDING_MOVIES} />

                {/* New Releases */}
                <MovieCarousel title="New Releases" movies={NEW_RELEASES} />

                {/* Popular Movies */}
                <MovieCarousel title="Popular on MovieOn" movies={POPULAR_MOVIES} />
            </div>
        </main>
    )
}
