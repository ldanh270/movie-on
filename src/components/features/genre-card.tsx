"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Genre } from "@/types/database"

import { useState } from "react"

import { ChevronRight, Film } from "lucide-react"
import Link from "next/link"

/**
 * GenreCard Component
 *
 * SOLID Principles:
 * - Single Responsibility: Hiển thị một genre card
 * - Open/Closed: Có thể extend qua className prop
 */

interface GenreCardProps {
    genre: Genre
    movieCount?: number
    className?: string
}

// Gradient colors cho mỗi genre (tuân thủ color scheme)
const genreColors: Record<string, { from: string; to: string; icon: string }> = {
    action: { from: "from-red-500/20", to: "to-orange-500/20", icon: "text-red-500" },
    comedy: { from: "from-yellow-500/20", to: "to-amber-500/20", icon: "text-yellow-500" },
    drama: { from: "from-purple-500/20", to: "to-pink-500/20", icon: "text-purple-500" },
    horror: { from: "from-gray-800/20", to: "to-red-900/20", icon: "text-red-700" },
    romance: { from: "from-pink-500/20", to: "to-rose-500/20", icon: "text-pink-500" },
    thriller: { from: "from-blue-500/20", to: "to-indigo-500/20", icon: "text-blue-500" },
    scifi: { from: "from-cyan-500/20", to: "to-blue-500/20", icon: "text-cyan-500" },
    fantasy: { from: "from-violet-500/20", to: "to-purple-500/20", icon: "text-violet-500" },
    animation: { from: "from-green-500/20", to: "to-teal-500/20", icon: "text-green-500" },
    documentary: { from: "from-slate-500/20", to: "to-gray-500/20", icon: "text-slate-500" },
}

// Default color nếu không match
const defaultColor = {
    from: "from-primary/10",
    to: "to-primary/20",
    icon: "text-primary",
}

export default function GenreCard({ genre, movieCount = 0, className }: GenreCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const colors = genreColors[genre.slug] || defaultColor

    return (
        <Link href={`/discover/${genre.slug}`}>
            <Card
                className={cn(
                    "relative h-40 cursor-pointer overflow-hidden border transition-all duration-500 ease-out select-none",
                    "hover:border-primary/50 hover:shadow-primary/10 hover:shadow-lg",
                    "hover:scale-105",
                    "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    className,
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gradient Background */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                        colors.from,
                        colors.to,
                        isHovered ? "opacity-100" : "opacity-70",
                    )}
                />

                {/* Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                    {/* Top Section - Icon & Count */}
                    <div className="flex items-start justify-between">
                        <div
                            className={cn(
                                "bg-background/80 rounded-lg p-2.5 shadow-md backdrop-blur-sm transition-all duration-300",
                                "group-hover:bg-background/95 group-hover:scale-110",
                                colors.icon,
                            )}
                        >
                            <Film className="h-6 w-6" strokeWidth={2} />
                        </div>

                        {movieCount > 0 && (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "bg-background/80 backdrop-blur-sm transition-all duration-300",
                                    "group-hover:bg-background/95 group-hover:scale-105",
                                )}
                            >
                                {movieCount} movies
                            </Badge>
                        )}
                    </div>

                    {/* Bottom Section - Title & Arrow */}
                    <div className="flex items-end justify-between gap-3">
                        <div className="flex-1">
                            <h3
                                className={cn(
                                    "font-title text-2xl leading-tight font-bold capitalize transition-colors duration-300",
                                    "group-hover:text-primary",
                                )}
                            >
                                {genre.name}
                            </h3>
                        </div>

                        <div
                            className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full",
                                "bg-background/80 backdrop-blur-sm transition-all duration-300",
                                "group-hover:bg-primary group-hover:text-primary-foreground",
                                "group-hover:scale-110",
                            )}
                        >
                            <ChevronRight
                                className={cn(
                                    "h-5 w-5 transition-transform duration-300",
                                    isHovered && "translate-x-0.5",
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Shine Effect on Hover */}
                <div
                    className={cn(
                        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
                        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
                        isHovered && "opacity-100",
                    )}
                    style={{
                        transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                        transition: "transform 0.8s ease-in-out, opacity 0.5s",
                    }}
                />
            </Card>
        </Link>
    )
}
