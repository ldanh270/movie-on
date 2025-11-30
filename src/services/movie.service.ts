import { supabase } from "@/lib/supabase"
import type { MovieWithGenreJoin, MovieWithGenres } from "@/types/database"
import { type MovieCardData, mapDatabaseMovieToUI } from "@/types/movie"

/**
 * Movie Service
 *
 * Service layer để tương tác với Supabase database
 * Follow Repository Pattern và SOLID principles
 */
export class MovieService {
    /**
     * Lấy danh sách trending movies (theo rating_average)
     */
    static async getTrendingMovies(limit = 10): Promise<MovieCardData[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .not("rating_average", "is", null)
            .order("rating_average", { ascending: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching trending movies:", error)
            return []
        }

        return (data || []).map(mapDatabaseMovieToUI)
    }

    /**
     * Lấy danh sách new releases (theo created_at)
     */
    static async getNewReleases(limit = 10): Promise<MovieCardData[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching new releases:", error)
            return []
        }

        return (data || []).map(mapDatabaseMovieToUI)
    }

    /**
     * Lấy danh sách popular movies (theo publish_year và rating)
     */
    static async getPopularMovies(limit = 10): Promise<MovieCardData[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .not("publish_year", "is", null)
            .order("publish_year", { ascending: false })
            .order("rating_average", { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching popular movies:", error)
            return []
        }

        return (data || []).map(mapDatabaseMovieToUI)
    }

    /**
     * Lấy movies theo genre
     */
    static async getMoviesByGenre(genreSlug: string, limit = 1000): Promise<MovieCardData[]> {
        // Query movies với moviegenre join
        const { data, error } = await supabase
            .from("movie")
            .select(
                `
                *,
                moviegenre!inner (
                    genre!inner (
                        id,
                        slug,
                        name,
                        background_url
                    )
                )
            `,
            )
            .eq("moviegenre.genre.slug", genreSlug)
            .order("rating_average", { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching movies by genre:", error)
            return []
        }

        // Map database format sang UI format
        return (data || []).map((item: MovieWithGenreJoin) => {
            const movie = mapDatabaseMovieToUI(item)
            // Thêm genre info nếu có
            if (item.moviegenre && item.moviegenre.length > 0) {
                movie.genre = item.moviegenre.map((mg) => mg.genre.name)
            }
            return movie
        })
    }

    /**
     * Lấy movie theo slug với genres
     */
    static async getMovieBySlug(slug: string): Promise<MovieWithGenres | null> {
        const { data: movie, error } = await supabase
            .from("movie")
            .select(
                `
                *,
                moviegenre (
                    genre:genre_id (
                        id,
                        name,
                        slug,
                        background_url
                    )
                )
            `,
            )
            .eq("slug", slug)
            .single()

        if (error) {
            console.error("Error fetching movie by slug:", error)
            return null
        }

        return movie as MovieWithGenres
    }

    /**
     * Lấy tất cả movies với pagination
     */
    static async getAllMovies(page = 1, pageSize = 20): Promise<MovieCardData[]> {
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .range(from, to)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching all movies:", error)
            return []
        }

        return (data || []).map(mapDatabaseMovieToUI)
    }

    /**
     * Search movies theo title
     */
    static async searchMovies(query: string, limit = 10): Promise<MovieCardData[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .ilike("title", `%${query}%`)
            .limit(limit)

        if (error) {
            console.error("Error searching movies:", error)
            return []
        }

        return (data || []).map(mapDatabaseMovieToUI)
    }
}
