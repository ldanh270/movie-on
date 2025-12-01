import FeedbackForm from "@/components/features/feedback-form"
import { MessageSquareText } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Feedback - MovieOn",
    description: "Send us your feedback, questions, or suggestions about MovieOn",
}

export default function FeedbackPage() {
    return (
        <main className="min-h-[calc(100vh-8.5vh)]">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-3xl text-center space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <MessageSquareText className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="font-title text-4xl font-bold md:text-5xl lg:text-6xl">
                            Movie<span className="text-primary">On</span>
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl">
                            Leave questions, feedback, or just want to say hello? Reach out to the
                            MovieOn team! We&apos;re here to assist you with any inquiries or
                            concerns you may have. Contact us today and let&apos;s chat about all
                            things movies!
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="grid gap-8 lg:grid-cols-5">
                            {/* Left Column - Info */}
                            <div className="space-y-6 lg:col-span-2">
                                <div>
                                    <h2 className="font-title text-3xl font-bold">
                                        Feed<span className="text-primary">back</span>
                                    </h2>
                                    <p className="text-muted-foreground mt-3 leading-relaxed">
                                        Got questions or suggestions? Get in touch with MovieOn!
                                        Email us for a quick reply, call us for a personal chat, or
                                        connect on social media for updates. Your feedback counts!
                                    </p>
                                    <p className="text-muted-foreground mt-2 leading-relaxed">
                                        Alternatively, you can fill out our form, and we&apos;ll
                                        connect with you soon!
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold">About me</h3>
                                        <div className="text-muted-foreground space-y-1 text-sm">
                                            <p>
                                                <span className="font-medium">Email:</span>{" "}
                                                ducanhle.dn@gmail.com
                                            </p>
                                            <p>
                                                <span className="font-medium">Phone:</span> +84 905
                                                944 716
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-semibold">Connect with me</h3>
                                        <div className="flex gap-3">
                                            <a
                                                href="https://facebook.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-primary/10 hover:border-primary"
                                            >
                                                <span className="sr-only">Facebook</span>
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://github.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-primary/10 hover:border-primary"
                                            >
                                                <span className="sr-only">GitHub</span>
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="https://linkedin.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-primary/10 hover:border-primary"
                                            >
                                                <span className="sr-only">LinkedIn</span>
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="lg:col-span-3">
                                <FeedbackForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Info */}
            <section className="border-t py-8">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
                            <p>©2025, All Rights Reserved</p>
                            <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
                                <a href="#" className="hover:text-foreground transition-colors">
                                    Terms of Use
                                </a>
                                <a href="#" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="hover:text-foreground transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
