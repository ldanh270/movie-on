"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { MovieCarouselProps } from "@/types/movie"

import { MovieCard } from "./movie-card"

/**
 * MovieCarousel Component
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ quản lý carousel của movies
 * - Open/Closed: Có thể customize qua props và className
 * - Liskov Substitution: Sử dụng MovieCard component một cách nhất quán
 * - Dependency Inversion: Phụ thuộc vào MovieCarouselProps interface
 */
export function MovieCarousel({ movies, title, className }: MovieCarouselProps) {
    const handlePlay = (movieId: number) => {
        console.log("Playing movie:", movieId)
        // TODO: Navigate to movie detail page or open player
    }

    return (
        <section className={cn("w-full", className)}>
            {/* Section Title */}
            {title && <h2 className="font-title mb-6 text-3xl font-bold">{title}</h2>}

            {/* Carousel */}
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {movies.map((movie) => (
                        <CarouselItem
                            key={movie.id}
                            className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                        >
                            <MovieCard movie={movie} onPlay={handlePlay} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious className="left-0 -translate-x-1/2" />
                <CarouselNext className="right-0 translate-x-1/2" />
            </Carousel>
        </section>
    )
}
