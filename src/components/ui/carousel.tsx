"use client"

import { cn } from "@/lib/utils"

import * as React from "react"

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "./button"

// Note: Interface Segregation - tách các interfaces nhỏ, rõ ràng
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

// Context Props Interface
type CarouselProps = {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    orientation?: "horizontal" | "vertical"
    setApi?: (api: CarouselApi) => void
}

// Context Value Interface
type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
} & CarouselProps

// Context - Dependency Inversion Principle
const CarouselContext = React.createContext<CarouselContextProps | null>(null)

// Custom Hook - Single Responsibility
function useCarousel() {
    const context = React.useContext(CarouselContext)
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }
    return context
}

// Carousel Root Component
// Note: Dependency Inversion - components phụ thuộc vào abstraction (context)
const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
        api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault()
                scrollPrev()
            } else if (event.key === "ArrowRight") {
                event.preventDefault()
                scrollNext()
            }
        },
        [scrollPrev, scrollNext],
    )

    React.useEffect(() => {
        if (!api || !setApi) return
        setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
        if (!api) return
        onSelect(api)
        api.on("reInit", onSelect)
        api.on("select", onSelect)
        return () => {
            api?.off("select", onSelect)
        }
    }, [api, onSelect])

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                ref={ref}
                onKeyDownCapture={handleKeyDown}
                className={cn("relative", className)}
                role="region"
                aria-roledescription="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    )
})
Carousel.displayName = "Carousel"

// Carousel Content - Container cho slides
const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { carouselRef, orientation } = useCarousel()

        return (
            <div
                ref={carouselRef}
                className={cn(
                    "overflow-visible",
                    "[&::-webkit-scrollbar]:hidden",
                    "[-ms-overflow-style:none] [scrollbar-width:none]",
                    // Thêm gradient mask để fade out các card ở 2 bên
                    "mask-[linear-gradient(to_right,transparent,black_100%,black_0%,transparent)]",
                    "[-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
                )}
            >
                <div
                    ref={ref}
                    className={cn(
                        "flex",
                        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
                        className,
                    )}
                    {...props}
                />
            </div>
        )
    },
)
CarouselContent.displayName = "CarouselContent"

// Carousel Item - Single slide
const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const { orientation } = useCarousel()

        return (
            <div
                ref={ref}
                role="group"
                aria-roledescription="slide"
                className={cn(
                    "min-w-0 shrink-0 grow-0 basis-full",
                    orientation === "horizontal" ? "pl-4" : "pt-4",
                    className,
                )}
                {...props}
            />
        )
    },
)
CarouselItem.displayName = "CarouselItem"

// Previous Button
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const { orientation, scrollPrev, canScrollPrev } = useCarousel()

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "bg-background/95 hover:bg-primary hover:text-primary-foreground active:bg-primary/90 border-primary/50 hover:border-primary",
                    "absolute h-11 w-11 rounded-full md:h-12 md:w-12 lg:h-14 lg:w-14",
                    "cursor-pointer rounded-full border-2 shadow-xl backdrop-blur-sm transition-all duration-300 select-none",
                    "opacity-0 group-hover/carousel:opacity-100",
                    "hover:shadow-primary/20 hover:scale-110 hover:shadow-2xl active:scale-95",
                    "disabled:hidden disabled:opacity-0",
                    "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    "z-10",
                    orientation === "horizontal"
                        ? "top-1/2 -left-12 -translate-y-1/2"
                        : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                    className,
                )}
                disabled={!canScrollPrev}
                onClick={scrollPrev}
                {...props}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
            </Button>
        )
    },
)
CarouselPrevious.displayName = "CarouselPrevious"

// Next Button
const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    ({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const { orientation, scrollNext, canScrollNext } = useCarousel()

        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    "absolute rounded-full",
                    "bg-background/95 hover:bg-primary hover:text-primary-foreground active:bg-primary/90 border-primary/50 hover:border-primary",
                    "-right-4 md:-right-5 lg:-right-6",
                    "h-11 w-11 md:h-12 md:w-12 lg:h-14 lg:w-14",
                    "cursor-pointer rounded-full border-2 shadow-xl backdrop-blur-sm transition-all duration-300 select-none",
                    "opacity-0 group-hover/carousel:opacity-100",
                    "hover:shadow-primary/20 hover:scale-110 hover:shadow-2xl active:scale-95",
                    "disabled:hidden disabled:opacity-0",
                    "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    // Đảm bảo button nằm trên gradient mask
                    "z-10",
                    orientation === "horizontal"
                        ? "top-1/2 -right-12 -translate-y-1/2"
                        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                    className,
                )}
                disabled={!canScrollNext}
                onClick={scrollNext}
                {...props}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
            </Button>
        )
    },
)
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi }
