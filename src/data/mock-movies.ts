import { Movie } from "@/types/movie"

/**
 * Mock Movie Data
 * Note: Trong production, data này sẽ fetch từ API
 */

export const FEATURED_MOVIE: Movie = {
    id: 1,
    title: "Inception",
    description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    posterUrl: "https://placehold.co/500x750/1a1a1a/white?text=Inception", // Placeholder
    backdropUrl: "https://placehold.co/1920x1080/1a1a1a/white?text=Inception+Backdrop",
    rating: 8.8,
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: 148,
}

export const TRENDING_MOVIES: Movie[] = [
    {
        id: 2,
        title: "The Dark Knight",
        description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
        rating: 9.0,
        releaseYear: 2008,
        genre: ["Action", "Crime", "Drama"],
        duration: 152,
    },
    {
        id: 3,
        title: "Interstellar",
        description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
        rating: 8.7,
        releaseYear: 2014,
        genre: ["Adventure", "Drama", "Sci-Fi"],
        duration: 169,
    },
    {
        id: 4,
        title: "Oppenheimer",
        description:
            "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
        rating: 8.5,
        releaseYear: 2023,
        genre: ["Biography", "Drama", "History"],
        duration: 180,
    },
    {
        id: 5,
        title: "The Matrix",
        description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
        rating: 8.7,
        releaseYear: 1999,
        genre: ["Action", "Sci-Fi"],
        duration: 136,
    },
    {
        id: 6,
        title: "Pulp Fiction",
        description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdropUrl: "https://image.tmdb.org/t/p/original/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
        rating: 8.9,
        releaseYear: 1994,
        genre: ["Crime", "Drama"],
        duration: 154,
    },
]

export const NEW_RELEASES: Movie[] = TRENDING_MOVIES.slice(0, 4)
export const POPULAR_MOVIES: Movie[] = TRENDING_MOVIES.slice(1)
