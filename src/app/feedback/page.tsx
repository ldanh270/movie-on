import FeedbackForm from "@/components/features/feedback-form"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Feedback - MovieOn",
    description: "Send us your feedback, questions, or suggestions about MovieOn",
}

export default function FeedbackPage() {
    return (
        <main className="min-h-[calc(100vh-8.5vh)]">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-10 select-none">
                <div className="absolute inset-0" />
                <div className="relative container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl space-y-6 text-center">
                        <h1 className="font-title text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                            Movie<span className="text-primary">On</span>
                        </h1>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
                            Have questions, feedback, or suggestions? We&apos;re here to help! Reach
                            out to our team and let&apos;s make MovieOn even better together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section>
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="from-card to-card/50 overflow-hidden rounded-3xl border bg-linear-to-br shadow-xl backdrop-blur-sm">
                            <div className="grid lg:grid-cols-5">
                                {/* Left Column - Info */}
                                <div className="from-primary/10 to-primary/5 relative overflow-hidden bg-linear-to-br p-8 select-none lg:col-span-2 lg:p-12">
                                    <div className="bg-primary/10 absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full blur-3xl" />
                                    <div className="relative space-y-8">
                                        <div className="space-y-4">
                                            <h2 className="font-title text-4xl font-bold md:text-5xl">
                                                Feed<span className="text-primary">back</span>
                                            </h2>
                                            <div className="from-primary to-primary/50 h-1 w-20 rounded-full bg-linear-to-r" />
                                        </div>

                                        <div className="text-muted-foreground space-y-4">
                                            <p className="leading-relaxed">
                                                Got questions or suggestions? We&apos;d love to hear
                                                from you! Your feedback helps us create a better
                                                movie-watching experience.
                                            </p>
                                            <p className="leading-relaxed">
                                                Fill out the form and we&apos;ll get back to you as
                                                soon as possible.
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            <div className="bg-background/50 space-y-1 rounded-xl p-4 backdrop-blur-sm">
                                                <div className="text-primary text-2xl font-bold">
                                                    24h
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    Response Time
                                                </div>
                                            </div>
                                            <div className="bg-background/50 space-y-1 rounded-xl p-4 backdrop-blur-sm">
                                                <div className="text-primary text-2xl font-bold">
                                                    100%
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    Read Rate
                                                </div>
                                            </div>
                                        </div>

                                        {/* Decorative Element */}
                                        <div className="bg-primary/5 absolute bottom-0 left-0 h-32 w-32 -translate-x-16 translate-y-16 rounded-full blur-2xl" />
                                    </div>
                                </div>

                                {/* Right Column - Form */}
                                <div className="p-8 lg:col-span-3 lg:p-12">
                                    <FeedbackForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-8">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl space-y-4 text-center">
                        <p className="text-muted-foreground text-sm select-none">
                            Need immediate assistance? Email us at{" "}
                            <a
                                href="mailto:ducanhle.dn@gmail.com"
                                className="text-primary font-medium hover:underline"
                            >
                                ducanhle.dn@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
