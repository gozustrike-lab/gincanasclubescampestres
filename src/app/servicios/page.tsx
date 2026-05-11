import type { Metadata } from 'next';
import ServiciosSection from '@/components/servicios-section';

export const metadata: Metadata = {
  title: 'Servicios Adicionales — Gincanas Clubes Campestres',
  description:
    'Ecosistema integral de servicios: gincanas profesionales, flota de transporte turístico de lujo, catering, fotografía y más. Todo para su evento perfecto.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/servicios' },
  openGraph: {
    title: 'Servicios Adicionales — Gincanas Clubes Campestres',
    description: 'El ecosistema completo de servicios para cada evento.',
    url: 'https://gincanasclubescampestres.com/servicios',
  },
};

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background font-sans pt-20">
      {/* Page Header — unified, single block with curve */}
      <section className="bg-emerald-dark py-[60px] md:py-20 page-header-curve">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold font-medium text-sm mb-5 px-4 py-2">
            Servicios Complementarios
          </span>
          <h1 className="font-heading font-extrabold text-[1.8rem] sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight">
            El Ecosistema de Servicios{' '}
            <span className="text-gold font-extrabold">Gincanas</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-5">
            Más allá de nuestros clubes, un ecosistema integral que convierte cada evento en una experiencia completa y sin preocupaciones.
          </p>
          {/* Breadcrumb — smaller, 80% opacity, below title */}
          <nav className="flex items-center justify-center gap-2 text-[0.8rem] text-white/60">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gold/80">Servicios</span>
          </nav>
        </div>
      </section>
      <ServiciosSection />
    </main>
  );
}
