"use client"

import { useWatchProgress } from "@/hooks/use-watch-progress"
import { cn } from "@/lib/utils"
import type { YouTubePlayer as YouTubePlayerType } from "@/types/youtube"

import { useEffect, useRef, useState } from "react"

interface YouTubePlayerProps {
    videoUrl: string
    title: string
    className?: string
    movieId?: string
    startTime?: number
}

/**
 * YouTube Player Component
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý YouTube embed player
 * - Open/Closed: Có thể extend qua className
 */
export default function YouTubePlayer({
    videoUrl,
    className,
    movieId,
    startTime = 0,
}: YouTubePlayerProps) {
    const videoId = extractVideoId(videoUrl)
    const playerRef = useRef<YouTubePlayerType | null>(null)
    const [isReady, setIsReady] = useState(false)
    const saveIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const hasInitialized = useRef(false)

    const { saveProgress } = useWatchProgress(movieId || "")

    // Initialize YouTube API
    useEffect(() => {
        if (!videoId || hasInitialized.current) return

        const initializePlayer = () => {
            if (playerRef.current) {
                playerRef.current.destroy()
            }

            if (!window.YT?.Player) return

            playerRef.current = new window.YT.Player(`player-${videoId}`, {
                videoId,
                playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                    start: Math.floor(startTime),
                },
                events: {
                    onReady: () => {
                        setIsReady(true)
                        if (startTime > 0 && playerRef.current) {
                            playerRef.current.seekTo(startTime, true)
                        }
                    },
                },
            })

            hasInitialized.current = true
        }

        // Load YouTube API script if not loaded
        if (!window.YT) {
            const tag = document.createElement("script")
            tag.src = "https://www.youtube.com/iframe_api"
            tag.async = true
            const firstScriptTag = document.getElementsByTagName("script")[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

            // Set global callback
            window.onYouTubeIframeAPIReady = () => {
                initializePlayer()
            }
        } else if (window.YT.Player) {
            initializePlayer()
        }

        // Cleanup
        return () => {
            if (saveIntervalRef.current) {
                clearInterval(saveIntervalRef.current)
            }
            if (playerRef.current) {
                playerRef.current.destroy()
                playerRef.current = null
            }
            hasInitialized.current = false
        }
    }, [videoId, startTime])

    // Auto-save progress every 10 seconds
    useEffect(() => {
        if (!isReady || !playerRef.current || !movieId) return

        const saveCurrentProgress = () => {
            try {
                const currentTime = playerRef.current?.getCurrentTime()
                const duration = playerRef.current?.getDuration()
                const playerState = playerRef.current?.getPlayerState()

                // Only save if video is playing or paused (not ended)
                if (
                    currentTime !== undefined &&
                    duration !== undefined &&
                    currentTime > 0 &&
                    duration > 0 &&
                    playerState !== 0 // YouTubePlayerState.ENDED
                ) {
                    saveProgress(currentTime, duration)
                }
            } catch (error) {
                console.error("Error saving progress:", error)
            }
        }

        // Save immediately when ready
        saveCurrentProgress()

        // Then save every 10 seconds
        saveIntervalRef.current = setInterval(saveCurrentProgress, 10000)

        return () => {
            if (saveIntervalRef.current) {
                clearInterval(saveIntervalRef.current)
            }
        }
    }, [isReady, movieId, saveProgress])

    if (!videoId) {
        return (
            <div className={cn("bg-muted/20 aspect-video rounded-lg border", className)}>
                <p className="text-muted-foreground flex h-full items-center justify-center">
                    Invalid video URL
                </p>
            </div>
        )
    }

    return (
        <div className={cn("aspect-video overflow-hidden rounded-lg", className)}>
            <div id={`player-${videoId}`} className="h-full w-full" />
        </div>
    )
}

function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
    }

    return null
}
