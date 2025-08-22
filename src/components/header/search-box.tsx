'use client'

import { Input } from '@/components/ui/input'

import { useEffect, useMemo, useRef, useState } from 'react'

type Movie = { id: number; title: string; year: number }

const DEMO_MOVIES: Movie[] = [
    { id: 1, title: 'Inception', year: 2010 },
    { id: 2, title: 'Interstellar', year: 2014 },
    { id: 3, title: 'Oppenheimer', year: 2023 },
    { id: 4, title: 'The Dark Knight', year: 2008 },
]

// Normalize search query
const normalizeText = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')

export default function SearchBox() {
    // Search query (Search input value)
    const [query, setQuery] = useState('')
    // On selected suggestion (Hover, Selected by arrow)
    const [activeIndex, setActiveIndex] = useState(-1)
    // Detect click outsize
    const rootRef = useRef<HTMLDivElement>(null)

    // Suggestion by search query
    const suggestions = useMemo(() => {
        const cleaned = query.trim()
        if (!cleaned) return []
        const nq = normalizeText(cleaned)
        return DEMO_MOVIES.filter((m) => normalizeText(m.title).includes(nq)).slice(0, 8)
    }, [query])

    const resetInput = () => {
        // Reset selected suggestion
        setActiveIndex(-1)
        // Reset query (Input value)
        setQuery('')
    }

    // Reset querry & selected suggestion
    useEffect(() => {
        const onClickOutside = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                resetInput()
            }
        }
        document.addEventListener('pointerdown', onClickOutside)
        return () => document.removeEventListener('pointerdown', onClickOutside)
    }, [])

    // TODO: perform when searching
    const performSearch = (val: string) => {
        const query = val.trim()
        if (!query) return
        // TODO: call API search(q)
        resetInput()
    }

    // TODO: Handle when submit search query (to search)
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (activeIndex >= 0) performSearch(suggestions[activeIndex].title)
        else performSearch(query)
    }

    // Handle keydown behaviors
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setActiveIndex(-1)
            setQuery('')
            return
        }
        if (!suggestions.length) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => (i + 1) % suggestions.length)
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
        }
        if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault()
            performSearch(suggestions[activeIndex].title)
        }
    }

    return (
        <div ref={rootRef} className="relative w-full max-w-md">
            <form
                onSubmit={onSubmit}
                className="flex items-center rounded-full border focus-within:bg-input "
            >
                <Input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setActiveIndex(-1)
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Search movies..."
                    className=" flex-1 rounded-full pl-4 pr-2 border-0"
                />
            </form>

            {query && (
                <div className="absolute p-2 mt-2 w-full rounded-xl border bg-background shadow-lg z-30">
                    {suggestions.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
                    ) : (
                        suggestions.map((movie, i) => (
                            <button
                                key={movie.id}
                                type="button"
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-input hover:rounded-md
                  ${i === activeIndex ? 'bg-accent text-accent-foreground' : ''}`}
                                onClick={() => performSearch(movie.title)}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                {movie.title}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
