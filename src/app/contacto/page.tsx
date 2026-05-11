import type { Metadata } from 'next';
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
    <main className="min-h-screen bg-background font-sans pt-20">
      {/* Page Header — mobile curve, refined breadcrumb */}
      <section className="bg-emerald-dark py-[60px] md:py-20 page-header-curve">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-gold font-medium text-sm mb-5 px-4 py-2">
            Business Lounge
          </span>
          <h1 className="font-heading font-extrabold text-[1.8rem] sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight">
            Conectemos —{' '}
            <span className="text-gold font-extrabold">Hablemos de su Evento</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-5">
            Nuestro equipo ejecutivo está listo para diseñar la experiencia perfecta para su institución.
          </p>
          <nav className="flex items-center justify-center gap-2 text-[0.8rem] text-white/60">
            <a href="/" className="hover:text-gold transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-gold/80">Contacto</span>
          </nav>
        </div>
      </section>
      <ContactoSection />
    </main>
  );
}
