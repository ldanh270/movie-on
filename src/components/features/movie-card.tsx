"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MovieCardProps } from "@/types/movie"

import { PlayIcon, StarIcon } from "lucide-react"
import Image from "next/image"

/**
 * MovieCard Component
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Chỉ hiển thị thông tin 1 movie card
 * - Open/Closed: Có thể extend qua className và onPlay callback
 * - Liskov Substitution: Tuân thủ Card component contract
 * - Interface Segregation: Props interface rõ ràng, tối thiểu
 * - Dependency Inversion: Phụ thuộc vào abstraction (MovieCardProps)
 */
export function MovieCard({ movie, className, onPlay }: MovieCardProps) {
    const handlePlay = () => {
        onPlay?.(movie.id)
    }

    return (
        <Card
            className={cn(
                "group relative overflow-hidden transition-all hover:shadow-lg",
                className,
            )}
        >
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button size="lg" className="rounded-full" onClick={handlePlay}>
                        <PlayIcon className="mr-2 h-5 w-5" />
                        Watch Now
                    </Button>
                </div>
            </div>

            {/* Movie Info */}
            <CardContent className="p-4">
                <h3 className="font-title line-clamp-1 text-lg font-semibold">{movie.title}</h3>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {movie.description}
                </p>
            </CardContent>

            {/* Movie Meta */}
            <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground text-sm">{movie.releaseYear}</span>
            </CardFooter>
        </Card>
    )
}
