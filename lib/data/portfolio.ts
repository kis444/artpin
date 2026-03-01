export type PortfolioCategory =
  | "kitchens"
  | "doors"
  | "staircases"
  | "offices"
  | "retail"
  | "furniture"

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  image: string
  featured?: boolean
}

// Dynamic-ready: replace with API calls or CMS integration
export const portfolioItems: PortfolioItem[] = [
  // Kitchens - toate pozele tale de la k1.jpg la k9.jpg
  {
    id: "kitchen-1",
    title: "Modern Walnut Kitchen",
    category: "kitchens",
    image: "/images/portfolio/k1.jpg",
    featured: true,
  },
  {
    id: "kitchen-2",
    title: "Contemporary White Kitchen",
    category: "kitchens",
    image: "/images/portfolio/k2.jpg",
  },
  {
    id: "kitchen-3",
    title: "Minimalist Kitchen Design",
    category: "kitchens",
    image: "/images/portfolio/k3.jpg",
  },
  {
    id: "kitchen-4",
    title: "Rustic Style Kitchen",
    category: "kitchens",
    image: "/images/portfolio/k4.jpg",
  },
  {
    id: "kitchen-5",
    title: "Modern Kitchen with Island",
    category: "kitchens",
    image: "/images/portfolio/k5.jpg",
  },
  {
    id: "kitchen-6",
    title: "Scandinavian Kitchen",
    category: "kitchens",
    image: "/images/portfolio/k6.jpg",
  },
  {
    id: "kitchen-7",
    title: "Luxury Kitchen Design",
    category: "kitchens",
    image: "/images/portfolio/k7.jpg",
  },
  {
    id: "kitchen-8",
    title: "Open Concept Kitchen",
    category: "kitchens",
    image: "/images/portfolio/k8.jpg",
  },
  {
    id: "kitchen-9",
    title: "Elegant Kitchen Interior",
    category: "kitchens",
    image: "/images/portfolio/k9.jpg",
  },

  // Celelalte categorii existente
  {
    id: "doors-1",
    title: "Solid Wood Interior Door",
    category: "doors",
    image: "/images/portfolio/doors-1.jpg",
  },
  {
    id: "staircase-1",
    title: "Custom Walnut Staircase",
    category: "staircases",
    image: "/images/portfolio/staircase-1.jpg",
  },
  {
    id: "office-1",
    title: "Bucuria",
    category: "offices",
    image: "/images/portfolio/o1.jpg",
  },
   {
    id: "office-2",
    title: "Bucuria",
    category: "offices",
    image: "/images/portfolio/o2.jpg",
  },
  {
    id: "retail-1",
    title: "Luxury Retail — France",
    category: "retail",
    image: "/images/portfolio/retail-1.jpg",
    featured: true,
  },
  {
    id: "furniture-1",
    title: "Bespoke Walnut Cabinet",
    category: "furniture",
    image: "/images/portfolio/furniture-1.jpg",
  },
]