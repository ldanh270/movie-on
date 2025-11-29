import { supabase } from "@/lib/supabase/client"
import { Movie, MovieWithGenres, mapDbMovieToMovie } from "@/types/movie"

/**
 * Movie Service
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý data fetching cho movies
 * - Open/Closed: Dễ dàng extend với các methods mới
 * - Dependency Inversion: Phụ thuộc vào Supabase client abstraction
 *
 * Note: Service layer giữa UI và Database
 */

export class MovieService {
    /**
     * Fetch movies với genres
     * @param limit - Số lượng movies cần fetch
     */
    private static async fetchMoviesWithGenres(limit?: number): Promise<MovieWithGenres[]> {
        let query = supabase
            .from("movie")
            .select(
                `
                *,
                moviegenre (
                    genre (
                        id,
                        slug,
                        name
                    )
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

        // Map data với genres
        return (data || []).map((movie) => ({
            ...movie,
            genres: movie.moviegenre?.map((mg: any) => mg.genre).filter(Boolean) || [],
        }))
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
     * Get trending movies (top rated)
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
     * Get new releases (recent publish year)
     */
    static async getNewReleases(limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre (
                        genre (
                            id,
                            slug,
                            name
                        )
                    )
                `,
                )
                .order("publish_year", { ascending: false })
                .limit(limit)

            if (error) throw error

            const movies: MovieWithGenres[] = (data || []).map((movie) => ({
                ...movie,
                genres: movie.moviegenre?.map((mg: any) => mg.genre).filter(Boolean) || [],
            }))

            return movies.map(mapDbMovieToMovie)
        } catch (error) {
            console.error("Error getting new releases:", error)
            return []
        }
    }

    /**
     * Get popular movies (có nhiều reviews)
     */
    static async getPopularMovies(limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre (
                        genre (
                            id,
                            slug,
                            name
                        )
                    ),
                    review (count)
                `,
                )
                .order("rating_average", { ascending: false })
                .limit(limit)

            if (error) throw error

            const movies: MovieWithGenres[] = (data || []).map((movie) => ({
                ...movie,
                genres: movie.moviegenre?.map((mg: any) => mg.genre).filter(Boolean) || [],
            }))

            return movies.map(mapDbMovieToMovie)
        } catch (error) {
            console.error("Error getting popular movies:", error)
            return []
        }
    }

    /**
     * Get movie by ID
     */
    static async getMovieById(id: number): Promise<Movie | null> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre (
                        genre (
                            id,
                            slug,
                            name
                        )
                    )
                `,
                )
                .eq("id", id)
                .single()

            if (error) throw error
            if (!data) return null

            const movie: MovieWithGenres = {
                ...data,
                genres: data.moviegenre?.map((mg: any) => mg.genre).filter(Boolean) || [],
            }

            return mapDbMovieToMovie(movie)
        } catch (error) {
            console.error("Error getting movie by ID:", error)
            return null
        }
    }

    /**
     * Search movies by title
     */
    static async searchMovies(query: string, limit: number = 10): Promise<Movie[]> {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
                    *,
                    moviegenre (
                        genre (
                            id,
                            slug,
                            name
                        )
                    )
                `,
                )
                .ilike("title", `%${query}%`)
                .limit(limit)

            if (error) throw error

            const movies: MovieWithGenres[] = (data || []).map((movie) => ({
                ...movie,
                genres: movie.moviegenre?.map((mg: any) => mg.genre).filter(Boolean) || [],
            }))

            return movies.map(mapDbMovieToMovie)
        } catch (error) {
            console.error("Error searching movies:", error)
            return []
        }
    }
}
