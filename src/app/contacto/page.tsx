import type { Metadata } from 'next';
import ContactoSection from '@/components/contacto-section';
import PageHeader from '@/components/page-header';

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
      <PageHeader
        badge="Business Lounge"
        title={<>Conectemos — <span className="text-gold">Hablemos de su Evento</span></>}
        description="Nuestro equipo ejecutivo está listo para diseñar la experiencia perfecta para su institución."
        breadcrumbLabel="Contacto"
      />
      <ContactoSection />
    </main>
  );
}
