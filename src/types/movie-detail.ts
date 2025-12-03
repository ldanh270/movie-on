export interface MovieGenre {
    genre: {
        id: string | number
        name: string
    }
}

export interface Review {
    rating: number | string | null
}

export interface MovieWithGenres {
    id: string | number
    movie_id: string | number
    genre_id: string | number
    title: string
    description: string | null
    video_url: string | null
    poster_url: string | null
    trailer_url: string | null
    rating: number | null
    rating_average: number | null
    publish_year: number | null
    duration_minutes: number | null
    view_count: number | null
    moviegenre?: MovieGenre[] | null
}
