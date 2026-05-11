import type { Metadata } from 'next';
import NosotrosSection from '@/components/nosotros-section';

export const metadata: Metadata = {
  title: 'Nosotros — Gincanas Clubes Campestres',
  description:
    'Conozca nuestra historia de 15+ años de excelencia en gestión de eventos institucionales. Valores, trayectoria, certificaciones ISO 9001 y compromiso con la seguridad.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/nosotros' },
  openGraph: {
    title: 'Nosotros — Gincanas Clubes Campestres',
    description: 'Nuestra herencia de excelencia en gestión de eventos institucionales.',
    url: 'https://gincanasclubescampestres.com/nosotros',
  },
};

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background font-sans pt-20">
      {/* Page Header */}
      <section className="bg-emerald-dark py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold font-medium rounded-full px-4 py-2 text-sm mb-6">
            Nuestra Historia
          </span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Nuestra Herencia de <span className="text-gold">Excelencia</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Desde 2009, el referente en gestión de eventos institucionales de alto impacto en Perú.
          </p>
          <nav className="flex items-center justify-center gap-2 mt-8 text-sm text-white/40">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gold">Nosotros</span>
          </nav>
        </div>
      </section>
      <NosotrosSection />
    </main>
  );
}
