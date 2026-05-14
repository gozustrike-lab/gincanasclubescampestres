'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { WA_LINKS } from '@/lib/whatsapp';
import { useAnimatedCounter } from '@/lib/use-animated-counter';
import { fadeInUp, staggerContainer, staggerItem, cardHover } from '@/lib/motion';

/* ─── Responsive Hero Slides ─── */
const HERO_SLIDES = [
  {
    desktop: '/images/hero/desktop/hero-1.webp',
    mobile: '/images/hero/mobile/hero-m1.webp',
    alt: 'Club campestre exclusivo con campo de golf, piscina y clubhouse de lujo en Perú',
  },
  {
    desktop: '/images/hero/desktop/hero-2.webp',
    mobile: '/images/hero/mobile/hero-m2.webp',
    alt: 'Evento corporativo de team building en un club campestre de lujo con montañas de fondo',
  },
  {
    desktop: '/images/hero/desktop/hero-3.webp',
    mobile: '/images/hero/mobile/hero-m3.webp',
    alt: 'Resort campestre premium con múltiples piscinas, jardines tropicales y vistas a las montañas',
  },
  {
    desktop: '/images/hero/desktop/hero-4.webp',
    mobile: '/images/hero/mobile/hero-m4.webp',
    alt: 'Elegante setup de evento al aire libre con carpa de lujo en un club campestre al atardecer',
  },
];

/* ─── Stats Data ─── */
const STATS = [
  { value: 500, suffix: '+', label: 'Eventos Exitosos', desc: 'Corporativos, académicos y sociales' },
  { value: 8, suffix: '', label: 'Clubes Élite', desc: 'Red exclusiva en las mejores ubicaciones' },
  { value: 15, suffix: '+', label: 'Años de Experiencia', desc: 'Gestión ininterrumpida desde 2009' },
  { value: 98, suffix: '%', label: 'Satisfacción Corporativa', desc: 'Índice de recomendación' },
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

/* ═══════════════════════════════════════════════════════
   HERO SLIDER — Ultra-HD, Responsive, Cross-Fade
   ═══════════════════════════════════════════════════════ */
function HeroSlider() {
  return (
    <section className="hero-fullbleed relative overflow-hidden">
      {/* Slide images */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === 0 ? 'active' : ''}`}
            data-hero-slide={i}
          >
            <picture className="hero-slide-picture">
              <source media="(max-width: 767px)" srcSet={slide.mobile} type="image/webp" />
              <source media="(min-width: 768px)" srcSet={slide.desktop} type="image/webp" />
              <img src={slide.desktop} alt={slide.alt} className="hero-slide-img" loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            </picture>
          </div>
        ))}
      </div>

      {/* Radial Overlay */}
      <div className="absolute inset-0 z-[1] hero-radial-overlay" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[40%] bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <HeroSliderScript />

      {/* Content — Framer Motion reveal */}
      <div className="hero-content-wrapper relative z-10 flex items-center justify-center">
        <div className="w-full px-5 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* H1 — Fade in up, 0.2s delay */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeInUp}
              className="font-heading font-extrabold text-[2rem] sm:text-[2.2rem] md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] md:leading-tight mb-4 md:mb-6"
              style={{ letterSpacing: '-0.02em' }}
            >
              Gestión de Eventos de{' '}
              <span className="text-gold-gradient">Alto Impacto</span>{' '}
              para Instituciones Élite
            </motion.h1>

            {/* Paragraph — 0.4s delay */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeInUp}
              className="hero-paragraph-clamp text-sm md:text-lg lg:text-xl text-white/75 max-w-[700px] mx-auto mb-6 md:mb-10 leading-relaxed px-2"
            >
              Más de <strong className="text-gold font-semibold">15 años</strong> conectando a las mejores organizaciones con nuestros{' '}
              <strong className="text-gold font-semibold">8 clubes campestres</strong> exclusivos. Seguridad, logística integral y experiencias inolvidables.
            </motion.p>
          </div>

          {/* CTA Buttons — 0.6s delay */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 hero-cta-mobile sm:max-w-none mb-8 md:mb-16"
          >
            <a
              href={WA_LINKS.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-touch w-full sm:w-auto bg-gold hover:bg-gold-dark text-emerald-dark font-bold text-sm md:text-base px-6 py-3.5 md:py-4 shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-[1.02]"
              style={{ borderRadius: '4px' }}
            >
              Hablar con un Ejecutivo de Cuentas
            </a>
            <a
              href="/clubes"
              className="btn-touch w-full sm:w-auto border border-white/20 text-white hover:bg-white/10 font-semibold text-sm md:text-base px-6 py-3.5 md:py-4 transition-all duration-300"
              style={{ borderRadius: '4px', borderWidth: '1px' }}
            >
              Explorar Clubes
            </a>
          </motion.div>

          {/* Stats Grid — 0.8s delay, animated counters */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.8}
            variants={fadeInUp}
            className="hero-stats-grid max-w-lg mx-auto"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-cell"
              >
                <AnimatedStatNumber value={stat.value} suffix={stat.suffix} />
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
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

/* ─── Animated Number for Hero Stats ─── */
function AnimatedStatNumber({ value, suffix }: { value: number; suffix: string }) {
  // Always animate on mount (hero is first viewport)
  const { value: display, suffixVisible } = useAnimatedCounter(0, value, 2500, true);

  return (
    <div className="stat-value font-heading">
      {display}
      <span style={{ opacity: suffixVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        {suffix}
      </span>
    </div>
  );
}

/* ─── Slider Script ─── */
function HeroSliderScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var slides = document.querySelectorAll('[data-hero-slide]');
            if (!slides.length) return;
            var current = 0, total = slides.length;
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

/* ═══════════════════════════════════════════════════════
   ANIMATED IMPACT COUNTERS — Scroll-triggered
   ═══════════════════════════════════════════════════════ */
function ImpactCounters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-20 bg-white border-b border-border/50" ref={ref}>
      <div className="container mx-auto px-5 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          custom={0}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-3xl text-emerald-dark mb-3">
            Cifras de <span className="text-gold-gradient">Impacto Corporativo</span>
          </h2>
          <p className="text-corporate-text/60 text-sm md:text-base">
            Resultados medibles que respaldan nuestra trayectoria en la gestión de eventos institucionales de alto nivel.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <CounterCard stat={stat} isInView={isInView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({ stat, isInView }: { stat: typeof STATS[number]; isInView: boolean }) {
  const { value: display, suffixVisible } = useAnimatedCounter(0, stat.value, 2500, isInView);

  return (
    <div className="card-corporate bg-corporate-gray/50 p-5 md:p-7 text-center border border-border/40 group hover:border-gold/20 transition-colors">
      <div className="font-heading font-extrabold text-3xl md:text-4xl text-emerald-dark mb-2">
        {display}
        <span style={{ opacity: suffixVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          {stat.suffix}
        </span>
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

/* ═══════════════════════════════════════════════════════
   OVERVIEW CARDS — Scroll Reveal + Hover Effects
   ═══════════════════════════════════════════════════════ */
function OverviewCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

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
    <section className="py-16 md:py-24 bg-corporate-gray" ref={ref}>
      <div className="container mx-auto px-5 md:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          custom={0}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-emerald-light text-emerald-deep font-medium text-sm mb-6 px-4 py-2">
            Navegue Nuestro Sitio
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl text-emerald-dark mb-5">
            Explore Nuestros <span className="text-gold-gradient">Servicios</span>
          </h2>
          <p className="text-corporate-text/60 text-base md:text-lg leading-relaxed px-2">
            Descubra cada aspecto de lo que hacemos. Haga clic en cualquier sección para conocer los detalles completos de nuestra oferta corporativa.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {pages.map((page) => (
            <motion.a
              key={page.href}
              href={page.href}
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 8px 30px rgba(6,78,59,0.12)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group card-corporate bg-white overflow-hidden border border-border/50 flex flex-col"
            >
              <div className={`h-[3px] bg-gradient-to-r ${page.gradient}`} />
              <div className="p-5 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
                      page.gradient.includes('gold') ? 'bg-gold/10' : 'bg-emerald-light'
                    }`} style={{ borderRadius: '4px' }}
                  >
                    <svg
                      className={`h-5 w-5 ${page.gradient.includes('gold') ? 'text-gold-dark' : 'text-emerald-deep'}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={page.iconPath} />
                    </svg>
                  </motion.div>
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
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
