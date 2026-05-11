import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gincanasclubescampestres.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { slug: '', priority: 1.0, changeFreq: 'weekly' as const },
    { slug: 'nosotros', priority: 0.8, changeFreq: 'monthly' as const },
    { slug: 'clubes', priority: 0.9, changeFreq: 'weekly' as const },
    { slug: 'paseos-escolares', priority: 0.9, changeFreq: 'monthly' as const },
    { slug: 'servicios', priority: 0.8, changeFreq: 'monthly' as const },
    { slug: 'contacto', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: now,
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
