"use client"

import { useLocale } from "@/lib/i18n/locale-context"

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-serif text-lg font-bold tracking-wide text-primary">
            ARTPIN
          </span>
          <span className="text-xs text-muted-foreground">
            {t.footer.tagline}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Artpin. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
