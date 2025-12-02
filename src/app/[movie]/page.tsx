import MovieCard from "@/components/features/movie-card"
import MovieDetailClient from "@/components/features/movie-detail-client"
import SaveToHistory from "@/components/features/save-to-history"
import YouTubePlayer from "@/components/features/youtube-player"
import { Button } from "@/components/ui/button"
import { MovieService } from "@/services/movie.service"
import { mapDatabaseMovieToUI } from "@/types/movie"

import {
    ArrowLeft,
    Calendar,
    Clapperboard,
    Clock,
    Eye,
    Film,
    MessageSquare,
    Star,
} from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

interface MoviePageProps {
    params: Promise<{ movie: string }>
}

interface MovieGenre {
    genre: {
        id: string | number
        name: string
    }
}

// Thêm interface này để định nghĩa kiểu dữ liệu cho Review
interface Review {
    rating: number | string | null
}

interface MovieWithGenres {
    id: string | number
    movie_id: string | number
    genre_id: string | number
    title: string
    description: string | null
    video_url: string | null
    trailer_url: string | null
    rating: number | null
    rating_average: number | null
    publish_year: number | null
    duration_minutes: number | null
    view_count: number | null
    moviegenre?: MovieGenre[] | null
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
    const { movie: movieSlug } = await params
    const movieData = await MovieService.getMovieDetailBySlug(movieSlug)

    if (!movieData || typeof movieData !== "object") {
        return {
            title: "Movie Not Found - MovieOn",
        }
    }

    const movie = movieData as MovieWithGenres

    return {
        title: `${movie.title} - Watch Online | MovieOn`,
        description: movie.description ?? `Watch ${movie.title} online on MovieOn`,
    }
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { movie: movieSlug } = await params
    const movieData = await MovieService.getMovieDetailBySlug(movieSlug)

    if (!movieData || typeof movieData !== "object") {
        notFound()
    }

    const movie = movieData as MovieWithGenres

    // Save to watch history (client-side will be handled by a client component)

    // Fetch reviews and related movies
    const [reviews, relatedMoviesRaw] = await Promise.all([
        MovieService.getMovieReviews(String(movie.id)),
        MovieService.getRelatedMovies(String(movie.id), 3),
    ])

    const relatedMovies = relatedMoviesRaw.map(mapDatabaseMovieToUI)
    const genres = Array.isArray(movie.moviegenre)
        ? movie.moviegenre.map((mg) => mg.genre.name)
        : []

    // FIX: Sử dụng interface Review thay vì any
    let averageRating: string | null = null
    if (Array.isArray(reviews) && reviews.length > 0) {
        // r được định kiểu là Review, TypeScript sẽ hiểu r.rating tồn tại
        const total = reviews.reduce((sum, r: Review) => sum + (Number(r.rating) || 0), 0)
        averageRating = (total / reviews.length).toFixed(1)
    }

    return (
        <main className="min-h-screen">
            {/* Save to History */}
            <SaveToHistory
                movieId={String(movie.id)}
                title={movie.title}
                slug={movieSlug}
                posterUrl={movie.video_url}
                rating={movie.rating_average}
            />

            {/* Back Navigation */}
            <div className="container mx-auto px-4 py-4 md:px-8">
                <Button
                    variant="ghost"
                    size="sm"
                    className="group gap-2 hover:-translate-x-1 hover:bg-white/20"
                    asChild
                >
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            {/* Video Player Section */}
            <section className="bg-background select-none">
                <div className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
                    {movie.video_url ? (
                        <YouTubePlayer
                            videoUrl={movie.video_url}
                            title={movie.title}
                            className="mx-auto max-w-7xl"
                        />
                    ) : (
                        <div className="bg-muted/20 mx-auto flex aspect-video max-w-7xl items-center justify-center rounded-lg border">
                            <div className="space-y-3 text-center">
                                <div className="bg-muted/30 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                                    <span className="text-4xl">
                                        <Clapperboard />
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-lg">Video not available</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
                <div className="mx-auto max-w-7xl space-y-12">
                    {/* Movie Info Header */}
                    <div className="space-y-6">
                        {/* Title */}
                        <div className="space-y-4 select-none">
                            <h1 className="font-title text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                {movie.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                                {/* Rating */}
                                {movie.rating_average !== null && (
                                    <div className="bg-primary/10 flex items-center gap-2 rounded-lg px-4 py-2">
                                        <Star className="fill-primary text-primary h-5 w-5" />
                                        <span className="font-bold">
                                            {Number(movie.rating_average).toFixed(1)}
                                        </span>
                                    </div>
                                )}

                                {/* Year */}
                                {movie.publish_year && (
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{movie.publish_year}</span>
                                    </div>
                                )}

                                {/* Duration */}
                                {movie.duration_minutes && (
                                    <>
                                        <span className="text-muted-foreground">•</span>
                                        <div className="text-muted-foreground flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{movie.duration_minutes} min</span>
                                        </div>
                                    </>
                                )}

                                {/* Views */}
                                {movie.view_count !== null && movie.view_count !== undefined && (
                                    <>
                                        <span className="text-muted-foreground">•</span>
                                        <div className="text-muted-foreground flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            <span>{movie.view_count.toLocaleString()} views</span>
                                        </div>
                                    </>
                                )}

                                {/* Review Count */}
                                {Array.isArray(reviews) && reviews.length > 0 && (
                                    <>
                                        <span className="text-muted-foreground">•</span>
                                        <div className="text-muted-foreground flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>{reviews.length} reviews</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Genres */}
                        {genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 select-none">
                                {genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="bg-primary/10 hover:bg-primary/20 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        {movie.description && (
                            <div className="space-y-3">
                                <h2 className="font-title text-2xl font-bold select-none">
                                    Overview
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <hr className="border-border" />

                    {/* Trailer Section */}
                    {movie.trailer_url && (
                        <>
                            <div className="space-y-6">
                                <h2 className="font-title flex flex-row items-center gap-3 text-2xl font-bold select-none md:text-3xl">
                                    <Film className="h-10 w-10" />
                                    Official Trailer
                                </h2>
                                <YouTubePlayer
                                    videoUrl={movie.trailer_url}
                                    title={`${movie.title} - Trailer`}
                                    className="mx-auto max-w-4xl"
                                />
                            </div>
                            <hr className="border-border" />
                        </>
                    )}

                    {/* Reviews Section - Using Client Component */}
                    <MovieDetailClient
                        movieId={String(movie.id)}
                        movieTitle={movie.title}
                        reviews={reviews}
                        averageRating={averageRating}
                    />

                    {/* Related Movies Section */}
                    {relatedMovies.length > 0 && (
                        <>
                            <hr className="border-border" />
                            <div className="space-y-6">
                                <h2 className="font-title flex flex-row items-center gap-3 pb-5 text-2xl font-bold select-none md:text-3xl">
                                    <Clapperboard className="h-10 w-10" /> Related Movies
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {relatedMovies.map((relatedMovie) => (
                                        <MovieCard key={relatedMovie.id} movie={relatedMovie} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}
