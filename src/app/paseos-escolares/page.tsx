import type { Metadata } from 'next';
import PaseosSection from '@/components/paseos-section';

export const metadata: Metadata = {
  title: 'Paseos Escolares — Gincanas Clubes Campestres',
  description:
    'Programa académico de paseos escolares con actividades pedagógicas, seguridad certificada ISO 9001, transporte premium y logística completa. 120+ colegios atendidos.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/paseos-escolares' },
  openGraph: {
    title: 'Paseos Escolares — Gincanas Clubes Campestres',
    description: 'Experiencias educativas transformadoras en entornos naturales excepcionales.',
    url: 'https://gincanasclubescampestres.com/paseos-escolares',
  },
};

export default function PaseosEscolaresPage() {
  return (
    <main className="min-h-screen bg-background font-sans pt-20">
      {/* Page Header */}
      <section className="bg-emerald-dark py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold font-medium rounded-full px-4 py-2 text-sm mb-6">
            Programa Educativo
          </span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Programa Académico de{' '}
            <span className="text-gold">Paseos Escolares</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Experiencias educativas transformadoras que complementan el currículo escolar con actividades diseñadas por pedagogos profesionales.
          </p>
          <nav className="flex items-center justify-center gap-2 mt-8 text-sm text-white/40">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gold">Paseos Escolares</span>
          </nav>
        </div>
      </section>
      <PaseosSection />
    </main>
  );
}
