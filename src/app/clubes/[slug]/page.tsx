import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CLUBS } from '@/lib/clubs-data';
import ClubDetail from '@/components/club-detail';

/* ─── Static Params — Pre-generate all 14 club pages ─── */
export function generateStaticParams() {
  return CLUBS.map((club) => ({ slug: club.slug }));
}

/* ─── Dynamic Metadata per Club ─── */
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const club = CLUBS.find((c) => c.slug === slug);

  if (!club) {
    return { title: 'Club no encontrado' };
  }

  return {
    title: `${club.name} — Club Campestre en ${club.location}`,
    description: club.description,
    alternates: { canonical: `https://gincanasclubescampestres.com/clubes/${club.slug}` },
    openGraph: {
      title: `${club.name} — Gincanas Clubes Campestres`,
      description: club.description,
      url: `https://gincanasclubescampestres.com/clubes/${club.slug}`,
      images: [{ url: club.image, width: 1200, height: 630, alt: club.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${club.name} — Gincanas Clubes Campestres`,
      description: club.description,
      images: [club.image],
    },
  };
}

/* ─── Page Component ─── */
export default async function ClubSlugPage({ params }: Props) {
  const { slug } = await params;
  const club = CLUBS.find((c) => c.slug === slug);

  if (!club) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background font-sans">
      <ClubDetail club={club} />
    </main>
  );
}
