import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gincanas Clubes Campestres — Gestión de Eventos de Alto Impacto',
  description:
    'Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres exclusivos. Seguridad, logística integral y experiencias inolvidables para corporativos, universidades y colegios.',
  alternates: { canonical: 'https://gincanasclubescampestres.com' },
};

const WA_GENERAL = 'https://wa.me/51921451844?text=%C2%A1Hola!%20%E2%91%8B%20Vengo%20de%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20*GESTI%C3%93N%20DE%20EVENTOS%20DE%20ALTO%20IMPACTO*.%20%F0%9F%8F%9B%EF%B8%8F%E2%9C%A8%0APor%20favor%2C%20%C2%BFpodr%C3%ADan%20enviarme%20su%20cat%C3%A1logo%20de%20clubs%20exclusivos%3F%20Gracias.';

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

      {/* Decorative */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-deep/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 md:px-8 text-center pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6 md:mb-8">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-xs md:text-sm text-white/80 font-medium tracking-wide">
              Líderes en Gestión de Eventos Institucionales
            </span>
          </div>

          {/* H1 — max 2.5rem on mobile, bigger on desktop */}
          <h1 className="font-heading font-extrabold text-[2.3rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.15] sm:leading-tight mb-5 md:mb-6">
            Gestión de Eventos de{' '}
            <span className="text-gold-gradient">Alto Impacto</span>{' '}
            para Instituciones Élite
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
            Más de <strong className="text-gold font-semibold">15 años</strong> conectando a las mejores organizaciones con nuestros{' '}
            <strong className="text-gold font-semibold">8 clubes campestres</strong> exclusivos. Seguridad, logística integral y experiencias inolvidables.
          </p>
        </div>

        {/* CTA Buttons — 90% width on mobile, centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 max-w-[90%] sm:max-w-none mx-auto mb-12 md:mb-16">
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-touch w-full sm:w-auto bg-gold hover:bg-gold-dark text-emerald-dark font-bold text-base px-8 rounded-lg shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-[1.02]"
          >
            Solicitar Cotización
          </a>
          <a
            href="/clubes"
            className="btn-touch w-full sm:w-auto border border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 rounded-lg transition-all duration-300"
          >
            Explorar Clubes
          </a>
        </div>

        {/* Stats Grid — 2 columns mobile with subtle separators */}
        <div className="grid grid-cols-2 gap-0 max-w-lg mx-auto bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]">
          {[
            { value: '500+', label: 'Eventos Exitosos' },
            { value: '8', label: 'Clubes Élite' },
            { value: '15+', label: 'Años de Experiencia' },
            { value: '98%', label: 'Satisfacción' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-1.5 py-5 md:py-6 ${
                i % 2 === 0 ? 'border-r border-white/[0.08]' : ''
              } ${i < 2 ? 'border-b border-white/[0.08]' : ''}`}
            >
              <div className="text-2xl md:text-3xl font-heading font-bold text-white">
                {stat.value}
              </div>
              <span className="text-[11px] md:text-sm text-white/55 font-medium">{stat.label}</span>
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-light text-emerald-deep font-medium rounded-full px-4 py-2 text-sm mb-6">
            Navegue Nuestro Sitio
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl text-emerald-dark mb-5">
            Explore Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-corporate-text/70 text-base md:text-lg leading-relaxed px-2">
            Descubra cada aspecto de lo que hacemos. Haga clic en cualquier sección para conocer los detalles completos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className="group card-premium bg-white rounded-2xl overflow-hidden border border-border flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${page.gradient}`} />
              <div className="p-5 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{page.icon}</span>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-emerald-dark group-hover:text-gold transition-colors">
                    {page.title}
                  </h3>
                </div>
                <p className="text-corporate-text/60 text-sm leading-relaxed flex-1 mb-5">
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
