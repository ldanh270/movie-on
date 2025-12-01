import { supabase } from "@/lib/supabase"
import type { MovieWithGenres } from "@/types/database"
import { type MovieCardData, mapDatabaseMovieToUI } from "@/types/movie"

// TIPS: Để có Type Safety chuẩn, bạn nên update file @/lib/supabase.ts
// để inject <Database> generic vào hàm createClient.
// Còn hiện tại, mình sẽ cast 'as any' để bypass lỗi TypeScript check 'never'.

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
        // FIX: TypeScript không hiểu relationship nếu không có Type Definition chuẩn
        // Cast query string hoặc client để tránh lỗi
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .eq("moviegenre.genre.slug" as any, genreSlug)
            .order("rating_average", { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error("Error fetching movies by genre:", error)
            return []
        }

        // Map database format sang UI format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data || []).map((item: any) => {
            const movie = mapDatabaseMovieToUI(item)
            // Thêm genre info nếu có
            if (item.moviegenre && item.moviegenre.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movie.genre = item.moviegenre.map((mg: any) => mg.genre.name)
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
                    id, name, slug, background_url
                )
            )
        `,
            )
            .eq("slug", slug)
            // Sử dụng maybeSingle() thay vì single() để nhận null thay vì lỗi khi không có dữ liệu phù hợp
            .maybeSingle()

        if (error) {
            console.error("Error fetching movie by slug:", JSON.stringify(error, null, 2))
            return null
        }

        return movie as unknown as MovieWithGenres
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
     * Get movie detail by slug with genres
     */
    static async getMovieDetailBySlug(slug: string) {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
          *,
          moviegenre (
            genre:genre_id (
              id,
              name,
              slug
            )
          )
        `,
                )
                .eq("slug", slug)
                .maybeSingle()

            if (error) {
                console.error("Error fetching movie detail:", {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                })
                return null
            }

            if (!data) {
                console.log(`No movie found with slug: ${slug}`)
                return null
            }

            return data
        } catch (error) {
            console.error("Caught error in getMovieDetailBySlug:", error)
            return null
        }
    }

    /**
     * Get movie reviews
     */
    static async getMovieReviews(movieId: string) {
        try {
            // FIX: Cast 'as any' vì bảng review có thể chưa được định nghĩa trong type của supabase client
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from("review")
                .select("*")
                .eq("movie_id", movieId)
                .order("created_at", { ascending: false })

            if (error) {
                console.error("Error fetching reviews:", error)
                return []
            }

            return data || []
        } catch (error) {
            console.error("Error fetching reviews:", error)
            return []
        }
    }

    /**
     * Get related movies (same genres)
     */
    static async getRelatedMovies(movieId: string, limit: number = 6) {
        try {
            // Get genres of current movie
            // FIX: Cast 'as any' để bypass lỗi 'genre_id does not exist on never'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: currentMovieGenres, error: genreError } = await (supabase as any)
                .from("moviegenre")
                .select("genre_id")
                .eq("movie_id", movieId)

            if (genreError) {
                console.error("Error fetching movie genres:", genreError)
                return []
            }

            if (!currentMovieGenres || currentMovieGenres.length === 0) {
                return []
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const genreIds = currentMovieGenres.map((mg: any) => mg.genre_id)

            // Find movies with same genres (excluding current movie)
            // FIX: Cast 'as any'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: relatedMovieIds, error: relatedError } = await (supabase as any)
                .from("moviegenre")
                .select("movie_id")
                .in("genre_id", genreIds)
                .neq("movie_id", movieId)

            if (relatedError) {
                console.error("Error fetching related movie IDs:", relatedError)
                return []
            }

            if (!relatedMovieIds || relatedMovieIds.length === 0) {
                return []
            }

            // Get unique movie IDs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const uniqueMovieIds = [...new Set(relatedMovieIds.map((m: any) => m.movie_id))]

            // Fetch related movies with genres
            const { data, error } = await supabase
                .from("movie")
                .select(
                    `
          *,
          moviegenre (
            genre:genre_id (
              id,
              name,
              slug
            )
          )
        `,
                )
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .in("id" as any, uniqueMovieIds)
                .limit(limit)

            if (error) {
                console.error("Error fetching related movies:", error)
                return []
            }

            return data || []
        } catch (error) {
            console.error("Error in getRelatedMovies:", error)
            return []
        }
    }

    /**
     * Increment view count for a movie
     */
    static async incrementViewCount(movieId: string) {
        try {
            // Use RPC function if available, or manual increment
            const { data: movie, error: fetchError } = await supabase
                .from("movie")
                .select("view_count")
                .eq("id", movieId)
                .single()

            if (fetchError) {
                console.error("Error fetching view count:", fetchError)
                throw fetchError
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const currentView = (movie as any)?.view_count || 0
            const newViewCount = currentView + 1

            // FIX: Cast 'as any' để update view_count (tránh lỗi 'view_count does not exist on never')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: updateError } = await (supabase as any)
                .from("movie")
                .update({ view_count: newViewCount })
                .eq("id", movieId)

            if (updateError) {
                console.error("Error updating view count:", updateError)
                throw updateError
            }

            return newViewCount
        } catch (error) {
            console.error("Error incrementing view count:", error)
            throw error
        }
    }

    /**
     * Create a new review
     */
    static async createReview(data: {
        movieId: string
        userName: string
        rating: number
        comment: string
    }) {
        try {
            // FIX: Cast 'as any' để insert vào bảng review
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: review, error } = await (supabase as any)
                .from("review")
                .insert({
                    movie_id: data.movieId,
                    user_name: data.userName,
                    rating: data.rating,
                    comment: data.comment,
                })
                .select()
                .single()

            if (error) {
                console.error("Error creating review:", error)
                throw error
            }

            // Update movie rating average
            await this.updateMovieRating(data.movieId)

            return review
        } catch (error) {
            console.error("Error creating review:", error)
            throw error
        }
    }

    /**
     * Update movie rating average after new review
     */
    static async updateMovieRating(movieId: string) {
        try {
            // FIX: Cast 'as any' cho bảng review
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: reviews, error: reviewError } = await (supabase as any)
                .from("review")
                .select("rating")
                .eq("movie_id", movieId)

            if (reviewError) {
                console.error("Error fetching reviews for rating:", reviewError)
                return
            }

            if (!reviews || reviews.length === 0) return

            const average =
                reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
                reviews.length

            // FIX: Cast 'as any' để update rating_average
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: updateError } = await (supabase as any)
                .from("movie")
                .update({ rating_average: average })
                .eq("id", movieId)

            if (updateError) {
                console.error("Error updating movie rating:", updateError)
            }
        } catch (error) {
            console.error("Error in updateMovieRating:", error)
        }
    }

    /**
     * Search movies by title
     */
    static async searchMovies(query: string) {
        try {
            const { data, error } = await supabase
                .from("movie")
                .select("id, title, slug, publish_year, rating_average")
                .ilike("title", `%${query}%`)
                .order("rating_average", { ascending: false, nullsFirst: false })
                .limit(10)

            if (error) throw error
            return data || []
        } catch (error) {
            console.error("Error searching movies:", error)
            return []
        }
    }
}
