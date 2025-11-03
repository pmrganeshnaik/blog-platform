import { MetadataRoute } from 'next/server'

export default function Sitemap(): MetadataRoute {
  return {
    routes: [
      {
        url: 'https://yourdomain.com',
        lastmod: new Date(),
      },
    ]
  }
}