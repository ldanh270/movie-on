import { useCallback, useEffect, useState } from "react"

export interface WatchProgress {
    movieId: string
    currentTime: number
    duration: number
    lastWatched: string
    percentage: number
}

const STORAGE_KEY = "movie-watch-progress"
const MIN_WATCH_TIME = 30 // Minimum 30 seconds to save progress
const MAX_PERCENTAGE = 95 // Don't show resume if watched > 95%

export function useWatchProgress(movieId: string) {
    const [progress, setProgress] = useState<WatchProgress | null>(null)

    // Load progress from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const allProgress: Record<string, WatchProgress> = JSON.parse(stored)
                const movieProgress = allProgress[movieId]

                if (movieProgress && movieProgress.percentage < MAX_PERCENTAGE) {
                    setProgress(movieProgress)
                }
            } catch (error) {
                console.error("Failed to parse watch progress:", error)
            }
        }
    }, [movieId])

    // Save progress to localStorage
    const saveProgress = useCallback(
        (currentTime: number, duration: number) => {
            if (currentTime < MIN_WATCH_TIME || duration === 0) return

            const percentage = (currentTime / duration) * 100

            const newProgress: WatchProgress = {
                movieId,
                currentTime,
                duration,
                lastWatched: new Date().toISOString(),
                percentage,
            }

            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                const allProgress: Record<string, WatchProgress> = stored ? JSON.parse(stored) : {}
                allProgress[movieId] = newProgress
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
                setProgress(newProgress)
            } catch (error) {
                console.error("Failed to save watch progress:", error)
            }
        },
        [movieId],
    )

    // Clear progress for this movie
    const clearProgress = useCallback(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const allProgress: Record<string, WatchProgress> = JSON.parse(stored)
                delete allProgress[movieId]
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress))
            }
            setProgress(null)
        } catch (error) {
            console.error("Failed to clear watch progress:", error)
        }
    }, [movieId])

    return {
        progress,
        saveProgress,
        clearProgress,
    }
}
