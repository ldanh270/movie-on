"use client"

import { useEffect, useState } from "react"

/**
 * ClientOnly Component
 *
 * Purpose: Chỉ render children ở client-side, tránh hydration mismatch
 * Use case: Dùng cho components có state hoặc effects chỉ chạy ở client
 *
 * SOLID Principles:
 * - Single Responsibility: Chỉ quản lý client-side rendering
 */
interface ClientOnlyProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return <>{fallback}</>
    }

    return <>{children}</>
}
