"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MovieService } from "@/services/movie.service"

import { useEffect, useRef, useState } from "react"

import { Loader2, Search, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchResult {
    id: string | number
    title: string
    slug: string
    publish_year?: number | null
    rating_average?: number | null
}

/**
 * SearchBox Component - với Real-time search
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý search UI và logic
 * - Dependency Inversion: Phụ thuộc vào MovieService
 */
export default function SearchBox({ className }: { className?: string }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Debounced search
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (query.trim().length === 0) {
            setResults([])
            setIsOpen(false)
            return
        }

        setIsLoading(true)

        timeoutRef.current = setTimeout(async () => {
            try {
                const searchResults = await MovieService.searchMovies(query)
                setResults(searchResults.slice(0, 5)) // Limit to 5 results
                setIsOpen(true)
            } catch (error) {
                console.error("Search error:", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [query])

    const handleResultClick = (slug: string) => {
        setQuery("")
        setResults([])
        setIsOpen(false)
        router.push(`/${slug}`)
    }

    const handleClear = () => {
        setQuery("")
        setResults([])
        setIsOpen(false)
    }

    return (
        <div
            ref={searchRef}
            className={cn("dark:border-border relative w-full md:w-80", className)}
        >
            <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="dark:border-border pr-9 pl-9"
                />
                {isLoading && (
                    <Loader2 className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
                )}
                {!isLoading && query && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
                        onClick={handleClear}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="bg-background absolute top-full mt-2 w-full rounded-lg border shadow-lg">
                    <div className="max-h-[400px] overflow-y-auto">
                        {results.map((result) => (
                            <button
                                key={result.id}
                                onClick={() => handleResultClick(result.slug)}
                                className="hover:bg-muted flex w-full items-center gap-3 border-b p-3 text-left transition-colors last:border-b-0"
                            >
                                <div className="flex-1">
                                    <p className="font-medium">{result.title}</p>
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                        {result.publish_year && <span>{result.publish_year}</span>}
                                        {result.rating_average && (
                                            <>
                                                <span>•</span>
                                                <span>⭐ {result.rating_average.toFixed(1)}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results */}
            {isOpen && query.trim().length > 0 && !isLoading && results.length === 0 && (
                <div className="bg-background absolute top-full mt-2 w-full rounded-lg border p-4 text-center shadow-lg">
                    <p className="text-muted-foreground text-sm">
                        No movies found for &#34;{query}&#34;
                    </p>
                </div>
            )}
        </div>
    )
}
