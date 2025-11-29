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

import MovieCard from "./movie-card"

/**
 * MovieCarousel Component
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ quản lý carousel của movies
 * - Open/Closed: Có thể customize qua props và className
 * - Liskov Substitution: Sử dụng MovieCard component một cách nhất quán
 * - Dependency Inversion: Phụ thuộc vào MovieCarouselProps interface
 */
export default function MovieCarousel({ movies, title, className }: MovieCarouselProps) {
    const handlePlay = (movieId: number) => {
        console.log("Playing movie:", movieId)
        // TODO: Navigate to movie detail page or open player
    }

    return (
        <section
            className={cn(
                "group/carousel relative flex w-full flex-col gap-1 select-none",
                // Thêm padding lớn hơn để cards có không gian zoom
                "py-8 md:py-10 lg:py-12",
                className,
            )}
        >
            {/* Section Title - Enhanced */}
            {title && (
                <div className="mb-4 md:mb-6">
                    <h2 className="font-title text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                        <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text">
                            {title}
                        </span>
                    </h2>
                    <div className="bg-primary/80 mt-2 h-1 w-16 rounded-full transition-all duration-300 group-hover/carousel:w-24" />
                </div>
            )}

            {/* Carousel - Enhanced with gradient mask */}
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-3 pr-10 md:-ml-4 lg:mr-5 lg:-ml-6 lg:px-3 lg:py-5 lg:pr-10">
                    {movies.map((movie) => (
                        <CarouselItem
                            key={movie.id}
                            className={cn(
                                "pl-3 md:pl-4 lg:pl-6",
                                "xs:basis-[75%] basis-[90%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-[16.666%]",
                            )}
                        >
                            <MovieCard movie={movie} onPlay={handlePlay} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Enhanced Navigation Buttons - Better visibility and interaction */}
                <CarouselPrevious
                    className={cn(
                        "bg-background/95 hover:bg-primary hover:text-primary-foreground active:bg-primary/90 border-primary/50 hover:border-primary",
                        "-left-4 md:-left-5 lg:-left-6",
                        "h-11 w-11 md:h-12 md:w-12 lg:h-14 lg:w-14",
                        "cursor-pointer rounded-full border-2 shadow-xl backdrop-blur-sm transition-all duration-300 select-none",
                        "opacity-0 group-hover/carousel:opacity-100",
                        "hover:shadow-primary/20 hover:scale-110 hover:shadow-2xl active:scale-95",
                        "disabled:hidden disabled:opacity-0",
                        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                        // Đảm bảo button nằm trên gradient mask
                        "z-10",
                    )}
                    aria-label="Previous movies"
                />
                <CarouselNext
                    className={cn(
                        "bg-background/95 hover:bg-primary hover:text-primary-foreground active:bg-primary/90 border-primary/50 hover:border-primary",
                        "-right-4 md:-right-5 lg:-right-6",
                        "h-11 w-11 md:h-12 md:w-12 lg:h-14 lg:w-14",
                        "cursor-pointer rounded-full border-2 shadow-xl backdrop-blur-sm transition-all duration-300 select-none",
                        "opacity-0 group-hover/carousel:opacity-100",
                        "hover:shadow-primary/20 hover:scale-110 hover:shadow-2xl active:scale-95",
                        "disabled:hidden disabled:opacity-0",
                        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                        // Đảm bảo button nằm trên gradient mask
                        "z-10",
                    )}
                    aria-label="Next movies"
                />
            </Carousel>

            {/* Scroll indicator - subtle hint for users */}
            <div className="mt-4 flex justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-60 md:mt-6">
                {movies.slice(0, Math.min(movies.length, 8)).map((_, index) => (
                    <div
                        key={index}
                        className="bg-muted hover:bg-primary/50 h-1 w-8 rounded-full transition-all duration-300"
                    />
                ))}
            </div>
        </section>
    )
}
