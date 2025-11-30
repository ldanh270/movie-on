import { supabase } from "@/lib/supabase"
import type { Movie, MovieWithGenres } from "@/types/database"

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
    static async getTrendingMovies(limit = 10): Promise<Movie[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .order("rating_average", { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching trending movies:", error)
            return []
        }

        return data || []
    }

    /**
     * Lấy danh sách new releases (theo created_at)
     */
    static async getNewReleases(limit = 10): Promise<Movie[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching new releases:", error)
            return []
        }

        return data || []
    }

    /**
     * Lấy danh sách popular movies (theo publish_year và rating)
     */
    static async getPopularMovies(limit = 10): Promise<Movie[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .order("publish_year", { ascending: false, nullsFirst: false })
            .order("rating_average", { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching popular movies:", error)
            return []
        }

        return data || []
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
    static async getAllMovies(page = 1, pageSize = 20): Promise<Movie[]> {
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

        return data || []
    }

    /**
     * Search movies theo title
     */
    static async searchMovies(query: string, limit = 10): Promise<Movie[]> {
        const { data, error } = await supabase
            .from("movie")
            .select("*")
            .ilike("title", `%${query}%`)
            .limit(limit)

        if (error) {
            console.error("Error searching movies:", error)
            return []
        }

        return data || []
    }
}
