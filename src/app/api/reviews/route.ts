import { MovieService } from "@/services/movie.service"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { movieId, userName, rating, comment } = body

        // Validation
        if (!movieId || !userName || !rating || !comment) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
        }

        if (userName.length > 50) {
            return NextResponse.json({ error: "Name is too long" }, { status: 400 })
        }

        if (comment.length > 500) {
            return NextResponse.json({ error: "Review is too long" }, { status: 400 })
        }

        // Create review
        const review = await MovieService.createReview({
            movieId,
            userName: userName.trim(),
            rating,
            comment: comment.trim(),
        })

        return NextResponse.json({ success: true, review }, { status: 201 })
    } catch (error) {
        console.error("Error creating review:", error)
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
    }
}
