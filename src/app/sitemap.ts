import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gincanasclubescampestres.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    { slug: '', name: 'Inicio', priority: 1.0, changeFreq: 'weekly' as const },
    { slug: '#nosotros', name: 'Nosotros', priority: 0.8, changeFreq: 'monthly' as const },
    { slug: '#clubes', name: 'Clubes', priority: 0.9, changeFreq: 'weekly' as const },
    { slug: '#paseos', name: 'Paseos Escolares', priority: 0.9, changeFreq: 'monthly' as const },
    { slug: '#servicios', name: 'Servicios Adicionales', priority: 0.8, changeFreq: 'monthly' as const },
    { slug: '#contacto', name: 'Contacto', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  const clubes = [
    { slug: '#clubes', name: 'Hacienda San Miguel', priority: 0.6 },
    { slug: '#clubes', name: 'Villa Verde Premium', priority: 0.6 },
    { slug: '#clubes', name: 'Rancho del Sol', priority: 0.6 },
    { slug: '#clubes', name: 'El Encanto Eco', priority: 0.6 },
    { slug: '#clubes', name: 'La Quintrala Resort', priority: 0.6 },
    { slug: '#clubes', name: 'Campestre del Sur', priority: 0.6 },
    { slug: '#clubes', name: 'Paraiso Andino', priority: 0.6 },
    { slug: '#clubes', name: 'El Oasis del Valle', priority: 0.6 },
  ];

  const now = new Date();

  return [
    ...sections.map((section) => ({
      url: `${BASE_URL}/${section.slug}`,
      lastModified: now,
      changeFrequency: section.changeFreq,
      priority: section.priority,
    })),
    ...clubes.map((club) => ({
      url: `${BASE_URL}/${club.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: club.priority,
    })),
  ];
}
