import { supabase } from "@/lib/supabase"
import type { Genre } from "@/types/database"

/**
 * Genre Service
 *
 * Service layer để tương tác với genre data từ Supabase
 */
export class GenreService {
    /**
     * Lấy tất cả genres
     */
    static async getAllGenres(): Promise<Genre[]> {
        const { data, error } = await supabase
            .from("genre")
            .select("*")
            .order("name", { ascending: true })

        if (error) {
            console.error("Error fetching genres:", error)
            return []
        }

        return data || []
    }

    /**
     * Lấy genre theo slug
     */
    static async getGenreBySlug(slug: string): Promise<Genre | null> {
        const { data, error } = await supabase.from("genre").select("*").eq("slug", slug).single()

        if (error) {
            console.error("Error fetching genre:", error)
            return null
        }

        return data
    }

    /**
     * Đếm số lượng movies trong genre
     */
    static async getMovieCountByGenre(genreId: number): Promise<number> {
        const { count, error } = await supabase
            .from("moviegenre")
            .select("*", { count: "exact", head: true })
            .eq("genre_id", genreId)

        if (error) {
            console.error("Error counting movies:", error)
            return 0
        }

        return count || 0
    }
}
