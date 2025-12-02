"use client"

import MovieCard from "@/components/features/movie-card"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { MovieCardData } from "@/types/movie"

import { LucideIcon, Trash2 } from "lucide-react"

interface MovieSectionProps {
    title: string
    movies: MovieCardData[]
    icon: LucideIcon
    emptyMessage: string
    emptyDescription: string
    onClear: () => void
}

export default function MovieSection({
    title,
    movies,
    icon: Icon,
    emptyMessage,
    emptyDescription,
    onClear,
}: MovieSectionProps) {
    const movieCount = movies.length

    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 select-none">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                        <Icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-title text-2xl font-bold md:text-3xl">{title}</h2>
                        <p className="text-muted-foreground text-sm">
                            {movieCount} {movieCount === 1 ? "movie" : "movies"}
                        </p>
                    </div>
                </div>
                {movieCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClear}
                        className="gap-2 select-none"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                    </Button>
                )}
            </div>

            {movieCount === 0 ? (
                <div className="bg-muted/20 my-10 flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center">
                    <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
                        <Icon className="text-muted-foreground h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{emptyMessage}</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">{emptyDescription}</p>
                </div>
            ) : movieCount <= 5 ? (
                <div className="grid gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <Carousel
                    opts={{
                        align: "start",
                        loop: false,
                    }}
                    className="group/carousel w-full"
                >
                    <CarouselContent className="-ml-2 py-10 md:-ml-4">
                        {movies.map((movie) => (
                            <CarouselItem
                                key={movie.id}
                                className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                            >
                                <MovieCard movie={movie} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 lg:-left-12" />
                    <CarouselNext className="-right-4 lg:-right-12" />
                </Carousel>
            )}
        </section>
    )
}
