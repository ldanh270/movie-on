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
    const [playerKey, setPlayerKey] = useState(0)

    const handleResumeTime = (time: number) => {
        setStartTime(time)
        setPlayerKey((prev) => prev + 1) // Force re-render player
    }

    return (
        <>
            <WatchProgressManager movieId={movieId} onResumeTime={handleResumeTime} />
            <YouTubePlayer
                key={playerKey}
                videoUrl={videoUrl}
                title={title}
                movieId={movieId}
                startTime={startTime}
                className="mx-auto max-w-7xl"
            />
        </>
    )
}
