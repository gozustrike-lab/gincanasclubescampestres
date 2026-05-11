import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gincanas Clubes Campestres — Gestión de Eventos de Alto Impacto',
  description:
    'Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres exclusivos. Seguridad, logística integral y experiencias inolvidables para corporativos, universidades y colegios.',
  alternates: { canonical: 'https://gincanasclubescampestres.com' },
};

export default function HomePage() {
  return <HomeContent />;
}

function HomeContent() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <HeroBanner />
      <OverviewCards />
    </main>
  );
}

function HeroBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-emerald-gradient opacity-85" />
      <div className="absolute inset-0 hero-pattern" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-deep/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              Líderes en Gestión de Eventos Institucionales
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
            Gestión de Eventos de{' '}
            <span className="text-gold-gradient">Alto Impacto</span>{' '}
            para Instituciones Élite
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres
            exclusivos. Seguridad, logística integral y experiencias inolvidables.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mt-16">
          {[
            { value: '500+', label: 'Eventos Exitosos' },
            { value: '8', label: 'Clubes Élite' },
            { value: '15+', label: 'Años de Experiencia' },
            { value: '98%', label: 'Satisfacción' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white">
                {stat.value}
              </div>
              <span className="text-sm text-white/60 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewCards() {
  const pages = [
    {
      title: 'Nosotros',
      desc: 'Nuestra historia de excelencia, valores fundamentales y 15+ años de trayectoria liderando eventos institucionales en Perú.',
      href: '/nosotros',
      gradient: 'from-emerald-deep to-emerald-deep/80',
      icon: '🏆',
    },
    {
      title: 'Clubes',
      desc: 'Explore nuestra red exclusiva de 8 clubes campestres con filtros interactivos por capacidad, amenidades y ubicación.',
      href: '/clubes',
      gradient: 'from-gold to-gold/80',
      icon: '🏝️',
    },
    {
      title: 'Paseos Escolares',
      desc: 'Programa académico completo con actividades pedagógicas, seguridad certificada y logística integral para instituciones educativas.',
      href: '/paseos-escolares',
      gradient: 'from-emerald-deep/90 to-emerald-deep/70',
      icon: '🎓',
    },
    {
      title: 'Servicios',
      desc: 'Ecosistema integral: gincanas profesionales, transporte premium, catering, fotografía y más para completar su evento.',
      href: '/servicios',
      gradient: 'from-gold/90 to-gold/70',
      icon: '⚙️',
    },
    {
      title: 'Contacto',
      desc: 'Conecte con nuestro equipo ejecutivo. Formulario inteligente con scoring de leads y respuesta garantizada en 24 horas.',
      href: '/contacto',
      gradient: 'from-emerald-deep to-emerald-deep/60',
      icon: '📞',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-light text-emerald-deep font-medium rounded-full px-4 py-2 text-sm mb-6">
            Navegue Nuestro Sitio
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            Explore Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-corporate-text/70 text-lg leading-relaxed">
            Descubra cada aspecto de lo que hacemos. Haga clic en cualquier sección para conocer los detalles completos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className="group card-premium bg-white rounded-2xl overflow-hidden border border-border flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${page.gradient}`} />
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{page.icon}</span>
                  <h3 className="font-heading font-bold text-xl text-emerald-dark group-hover:text-gold transition-colors">
                    {page.title}
                  </h3>
                </div>
                <p className="text-corporate-text/60 text-sm leading-relaxed flex-1 mb-6">
                  {page.desc}
                </p>
                <div className="flex items-center text-emerald-deep font-semibold text-sm group-hover:text-gold transition-colors">
                  Explorar
                  <svg className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
