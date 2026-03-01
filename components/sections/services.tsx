"use client"

import { useLocale } from "@/lib/i18n/locale-context"
import {
  ChefHat,
  DoorOpen,
  Shield,
  Layers,
  Building2,
  PanelTop,
  Armchair,
  Store,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const icons: LucideIcon[] = [
  ChefHat,
  DoorOpen,
  Shield,
  Layers,
  Building2,
  PanelTop,
  Armchair,
  Store,
]

export function ServicesSection() {
  const { t } = useLocale()

  return (
    <section id="services" className="bg-card py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t.services.label}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t.services.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className="group flex flex-col border border-border/60 bg-background/50 p-8 transition-all hover:border-accent/40 hover:bg-background/80"
              >
                <Icon className="mb-6 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                <h3 className="font-serif text-lg font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
