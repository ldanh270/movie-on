"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import Image from "next/image"

type Slide = { src: string; alt: string; blurDataURL?: string }
type Props = {
    slides: Slide[]
    intervalMs?: number
    autoPlay?: boolean
    loop?: boolean
    aspect?: "16/9" | "4/3" | "1/1"
    className?: string
    showDots?: boolean
}

export default function Slideshow({
    slides,
    intervalMs = 4000,
    autoPlay = true,
    loop = true,
    aspect = "16/9",
    className = "",
    showDots = true,
}: Props) {
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(autoPlay)
    const ref = useRef<HTMLDivElement>(null)
    const count = slides.length
    const wrap = (i: number) => (i + count) % count

    const reduced = useMemo(() => {
        if (typeof window === "undefined") return true
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        if (!playing || reduced || count <= 1) return
        const id = setInterval(() => setIndex((i) => wrap(i + 1)), intervalMs)
        return () => clearInterval(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing, reduced, intervalMs, count])

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const onEnter = () => setPlaying(false)
        const onLeave = () => setPlaying(autoPlay)
        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)
        const onVis = () => setPlaying(document.hidden ? false : autoPlay)
        document.addEventListener("visibilitychange", onVis)
        return () => {
            el.removeEventListener("mouseenter", onEnter)
            el.removeEventListener("mouseleave", onLeave)
            document.removeEventListener("visibilitychange", onVis)
        }
    }, [autoPlay])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next()
            if (e.key === "ArrowLeft") prev()
            if (e.key === " ") setPlaying((p) => !p)
            if (e.key === "Home") setIndex(0)
            if (e.key === "End") setIndex(count - 1)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const next = () => setIndex((i) => (loop ? wrap(i + 1) : Math.min(i + 1, count - 1)))
    const prev = () => setIndex((i) => (loop ? wrap(i - 1) : Math.max(i - 1, 0)))

    return (
        <section
            ref={ref}
            className={`w-full overflow-hidden select-none ${className}`}
            aria-roledescription="carousel"
            aria-label="Slideshow"
        >
            <div
                className={[
                    "bg-muted overflow-hidden rounded-2xl",
                    aspect === "16/9" ? "aspect-[16/9]" : "",
                    aspect === "4/3" ? "aspect-[4/3]" : "",
                    aspect === "1/1" ? "aspect-square" : "",
                ].join(" ")}
            >
                <div
                    className="flex h-full w-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((s, i) => (
                        <div key={i} className="relative h-full w-full shrink-0 basis-full">
                            <Image
                                src={s.src}
                                alt={s.alt}
                                fill
                                priority={i === index}
                                sizes="100vw"
                                placeholder={s.blurDataURL ? "blur" : "empty"}
                                blurDataURL={s.blurDataURL}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev/Next */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 md:px-3">
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white dark:bg-black/50 dark:text-white"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white dark:bg-black/50 dark:text-white"
                >
                    ›
                </button>
            </div>

            {/* Play/Pause */}
            <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white dark:bg-black/50 dark:text-white"
            >
                {playing ? "❚❚" : "▶"}
            </button>

            {/* Dots */}
            {showDots && (
                <div className="absolute right-3 bottom-3 flex gap-1.5">
                    {slides.map((_, i) => {
                        const active = i === index
                        return (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Slide ${i + 1}`}
                                aria-current={active || undefined}
                                className={[
                                    "h-2.5 w-2.5 rounded-full transition",
                                    active
                                        ? "bg-primary scale-110"
                                        : "bg-white/70 hover:opacity-90 dark:bg-white/40",
                                ].join(" ")}
                            />
                        )
                    })}
                </div>
            )}
        </section>
    )
}
