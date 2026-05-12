import type { Metadata } from 'next';
import Link from 'next/link';
import ContactoSection from '@/components/contacto-section';

export const metadata: Metadata = {
  title: 'Contacto — Gincanas Clubes Campestres',
  description:
    'Conecte con nuestro equipo ejecutivo. Formulario de contacto inteligente con scoring de leads. Respuesta garantizada en 24 horas para cotizaciones de eventos.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/contacto' },
  openGraph: {
    title: 'Contacto — Gincanas Clubes Campestres',
    description: 'Hablemos de su evento. Respuesta en 24 horas.',
    url: 'https://gincanasclubescampestres.com/contacto',
  },
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <div className="pt-[120px]">
        <nav className="container mx-auto px-4 md:px-6 pb-5">
          <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-emerald-deep/60">Contacto</span>
          </div>
        </nav>
        <ContactoSection />
      </div>
    </main>
  );
}
