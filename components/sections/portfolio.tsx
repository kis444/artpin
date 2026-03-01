"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import { portfolioItems, type PortfolioCategory, type PortfolioItem, type MediaItem } from "@/lib/data/portfolio"
import Image from "next/image"
import { ArrowUpRight, Images, X, ChevronLeft, ChevronRight, Play } from "lucide-react"

const categories: PortfolioCategory[] = [
  "kitchens",
  "doors",
  "staircases",
  "offices",
  "retail",
  "furniture",
]

// Componenta AlbumView cu suport pentru video
function AlbumView({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  media, 
  category,
  itemId,
  currentIndex = 0 
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  media: MediaItem[]
  category: string
  itemId: string
  currentIndex?: number
}) {
  const [index, setIndex] = useState(currentIndex)
  const { t } = useLocale()

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setIndex((prev) => (prev - 1 + media.length) % media.length)
          break
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          setIndex((prev) => (prev + 1) % media.length)
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, media.length, onClose])

  if (!isOpen) return null

  const nextMedia = () => {
    setIndex((prev) => (prev + 1) % media.length)
  }

  const prevMedia = () => {
    setIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  // Obținem numele categoriei tradus
  const getCategoryName = (cat: string) => {
    const categoryMap: Record<string, string> = {
      kitchens: t.portfolio.categories.kitchens,
      doors: t.portfolio.categories.doors,
      staircases: t.portfolio.categories.staircases,
      offices: t.portfolio.categories.offices,
      retail: t.portfolio.categories.retail,
      furniture: t.portfolio.categories.furniture,
    }
    return categoryMap[cat] || cat
  }

  // Render based on media type
  const renderMedia = (item: MediaItem) => {
    if (item.type === 'video') {
      return (
        <video
          src={item.src}
          controls
          autoPlay={false}
          loop
          className="h-full w-full object-contain"
          poster={item.thumbnail}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <Image
          src={item.src}
          alt={`${title} - view ${index + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      )
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div 
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-xl text-foreground md:text-2xl">{title}</h2>
        <button
          onClick={onClose}
          className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Conținut principal */}
      <div className="h-full w-full overflow-y-auto pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            {/* PARTEA STÂNGĂ - Galeria media */}
            <div className="relative space-y-4">
              {/* Media principală */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border/60 bg-muted/20">
                {renderMedia(media[index])}
              </div>

              {/* Navigare săgeți */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevMedia()
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent md:left-4 md:p-3"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextMedia()
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent md:right-4 md:p-3"
                  >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              {media.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {media.map((item, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIndex(i)
                      }}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden border-2 transition-all md:h-20 md:w-20 ${
                        i === index
                          ? "border-accent opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {item.type === 'video' ? (
                        <>
                          <Image
                            src={item.thumbnail || item.src.replace('.mp4', '.jpg')}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-6 w-6 text-white" fill="white" />
                          </div>
                        </>
                      ) : (
                        <Image
                          src={item.src}
                          alt={`Thumbnail ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Counter și indicator video */}
              <div className="absolute left-4 top-4 flex gap-2">
                <div className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                  {index + 1} / {media.length}
                </div>
                {media[index].type === 'video' && (
                  <div className="rounded-full border border-border/60 bg-accent/80 px-3 py-1 text-sm text-white backdrop-blur-sm">
                    Video
                  </div>
                )}
              </div>
            </div>

            {/* PARTEA DREAPTĂ - Descrierea și detaliile (rămâne la fel) */}
            <div className="flex flex-col space-y-8">
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
                  {title}
                </h3>
                <div className="h-0.5 w-24 bg-accent/60"></div>
              </div>

              {description ? (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent p-8">
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-accent/5 blur-2xl"></div>
                  <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/5 blur-2xl"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-xs uppercase tracking-[0.2em] text-accent">
                        Povestea proiectului
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent"></div>
                    </div>
                    
                    <p className="font-serif text-base leading-relaxed text-foreground/90 md:text-lg">
                      {description}
                    </p>
                    
                    <div className="flex justify-end">
                      <span className="font-serif text-6xl text-accent/10">"</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-muted/5 p-8 text-center">
                  <p className="font-serif text-lg italic text-muted-foreground">
                    ✦ O creație unică, în așteptarea poveștii sale ✦
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm">
                <div className="space-y-2">
                  <p className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
                    Categorie
                  </p>
                  <p className="font-serif text-lg font-medium text-foreground">
                    {getCategoryName(category)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
                    Colecție
                  </p>
                  <p className="font-serif text-lg font-medium text-foreground">
                    {title}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
                    Conținut
                  </p>
                  <p className="font-serif text-lg font-medium text-foreground">
                    {media.filter(m => m.type === 'image').length} foto · {media.filter(m => m.type === 'video').length} video
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
                    Referință
                  </p>
                  <p className="font-serif text-lg font-medium text-foreground">
                    #{itemId}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="font-serif text-xs italic text-muted-foreground/60">
                  Fiecare detaliu poartă amprenta pasiunii pentru frumos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const { t } = useLocale()
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all")
  const [selectedAlbum, setSelectedAlbum] = useState<PortfolioItem | null>(null)

  // Citim categoria din URL la încărcarea paginii
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const category = params.get('category')
      
      if (category && categories.includes(category as PortfolioCategory)) {
        setFilter(category as PortfolioCategory)
        
        setTimeout(() => {
          const element = document.getElementById('portfolio')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    }
  }, [])

  const filtered =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter)

  // Calculăm numărul total de media pentru indicator
  const getTotalMediaCount = (item: PortfolioItem) => {
    return item.media.length
  }

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

        {/* Filtre */}
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
              onClick={() => setSelectedAlbum(item)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
            >
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Multiple media indicator */}
              {getTotalMediaCount(item) > 1 && (
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  <Images className="h-3 w-3" />
                  <span>{getTotalMediaCount(item)}</span>
                </div>
              )}

              {/* Video indicator pe cover */}
              {item.media.some(m => m.type === 'video') && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border/60 bg-accent/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  <Play className="h-3 w-3" fill="white" />
                  <span>Video</span>
                </div>
              )}

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

        {/* Album View Modal */}
        <AlbumView
          isOpen={selectedAlbum !== null}
          onClose={() => setSelectedAlbum(null)}
          title={selectedAlbum?.title || ""}
          description={selectedAlbum ? (t.portfolio.descriptions as any)[selectedAlbum.id] : ""}
          media={selectedAlbum?.media || []}
          category={selectedAlbum?.category || "kitchens"}
          itemId={selectedAlbum?.id || ""}
        />

        {/* Case Study */}
        <div className="mt-20 border border-border/60 bg-card p-8 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/portfolio/r1a.jpg"
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