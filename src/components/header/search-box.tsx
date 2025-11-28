"use client"

import { Input } from "@/components/ui/input"
import { MovieService } from "@/services/movie.service"
import { Movie } from "@/types/movie"

import { useEffect, useMemo, useRef, useState } from "react"

/**
 * SearchBox Component - với Real-time search
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý search UI và logic
 * - Dependency Inversion: Phụ thuộc vào MovieService
 */
export default function SearchBox() {
    const [query, setQuery] = useState("")
    const [activeIndex, setActiveIndex] = useState(-1)
    const [suggestions, setSuggestions] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim().length < 2) {
                setSuggestions([])
                return
            }

            setIsLoading(true)
            try {
                const results = await MovieService.searchMovies(query, 8)
                setSuggestions(results)
            } catch (error) {
                console.error("Search error:", error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }, 300) // Debounce 300ms

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    const resetInput = () => {
        setActiveIndex(-1)
        setQuery("")
        setSuggestions([])
    }

    useEffect(() => {
        const onClickOutside = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                resetInput()
            }
        }
        document.addEventListener("pointerdown", onClickOutside)
        return () => document.removeEventListener("pointerdown", onClickOutside)
    }, [])

    const performSearch = (val: string) => {
        const searchQuery = val.trim()
        if (!searchQuery) return
        // TODO: Navigate to search results page
        console.log("Search for:", searchQuery)
        resetInput()
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (activeIndex >= 0) performSearch(suggestions[activeIndex].title)
        else performSearch(query)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            resetInput()
            return
        }
        if (!suggestions.length) return
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex((i) => (i + 1) % suggestions.length)
        }
        if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
        }
        if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault()
            performSearch(suggestions[activeIndex].title)
        }
    }

    return (
        <div ref={rootRef} className="relative w-full max-w-md">
            <form
                onSubmit={onSubmit}
                className="focus-within:bg-input flex items-center rounded-full border"
            >
                <Input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setActiveIndex(-1)
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Search movies..."
                    className="flex-1 rounded-full border-0 pr-2 pl-4"
                />
            </form>

            {query.trim().length >= 2 && (
                <div className="bg-background absolute z-30 mt-2 w-full rounded-xl border p-2 shadow-lg">
                    {isLoading ? (
                        <div className="text-muted-foreground px-3 py-2 text-sm">Searching...</div>
                    ) : suggestions.length === 0 ? (
                        <div className="text-muted-foreground px-3 py-2 text-sm">No results</div>
                    ) : (
                        suggestions.map((movie, i) => (
                            <button
                                key={movie.id}
                                type="button"
                                className={`hover:bg-input w-full px-3 py-2 text-left text-sm hover:rounded-md ${i === activeIndex ? "bg-accent text-accent-foreground" : ""}`}
                                onClick={() => performSearch(movie.title)}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                <div className="font-medium">{movie.title}</div>
                                <div className="text-muted-foreground text-xs">
                                    {movie.releaseYear} • {movie.genre.slice(0, 2).join(", ")}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
