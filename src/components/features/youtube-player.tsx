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
    const hasInitialized = useRef(false)
    const initialStartTime = useRef(startTime)

    const { saveProgress } = useWatchProgress(movieId || "")

    // Initialize YouTube API - CHỈ phụ thuộc vào videoId
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
                    start: Math.floor(initialStartTime.current),
                },
                events: {
                    onReady: () => {
                        setIsReady(true)
                        if (initialStartTime.current > 0 && playerRef.current) {
                            playerRef.current.seekTo(initialStartTime.current, true)
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

        // Cleanup - Lưu progress khi unmount
        return () => {
            if (
                playerRef.current &&
                movieId &&
                typeof playerRef.current.getCurrentTime === "function"
            ) {
                try {
                    const currentTime = playerRef.current.getCurrentTime()
                    const duration = playerRef.current.getDuration()
                    const playerState = playerRef.current.getPlayerState()

                    // Chỉ lưu nếu không phải đã xem hết
                    if (currentTime > 0 && duration > 0 && playerState !== 0) {
                        saveProgress(currentTime, duration)
                    }
                } catch (error) {
                    console.error("Error saving progress on cleanup:", error)
                }
            }

            if (playerRef.current) {
                try {
                    playerRef.current.destroy()
                } catch (error) {
                    console.error("Error destroying player:", error)
                }
                playerRef.current = null
            }
            hasInitialized.current = false
        }
    }, [videoId, movieId, saveProgress])

    // Separate effect để handle startTime changes sau khi player đã ready
    useEffect(() => {
        if (
            isReady &&
            playerRef.current &&
            startTime !== initialStartTime.current &&
            typeof playerRef.current.seekTo === "function"
        ) {
            try {
                playerRef.current.seekTo(startTime, true)
                initialStartTime.current = startTime
            } catch (error) {
                console.error("Error seeking to time:", error)
            }
        }
    }, [startTime, isReady])

    // Save progress khi user rời trang (beforeunload)
    useEffect(() => {
        if (!movieId) return

        const handleBeforeUnload = () => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                try {
                    const currentTime = playerRef.current.getCurrentTime()
                    const duration = playerRef.current.getDuration()
                    const playerState = playerRef.current.getPlayerState()

                    if (currentTime > 0 && duration > 0 && playerState !== 0) {
                        saveProgress(currentTime, duration)
                    }
                } catch (error) {
                    console.error("Error saving progress on beforeunload:", error)
                }
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [movieId, saveProgress])

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
