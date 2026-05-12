import type { Metadata } from 'next';
import Link from 'next/link';
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
    <main className="min-h-screen bg-background font-sans">
      <div className="pt-[120px]">
        <nav className="container mx-auto px-4 md:px-6 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-emerald-deep/60">Paseos Escolares</span>
          </div>
        </nav>
        <PaseosSection />
      </div>
    </main>
  );
}
