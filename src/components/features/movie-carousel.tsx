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
        <section className={cn("group/carousel relative w-full select-none", className)}>
            {/* Section Title */}
            {title && (
                <div className="mb-8">
                    <h2 className="font-title text-3xl font-bold tracking-tight md:text-4xl">
                        {title}
                    </h2>
                </div>
            )}

            {/* Carousel */}
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 md:-ml-6">
                    {movies.map((movie) => (
                        <CarouselItem
                            key={movie.id}
                            className="xs:basis-[70%] basis-[85%] pl-4 sm:basis-1/2 md:basis-1/3 md:pl-6 lg:basis-1/4 xl:basis-1/5"
                        >
                            <MovieCard movie={movie} onPlay={handlePlay} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Enhanced Navigation Buttons - Brighter on hover */}
                <CarouselPrevious className="bg-background hover:bg-primary/90 hover:text-primary-foreground active:bg-primary border-primary hover:border-primary -left-5 h-12 w-12 cursor-pointer rounded-full border-2 opacity-0 shadow-lg transition-all select-none group-hover/carousel:opacity-100 hover:scale-110 hover:shadow-xl active:scale-100 disabled:hidden md:-left-6 md:h-14 md:w-14" />
                <CarouselNext className="bg-background hover:bg-primary/90 hover:text-primary-foreground active:bg-primary border-primary hover:border-primary -right-5 h-12 w-12 cursor-pointer rounded-full border-2 opacity-0 shadow-lg transition-all select-none group-hover/carousel:opacity-100 hover:scale-110 hover:shadow-xl active:scale-100 disabled:hidden md:-right-6 md:h-14 md:w-14" />
            </Carousel>
        </section>
    )
}
