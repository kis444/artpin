"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import Image from "next/image"
import { Check } from "lucide-react"

export function AboutSection() {
  const { locale } = useLocale()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/public/content?section=about")
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading about:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return null
  if (!content || Object.keys(content).length === 0) return null

  // Features hardcodate (needitabile)
  const features = [
    "Consultanță gratuită de design",
    "Proiecte individuale personalizate",
    "Atenție la fiecare detaliu",
    "Materiale premium selectate"
  ]

  return (
    <section id="about" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/ab.jpg"
              alt="Artpin craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 h-1 w-24 bg-accent" />
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
              {content[`label_${locale}`] || content.label_ro}
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              {content[`title_${locale}`] || content.title_ro}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
              {content[`description_${locale}`] || content.description_ro}
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-sm lg:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm tracking-wide text-muted-foreground">
                {content[`cycle_${locale}`] || content.cycle_ro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}