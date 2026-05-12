import type { Metadata } from 'next';
import NosotrosSection from '@/components/nosotros-section';
import PageHeader from '@/components/page-header';

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
      <PageHeader
        badge="Nuestra Historia"
        title={<>Nuestra Herencia de <span className="text-gold">Excelencia</span></>}
        description="Desde 2009, el referente en gestión de eventos institucionales de alto impacto en Perú."
        breadcrumbLabel="Nosotros"
      />
      <NosotrosSection />
    </main>
  );
}
