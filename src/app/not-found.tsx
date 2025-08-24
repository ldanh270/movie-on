import Link from 'next/link'

export default function NotFound() {
    return (
        <section className="container mx-auto grid place-items-center py-20 text-center3">
            <h1 className="text-9xl font-bold p-5">404</h1>
            <h2 className="text-3xl font-semibold">Page not found</h2>
            <p className="mt-2 text-muted-foreground">The page you requested does not exist.</p>
            <div className="mt-6 p-5">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-lg border px-4 py-2 hover:bg-input"
                >
                    Back to Home
                </Link>
            </div>
        </section>
    )
}
