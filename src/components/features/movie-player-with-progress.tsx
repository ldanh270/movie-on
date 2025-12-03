"use client"

import { useState } from "react"

import WatchProgressManager from "./watch-progress-manager"
import YouTubePlayer from "./youtube-player"

interface MoviePlayerWithProgressProps {
    videoUrl: string
    title: string
    movieId: string
}

export default function MoviePlayerWithProgress({
    videoUrl,
    title,
    movieId,
}: MoviePlayerWithProgressProps) {
    const [startTime, setStartTime] = useState(0)

    return (
        <>
            <WatchProgressManager movieId={movieId} onResumeTime={setStartTime} />
            <YouTubePlayer
                videoUrl={videoUrl}
                title={title}
                movieId={movieId}
                startTime={startTime}
                className="mx-auto max-w-7xl"
            />
        </>
    )
}
