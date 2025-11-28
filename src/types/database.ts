/**
 * Database Types
 *
 * Note: Auto-generated types từ Supabase schema
 * Mapping với schema: movie, genre, moviegenre, review
 */

export interface Database {
    public: {
        Tables: {
            movie: {
                Row: {
                    id: number
                    title: string
                    slug: string
                    description: string | null
                    publish_year: number | null
                    duration_minutes: number | null
                    background_url: string | null
                    poster_url: string | null
                    rating_average: number | null
                    created_at: string
                }
                Insert: Omit<Database["public"]["Tables"]["movie"]["Row"], "id" | "created_at">
                Update: Partial<Database["public"]["Tables"]["movie"]["Insert"]>
            }
            genre: {
                Row: {
                    id: number
                    slug: string
                    name: string
                }
                Insert: Omit<Database["public"]["Tables"]["genre"]["Row"], "id">
                Update: Partial<Database["public"]["Tables"]["genre"]["Insert"]>
            }
            moviegenre: {
                Row: {
                    movie_id: number
                    genre_id: number
                }
                Insert: Database["public"]["Tables"]["moviegenre"]["Row"]
                Update: Partial<Database["public"]["Tables"]["moviegenre"]["Insert"]>
            }
            review: {
                Row: {
                    id: number
                    movie_id: number
                    user_name: string
                    rating: number
                    comment: string | null
                    created_at: string
                }
                Insert: Omit<Database["public"]["Tables"]["review"]["Row"], "id" | "created_at">
                Update: Partial<Database["public"]["Tables"]["review"]["Insert"]>
            }
        }
    }
}

// Helper types
export type Movie = Database["public"]["Tables"]["movie"]["Row"]
export type Genre = Database["public"]["Tables"]["genre"]["Row"]
export type MovieGenre = Database["public"]["Tables"]["moviegenre"]["Row"]
export type Review = Database["public"]["Tables"]["review"]["Row"]
