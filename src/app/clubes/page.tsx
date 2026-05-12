import type { Metadata } from 'next';
import Link from 'next/link';
import ClubesSection from '@/components/clubes-section';

export const metadata: Metadata = {
  title: 'Clubes — Gincanas Clubes Campestres',
  description:
    'Explore nuestra red exclusiva de 8 clubes campestres. Filtre por capacidad, amenidades y ubicación. Hacienda San Miguel, Villa Verde Premium y más.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/clubes' },
  openGraph: {
    title: 'Clubes Élite — Gincanas Clubes Campestres',
    description: 'Red exclusiva de 8 clubes campestres en las mejores ubicaciones del Perú.',
    url: 'https://gincanasclubescampestres.com/clubes',
  },
};

export default function ClubesPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <div className="pt-[120px]">
        <nav className="container mx-auto px-4 md:px-6 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-emerald-deep/60">Clubes</span>
          </div>
        </nav>
        <ClubesSection />
      </div>
    </main>
  );
}
