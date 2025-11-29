"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MovieCardProps } from "@/types/movie"

import { useState } from "react"

import { Info, PlayIcon, StarIcon } from "lucide-react"
import Image from "next/image"

/**
 * MovieCard Component
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ hiển thị thông tin 1 movie card
 * - Open/Closed: Có thể extend qua className và onPlay callback
 */
export function MovieCard({ movie, className, onPlay }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false)

    const handlePlay = () => {
        onPlay?.(movie.id)
    }

    return (
        <Card
            className={cn(
                "group relative cursor-pointer overflow-hidden border-0 bg-transparent transition-all duration-300 select-none hover:z-10 hover:scale-105",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Movie Poster */}
            <div className="bg-muted relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={
                        imageError
                            ? "https://placehold.co/500x750/1a1a1a/white?text=No+Image"
                            : movie.posterUrl
                    }
                    alt={movie.title}
                    fill
                    className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    onError={() => setImageError(true)}
                />

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm select-none">
                    <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-white">{movie.rating.toFixed(1)}</span>
                </div>

                {/* Hover Overlay */}
                {isHovered && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300">
                        <Button
                            size="lg"
                            className="mb-3 cursor-pointer rounded-full shadow-xl"
                            onClick={handlePlay}
                        >
                            <PlayIcon className="mr-2 h-5 w-5" />
                            Watch
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="cursor-pointer text-white hover:bg-white/20"
                        >
                            <Info className="mr-1 h-4 w-4" />
                            Details
                        </Button>

                        {/* Quick Info */}
                        <div className="absolute right-3 bottom-3 left-3 text-xs text-white select-none">
                            <p className="line-clamp-2 opacity-80">{movie.description}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Movie Info */}
            <CardContent className="p-3">
                <h3 className="font-title line-clamp-1 text-base font-semibold">{movie.title}</h3>
                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs select-none">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
                </div>
            </CardContent>
        </Card>
    )
}
