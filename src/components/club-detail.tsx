'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, MessageCircle, Bus, Building2,
  ArrowRight, ChevronRight, Home, CheckCircle2, Sparkles, X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ClubData } from '@/lib/clubs-data';
import { WA_NUMBER } from '@/lib/whatsapp';

/* ─── WhatsApp Message Builder ─── */
function encodeWa(text: string): string {
  return encodeURIComponent(text).replace(/%2A/g, '*');
}

function clubWaLink(club: ClubData, type: 'club' | 'transporte' | 'ambos') {
  const base = `Hola equipo *Gincanas Clubes Campestres* 👋`;
  const messages = {
    club: `${base}\n\nMe interesa cotizar el *${club.name}* 🏠\nUbicado en: *${club.location}*\n\nNecesito información sobre:\n📍 Disponibilidad de fechas\n📅 Capacidad para mi grupo\n💰 Tarifas y paquetes\n📋 Servicios incluidos\n\nQuedo atento a su respuesta. ¡Gracias!`,
    transporte: `${base}\n\nNecesito cotizar el servicio de *TRANSPORTE* para mi evento en el *${club.name}* 🚗\n\nDatos del traslado:\n📍 Punto de partida:\n📅 Fecha del evento:\n👥 Número de pasajeros:\n⏰ Hora de recojo preferida:\n\nQuedo atento a la cotización. ¡Gracias!`,
    ambos: `${base}\n\nQuisiera cotizar el *PAQUETE COMPLETO*: *${club.name}* + *TRANSPORTE* 🚀\n\nDetalles del evento:\n📍 Club: *${club.name}* (${club.location})\n📅 Fecha estimada:\n👥 Cantidad de personas:\n🏔️ Tipo de evento: Corporativo / Escolar / Social\n\nSolicito:\n✅ Cotización del club\n✅ Cotización del transporte\n✅ Itinerario sugerido\n\nQuedo atento. ¡Gracias!`,
  };
  return `https://wa.me/${WA_NUMBER}?text=${encodeWa(messages[type])}`;
}

/* ═══════════════════════════════════════════════════════
   CINEMATIC LIGHTBOX — Full-screen image viewer
   ═══════════════════════════════════════════════════════ */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] bg-black/90"
        style={{
          backdropFilter: 'blur(20px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
        }}
        onClick={onClose}
      />

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        onClick={onClose}
        className="fixed top-5 right-5 z-[100001] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-150 backdrop-blur-md border border-white/10"
        aria-label="Cerrar imagen"
      >
        <X className="w-5 h-5" strokeWidth={2} />
      </motion.button>

      {/* Image container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="fixed inset-0 z-[100000] flex items-center justify-center px-4 py-20 md:px-12 md:py-16"
        onClick={onClose}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-zoom-out select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   CLUB DETAIL — Full-page immersive club page
   ═══════════════════════════════════════════════════════ */
export default function ClubDetail({ club }: { club: ClubData }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
  }, []);

  /* All clickable images: hero + gallery */
  const allImages: { src: string; alt: string }[] = [
    { src: club.image, alt: club.name },
    ...(club.gallery || []).map((img, idx) => ({
      src: img,
      alt: `${club.name} — Galería ${idx + 1}`,
    })),
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0a1a14 0%, #022c22 40%, #011a12 100%)',
      }}
    >
      {/* ── Breadcrumb ── */}
      <div className="pt-[100px] sm:pt-[110px] md:pt-[120px]">
        <nav className="container mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-white/40"
          >
            <Link href="/" className="hover:text-gold transition-colors inline-flex items-center gap-1">
              <Home className="w-3 h-3" />
              Inicio
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/clubes" className="hover:text-gold transition-colors">
              Clubes
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{club.name}</span>
          </motion.div>
        </nav>
      </div>

      {/* ── Hero Image (clickable) ── */}
      <div
        className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden mt-4 cursor-zoom-in group"
        onClick={() => openLightbox(club.image, club.name)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient}`} />
        <Image
          src={club.image}
          alt={club.name}
          fill
          priority
          quality={90}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
          </svg>
        </div>

        {/* Club Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full mb-3">
              <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
              <span className="text-xs text-white/80 font-medium">{club.location}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {club.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ── Gallery (if available) ── */}
      {club.gallery && club.gallery.length > 0 && (
        <div className="container mx-auto px-5 md:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 max-w-3xl mx-auto"
          >
            {club.gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl cursor-zoom-in group/img"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
                onClick={() => openLightbox(img, `${club.name} — Galería ${idx + 1}`)}
              >
                <div className="aspect-[16/10]">
                  <Image
                    src={img}
                    alt={`${club.name} — Galería ${idx + 1}`}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-300 group-hover/img:scale-[1.05]"
                    sizes="(max-width: 640px) 50vw, 400px"
                  />
                </div>
                {/* Hover zoom indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Content Section ── */}
      <div className="container mx-auto px-5 md:px-8 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-white/70 text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-8"
          >
            {club.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mb-10 md:mb-14"
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

          {/* ── Incluido en el Ingreso ── */}
          {club.included && club.included.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="mb-8 md:mb-10"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#25D366]/15">
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#25D366]" strokeWidth={2} />
                </div>
                <h2 className="font-heading font-bold text-base md:text-lg text-white">
                  Ingreso y Áreas Incluidas
                </h2>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 space-y-3">
                {club.included.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                    </div>
                    <span className="text-white/75 text-sm md:text-[0.95rem] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Actividades Adicionales ── */}
          {club.extraActivities && club.extraActivities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="mb-10 md:mb-14"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold/15">
                  <Sparkles className="w-[18px] h-[18px] text-gold" strokeWidth={2} />
                </div>
                <h2 className="font-heading font-bold text-base md:text-lg text-white">
                  Actividades Recreativas Adicionales
                </h2>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
                <div className="grid grid-cols-2 gap-3">
                  {club.extraActivities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      <span className="text-white/70 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── 3 CTA Buttons — Centered ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="max-w-sm mx-auto space-y-3"
          >
            {/* CTA 1: Cotizar Club */}
            <a
              href={clubWaLink(club, 'club')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Club
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>

            {/* CTA 2: Cotizar Transporte */}
            <a
              href={clubWaLink(club, 'transporte')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-[#064e3b] hover:bg-[#053d2e] text-white font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bus className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Transporte
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>

            {/* CTA 3: Cotizar Club + Transporte */}
            <a
              href={clubWaLink(club, 'ambos')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-gold hover:bg-gold-dark text-emerald-dark font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Club y Transporte
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-12 md:h-16" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </div>
  );
}
