"use client"

import { useLocale } from "@/lib/i18n/locale-context"

export function ProcessSection() {
  const { t } = useLocale()

  return (
    <section id="process" className="bg-card py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t.process.label}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t.process.title}
          </h2>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {t.process.steps.map((step, i) => (
            <div
              key={i}
              className="group relative flex flex-col border border-border/40 bg-background/40 p-10 transition-colors hover:bg-background/70"
            >
              {/* Step Number */}
              <span className="font-serif text-5xl font-bold text-accent/20 transition-colors group-hover:text-accent/40">
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Connector line for larger screens */}
              {i < t.process.steps.length - 1 && (
                <div className="absolute -right-px top-1/2 hidden h-px w-px lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
