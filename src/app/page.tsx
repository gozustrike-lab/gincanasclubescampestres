import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gincanas Clubes Campestres — Gestión de Eventos de Alto Impacto',
  description:
    'Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres exclusivos. Seguridad, logística integral y experiencias inolvidables para corporativos, universidades y colegios.',
  alternates: { canonical: 'https://gincanasclubescampestres.com' },
};

const WA_GENERAL = 'https://wa.me/51921451844?text=%C2%A1Hola!%20Vengo%20de%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20*GESTI%C3%93N%20DE%20EVENTOS%20DE%20ALTO%20IMPACTO*.%0APor%20favor%2C%20%C2%BFpodr%C3%ADan%20enviarme%20su%20cat%C3%A1logo%20de%20clubs%20exclusivos%3F%20Gracias.';

const HERO_SLIDES = [
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
];

export default function HomePage() {
  return <HomeContent />;
}

function HomeContent() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <HeroSlider />
      <ImpactCounters />
      <OverviewCards />
    </main>
  );
}

/* ─── Hero Slider with Cross-Fade ─── */
function HeroSlider() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* Slide images — cross-fade via CSS transition */}
      <div className="absolute inset-0 md:!h-[85vh]">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className={`hero-slide ${i === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
            data-hero-slide={i}
          />
        ))}
      </div>

      {/* Gradient Overlay — black 40% opacity, NON-NEGOTIABLE for legibility */}
      <div
        className="absolute inset-0 z-[1] md:!h-[85vh]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.50) 100%)',
        }}
      />

      {/* Hero Slider Script */}
      <HeroSliderScript />

      {/* Content — fixed, centered */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: '100svh' }}>
        <div className="md:!h-[85vh] flex items-center justify-center w-full">
          <div className="container mx-auto px-5 md:px-8 text-center pt-24 pb-16">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="hero-content-animate inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] px-4 py-2 mb-6 md:mb-8">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                <span className="text-xs md:text-sm text-white/70 font-medium tracking-wide">
                  Gestión de Eventos Institucionales
                </span>
              </div>

              {/* H1 */}
              <h1 className="hero-content-animate hero-content-animate-delay-1 font-heading font-extrabold text-[2.3rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.15] sm:leading-tight mb-5 md:mb-6">
                Gestión de Eventos de{' '}
                <span className="text-gold-gradient">Alto Impacto</span>{' '}
                para Instituciones Élite
              </h1>

              <p className="hero-content-animate hero-content-animate-delay-2 text-base md:text-lg lg:text-xl text-white/75 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
                Más de <strong className="text-gold font-semibold">15 años</strong> conectando a las mejores organizaciones con nuestros{' '}
                <strong className="text-gold font-semibold">8 clubes campestres</strong> exclusivos. Seguridad, logística integral y experiencias inolvidables.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-content-animate hero-content-animate-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 max-w-[90%] sm:max-w-none mx-auto mb-12 md:mb-16">
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch w-full sm:w-auto bg-gold hover:bg-gold-dark text-emerald-dark font-bold text-base px-8 shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-[1.02]"
                style={{ borderRadius: '4px' }}
              >
                Hablar con un Ejecutivo de Cuentas
              </a>
              <a
                href="/clubes"
                className="btn-touch w-full sm:w-auto border border-white/25 text-white hover:bg-white/10 font-semibold text-base px-8 transition-all duration-300"
                style={{ borderRadius: '4px' }}
              >
                Explorar Clubes
              </a>
            </div>

            {/* Stats Grid */}
            <div className="hero-content-animate hero-content-animate-delay-4 grid grid-cols-2 gap-0 max-w-lg mx-auto bg-white/[0.05] overflow-hidden border border-white/[0.06]" style={{ borderRadius: '8px' }}>
              {[
                { value: '500+', label: 'Eventos Exitosos' },
                { value: '8', label: 'Clubes Élite' },
                { value: '15+', label: 'Años de Experiencia' },
                { value: '98%', label: 'Satisfacción' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center gap-1.5 py-5 md:py-6 ${
                    i % 2 === 0 ? 'border-r border-white/[0.06]' : ''
                  } ${i < 2 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <div className="text-2xl md:text-3xl font-heading font-bold text-white">
                    {stat.value}
                  </div>
                  <span className="text-[11px] md:text-sm text-white/50 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] text-white/60 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

/* Slider logic — auto-advance every 4s with cross-fade */
function HeroSliderScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var slides = document.querySelectorAll('[data-hero-slide]');
            if (!slides.length) return;
            var current = 0;
            var total = slides.length;

            function nextSlide() {
              slides[current].classList.remove('active');
              current = (current + 1) % total;
              slides[current].classList.add('active');
            }

            setInterval(nextSlide, 4000);
          })();
        `,
      }}
    />
  );
}

/* ─── Animated Impact Counters ─── */
function ImpactCounters() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-border/50">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-emerald-dark mb-3">
            Cifras de <span className="text-gold-gradient">Impacto Corporativo</span>
          </h2>
          <p className="text-corporate-text/60 text-sm md:text-base">
            Resultados medibles que respaldan nuestra trayectoria en la gestión de eventos institucionales de alto nivel.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {[
            { value: '15+', label: 'Años de Experiencia', desc: 'Gestión ininterrumpida desde 2009' },
            { value: '500+', label: 'Eventos Exitosos', desc: 'Corporativos, académicos y sociales' },
            { value: '8', label: 'Clubes Élite', desc: 'Red exclusiva en las mejores ubicaciones' },
            { value: '98%', label: 'Satisfacción Corporativa', desc: 'Índice de recomendación' },
          ].map((stat, i) => (
            <CounterCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterCard({ stat, index }: { stat: { value: string; label: string; desc: string }; index: number }) {
  return (
    <div className="card-corporate bg-corporate-gray/50 p-5 md:p-7 text-center border border-border/40 group hover:border-gold/20 transition-colors">
      <div className="font-heading font-extrabold text-3xl md:text-4xl text-emerald-dark counter-animate mb-2" style={{ animationDelay: `${index * 0.15}s` }}>
        {stat.value}
      </div>
      <div className="font-heading font-bold text-sm md:text-base text-emerald-dark mb-1">
        {stat.label}
      </div>
      <p className="text-xs text-corporate-text/50 leading-relaxed">
        {stat.desc}
      </p>
    </div>
  );
}

/* ─── Overview Cards — SVG Icons, Ultra-Pro ─── */
function OverviewCards() {
  const pages = [
    {
      title: 'Nosotros',
      desc: 'Nuestra historia de excelencia, valores fundamentales y 15+ años de trayectoria liderando eventos institucionales en Perú.',
      href: '/nosotros',
      gradient: 'from-emerald-deep to-emerald-dark',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Clubes',
      desc: 'Red exclusiva de 8 clubes campestres con filtros interactivos por capacidad, amenidades y ubicación privilegiada.',
      href: '/clubes',
      gradient: 'from-gold to-gold-dark',
      iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Paseos Escolares',
      desc: 'Programa académico completo con actividades pedagógicas, seguridad certificada ISO 9001 y logística integral.',
      href: '/paseos-escolares',
      gradient: 'from-emerald-deep to-emerald-dark',
      iconPath: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    },
    {
      title: 'Servicios',
      desc: 'Ecosistema integral: gincanas profesionales, transporte premium, catering, fotografía y coordinación de eventos.',
      href: '/servicios',
      gradient: 'from-gold to-gold-dark',
      iconPath: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      title: 'Contacto',
      desc: 'Conecte con nuestro equipo ejecutivo. Formulario inteligente con scoring de leads y respuesta garantizada en 24 horas.',
      href: '/contacto',
      gradient: 'from-emerald-deep to-emerald-dark',
      iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-corporate-gray">
      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 bg-emerald-light text-emerald-deep font-medium text-sm mb-6 px-4 py-2">
            Navegue Nuestro Sitio
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl text-emerald-dark mb-5">
            Explore Nuestros <span className="text-gold-gradient">Servicios</span>
          </h2>
          <p className="text-corporate-text/60 text-base md:text-lg leading-relaxed px-2">
            Descubra cada aspecto de lo que hacemos. Haga clic en cualquier sección para conocer los detalles completos de nuestra oferta corporativa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {pages.map((page) => (
            <a
              key={page.href}
              href={page.href}
              className="group card-corporate bg-white overflow-hidden border border-border/50 flex flex-col"
            >
              <div className={`h-[3px] bg-gradient-to-r ${page.gradient}`} />
              <div className="p-5 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                    page.gradient.includes('gold') ? 'bg-gold/10' : 'bg-emerald-light'
                  }`} style={{ borderRadius: '4px' }}>
                    <svg
                      className={`h-5 w-5 ${page.gradient.includes('gold') ? 'text-gold-dark' : 'text-emerald-deep'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={page.iconPath} />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-emerald-dark group-hover:text-gold transition-colors">
                    {page.title}
                  </h3>
                </div>
                <p className="text-corporate-text/60 text-sm leading-relaxed flex-1 mb-5">
                  {page.desc}
                </p>
                <div className="flex items-center text-emerald-deep font-semibold text-sm group-hover:text-gold transition-colors">
                  Explorar
                  <svg className="h-4 w-4 ml-2 cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
