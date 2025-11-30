"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MovieCardData, getFallbackImage } from "@/types/movie"

import { useEffect, useState } from "react"

import { ChevronLeft, ChevronRight, InfoIcon, PlayIcon, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroSliderProps {
    movies: MovieCardData[]
    autoPlayInterval?: number
    className?: string
}

export default function HeroSlider({
    movies,
    autoPlayInterval = 5000,
    className,
}: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isPaused || movies.length <= 1) {
            setProgress(100)
            return
        }

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setCurrentIndex((curr) => (curr + 1) % movies.length)
                    return 0
                }
                return prev + 100 / (autoPlayInterval / 50)
            })
        }, 50)

        return () => clearInterval(progressInterval)
    }, [isPaused, autoPlayInterval, movies.length, currentIndex])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        setProgress(0)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
        setProgress(0)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length)
        setProgress(0)
    }

    const currentMovie = movies[currentIndex]
    if (!currentMovie) return null

    return (
        <section
            className={cn(
                "group/hero relative h-[91.5vh] w-full overflow-hidden select-none",
                className,
            )}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Images */}
            <div className="bg-background absolute inset-0">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-700",
                            index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0",
                        )}
                    >
                        {movie.backgroundUrl || movie.posterUrl ? (
                            <Image
                                src={
                                    movie.backgroundUrl ||
                                    movie.posterUrl ||
                                    getFallbackImage("background")
                                }
                                alt={movie.title}
                                fill
                                priority={index === 0}
                                className="pointer-events-none object-cover object-center"
                                sizes="100vw"
                            />
                        ) : (
                            <div className="bg-muted/20 flex h-full items-center justify-center">
                                <div className="space-y-4 text-center">
                                    <div className="bg-muted/30 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                                        <span className="text-5xl">🎬</span>
                                    </div>
                                    <p className="text-muted-foreground">No background image</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Gradient Overlays */}
                <div className="from-background/80 via-background/40 absolute inset-0 z-20 bg-linear-to-t via-40% to-transparent" />
                <div className="from-background/60 via-background/25 absolute inset-0 z-20 bg-linear-to-r via-30% to-transparent" />
                <div className="from-background/60 via-background/25 absolute inset-0 z-20 bg-linear-to-l via-30% to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-30 flex h-full items-end pb-32 md:items-center md:pb-0">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-3xl space-y-5">
                        {/* Badge */}
                        <div className="flex items-center gap-3">
                            {currentMovie.rating !== null && (
                                <div className="bg-primary flex items-center gap-1.5 rounded-lg px-3 py-1.5">
                                    <Star className="h-3.5 w-3.5 fill-white text-white" />
                                    <span className="text-sm font-bold text-white">
                                        {currentMovie.rating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                            {currentMovie.releaseYear && (
                                <span className="text-sm font-semibold">
                                    {currentMovie.releaseYear}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="font-title text-primary text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                            {currentMovie.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            {currentMovie.duration && (
                                <span className="font-semibold">{currentMovie.duration} min</span>
                            )}
                            {currentMovie.genre.slice(0, 3).map((g, idx) => (
                                <span
                                    key={g}
                                    className="text-foreground/70 flex items-center gap-2"
                                >
                                    {(idx > 0 || currentMovie.duration) && (
                                        <span className="text-foreground/40">•</span>
                                    )}
                                    {g}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        {currentMovie.description && (
                            <p className="text-foreground/80 line-clamp-2 max-w-2xl text-lg leading-relaxed">
                                {currentMovie.description}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-3">
                            <Button
                                size="lg"
                                className={cn(
                                    "h-12 gap-2 rounded-lg px-6 font-semibold",
                                    "mb-3 cursor-pointer shadow-2xl transition-all duration-300",
                                    "hover:scale-110 active:scale-95",
                                )}
                                asChild
                            >
                                <Link href={`/${currentMovie.slug || currentMovie.id}`}>
                                    <PlayIcon className="mr-2 h-5 w-5 fill-current" />
                                    Watch Now
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className={cn(
                                    "h-12 gap-2 rounded-lg px-6 font-semibold",
                                    "cursor-pointer text-white backdrop-blur-sm transition-all duration-300",
                                    "hover:scale-110 hover:border hover:border-white/20 hover:bg-white/20 active:scale-95",
                                )}
                                asChild
                            >
                                <Link href={`/${currentMovie.slug || currentMovie.id}`}>
                                    <InfoIcon className="mr-2 h-5 w-5" />
                                    More Info
                                </Link>
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
                        className="group/nav absolute inset-y-0 left-0 z-40 flex w-32 cursor-pointer items-center justify-center opacity-0 transition-all select-none group-hover/hero:opacity-100 md:w-40"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 75%, transparent 100%)",
                            backdropFilter: "blur(2px)",
                        }}
                        aria-label="Previous slide"
                    >
                        <div className="relative -ml-4">
                            <div className="absolute inset-0 -m-3 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity group-hover/nav:opacity-100" />
                            <ChevronLeft
                                className="relative h-10 w-10 text-white drop-shadow-2xl transition-all group-hover/nav:scale-125 group-active/nav:scale-100 md:h-12 md:w-12"
                                strokeWidth={2.5}
                            />
                        </div>
                    </button>

                    <button
                        onClick={goToNext}
                        className="group/nav absolute inset-y-0 right-0 z-40 flex w-32 cursor-pointer items-center justify-center opacity-0 transition-all select-none group-hover/hero:opacity-100 md:w-40"
                        style={{
                            background:
                                "linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 75%, transparent 100%)",
                            backdropFilter: "blur(2px)",
                        }}
                        aria-label="Next slide"
                    >
                        <div className="relative -mr-4">
                            <div className="absolute inset-0 -m-3 rounded-full bg-white/10 opacity-0 blur-xl transition-opacity group-hover/nav:opacity-100" />
                            <ChevronRight
                                className="relative h-10 w-10 text-white drop-shadow-2xl transition-all group-hover/nav:scale-125 group-active/nav:scale-100 md:h-12 md:w-12"
                                strokeWidth={2.5}
                            />
                        </div>
                    </button>
                </>
            )}

            {/* Progress Indicators */}
            {movies.length > 1 && (
                <div className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3 select-none">
                    <div className="flex gap-2">
                        {movies.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative h-1 w-16 cursor-pointer overflow-hidden rounded-full bg-white/30 backdrop-blur-sm transition-all hover:h-1.5 md:w-20"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <div
                                    className={cn(
                                        "bg-primary absolute inset-0 origin-left transition-transform",
                                        index === currentIndex ? "" : "scale-x-0",
                                    )}
                                    style={{
                                        transform:
                                            index === currentIndex
                                                ? `scaleX(${progress / 100})`
                                                : "scaleX(0)",
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="rounded-full bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
                        <span className="text-xs font-semibold text-white">
                            {currentIndex + 1} / {movies.length}
                        </span>
                    </div>
                </div>
            )}
        </section>
    )
}
