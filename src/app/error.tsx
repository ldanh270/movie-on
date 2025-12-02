"use client"

import { Button } from "@/components/ui/button"

import { useEffect } from "react"

import { AlertCircle, Home, RefreshCcw } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Global error:", error)
    }, [error])

    return (
        <main className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
                <div className="bg-destructive/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                    <AlertCircle className="text-destructive h-20 w-20" />
                </div>

                <div className="space-y-2 select-none">
                    <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
                    <p className="text-muted-foreground text-lg">
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                </div>

                {error.message && (
                    <div className="bg-muted mx-auto max-w-lg rounded-lg p-4 text-left">
                        <p className="wrap-break-words font-mono text-sm text-red-500">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
                    <Button onClick={reset} size="lg" className="gap-2 select-none">
                        <RefreshCcw className="h-4 w-4" />
                        Try Again
                    </Button>
                    <Button variant="outline" size="lg" asChild className="gap-2 select-none">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
