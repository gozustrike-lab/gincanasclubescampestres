import type { Metadata } from 'next';
import ClubesSection from '@/components/clubes-section';

export const metadata: Metadata = {
  title: 'Clubes — Gincanas Clubes Campestres',
  description:
    'Explore nuestra red de 14 clubes campestres exclusivos. Club Certse, Arrayanes, Toboganes, Ricardo Palma, Samafía y más. Cotice club y transporte directamente por WhatsApp.',
  alternates: { canonical: 'https://gincanasclubescampestres.com/clubes' },
  openGraph: {
    title: '14 Clubes Campestres — Gincanas Clubes Campestres',
    description: 'Red exclusiva de 14 clubes campestres en las mejores ubicaciones del Perú.',
    url: 'https://gincanasclubescampestres.com/clubes',
  },
};

export default function ClubesPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <ClubesSection />
    </main>
  );
}
