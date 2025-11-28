import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-toggle/theme-provider"

import type { Metadata } from "next"
import { Manrope, Montserrat_Alternates, Oswald, Source_Sans_3 } from "next/font/google"

import "./globals.css"

export const title = Oswald({
    subsets: ["latin", "vietnamese"],
    weight: ["600", "700"],
    display: "swap",
    variable: "--font-title",
})

export const text = Source_Sans_3({
    subsets: ["latin", "vietnamese"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-text",
})

export const accent = Montserrat_Alternates({
    subsets: ["latin", "vietnamese"],
    weight: ["500", "600", "700"],
    display: "swap",
    variable: "--font-accent",
})

export const footer = Manrope({
    subsets: ["latin", "vietnamese"],
    weight: ["500", "600", "700"],
    display: "swap",
    variable: "--font-footer",
})

export const metadata: Metadata = {
    title: "MovieOn",
    description: "An online cinema website. Create by ldanh270",
    icons: { icon: "/logo.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${text.variable} ${title.variable} ${accent.variable} ${footer.variable} bg-background text-foreground hide-scrollbar min-h-dvh antialiased`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="movie-on-theme"
                >
                    <div className="flex h-dvh flex-col justify-between gap-0">
                        <Header />
                        <div
                            id="content"
                            className="hide-scrollbar relative h-auto w-full flex-1 overflow-y-auto"
                        >
                            {children}
                            <Footer />
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
