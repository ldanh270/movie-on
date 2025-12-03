"use client"

import { useWatchProgress } from "@/hooks/use-watch-progress"

import { useCallback, useEffect, useState } from "react"

import ResumeWatchDialog from "./resume-watch-dialog"

interface WatchProgressManagerProps {
    movieId: string
    onResumeTime: (time: number) => void
}

export default function WatchProgressManager({ movieId, onResumeTime }: WatchProgressManagerProps) {
    const { progress, clearProgress } = useWatchProgress(movieId)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        if (progress && progress.currentTime > 0) {
            setShowDialog(true)
        }
    }, [progress])

    const handleResume = useCallback(() => {
        if (progress) {
            onResumeTime(progress.currentTime)
        }
    }, [progress, onResumeTime])

    const handleStartFromBeginning = useCallback(() => {
        clearProgress()
        onResumeTime(0)
    }, [clearProgress, onResumeTime])

    if (!progress) return null

    return (
        <ResumeWatchDialog
            open={showDialog}
            onOpenChange={setShowDialog}
            currentTime={progress.currentTime}
            onResume={handleResume}
            onStartFromBeginning={handleStartFromBeginning}
        />
    )
}
