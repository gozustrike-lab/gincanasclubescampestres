import type { Metadata } from 'next';
import Link from 'next/link';
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
    <main className="min-h-screen bg-background font-sans">
      {/* ═══ Emerald Header Block — Unified Title + Breadcrumb ═══ */}
      <section
        className="relative bg-emerald-gradient overflow-hidden"
        style={{ paddingTop: '100px', borderRadius: '0 0 30px 30px' }}
      >
        {/* Subtle radial pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30" />

        <div className="relative z-10 container mx-auto px-5 md:px-8 pb-12 md:pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              Inicio
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-gold/70">Servicios</span>
          </nav>

          {/* Centered Title */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/[0.10] backdrop-blur-sm border border-white/[0.08] text-gold font-medium text-xs md:text-sm mb-4 px-3.5 py-1.5">
              Servicios Complementarios
            </span>
            <h1 className="font-heading font-extrabold text-[1.5rem] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-3 md:mb-4">
              El Ecosistema de Servicios{' '}
              <span className="text-gold-gradient">Gincanas</span>
            </h1>
            <p className="hidden sm:block text-white/55 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Más allá de nuestros clubes, ofrecemos un ecosistema integral de
              servicios que convierte cada evento en una experiencia completa y sin
              preocupaciones.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Cards — Layered Overlap (-20px) ═══ */}
      <div className="relative z-10" style={{ marginTop: '-20px' }}>
        <ServiciosSection />
      </div>
    </main>
  );
}
