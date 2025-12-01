import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
import Link from "next/link"

export default function MovieNotFound() {
    return (
        <main className="h-fit">
            {/* 404 Content */}
            <section className="container mx-auto px-4 py-20 md:px-8">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <div className="bg-primary/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full select-none">
                        <Film className="text-primary h-12 w-12" />
                    </div>

                    <div className="space-y-2 select-none">
                        <h1 className="text-6xl font-bold">404</h1>
                        <h2 className="text-4xl font-bold">Not Found</h2>
                        <p className="text-muted-foreground text-lg">
                            The page you requested does not exist.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
                        <Button size="lg" asChild>
                            <Link href="/">Back to Home</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/discover">Explore Movies</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
