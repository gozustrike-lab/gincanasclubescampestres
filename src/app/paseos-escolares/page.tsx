import type { Metadata } from 'next';
import PaseosSection from '@/components/paseos-section';
import PageHeader from '@/components/page-header';

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
      <PageHeader
        badge="Programa Educativo"
        title={<>Programa Académico de <span className="text-gold">Paseos Escolares</span></>}
        description="Experiencias educativas transformadoras que complementan el currículo escolar con actividades diseñadas por pedagogos profesionales."
        breadcrumbLabel="Paseos Escolares"
      />
      <PaseosSection />
    </main>
  );
}
