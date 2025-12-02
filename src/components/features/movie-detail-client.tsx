"use client"

import ReviewForm from "@/components/features/review-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"

import { MessageSquare, Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface Review {
    id: string
    user_name: string
    rating: number
    comment: string | null
    created_at: string
}

interface MovieDetailClientProps {
    movieId: string
    movieTitle: string
    reviews: Review[]
    averageRating: string | null
}

export default function MovieDetailClient({
    movieId,
    movieTitle,
    reviews,
    averageRating,
}: MovieDetailClientProps) {
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
    const router = useRouter()

    const handleReviewSuccess = () => {
        setIsReviewDialogOpen(false)
        router.refresh()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-5">
                <h2 className="font-title flex flex-row items-center gap-3 text-2xl font-bold select-none md:text-3xl">
                    <Star className="h-10 w-10" />
                    Reviews & Ratings
                </h2>
                {averageRating && (
                    <div className="bg-primary/10 flex items-center gap-2 rounded-lg px-4 py-2 select-none">
                        <Star className="fill-primary text-primary h-5 w-5" />
                        <span className="font-bold">{averageRating}</span>
                        <span className="text-muted-foreground text-sm">
                            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                        </span>
                    </div>
                )}
            </div>

            {reviews.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-muted/50 hover:bg-muted/70 space-y-3 rounded-lg border p-6 transition-colors"
                        >
                            <div className="flex items-start justify-between select-none">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">{review.user_name}</p>
                                    <p className="text-muted-foreground text-xs">
                                        {new Date(review.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="bg-primary/10 flex items-center gap-1 rounded-md px-2 py-1">
                                    <Star className="fill-primary text-primary h-4 w-4" />
                                    <span className="text-sm font-bold">{review.rating}</span>
                                </div>
                            </div>

                            {review.comment && (
                                <p className="text-muted-foreground leading-relaxed">
                                    {review.comment}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed py-12 select-none">
                    <MessageSquare className="text-muted-foreground mb-4 h-12 w-12" />
                    <p className="text-muted-foreground text-lg">No reviews yet</p>
                    <p className="text-muted-foreground text-sm">
                        Be the first to review this movie!
                    </p>
                </div>
            )}

            <div className="flex justify-center pt-4">
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="cursor-pointer gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Write a Review
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="sr-only">Write a Review</DialogTitle>
                        </DialogHeader>
                        <ReviewForm
                            movieId={movieId}
                            movieTitle={movieTitle}
                            onSuccess={handleReviewSuccess}
                            onCancel={() => setIsReviewDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
