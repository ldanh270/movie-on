import Link from "next/link"

export default function NotFound() {
    return (
        <section className="text-center3 container mx-auto grid place-items-center py-20">
            <h1 className="p-5 text-9xl font-bold">404</h1>
            <h2 className="text-3xl font-semibold">Page not found</h2>
            <p className="text-muted-foreground mt-2">The page you requested does not exist.</p>
            <div className="mt-6 p-5">
                <Link
                    href="/"
                    className="hover:bg-input inline-flex items-center rounded-lg border px-4 py-2"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    )
}
