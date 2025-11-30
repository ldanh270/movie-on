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
    description: string
    posterUrl: string
    backgroundUrl: string
    rating: number
    releaseYear: number
    duration: number
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
        description: movie.description || "No description available",
        posterUrl: movie.poster_url || "https://placehold.co/500x750/1a1a1a/white?text=No+Image",
        backgroundUrl:
            movie.background_url ||
            movie.poster_url ||
            "https://placehold.co/1920x1080/1a1a1a/white?text=No+Image",
        rating: movie.rating_average || 0,
        releaseYear: movie.publish_year || new Date().getFullYear(),
        duration: movie.duration_minutes || 0,
        genre: [],
    }
}
