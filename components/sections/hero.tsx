"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import Image from "next/image"

export function HeroSection() {
  const { t } = useLocale()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Artpin luxury interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent">
          Est. 2004
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          {t.hero.headline}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t.hero.subheadline}
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-none border border-primary bg-primary px-10 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          {t.hero.cta}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-primary/40" />
      </div>
    </section>
  )
}
