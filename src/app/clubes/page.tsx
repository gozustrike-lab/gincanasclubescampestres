import type { Metadata } from 'next';
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
    <main className="min-h-screen bg-background font-sans pt-20">
      {/* Page Header */}
      <section className="bg-emerald-dark py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold font-medium rounded-full px-4 py-2 text-sm mb-6">
            Red Exclusiva
          </span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Nuestra Colección de <span className="text-gold">Clubes Élite</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            8 clubes seleccionados por su excelencia, ubicación privilegiada y capacidad para crear experiencias memorables.
          </p>
          <nav className="flex items-center justify-center gap-2 mt-8 text-sm text-white/40">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gold">Clubes</span>
          </nav>
        </div>
      </section>
      <ClubesSection />
    </main>
  );
}
