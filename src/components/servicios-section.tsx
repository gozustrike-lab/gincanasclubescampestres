'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trophy, Bus, UtensilsCrossed, Camera, Music,
  Target, Zap, Users, ArrowRight, CheckCircle2,
  Palette, Route
} from 'lucide-react';
import { WA_LINKS } from '@/lib/whatsapp';

const services = [
  {
    icon: Trophy,
    title: 'Gincanas Profesionales',
    tagline: 'Team Building & Experiencias Corporativas',
    description:
      'Diseñamos gincanas temáticas de alto impacto que fortalecen los vínculos entre equipos, fomentan el liderazgo y generan experiencias memorables para su organización. Cada actividad es personalizada según los objetivos estratégicos de su empresa, con mediciones de resultado y cobertura fotográfica profesional incluida.',
    features: [
      'Team Building personalizado por sector industrial',
      'Gincanas de competencia corporativa con gamificación',
      'Eventos de integración con dinámicas de liderazgo',
      'Coordinadores profesionales especializados por taller',
      'Reporte de resultados con métricas de impacto',
    ],
    extras: [
      { icon: Target, label: 'Objetivos Medibles' },
      { icon: Palette, label: 'Temáticas Personalizadas' },
      { icon: Camera, label: 'Cobertura Fotográfica' },
    ],
    color: 'emerald',
    waLink: WA_LINKS.gincanas,
  },
  {
    icon: Bus,
    title: 'Flota de Transporte Turístico de Lujo',
    tagline: 'Movilidad Premium con Seguridad Integral',
    description:
      'Nuestra flota de buses turísticos de última generación garantiza comodidad, seguridad y estilo en cada traslado. Conductores profesionales certificados, seguro de pasajeros completo y monitoreo GPS en tiempo real para la tranquilidad absoluta de nuestros clientes corporativos.',
    features: [
      'Buses premium con aire acondicionado y WiFi',
      'Conductores profesionales certificados ISO',
      'Seguro de pasajeros completo por viaje',
      'GPS y monitoreo satelital en tiempo real',
      'Asientos reclinables y entretenimiento a bordo',
    ],
    extras: [
      { icon: Route, label: 'Rutas Optimizadas' },
      { icon: Users, label: 'Hasta 50 Pasajeros' },
      { icon: Zap, label: 'Disponibilidad 24/7' },
    ],
    color: 'gold',
    waLink: WA_LINKS.transporte,
  },
];

const ecosystem = [
  { icon: Trophy, label: 'Gincanas' },
  { icon: Bus, label: 'Transporte' },
  { icon: UtensilsCrossed, label: 'Catering' },
  { icon: Camera, label: 'Fotografía' },
  { icon: Music, label: 'Audio/Video' },
  { icon: CheckCircle2, label: 'Coordinación' },
];

export default function ServiciosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-24 bg-corporate-gray" ref={ref}>
      <div className="container mx-auto px-5 md:px-8">
        {/* ── Service Cards — equal height grid, 24px min padding ── */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 items-stretch">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="h-full"
            >
              <div className="card-corporate bg-white h-full flex flex-col overflow-hidden border border-border/60">
                {/* Gold gradient top border */}
                <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-start gap-3 md:gap-4 mb-5">
                    <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0 ${
                      service.color === 'emerald' ? 'bg-emerald-light' : 'bg-gold/10'
                    }`}>
                      <service.icon className={`h-6 w-6 md:h-7 md:w-7 ${
                        service.color === 'emerald' ? 'text-emerald-deep' : 'text-gold-dark'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-lg md:text-xl text-emerald-dark leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-corporate-text/50 mt-0.5">{service.tagline}</p>
                    </div>
                  </div>

                  <p className="text-corporate-text/70 leading-relaxed text-sm md:text-base mb-5 flex-1">
                    {service.description}
                  </p>

                  {/* Feature list with SVG check icons */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <svg
                          className="h-[18px] w-[18px] text-emerald-deep mt-0.5 flex-shrink-0"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle cx="9" cy="9" r="9" fill="#ecfdf5" />
                          <path
                            d="M5.5 9L7.8 11.3L12.5 6.6"
                            stroke="#064e3b"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm text-corporate-text/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags with subtle gray bg */}
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {service.extras.map((extra) => (
                      <span key={extra.label} className="tag-pill">
                        <extra.icon className="h-3.5 w-3.5 text-emerald-deep/60" />
                        {extra.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA — bigger padding, gold solid hover, arrow animation */}
                  <a
                    href={service.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group btn-touch w-full font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-200 rounded ${
                      service.color === 'emerald'
                        ? 'border border-emerald-deep text-emerald-dark hover:bg-emerald-deep hover:text-white'
                        : 'border border-gold text-gold-dark hover:bg-gold hover:text-emerald-dark'
                    }`}
                  >
                    Solicitar Información
                    <ArrowRight className="h-4 w-4 cta-arrow" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Ecosystem Diagram — minimalist with connecting line icons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <h3 className="font-heading font-bold text-lg md:text-xl text-center text-emerald-dark mb-8">
            Ecosistema Integrado
          </h3>
          <div className="relative">
            {/* Central hub */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-dark flex items-center justify-center shadow-lg shadow-emerald-deep/15 relative">
                <Trophy className="h-8 w-8 md:h-10 md:w-10 text-gold" />
                {/* Connecting lines radiating out */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-transparent to-gold/30" />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-t from-transparent to-gold/30" />
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-6 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </div>

            {/* Service grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {ecosystem.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.08 }}
                  className="bg-white p-3 md:p-4 text-center border border-border/50 card-corporate group hover:border-gold/30 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-emerald-deep mx-auto mb-1.5 group-hover:text-gold transition-colors" />
                  <span className="text-[10px] md:text-xs font-medium text-corporate-text/60">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-[10px] md:text-xs text-corporate-text/40 mt-5 tracking-wide">
              Todos los servicios se integran para una experiencia sin fricciones
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
