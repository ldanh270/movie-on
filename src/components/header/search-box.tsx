'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Search } from 'lucide-react'

type Movie = { id: number; title: string; year: number }

const DEMO_MOVIES: Movie[] = [
    { id: 1, title: 'Inception', year: 2010 },
    { id: 2, title: 'Interstellar', year: 2014 },
    { id: 3, title: 'Oppenheimer', year: 2023 },
    { id: 4, title: 'The Dark Knight', year: 2008 },
]

const normalizeText = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')

const useMovieSuggestions = (query: string) =>
    useMemo(() => {
        const cleaned = query.trim()
        if (!cleaned) return []
        const nq = normalizeText(cleaned)
        return DEMO_MOVIES.filter((movie) => normalizeText(movie.title).includes(nq)).slice(0, 8)
    }, [query])

const SearchBox = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(-1)

    const popupRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // đóng khi click ra ngoài
    useEffect(() => {
        const handlePointerDownOutside = (event: PointerEvent) => {
            if (!popupRef.current) return
            if (!popupRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setActiveIndex(-1)
            }
        }
        document.addEventListener('pointerdown', handlePointerDownOutside)
        return () => document.removeEventListener('pointerdown', handlePointerDownOutside)
    }, [])

    // focus khi mở
    useEffect(() => {
        if (isOpen) searchInputRef.current?.focus()
    }, [isOpen])

    const suggestions = useMovieSuggestions(searchQuery)

    const performSearch = (value: string) => {
        const query = value.trim()
        if (!query) return
        // TODO: call API search(query)
        setIsOpen(false)
        setActiveIndex(-1)
    }

    const onToggle = () => setIsOpen((prev) => !prev)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (activeIndex >= 0 && activeIndex < suggestions.length)
            performSearch(suggestions[activeIndex].title)
        else performSearch(searchQuery)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        setActiveIndex(-1)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false)
            setActiveIndex(-1)
            return
        }
        if (!suggestions.length) return
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActiveIndex((index) => (index + 1) % suggestions.length)
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length)
        }
        if (event.key === 'Enter' && activeIndex >= 0) {
            event.preventDefault()
            performSearch(suggestions[activeIndex].title)
        }
    }

    return (
        <div className="relative h-10">
            {/* Nút toggle mở/đóng */}
            <Button
                variant={isOpen ? 'secondary' : 'ghost'}
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 z-20"
                type="button"
                onClick={onToggle}
                aria-label={isOpen ? 'Close search' : 'Open search'}
                aria-expanded={isOpen}
            >
                <Search className={isOpen ? 'h-4 w-4' : 'h-5 w-5'} />
            </Button>

            {/* Popup form + dropdown */}
            {isOpen && (
                <div
                    ref={popupRef}
                    className="absolute right-10 top-0 flex flex-col gap-2 w-80 z-10"
                >
                    <form
                        onSubmit={onSubmit}
                        className="flex items-center h-10 rounded-full border bg-card overflow-hidden"
                    >
                        <Input
                            ref={searchInputRef}
                            name="q"
                            value={searchQuery}
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            placeholder="Search movies..."
                            className="h-10 flex-1 border-0 rounded-full pl-4 pr-2 focus-visible:ring-0"
                        />
                    </form>

                    {searchQuery && (
                        <div className="rounded-xl border bg-background shadow-lg">
                            {suggestions.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    No results
                                </div>
                            ) : (
                                suggestions.map((movie, index) => (
                                    <button
                                        key={movie.id}
                                        type="button"
                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-accent
                                ${index === activeIndex ? 'bg-accent text-accent-foreground' : ''}`}
                                        onClick={() => performSearch(movie.title)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(-1)}
                                    >
                                        {movie.title}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBox
