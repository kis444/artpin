// lib/content-artpin.ts
// Tipuri de date pentru site-ul Art Pin

export type Locale = "en" | "ro" | "ru"

// -------------------- HERO SECTION --------------------
export type HeroContent = {
  headline_en: string
  headline_ro: string
  headline_ru: string
  subheadline_en: string
  subheadline_ro: string
  subheadline_ru: string
  cta_en: string
  cta_ro: string
  cta_ru: string
}

// -------------------- ABOUT SECTION --------------------
export type AboutContent = {
  label_en: string
  label_ro: string
  label_ru: string
  title_en: string
  title_ro: string
  title_ru: string
  description_en: string
  description_ro: string
  description_ru: string
  features: string[] // array de 4 elemente (needitable)
  cycle_en: string
  cycle_ro: string
  cycle_ru: string
}

// -------------------- TESTIMONIALS --------------------
export type Testimonial = {
  id: string
  name: string
  role: string
  text_en: string
  text_ro: string
  text_ru: string
}

// -------------------- PORTFOLIO --------------------
export type PortfolioCategory = 
  | "kitchens" 
  | "doors" 
  | "staircases" 
  | "offices" 
  | "retail" 
  | "furniture"

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  thumbnail?: string // pentru video
}

export type PortfolioProject = {
  id: string
  category: PortfolioCategory
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

// -------------------- CASE STUDY --------------------
export type CaseStudy = {
  title_en: string
  title_ro: string
  title_ru: string
  description_en: string
  description_ro: string
  description_ru: string
  image: string
}

// -------------------- SITE SETTINGS --------------------
export type SiteSettings = {
  phone: string
  email: string
  address: string
  instagram: string
  facebook: string
  telegram: string
}

// -------------------- UTILITY TYPES --------------------
export type Section = 
  | "hero" 
  | "about" 
  | "testimonials" 
  | "portfolio" 
  | "caseStudy" 
  | "settings"

// -------------------- HELPER FUNCTIONS --------------------
export function getL(obj: any, field: string, locale: Locale): string {
  return obj[`${field}_${locale}`] ?? obj[`${field}_en`] ?? obj[field] ?? ""
}