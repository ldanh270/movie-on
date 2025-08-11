import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const text = Source_Sans_3({
  subsets: ['vietnamese','latin'],
  weight: '400',
  display: 'swap',
  variable: '--fontText'
})

const title = Oswald({
  subsets: ['vietnamese','latin'],
  weight: '600',
  display: 'swap',
  variable: '--fontTitle'
})


export const metadata: Metadata = {
  title: "MovieOn",
  description: "An online cinema website. Create by ldanh270",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
      </head>
      <body
        className={`${text.variable} ${title.variable}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          
        {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
