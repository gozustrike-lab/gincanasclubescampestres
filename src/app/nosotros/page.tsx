import type { Metadata } from 'next';
import Link from 'next/link';
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
    <main className="min-h-screen bg-background font-sans">
      <div className="pt-[120px]">
        <nav className="container mx-auto px-4 md:px-6 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-emerald-deep/60">Nosotros</span>
          </div>
        </nav>
        <NosotrosSection />
      </div>
    </main>
  );
}
