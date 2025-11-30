"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { useState } from "react"

import { Loader2, Star } from "lucide-react"

interface ReviewFormProps {
    movieId: string
    movieTitle: string
    onSuccess?: () => void
    onCancel?: () => void
}

export default function ReviewForm({ movieId, movieTitle, onSuccess, onCancel }: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [userName, setUserName] = useState("")
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!userName.trim()) {
            setError("Please enter your name")
            return
        }
        if (rating === 0) {
            setError("Please select a rating")
            return
        }
        if (!comment.trim()) {
            setError("Please write a review")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movieId,
                    userName: userName.trim(),
                    rating,
                    comment: comment.trim(),
                }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to submit review")
            }

            // Reset form
            setUserName("")
            setRating(0)
            setComment("")

            // Call success callback
            onSuccess?.()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit review")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 select-none">
                <h3 className="font-title text-xl font-bold">Write a Review for {movieTitle}</h3>
                <p className="text-muted-foreground text-sm">
                    Share your thoughts about this movie
                </p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
                <Label htmlFor="userName">
                    Your Name <span className="text-xl text-red-500">*</span>
                </Label>
                <Input
                    id="userName"
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={50}
                />
            </div>

            {/* Rating Selector */}
            <div className="space-y-2">
                <Label>
                    Your Rating <span className="text-xl text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            disabled={isSubmitting}
                        >
                            <Star
                                className={cn(
                                    "h-8 w-8 cursor-pointer transition-colors",
                                    (hoveredRating || rating) >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground",
                                )}
                            />
                        </button>
                    ))}
                    {rating > 0 && (
                        <span className="text-muted-foreground ml-2 text-sm font-medium select-none">
                            {rating} {rating === 1 ? "star" : "stars"}
                        </span>
                    )}
                </div>
            </div>

            {/* Comment Input */}
            <div className="space-y-2">
                <Label htmlFor="comment">
                    Your Review <span className="text-xl text-red-500">*</span>
                </Label>
                <Textarea
                    id="comment"
                    placeholder="Share your thoughts about the movie..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={isSubmitting}
                    rows={5}
                    maxLength={500}
                    className="resize-none"
                />
                <p className="text-muted-foreground text-xs select-none">
                    {comment.length}/500 characters
                </p>
            </div>

            {/* Error Message */}
            {error && <div className="text-sm text-red-500 select-none">{error}</div>}

            {/* Action Buttons */}
            <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting} className="flex-1 cursor-pointer">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Review"
                    )}
                </Button>
                {onCancel && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    )
}
