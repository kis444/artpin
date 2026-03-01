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
  thumbnail?: string  // pentru video, poți avea o imagine de previzualizare
}

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  coverImage: string
  media: MediaItem[]  // înlocuim "images" cu "media"
  featured?: boolean
}

export const portfolioItems: PortfolioItem[] = [
  // Kitchens
  {
    id: "k1",
    title: "Modern #1",
    category: "kitchens",
    coverImage: "/images/portfolio/k1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k1a.jpg" },
      { type: 'image', src: "/images/portfolio/k1b.jpg" },
      // { type: 'video', src: "/videos/portfolio/k1-tur.mp4", thumbnail: "/images/portfolio/k1a.jpg" },
    ],
    featured: true,
  },
  {
    id: "k2",
    title: "Island #2",
    category: "kitchens",
    coverImage: "/images/portfolio/k2a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k2a.jpg" },
      { type: 'image', src: "/images/portfolio/k2b.jpg" },
      { type: 'image', src: "/images/portfolio/k2c.jpg" },
      { type: 'image', src: "/images/portfolio/k2d.jpg" },
    ],
  },
  {
    id: "k3",
    title: "Minimalist #3",
    category: "kitchens",
    coverImage: "/images/portfolio/k3a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/k3a.jpg" },
      { type: 'image', src: "/images/portfolio/k3b.jpg" },
      { type: 'image', src: "/images/portfolio/k3c.jpg" },
    ],
  },

  // Celelalte categorii
  {
    id: "d1",
    title: "Solid Wood Door",
    category: "doors",
    coverImage: "/images/portfolio/d1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/d1a.jpg" },
    ],
  },
  {
    id: "s1",
    title: "Walnut Staircase",
    category: "staircases",
    coverImage: "/images/portfolio/s1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/s1a.jpg" },
    ],
  },
  {
    id: "o1",
    title: "Bucuria Office",
    category: "offices",
    coverImage: "/images/portfolio/o1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/o1a.jpg" },
      { type: 'image', src: "/images/portfolio/o1b.jpg" },
    ],
  },
  {
    id: "r1",
    title: "Luxury Retail — France",
    category: "retail",
    coverImage: "/images/portfolio/r1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/r1a.jpg" },
    ],
    featured: true,
  },
  {
    id: "f1",
    title: "Walnut Cabinet",
    category: "furniture",
    coverImage: "/images/portfolio/f1a.jpg",
    media: [
      { type: 'image', src: "/images/portfolio/f1a.jpg" },
    ],
  },
]