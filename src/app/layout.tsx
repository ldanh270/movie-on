import { ThemeProvider } from '@/components/theme-provider'

import type { Metadata } from 'next'
import { Montserrat_Alternates, Oswald, Source_Sans_3 } from 'next/font/google'

import './globals.css'

export const title = Oswald({
    subsets: ['latin', 'vietnamese'],
    weight: ['600', '700'],
    display: 'swap',
    variable: '--font-title',
})

export const text = Source_Sans_3({
    subsets: ['latin', 'vietnamese'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-text',
})

export const accent = Montserrat_Alternates({
    subsets: ['latin', 'vietnamese'],
    weight: ['500', '600', '700'],
    display: 'swap',
    variable: '--font-accent',
})

export const metadata: Metadata = {
    title: 'MovieOn',
    description: 'An online cinema website. Create by ldanh270',
    icons: { icon: '/logo.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${text.variable} ${title.variable} min-h-dvh bg-background text-foreground antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="movieon-theme" // Optional: Save theme in localStorage
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
