"use client"

import MovieSection from "@/components/features/movie-section"
import { LocalStorageService } from "@/services/local-storage.service"
import { MovieCardData } from "@/types/movie"

import { useEffect, useState } from "react"

import { Bookmark, Clock } from "lucide-react"
import { toast } from "sonner"

// Section configurations
const SECTIONS = {
    watchLater: {
        title: "Saved Movies",
        icon: Bookmark,
        emptyMessage: "No saved movies",
        emptyDescription: 'Click "Watch Later" on any movie to save it here',
        storageKey: "watchLater",
        getItems: () => LocalStorageService.getWatchLater(),
        clearItems: () => LocalStorageService.clearWatchLater(),
        successMessage: "Watch Later list cleared",
    },
    watchHistory: {
        title: "Watch History",
        icon: Clock,
        emptyMessage: "No watch history",
        emptyDescription: "Movies you watch will appear here",
        storageKey: "watchHistory",
        getItems: () => LocalStorageService.getWatchHistory(),
        clearItems: () => LocalStorageService.clearWatchHistory(),
        successMessage: "Watch History cleared",
    },
} as const

// Transform storage item to MovieCardData
const transformToMovieCard = (item: {
    id: string
    title: string
    slug: string
    posterUrl?: string
    rating?: number | null
}): MovieCardData => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    posterUrl: item.posterUrl || null,
    rating: item.rating || null,
    genre: [],
    releaseYear: null,
    duration: null,
    description: null,
    backgroundUrl: null,
})

export default function PersonalPage() {
    const [watchLater, setWatchLater] = useState<MovieCardData[]>([])
    const [watchHistory, setWatchHistory] = useState<MovieCardData[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        loadData()

        const handleStorageChange = () => loadData()
        window.addEventListener("storage", handleStorageChange)
        const interval = setInterval(loadData, 1000)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
            clearInterval(interval)
        }
    }, [])

    const loadData = () => {
        const later = SECTIONS.watchLater.getItems().map(transformToMovieCard)
        const history = SECTIONS.watchHistory.getItems().map(transformToMovieCard)

        setWatchLater(later)
        setWatchHistory(history)
    }

    const handleClear = (sectionKey: keyof typeof SECTIONS) => {
        const section = SECTIONS[sectionKey]
        if (confirm(`Are you sure you want to clear all ${section.title.toLowerCase()}?`)) {
            section.clearItems()
            loadData()
            toast.success(section.successMessage)
        }
    }

    if (!mounted) {
        return (
            <main className="min-h-[calc(100vh-8.5vh)]">
                <div className="container mx-auto px-4 py-12 md:px-8">
                    <div className="animate-pulse space-y-12">
                        <div className="bg-muted h-12 w-64 rounded-lg" />
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-muted h-96 rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-8.5vh)]">
            <div className="container mx-auto px-4 py-12 md:px-8">
                <div className="space-y-16">
                    {/* Header */}
                    <div className="space-y-2 select-none">
                        <h1 className="font-title text-4xl font-bold md:text-5xl">
                            My <span className="text-primary">Personal</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Your saved movies and watch history
                        </p>
                    </div>

                    {/* Watch Later Section */}
                    <MovieSection
                        title={SECTIONS.watchLater.title}
                        movies={watchLater}
                        icon={SECTIONS.watchLater.icon}
                        emptyMessage={SECTIONS.watchLater.emptyMessage}
                        emptyDescription={SECTIONS.watchLater.emptyDescription}
                        onClear={() => handleClear("watchLater")}
                    />

                    {/* Watch History Section */}
                    <MovieSection
                        title={SECTIONS.watchHistory.title}
                        movies={watchHistory}
                        icon={SECTIONS.watchHistory.icon}
                        emptyMessage={SECTIONS.watchHistory.emptyMessage}
                        emptyDescription={SECTIONS.watchHistory.emptyDescription}
                        onClear={() => handleClear("watchHistory")}
                    />
                </div>
            </div>
        </main>
    )
}
