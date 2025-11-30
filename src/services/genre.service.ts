import { supabase } from "@/lib/supabase/client"
import { Genre } from "@/types/database"

/**
 * GenreService - Quản lý operations với genres
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ xử lý logic liên quan đến genres
 * - Dependency Inversion: Phụ thuộc vào supabase client abstraction
 */
export class GenreService {
    /**
     * Get all genres
     */
    static async getAllGenres(): Promise<Genre[]> {
        try {
            const { data, error } = await supabase
                .from("genre")
                .select("*")
                .order("name", { ascending: true })

            if (error) throw error
            return data || []
        } catch (error) {
            console.error("Error fetching genres:", error)
            return []
        }
    }

    /**
     * Get genre by slug
     */
    static async getGenreBySlug(slug: string): Promise<Genre | null> {
        try {
            const { data, error } = await supabase
                .from("genre")
                .select("*")
                .eq("slug", slug)
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error("Error fetching genre:", error)
            return null
        }
    }

    /**
     * Get movie count by genre
     */
    static async getMovieCountByGenre(genreId: number): Promise<number> {
        try {
            const { count, error } = await supabase
                .from("moviegenre")
                .select("*", { count: "exact", head: true })
                .eq("genre_id", genreId)

            if (error) throw error
            return count || 0
        } catch (error) {
            console.error("Error fetching movie count:", error)
            return 0
        }
    }
}
