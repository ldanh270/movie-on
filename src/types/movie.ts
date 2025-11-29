// src/types/movie.ts
import { Movie as DbMovie, Genre } from "./database"

/**
 * --- PHẦN 1: TYPE CHO UI (Dùng trong Component) ---
 */
export interface Movie {
    id: string
    title: string
    slug: string
    description: string
    posterUrl: string
    backdropUrl?: string
    rating: number
    releaseYear: number
    genre: string[]
    duration: number
}

// Props cho Component
export interface MovieCardProps {
    movie: Movie
    className?: string
    onPlay?: (movieId: string) => void
}

export interface MovieCarouselProps {
    movies: Movie[]
    title?: string
    className?: string
}

/**
 * --- PHẦN 2: TYPE CHO DATABASE & SERVICE ---
 */

// Interface mở rộng để Service xử lý (Data sau khi đã làm phẳng genres)
export interface MovieWithGenres extends DbMovie {
    genres: Genre[]
}

// 👇 BỔ SUNG QUAN TRỌNG: Type mô tả dữ liệu thô Supabase trả về
// (Khớp với câu query select có join bảng moviegenre)
export interface MovieRawResponse extends DbMovie {
    moviegenre: {
        genre: Genre | null
    }[]
}

/**
 * --- PHẦN 3: HELPER FUNCTIONS ---
 */

// Helper 1: Map từ dữ liệu thô Supabase sang dạng trung gian (MovieWithGenres)
// Hàm này giúp loại bỏ "as any" bên Service
export function mapRawToMovieWithGenres(raw: MovieRawResponse): MovieWithGenres {
    return {
        ...raw, // Copy các trường của DbMovie
        genres: raw.moviegenre?.map((g) => g.genre).filter((g): g is Genre => g !== null) || [],
    }
}

// Helper 2: Map từ dạng trung gian sang UI (Snake_case -> CamelCase)
export function mapDbMovieToMovie(dbMovie: MovieWithGenres): Movie {
    return {
        id: dbMovie.id, // Bây giờ cả 2 đều là string (uuid), khớp nhau
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
