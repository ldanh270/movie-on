// src/types/movie.ts
import type { Movie as DbMovie, Genre } from "./database"

/**
 * --- PHẦN 1: TYPE CHO UI (Dùng trong Component) ---
 */

/**
 * Movie Card Data - UI format
 */
export interface MovieCardData {
    id: string
    title: string
    slug: string
    description: string | null
    posterUrl: string | null
    backgroundUrl: string | null
    rating: number | null
    releaseYear: number | null
    duration: number | null
    genre: string[]
}

/**
 * Movie Card Props
 */
export interface MovieCardProps {
    movie: MovieCardData
    className?: string
    onPlay?: (movieId: string) => void
}

/**
 * --- PHẦN 2: TYPE CHO DATABASE & SERVICE ---
 */

// Interface mở rộng để Service xử lý (Data sau khi đã làm phẳng genres)
export interface MovieWithGenres extends DbMovie {
    genres: Genre[]
}

// (Khớp với câu query select có join bảng moviegenre)
export interface MovieRawResponse extends DbMovie {
    moviegenre: {
        genre: Genre | null
    }[]
}

/**
 * --- PHẦN 3: HELPER FUNCTIONS ---
 */

/**
 * Mapper: Convert Database Movie -> UI Movie
 */
export function mapDatabaseMovieToUI(movie: DbMovie): MovieCardData {
    return {
        id: movie.id,
        title: movie.title,
        slug: movie.slug,
        description: movie.description,
        posterUrl: movie.poster_url,
        backgroundUrl: movie.background_url,
        rating: movie.rating_average,
        releaseYear: movie.publish_year,
        duration: movie.duration_minutes,
        genre: [],
    }
}

/**
 * Get fallback image URL
 */
export function getFallbackImage(type: "poster" | "background" = "poster"): string {
    if (type === "poster") {
        return "https://placehold.co/500x750/1a1a1a/666?text=No+Poster"
    }
    return "https://placehold.co/1920x1080/1a1a1a/666?text=No+Image"
}
