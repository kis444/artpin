import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://artpin.md',
      lastModified: new Date(),
    },
  ]
}