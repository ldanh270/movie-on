import { supabase } from "@/lib/supabase/client"
import {
    Movie,
    MovieRawResponse,
    MovieWithGenres,
    mapDbMovieToMovie,
    mapRawToMovieWithGenres,
} from "@/types/movie"

export class MovieService {
    /**
     * Helper private để xử lý logic lặp lại: Query -> Raw -> Clean -> UI Model
     * Hàm này giúp code gọn hơn rất nhiều
     */
    private static transformData(data: Movie[] | null): Movie[] {
        const rawData = (data || []) as unknown as MovieRawResponse[]
        return rawData.map(mapRawToMovieWithGenres).map(mapDbMovieToMovie)
    }

    /**
     * Fetch movies với genres (Logic gốc)
     */
    private static async fetchMoviesWithGenres(limit?: number): Promise<MovieWithGenres[]> {
        let query = supabase
            .from("movie")
            .select(
                `
                *,
                moviegenre (
                    genre ( id, slug, name )
                )
            `,
            )
            .order("rating_average", { ascending: false })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) {
            console.error("Error fetching movies:", error)
            throw new Error(`Failed to fetch movies: ${error.message}`)
        }

        // Return dạng trung gian (MovieWithGenres) nếu cần dùng nội bộ
        const rawData = data as unknown as MovieRawResponse[]
        return rawData.map(mapRawToMovieWithGenres)
    }

    /**
     * Get featured movie (highest rating)
     */
    static async getFeaturedMovie(): Promise<Movie | null> {
        try {
            const movies = await this.fetchMoviesWithGenres(1)
            if (movies.length === 0) return null
            return mapDbMovieToMovie(movies[0])
        } catch (error) {
            console.error("Error getting featured movie:", error)
            return null
        }
    }

    /**
     * Get trending movies
     */
    static async getTrendingMovies(limit: number = 10): Promise<Movie[]> {
        try {
            const movies = await this.fetchMoviesWithGenres(limit)
            return movies.map(mapDbMovieToMovie)
        } catch (error) {
            console.error("Error getting trending movies:", error)
            return []
        }
    }

    /**
     * Get new releases
     */
    static async getNewReleases(limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre ( genre ( id, slug, name ) )
                `,
                )
                .order("publish_year", { ascending: false })
                .limit(limit)

            if (error) throw error

            return this.transformData(data)
        } catch (error) {
            console.error("Error getting new releases:", error)
            return []
        }
    }

    /**
     * Get popular movies
     */
    static async getPopularMovies(limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre ( genre ( id, slug, name ) ),
                    review (count)
                `,
                )
                .order("rating_average", { ascending: false })
                .limit(limit)

            if (error) throw error

            return this.transformData(data)
        } catch (error) {
            console.error("Error getting popular movies:", error)
            return []
        }
    }

    /**
     * Get movie by ID
     */
    static async getMovieById(id: string): Promise<Movie | null> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre ( genre ( id, slug, name ) )
                `,
                )
                .eq("id", id)
                .single()

            if (error) throw error
            if (!data) return null

            // Xử lý cho object đơn lẻ
            const rawData = data as unknown as MovieRawResponse
            const movieWithGenre = mapRawToMovieWithGenres(rawData)
            return mapDbMovieToMovie(movieWithGenre)
        } catch (error) {
            console.error("Error getting movie by ID:", error)
            return null
        }
    }

    /**
     * Search movies
     */
    static async searchMovies(query: string, limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre ( genre ( id, slug, name ) )
                `,
                )
                .ilike("title", `%${query}%`)
                .limit(limit)

            if (error) throw error

            return this.transformData(data)
        } catch (error) {
            console.error("Error searching movies:", error)
            return []
        }
    }
}
