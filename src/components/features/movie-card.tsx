"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
export default function MovieCard({ movie, className, onPlay }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handlePlay = () => {
        onPlay?.(movie.id)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handlePlay()
        }
    }

    return (
        <Card
            className={cn(
                "group relative cursor-pointer overflow-hidden border bg-transparent transition-all duration-500 ease-out select-none",
                "border-border/40 hover:border-primary/50",
                // Sử dụng transform scale để zoom mà không ảnh hưởng layout
                "will-change-transform",
                // Z-index tăng lên khi hover để hiển thị đầy đủ
                "hover:z-50 hover:scale-[1.08]",
                "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            tabIndex={0}
            role="button"
            aria-label={`${movie.title} - ${movie.rating} stars`}
            onKeyDown={handleKeyDown}
        >
            {/* Movie Poster */}
            <div className="bg-muted relative aspect-[2/3] overflow-hidden rounded-t-lg">
                {/* Loading Skeleton */}
                {!imageLoaded && !imageError && (
                    <div className="from-muted via-muted/50 to-muted absolute inset-0 animate-pulse bg-gradient-to-br" />
                )}

                <Image
                    src={
                        imageError
                            ? "https://placehold.co/500x750/1a1a1a/white?text=No+Image"
                            : movie.posterUrl
                    }
                    alt={movie.title}
                    fill
                    className={cn(
                        "pointer-events-none object-cover transition-all duration-700 ease-out",
                        "group-hover:scale-110 group-hover:brightness-75",
                        imageLoaded ? "opacity-100" : "opacity-0",
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Hover Overlay with smooth fade-in */}
                <div
                    className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4",
                        "transition-all duration-500 ease-out",
                        isHovered ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                >
                    {/* Main Play Button */}
                    <Button
                        size="lg"
                        className={cn(
                            "mb-3 cursor-pointer rounded-full shadow-2xl transition-all duration-300",
                            "hover:scale-110 active:scale-95",
                            "bg-primary hover:bg-primary/90",
                            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                        )}
                        style={{ transitionDelay: "50ms" }}
                        onClick={handlePlay}
                    >
                        <PlayIcon className="mr-2 h-5 w-5 fill-current" />
                        Watch Now
                    </Button>

                    {/* Details Button */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                            "cursor-pointer text-white backdrop-blur-sm transition-all duration-300",
                            "hover:scale-105 hover:bg-white/20 active:scale-95",
                            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                        )}
                        style={{ transitionDelay: "100ms" }}
                    >
                        <Info className="mr-1.5 h-4 w-4" />
                        More Info
                    </Button>

                    {/* Quick Info */}
                    <div
                        className={cn(
                            "absolute right-3 bottom-3 left-3 text-xs text-white/90 transition-all duration-300 select-none",
                            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                        )}
                        style={{ transitionDelay: "150ms" }}
                    >
                        <p className="line-clamp-2 leading-relaxed">{movie.description}</p>
                    </div>
                </div>
            </div>

            {/* Rating Badge - Enhanced design */}
            <div
                className={cn(
                    "absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 select-none",
                    "bg-black/90 px-3 py-1.5",
                    "hover:scale-110 hover:bg-black active:scale-100",
                    "border border-yellow-400/20",
                )}
            >
                <StarIcon className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" />
                <span className="text-xs font-bold tracking-wide text-white">
                    {movie.rating.toFixed(1)}
                </span>
            </div>

            {/* Movie Info - Enhanced design */}
            <CardContent className="border-border/20 bg-card/80 group-hover:bg-card/95 border-t p-4 backdrop-blur-sm transition-colors duration-300">
                <h3 className="font-title group-hover:text-primary line-clamp-1 text-base leading-tight font-semibold transition-colors duration-200">
                    {movie.title}
                </h3>
                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs select-none">
                    <span className="font-medium">{movie.releaseYear}</span>
                    <span className="text-border">•</span>
                    <span className="line-clamp-1 font-medium">
                        {movie.genre.slice(0, 2).join(", ")}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
