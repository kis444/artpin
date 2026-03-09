"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import Image from "next/image"

export function HeroSection() {
  const { locale } = useLocale()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/public/content?section=hero")
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading hero:", err)
        setLoading(false)
      })
  }, [])

  // Dacă nu avem date încă, arătăm un placeholder sau nimic
  if (loading) return null
  
  // Dacă nu există content, nu afișăm secțiunea
  if (!content || Object.keys(content).length === 0) return null

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent">
          Est. 2004
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          {content[`headline_${locale}`] || content.headline_ro}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {content[`subheadline_${locale}`] || content.subheadline_ro}
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block rounded-none border border-primary bg-primary px-10 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          {content[`cta_${locale}`] || content.cta_ro}
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-primary/40" />
      </div>
    </section>
  )
}