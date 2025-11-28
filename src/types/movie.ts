// Movie Domain Types
// Note: Single Responsibility - chỉ định nghĩa types cho movie domain

export interface Movie {
    id: number
    title: string
    description: string
    posterUrl: string
    backdropUrl?: string
    rating: number
    releaseYear: number
    genre: string[]
    duration: number // minutes
}

export interface MovieCardProps {
    movie: Movie
    className?: string
    onPlay?: (movieId: number) => void
}

export interface MovieCarouselProps {
    movies: Movie[]
    title?: string
    className?: string
}
