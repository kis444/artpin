"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import { Quote } from "lucide-react"

type Testimonial = {
  id: string
  name: string
  role: string
  text_en: string
  text_ro: string
  text_ru: string
}

export function TestimonialsSection() {
  const { locale } = useLocale()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/public/content?section=testimonials")
      .then(res => res.json())
      .then(data => {
        setTestimonials(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading testimonials:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return null
  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            Testimoniale
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            Ce spun clienții noștri
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col border border-border/60 bg-card p-8 lg:p-10"
            >
              <Quote className="mb-6 h-8 w-8 text-accent/40" />
              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                {`"${testimonial[`text_${locale}`] || testimonial.text_ro}"`}
              </blockquote>
              <div className="mt-8 border-t border-border/40 pt-6">
                <p className="font-serif text-base font-medium text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}