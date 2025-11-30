"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"

interface YouTubePlayerProps {
    videoUrl: string
    title: string
    className?: string
}

/**
 * YouTube Player Component
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý YouTube embed player
 * - Open/Closed: Có thể extend qua className
 */
export default function YouTubePlayer({ videoUrl, title, className }: YouTubePlayerProps) {
    const [isLoading, setIsLoading] = useState(true)

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    const videoId = getYouTubeId(videoUrl)

    if (!videoId) {
        return (
            <div className="bg-muted flex aspect-video w-full items-center justify-center rounded-lg">
                <p className="text-muted-foreground">Invalid YouTube URL</p>
            </div>
        )
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

    return (
        <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg", className)}>
            {/* Loading skeleton */}
            {isLoading && (
                <div className="bg-muted absolute inset-0 animate-pulse">
                    <div className="flex h-full items-center justify-center">
                        <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
                    </div>
                </div>
            )}

            {/* YouTube iframe */}
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}
