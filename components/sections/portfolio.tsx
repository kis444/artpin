"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useLocale } from "@/lib/i18n/locale-context"
import Image from "next/image"
import { ArrowUpRight, Images, X, ChevronLeft, ChevronRight, Play, Maximize2, Minimize2, ZoomIn } from "lucide-react"

// Tipuri (le poți importa din lib/content-artpin)
type MediaItem = {
  type: 'image' | 'video'
  src: string
  thumbnail?: string
}

type PortfolioItem = {
  id: string
  category: string
  title_en: string
  title_ro: string
  title_ru: string
  description_en: string
  description_ro: string
  description_ru: string
  coverImage: string
  media: MediaItem[]
  featured?: boolean
}

// Componenta AlbumView (copiaz-o aici sau import-o)
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0, active: false })
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const { locale } = useLocale()

  // Reset zoom când se schimbă imaginea sau se iese din fullscreen
  useEffect(() => {
    setZoomState({ scale: 1, x: 0, y: 0, active: false })
  }, [index, isFullscreen])

  // Keyboard controls
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
          if (isFullscreen) {
            setIsFullscreen(false)
          } else {
            onClose()
          }
          break
        case 'f':
        case 'F':
          e.preventDefault()
          setIsFullscreen(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, media.length, onClose, isFullscreen])

  // Fullscreen API - sync cu starea internă
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [isFullscreen])

  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      try {
        if (fullscreenRef.current) {
          await fullscreenRef.current.requestFullscreen()
        }
        setIsFullscreen(true)
      } catch {
        // Fallback dacă Fullscreen API nu e disponibil
        setIsFullscreen(true)
      }
    } else {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
        }
      } catch {
        // ignore
      }
      setIsFullscreen(false)
    }
  }, [isFullscreen])

  // Double-click pe imagine → zoom la poziția cursorului
  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (media[index]?.type === 'video') return
    
    e.stopPropagation()
    
    if (zoomState.scale > 1) {
      // Reset zoom
      setZoomState({ scale: 1, x: 0, y: 0, active: false })
    } else {
      // Zoom la poziția cursorului
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomState({ scale: 2.5, x, y, active: true })
    }
  }, [index, media, zoomState.scale])

  if (!isOpen) return null

  const nextMedia = () => {
    setIndex((prev) => (prev + 1) % media.length)
  }

  const prevMedia = () => {
    setIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  const getCategoryName = (cat: string) => {
    const categoryMap: Record<string, string> = {
      kitchens: "Bucătării",
      doors: "Uși",
      staircases: "Scări",
      offices: "Birouri",
      retail: "Retail",
      furniture: "Mobilier",
    }
    return categoryMap[cat] || cat
  }

  const renderMedia = (item: MediaItem, inFullscreen = false) => {
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
      const imgStyle = zoomState.active && zoomState.scale > 1 ? {
        transform: `scale(${zoomState.scale})`,
        transformOrigin: `${zoomState.x}% ${zoomState.y}%`,
        transition: 'transform 0.3s ease-out',
      } : {
        transform: 'scale(1)',
        transition: 'transform 0.3s ease-out',
      }

      return (
        <div 
          className="relative h-full w-full overflow-hidden"
          onDoubleClick={inFullscreen ? handleDoubleClick : undefined}
          style={{ cursor: inFullscreen && media[index]?.type === 'image' ? (zoomState.scale > 1 ? 'zoom-out' : 'zoom-in') : 'default' }}
        >
          <Image
            src={item.src}
            alt={`${title} - view ${index + 1}`}
            fill
            className="object-contain"
            sizes={inFullscreen ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
            priority
            style={imgStyle}
          />
        </div>
      )
    }
  }

  // ====== MOD FULLSCREEN ======
  if (isFullscreen) {
    return (
      <div 
        ref={fullscreenRef}
        className="fixed inset-0 z-[60] bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 md:p-6">
          <h2 className="font-serif text-lg text-white/90 md:text-xl">{title}</h2>
          <div className="flex items-center gap-2">
            {media[index]?.type === 'image' && (
              <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white/70 backdrop-blur-sm md:flex">
                <ZoomIn className="h-3 w-3" />
                <span>Dublu-click pentru zoom</span>
              </div>
            )}
            <button
              onClick={toggleFullscreen}
              className="rounded-full border border-white/20 bg-black/50 p-2 text-white/80 transition-colors hover:border-accent hover:text-accent"
              title="Ieși din fullscreen (Esc)"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setIsFullscreen(false)
                onClose()
              }}
              className="rounded-full border border-white/20 bg-black/50 p-2 text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main media area */}
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="relative h-full w-full max-h-screen max-w-screen">
            {renderMedia(media[index], true)}
          </div>

          {/* Navigation arrows */}
          {media.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevMedia()
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white/80 transition-colors hover:border-accent hover:text-accent md:left-8 md:p-4"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextMedia()
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white/80 transition-colors hover:border-accent hover:text-accent md:right-8 md:p-4"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            {index + 1} / {media.length}
          </div>

          {/* Thumbnails in fullscreen */}
          {media.length > 1 && (
            <div className="absolute bottom-20 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto pb-1">
              {media.map((item, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex(i)
                  }}
                  className={`relative h-12 w-12 flex-shrink-0 overflow-hidden border-2 transition-all md:h-14 md:w-14 ${
                    i === index
                      ? "border-accent opacity-100"
                      : "border-transparent opacity-50 hover:opacity-100"
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
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play className="h-4 w-4 text-white" fill="white" />
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
        </div>
      </div>
    )
  }

  // ====== MOD NORMAL (layout original) ======
  return (
    <div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
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

      <div className="h-full w-full overflow-y-auto pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            <div className="relative space-y-4">
              {/* Container imagine - aici punem săgețile ca să fie centrate pe imagine */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border/60 bg-muted/20">
                {renderMedia(media[index])}

                {/* Săgeți stânga/dreapta - centrate pe imagine */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevMedia()
                      }}
                      className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent md:left-4 md:p-3"
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextMedia()
                      }}
                      className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent md:right-4 md:p-3"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                  </>
                )}

                {/* Buton Fullscreen - colț dreapta jos */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFullscreen()
                  }}
                  className="absolute bottom-3 right-3 z-20 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Counter + Video badge - colț stânga sus */}
                <div className="absolute left-3 top-3 z-20 flex gap-2 md:left-4 md:top-4">
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

              {/* Thumbnails - sub imagine */}
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
            </div>

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

// SECȚIUNEA PRINCIPALĂ DE PORTOFOLIU
export function PortfolioSection() {
  const { locale } = useLocale()
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [selectedAlbum, setSelectedAlbum] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)

  // Citește datele din API
  useEffect(() => {
    fetch("/api/public/content?section=portfolio")
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Error loading portfolio:", err)
        setLoading(false)
      })
  }, [])

  // Citește categoria din URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const category = params.get('category')
      
      if (category) {
        setFilter(category)
        setTimeout(() => {
          const element = document.getElementById('portfolio')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    }
  }, [])

  const categories = [
    { id: "all", name: "Toate" },
    { id: "kitchens", name: "Bucătării" },
    { id: "doors", name: "Uși" },
    { id: "staircases", name: "Scări" },
    { id: "offices", name: "Birouri" },
    { id: "retail", name: "Retail" },
    { id: "furniture", name: "Mobilier" }
  ]

  const filtered = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter)

  if (loading) return null
  if (!projects.length) return null

  return (
    <section id="portfolio" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            Portofoliu
          </p>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl text-balance">
            Proiectele noastre
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-none border px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
                filter === cat.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAlbum(item)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
            >
              <Image
                src={item.coverImage}
                alt={item[`title_${locale}`] || item.title_ro}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {item.media?.length > 1 && (
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                  <Images className="h-3 w-3" />
                  <span>{item.media.length}</span>
                </div>
              )}

              {item.media?.some(m => m.type === 'video') && (
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
                      {item[`title_${locale}`] || item.title_ro}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-accent">
                      {categories.find(c => c.id === item.category)?.name}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAlbum && (
          <AlbumView
            isOpen={true}
            onClose={() => setSelectedAlbum(null)}
            title={selectedAlbum[`title_${locale}`] || selectedAlbum.title_ro}
            description={selectedAlbum[`description_${locale}`] || selectedAlbum.description_ro}
            media={selectedAlbum.media || []}
            category={selectedAlbum.category}
            itemId={selectedAlbum.id}
          />
        )}

        {/* Case Study - rămâne la fel */}
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
                Proiect internațional — Franța
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Interior complet pentru un magazin retail de lux livrat în Franța, demonstrând capacitatea noastră de a executa proiecte la nivel internațional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
