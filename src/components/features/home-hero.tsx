"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MovieCardData } from "@/types/movie"

import { InfoIcon, PlayIcon } from "lucide-react"
import Image from "next/image"

/**
 * HomeHero Component - Featured Movie Section
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Hiển thị featured movie hero section
 * - Open/Closed: Có thể extend qua className prop
 * - Interface Segregation: Props rõ ràng, minimal
 *
 * Note: Thêm suppressHydrationWarning để tránh warning với dynamic content
 */
interface HomeHeroProps {
    movie: MovieCardData
    className?: string
}

export default function HomeHero({ movie, ...props }: HomeHeroProps) {
    return (
        <section
            className={cn("relative h-[70vh] w-full overflow-hidden", props.className)}
            suppressHydrationWarning
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={movie.backgroundUrl || movie.posterUrl}
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Gradient Overlay */}
                <div className="from-background via-background/50 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="from-background/90 via-background/50 absolute inset-0 bg-gradient-to-r to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-2xl space-y-4">
                        {/* Title */}
                        <h1 className="font-title text-4xl font-bold md:text-5xl lg:text-6xl">
                            {movie.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                            <span className="font-semibold">{movie.releaseYear}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>{movie.duration} min</span>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex gap-2">
                                {movie.genre.slice(0, 3).map((g) => (
                                    <span key={g} className="text-muted-foreground">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-3 text-base md:text-lg">
                            {movie.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Button size="lg" className="gap-2">
                                <PlayIcon className="h-5 w-5" />
                                Watch Now
                            </Button>
                            <Button size="lg" variant="outline" className="cursor-pointer gap-2">
                                <InfoIcon className="h-5 w-5" />
                                More Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
