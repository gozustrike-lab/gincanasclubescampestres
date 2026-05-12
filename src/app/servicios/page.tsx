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
      <div className="pt-[120px]">
        <nav className="container mx-auto px-4 md:px-6 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-emerald-deep/60">Servicios</span>
          </div>
        </nav>
        <ServiciosSection />
      </div>
    </main>
  );
}
