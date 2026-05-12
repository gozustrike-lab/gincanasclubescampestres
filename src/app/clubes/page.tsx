import type { Metadata } from 'next';
import ClubesSection from '@/components/clubes-section';
import PageHeader from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Clubes — Gincanas Clubes Campestres',
  description:
    'Explore nuestra red exclusiva de 8 clubes campestres. Filtre por capacidad, amenidades y ubicación. Hacienda San Miguel, Villa Verde Premium y más.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/clubes' },
  openGraph: {
    title: 'Clubes Élite — Gincanas Clubes Campestres',
    description: 'Red exclusiva de 8 clubes campestres en las mejores ubicaciones del Perú.',
    url: 'https://gincanasclubescampestres.com/clubes',
  },
};

export default function ClubesPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <PageHeader
        badge="Red Exclusiva"
        title={<>Nuestra Colección de <span className="text-gold">Clubes Élite</span></>}
        description="8 clubes seleccionados por su excelencia, ubicación privilegiada y capacidad para crear experiencias memorables."
        breadcrumbLabel="Clubes"
      />
      <ClubesSection />
    </main>
  );
}
