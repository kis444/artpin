import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LocaleProvider } from "@/lib/i18n/locale-context"
import { Header } from "@/components/header"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Artpin — Premium Custom Furniture & Interior Solutions",
  description:
    "Tailored design, exceptional craftsmanship, and timeless interiors since 2004. Custom kitchens, doors, staircases, and commercial interiors in Moldova.",
  generator: "v0.app",
icons: {
  icon: "/logo.brown.png",
  apple: "/logo.brown.png",
},
}

export const viewport: Viewport = {
  themeColor: "#2c2218",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          <Header />   {/* ← ВОТ ЗДЕСЬ он подключается */}
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}