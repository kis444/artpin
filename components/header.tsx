"use client"

import { useState } from "react"
import Image from "next/image"
import { useLocale } from "@/lib/i18n/locale-context"
import { locales, localeNames, type Locale } from "@/lib/i18n/dictionaries"
import { Menu, X } from "lucide-react"

const navLinks = [
  { key: "about" as const, href: "#about" },
  { key: "services" as const, href: "#services" },
  { key: "portfolio" as const, href: "#portfolio" },
  { key: "process" as const, href: "#process" },
  { key: "testimonials" as const, href: "#testimonials" },
  { key: "contact" as const, href: "#contact" },
]

export function Header() {
  const { locale, setLocale, t } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Artpin Logo"
            width={180}
            height={52}
            priority
            className="object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        {/* Language + Mobile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-border/60 px-1 py-1">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
                  locale === loc
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {localeNames[loc as Locale]}
              </button>
            ))}
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}