import { Movie as DbMovie, Genre } from "./database"

/**
 * Movie Domain Types
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ định nghĩa types cho movie domain
 * - Interface Segregation: Tách biệt types cho UI và Database
 */

// Movie type cho UI (mapped từ database)
export interface Movie {
    id: number
    title: string
    slug: string
    description: string
    posterUrl: string
    backdropUrl?: string
    rating: number
    releaseYear: number
    genre: string[] // Mapped từ genres
    duration: number // minutes
}

// Movie with full details (bao gồm genres)
export interface MovieWithGenres extends DbMovie {
    genres: Genre[]
}

// Helper function to map database movie to UI movie
export function mapDbMovieToMovie(dbMovie: MovieWithGenres): Movie {
    return {
        id: dbMovie.id,
        title: dbMovie.title,
        slug: dbMovie.slug,
        description: dbMovie.description || "",
        posterUrl: dbMovie.poster_url || "/placeholder-poster.jpg",
        backdropUrl: dbMovie.background_url || undefined,
        rating: dbMovie.rating_average || 0,
        releaseYear: dbMovie.publish_year || new Date().getFullYear(),
        genre: dbMovie.genres.map((g) => g.name),
        duration: dbMovie.duration_minutes || 0,
    }
}

export interface MovieCardProps {
    movie: Movie
    className?: string
    onPlay?: (movieId: number) => void
}

export interface MovieCarouselProps {
    movies: Movie[]
    title?: string
    className?: string
}
