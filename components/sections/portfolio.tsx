"use client"

import { useState } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import { portfolioItems, type PortfolioCategory } from "@/lib/data/portfolio"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const categories: PortfolioCategory[] = [
  "kitchens",
  "doors",
  "staircases",
  "offices",
  "retail",
  "furniture",
]

export function PortfolioSection() {
  const { t } = useLocale()
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all")

  const filtered =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter)

  return (
    <section id="portfolio" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t.portfolio.label}
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            {t.portfolio.title}
          </h2>
        </div>

        {/* Filter */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-none border px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
              filter === "all"
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {t.portfolio.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-none border px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
                filter === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {t.portfolio.categories[cat]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/60" />
              <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex w-full items-end justify-between">
                  <div>
                    <p className="font-serif text-lg font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-accent">
                      {t.portfolio.categories[item.category]}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study */}
        <div className="mt-20 border border-border/60 bg-card p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/portfolio/retail-1.jpg"
                alt="International project France"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">
                Case Study
              </p>
              <h3 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
                {t.portfolio.caseStudy.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {t.portfolio.caseStudy.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
