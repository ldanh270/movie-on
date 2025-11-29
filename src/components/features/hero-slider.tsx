"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Movie } from "@/types/movie"

import { useEffect, useState } from "react"

import { ChevronLeft, ChevronRight, InfoIcon, PlayIcon } from "lucide-react"
import Image from "next/image"

/**
 * HeroSlider Component - Featured Movies Slider
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ quản lý hero slider với auto-play
 * - Open/Closed: Có thể extend qua props
 * - Interface Segregation: Props rõ ràng, minimal
 *
 * Features:
 * - Auto-play với interval configurable
 * - Manual navigation với prev/next buttons
 * - Pause on hover
 * - Dots indicator
 */
interface HeroSliderProps {
    movies: Movie[]
    autoPlayInterval?: number
    className?: string
}

export function HeroSlider({ movies, autoPlayInterval = 5000, className }: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Auto-play logic
    useEffect(() => {
        if (isPaused || movies.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length)
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [isPaused, autoPlayInterval, movies.length])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length)
    }

    const currentMovie = movies[currentIndex]

    if (!currentMovie) return null

    return (
        <section
            className={cn("relative h-[70vh] w-full overflow-hidden", className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Images - Với transition */}
            {movies.map((movie, index) => (
                <div
                    key={movie.id}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000",
                        index === currentIndex ? "opacity-100" : "opacity-0",
                    )}
                >
                    <Image
                        src={movie.backdropUrl || movie.posterUrl}
                        alt={movie.title}
                        fill
                        priority={index === 0}
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="from-background via-background/50 absolute inset-0 bg-gradient-to-t to-transparent" />
                    <div className="from-background/90 via-background/50 absolute inset-0 bg-gradient-to-r to-transparent" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-2xl space-y-4">
                        {/* Title */}
                        <h1 className="font-title animate-fade-in text-4xl font-bold md:text-5xl lg:text-6xl">
                            {currentMovie.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                            <span className="font-semibold">{currentMovie.releaseYear}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>{currentMovie.duration} min</span>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex gap-2">
                                {currentMovie.genre.slice(0, 3).map((g) => (
                                    <span key={g} className="text-muted-foreground">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-3 text-base md:text-lg">
                            {currentMovie.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button size="lg" className="gap-2">
                                <PlayIcon className="h-5 w-5" />
                                Watch Now
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2">
                                <InfoIcon className="h-5 w-5" />
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            {movies.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:left-8"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:right-8"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {movies.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                    {movies.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-2 rounded-full transition-all",
                                index === currentIndex
                                    ? "bg-primary w-8"
                                    : "w-2 bg-white/50 hover:bg-white/70",
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
