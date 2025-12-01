import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"
import { faBan } from '@fortawesome/free-solid-svg-icons';
export default function MovieNotFound() {
    return (
        <main className="h-fit">
            {/* 404 Content */}
            <section className="container mx-auto px-4 py-20 md:px-8">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <FontAwesomeIcon icon={faBan} className="w-20 h-20 mx-auto"/>

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
