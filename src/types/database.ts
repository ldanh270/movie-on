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
                    id: string // uuid
                    title: string
                    slug: string
                    description: string | null
                    publish_year: number | null // smallint
                    duration_minutes: number | null // smallint
                    background_url: string | null
                    poster_url: string | null
                    rating_average: number | null // numeric (0-10)
                    video_url: string | null
                    trailer_url: string | null
                    is_premium: boolean // default false
                    view_count: number | null // bigint
                    created_at: string // timestamp with time zone
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description?: string | null
                    publish_year?: number | null
                    duration_minutes?: number | null
                    background_url?: string | null
                    poster_url?: string | null
                    rating_average?: number | null
                    video_url?: string | null
                    trailer_url?: string | null
                    is_premium?: boolean
                    view_count?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string | null
                    publish_year?: number | null
                    duration_minutes?: number | null
                    background_url?: string | null
                    poster_url?: string | null
                    rating_average?: number | null
                    video_url?: string | null
                    trailer_url?: string | null
                    is_premium?: boolean
                    view_count?: number | null
                    created_at?: string
                }
            }
            genre: {
                Row: {
                    id: number // integer (GENERATED ALWAYS AS IDENTITY)
                    slug: string
                    name: string
                    background_url: string | null
                }
                Insert: {
                    id?: never // GENERATED ALWAYS AS IDENTITY - cannot insert
                    slug: string
                    name: string
                    background_url?: string | null
                }
                Update: {
                    slug?: string
                    name?: string
                    background_url?: string | null
                }
            }
            moviegenre: {
                Row: {
                    movie_id: string // uuid
                    genre_id: number // integer
                }
                Insert: {
                    movie_id: string
                    genre_id: number
                }
                Update: {
                    movie_id?: string
                    genre_id?: number
                }
            }
            review: {
                Row: {
                    id: string // uuid
                    movie_id: string // uuid
                    user_name: string
                    rating: number // smallint (1-10)
                    comment: string | null
                    created_at: string // timestamp with time zone
                }
                Insert: {
                    id?: string
                    movie_id: string
                    user_name: string
                    rating: number // 1-10
                    comment?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    movie_id?: string
                    user_name?: string
                    rating?: number
                    comment?: string | null
                    created_at?: string
                }
            }
        }
    }
}

// Helper types
export type Movie = Database["public"]["Tables"]["movie"]["Row"]
export type Genre = Database["public"]["Tables"]["genre"]["Row"]
export type MovieGenre = Database["public"]["Tables"]["moviegenre"]["Row"]
export type Review = Database["public"]["Tables"]["review"]["Row"]

// Extended types with relationships
export type MovieWithGenres = Movie & {
    moviegenre?: Array<{
        genre: Genre
    }>
}

export type MovieWithReviews = Movie & {
    reviews?: Review[]
    review_count?: number
}

// Type cho query result với join
export type MovieWithGenreJoin = Movie & {
    moviegenre: Array<{
        genre: Genre
    }>
}
