import type { Metadata } from 'next';
import ServiciosSection from '@/components/servicios-section';
import PageHeader from '@/components/page-header';

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
      <PageHeader
        badge="Servicios Complementarios"
        title={<>El Ecosistema de Servicios <span className="text-gold">Gincanas</span></>}
        description="Más allá de nuestros clubes, un ecosistema integral que convierte cada evento en una experiencia completa y sin preocupaciones."
        breadcrumbLabel="Servicios"
      />
      <ServiciosSection />
    </main>
  );
}
