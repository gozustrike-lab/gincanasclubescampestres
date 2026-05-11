'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Truck, MapPinned, Leaf, Award, FileCheck, Handshake, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const milestones = [
  { year: '2009', title: 'Fundación', desc: 'Nace Gincanas Clubes Campestres con la visión de conectar instituciones con entornos naturales premium.' },
  { year: '2012', title: 'Primer Cliente Corporativo', desc: 'Gestionamos nuestro primer evento masivo para una multinacional con más de 300 participantes.' },
  { year: '2015', title: 'Expansión a 5 Clubes', desc: 'Ampliamos nuestra red a 5 clubes campestres, diversificando opciones para nuestros clientes.' },
  { year: '2018', title: 'Certificación de Seguridad', desc: 'Obtuvimos certificaciones ISO 9001 y protocolos de seguridad institucional reconocidos.' },
  { year: '2021', title: 'Red de 8 Clubes Élite', desc: 'Completamos nuestra red exclusiva de 8 clubes campestres en las mejores ubicaciones del Perú.' },
  { year: '2024', title: '500+ Eventos Gestionados', desc: 'Alcanzamos el hito de 500 eventos exitosos con un índice de satisfacción del 98%.' },
];

const values = [
  { icon: Shield, title: 'Seguridad Institucional', desc: 'Protocolos certificados ISO 9001, personal capacitado y cobertura de seguros integral para cada evento.' },
  { icon: Truck, title: 'Logística Premium', desc: 'Planificación detallada, flota de transporte de lujo y coordinación integral de principio a fin.' },
  { icon: MapPinned, title: 'Red Élite de Clubes', desc: '8 clubes campestres exclusivos seleccionados por su excelencia, ubicación y capacidad.' },
  { icon: Leaf, title: 'Compromiso Ambiental', desc: 'Prácticas sostenibles en cada evento, minimizando el impacto ambiental y promoviendo la conciencia ecológica.' },
];

const trustBadges = [
  { icon: FileCheck, label: 'Certificados de Seguridad' },
  { icon: Award, label: 'ISO 9001 Calidad' },
  { icon: Handshake, label: 'Alianzas Estratégicas' },
];

export default function NosotrosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header — left-aligned text on mobile for readability */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left md:text-center max-w-[65ch] md:max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Nuestra Historia
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-5">
            Nuestra Herencia de <span className="text-gold">Excelencia</span>
          </h2>
          <p className="prose-corporate text-base md:text-lg">
            Desde 2009, Gincanas Clubes Campestres ha sido el referente en gestión de eventos
            institucionales de alto impacto. Nuestra autoridad en el sector se construye sobre
            la base de la seguridad irreprochable, la logística impecable y una red exclusiva
            de <strong className="text-gold font-semibold">8 clubes campestres</strong> que representan lo mejor del Perú.
          </p>
        </motion.div>

        {/* Storytelling Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 md:mb-20 grid md:grid-cols-2 gap-5 md:gap-8"
        >
          <div className="bg-emerald-light/50 rounded-2xl p-5 md:p-8 border border-emerald-deep/5">
            <h3 className="font-heading font-bold text-lg md:text-xl text-emerald-dark mb-3">Autoridad Institucional</h3>
            <p className="prose-corporate text-sm md:text-base">
              Trabajamos con las corporaciones más exigentes, universidades de prestigio y colegios
              líderes del Perú. Cada evento es una declaración de excelencia que refleja el
              compromiso de nuestros clientes con la calidad y la seguridad.
            </p>
          </div>
          <div className="bg-corporate-gray/50 rounded-2xl p-5 md:p-8 border border-emerald-deep/5">
            <h3 className="font-heading font-bold text-lg md:text-xl text-emerald-dark mb-3">Red Exclusiva</h3>
            <p className="prose-corporate text-sm md:text-base">
              Nuestros <strong className="text-gold font-semibold">8 clubes campestres</strong> han sido rigurosamente seleccionados y equipados para
              albergar eventos de cualquier escala. Desde piscinas olímpicas hasta salones de
              eventos para 500+ personas, cada espacio cumple los más altos estándares.
            </p>
          </div>
        </motion.div>

        {/* Timeline — Mobile: vertical list with gold bullets; Desktop: alternating */}
        <div className="mb-16 md:mb-20">
          <h3 className="font-heading font-bold text-xl md:text-2xl text-center text-emerald-dark mb-8 md:mb-12">
            Nuestra Trayectoria
          </h3>

          {/* Mobile Timeline: simple vertical with gold bullets */}
          <div className="md:hidden space-y-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex gap-4 items-start"
              >
                {/* Gold dot */}
                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-3 h-3 rounded-full bg-gold shadow-sm shadow-gold/30" />
                </div>
                {/* Content */}
                <div className="flex-1 pb-4 border-b border-emerald-deep/[0.06] last:border-b-0 last:pb-0">
                  <span className="text-gold font-heading font-bold text-sm">{m.year}</span>
                  <h4 className="font-heading font-semibold text-[0.95rem] text-emerald-dark mt-0.5">{m.title}</h4>
                  <p className="text-sm text-corporate-text/55 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Timeline: alternating */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-deep via-gold/40 to-transparent" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-border inline-block max-w-md">
                    <span className="text-gold font-heading font-bold text-sm">{m.year}</span>
                    <h4 className="font-heading font-bold text-lg text-emerald-dark mt-1">{m.title}</h4>
                    <p className="text-sm text-corporate-text/60 mt-1">{m.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-white shadow-md z-10" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-14 md:mb-16">
          <h3 className="font-heading font-bold text-xl md:text-2xl text-center text-emerald-dark mb-8 md:mb-12">
            Nuestros Valores Fundamentales
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="card-premium bg-white rounded-2xl p-5 md:p-6 text-center border border-border"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-light rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <v.icon className="h-6 w-6 md:h-7 md:w-7 text-emerald-deep" />
                </div>
                <h4 className="font-heading font-bold text-base md:text-lg text-emerald-dark mb-2">{v.title}</h4>
                <p className="text-sm text-corporate-text/60 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 bg-emerald-light/30 border border-emerald-deep/10 rounded-full px-4 md:px-5 py-2.5 md:py-3"
            >
              <badge.icon className="h-4 w-4 md:h-5 md:w-5 text-emerald-deep" />
              <span className="text-xs md:text-sm font-medium text-emerald-dark">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
