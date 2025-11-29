import { cn } from "@/lib/utils"

import * as React from "react"

// Card Root - Container chính
// Note: Tuân thủ Single Responsibility - chỉ quản lý layout container
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("bg-card text-card-foreground rounded-lg border shadow-sm", className)}
            {...props}
        />
    ),
)
Card.displayName = "Card"

// Card Header - Phần đầu card
// Note: Open/Closed Principle - có thể extend mà không cần modify
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    ),
)
CardHeader.displayName = "CardHeader"

// Card Title - Tiêu đề
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    ),
)
CardTitle.displayName = "CardTitle"

// Card Description - Mô tả
const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-muted-foreground text-sm", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

// Card Content - Nội dung chính
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    ),
)
CardContent.displayName = "CardContent"

// Card Footer - Phần cuối card (actions)
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
