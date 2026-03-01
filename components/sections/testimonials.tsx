"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const { t } = useLocale()

  return (
    <section id="testimonials" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t.testimonials.label}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t.testimonials.title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {t.testimonials.items.map((testimonial, i) => (
            <div
              key={i}
              className="flex flex-col border border-border/60 bg-card p-8 lg:p-10"
            >
              <Quote className="mb-6 h-8 w-8 text-accent/40" />
              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                {`"${testimonial.text}"`}
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
