'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MapPin, X, MessageCircle, Bus, Building2,
  ArrowRight, ChevronDown, Phone
} from 'lucide-react';
import Image from 'next/image';
import { CLUBS, type ClubData } from '@/lib/clubs-data';
import { WA_NUMBER } from '@/lib/whatsapp';

/* ─── WhatsApp Message Builder ─── */
function encodeWa(text: string): string {
  return encodeURIComponent(text).replace(/%2A/g, '*');
}

function clubWaLink(club: ClubData, type: 'club' | 'transporte' | 'ambos') {
  const base = `Hola equipo *Gincanas Clubes Campestres* \ud83d\udc4b`;
  const messages = {
    club: `${base}\n\nMe interesa cotizar el *${club.name}* \ud83c\udfe0\nUbicado en: *${club.location}*\n\nNecesito informaci\u00f3n sobre:\n\ud83d\udccd Disponibilidad de fechas\n\ud83d\udcc5 Capacidad para mi grupo\n\ud83d\udcb0 Tarifas y paquetes\n\ud83d\udcdc Servicios incluidos\n\nQuedo atento a su respuesta. \u00a1Gracias!`,
    transporte: `${base}\n\nNecesito cotizar el servicio de *TRANSPORTE* para mi evento en el *${club.name}* \ud83d\ude97\n\nDatos del traslado:\n\ud83d\udccd Punto de partida:\n\ud83d\udcc5 Fecha del evento:\n\ud83d\udc65 N\u00famero de pasajeros:\n\u23f0 Hora de recojo preferida:\n\nQuedo atento a la cotizaci\u00f3n. \u00a1Gracias!`,
    ambos: `${base}\n\nQuisiera cotizar el *PAQUETE COMPLETO*: *${club.name}* + *TRANSPORTE* \ud83d\ude80\n\nDetalles del evento:\n\ud83d\udccd Club: *${club.name}* (${club.location})\n\ud83d\udcc5 Fecha estimada:\n\ud83d\udc65 Cantidad de personas:\n\ud83c\udfe5 Tipo de evento: Corporativo / Escolar / Social\n\nSolicito:\n\u2705 Cotizaci\u00f3n del club\n\u2705 Cotizaci\u00f3n del transporte\n\u2705 Itinerario sugerido\n\nQuedo atento. \u00a1Gracias!`,
  };
  return `https://wa.me/${WA_NUMBER}?text=${encodeWa(messages[type])}`;
}

/* ═══════════════════════════════════════════════════════
   CLUB MODAL — Full-screen immersive overlay
   ═══════════════════════════════════════════════════════ */
function ClubModal({ club, onClose }: { club: ClubData; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[99998] bg-black/60"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 z-[99999] flex flex-col overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          background: 'linear-gradient(180deg, #0a1a14 0%, #022c22 40%, #011a12 100%)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[45vh] flex-shrink-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient}`} />
          <Image
            src={club.image}
            alt={club.name}
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />

          {/* Club Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full mb-3">
                <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                <span className="text-xs text-white/80 font-medium">{club.location}</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                {club.name}
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 md:px-12 py-6 md:py-8">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-white/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-3xl"
          >
            {club.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-8 md:mb-10"
          >
            {club.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gold bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-full"
              >
                <span className="w-1 h-1 bg-gold rounded-full" />
                {f}
              </span>
            ))}
          </motion.div>

          {/* ── 3 CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-3 max-w-lg"
          >
            {/* CTA 1: Cotizar Club */}
            <a
              href={clubWaLink(club, 'club')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full h-[52px] md:h-[56px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm md:text-base transition-all duration-200 rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.01] active:scale-[0.98]"
            >
              <Building2 className="w-5 h-5" strokeWidth={2} />
              Cotizar Club
              <ArrowRight className="w-4 h-4 ml-auto" strokeWidth={2.5} />
            </a>

            {/* CTA 2: Cotizar Transporte */}
            <a
              href={clubWaLink(club, 'transporte')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full h-[52px] md:h-[56px] bg-[#064e3b] hover:bg-[#053d2e] text-white font-bold text-sm md:text-base transition-all duration-200 rounded-xl shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:scale-[1.01] active:scale-[0.98]"
            >
              <Bus className="w-5 h-5" strokeWidth={2} />
              Cotizar Transporte
              <ArrowRight className="w-4 h-4 ml-auto" strokeWidth={2.5} />
            </a>

            {/* CTA 3: Cotizar Club + Transporte */}
            <a
              href={clubWaLink(club, 'ambos')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full h-[52px] md:h-[56px] bg-gold hover:bg-gold-dark text-emerald-dark font-bold text-sm md:text-base transition-all duration-200 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.01] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={2} />
              Cotizar Club y Transporte
              <ArrowRight className="w-4 h-4 ml-auto" strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Bottom safe area for mobile */}
          <div className="h-8" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   CLUBES SECTION — Full Immersive Cards Grid
   ═══════════════════════════════════════════════════════ */
export default function ClubesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedClub, setSelectedClub] = useState<ClubData | null>(null);

  return (
    <>
      <section className="bg-corporate-gray" ref={ref}>
        {/* Header */}
        <div className="pt-[120px] pb-8 md:pb-12">
          <nav className="container mx-auto px-5 md:px-8 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-corporate-text/40">
              <a href="/" className="hover:text-gold transition-colors">Inicio</a>
              <span>/</span>
              <span className="text-emerald-deep/60">Clubes</span>
            </div>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto px-5 md:px-8"
          >
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-4">
              Nuestra Red de{' '}
              <span className="text-gold-gradient">Clubes Campestres</span>
            </h1>
            <p className="text-corporate-text/60 text-sm md:text-base leading-relaxed">
              Explore nuestra colección exclusiva de {CLUBS.length} clubes campestres cuidadosamente seleccionados.
              Cada uno ofrece experiencias únicas para eventos corporativos, paseos escolares y celebraciones especiales.
            </p>
          </motion.div>
        </div>

        {/* Club Cards Grid — Full Immersive */}
        <div className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {CLUBS.map((club, i) => (
              <motion.div
                key={club.slug}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group cursor-pointer"
                onClick={() => setSelectedClub(club)}
              >
                {/* FULL CARD — Image-first immersive design */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-border/60 h-[320px] sm:h-[340px] md:h-[360px]"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  {/* Image */}
                  <Image
                    src={club.image}
                    alt={`${club.name} — ${club.location}`}
                    fill
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

                  {/* Content at bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                    {/* Features pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {club.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-[10px] font-medium text-white/75 bg-white/10 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                      {club.features.length > 3 && (
                        <span className="text-[10px] font-medium text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          +{club.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-heading font-bold text-lg md:text-xl text-white leading-tight mb-1">
                      {club.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-white/60">
                      <MapPin className="w-3 h-3" strokeWidth={2} />
                      <span className="text-xs font-medium">{club.location}</span>
                    </div>
                  </div>

                  {/* Hover overlay — "Ver Club" indicator */}
                  <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full">
                        <span className="text-white font-bold text-sm">Ver Club</span>
                        <ArrowRight className="w-4 h-4 text-gold" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedClub && (
          <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
