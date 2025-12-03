"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Clock } from "lucide-react"

interface ResumeWatchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    currentTime: number
    onResume: () => void
    onStartFromBeginning: () => void
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
}

export default function ResumeWatchDialog({
    open,
    onOpenChange,
    currentTime,
    onResume,
    onStartFromBeginning,
}: ResumeWatchDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 select-none">
                        <Clock className="h-5 w-5" />
                        Continue Watching?
                    </DialogTitle>
                    <DialogDescription>
                        You previously watched this video up to{" "}
                        <span className="text-foreground font-semibold">
                            {formatTime(currentTime)}
                        </span>
                        . Would you like to continue from where you left off?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col gap-2 select-none sm:flex-row sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => {
                            onStartFromBeginning()
                            onOpenChange(false)
                        }}
                    >
                        Start from Beginning
                    </Button>
                    <Button
                        onClick={() => {
                            onResume()
                            onOpenChange(false)
                        }}
                    >
                        Continue Watching
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
