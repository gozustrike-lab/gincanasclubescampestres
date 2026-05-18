'use client';

import { motion } from 'framer-motion';
import {
  MapPin, MessageCircle, Bus, Building2,
  ArrowRight, ChevronRight, Home,
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
   CLUB DETAIL — Full-page immersive club page
   ═══════════════════════════════════════════════════════ */
export default function ClubDetail({ club }: { club: ClubData }) {
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

      {/* ── Hero Image ── */}
      <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden mt-4">
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
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

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

      {/* ── Content Section ── */}
      <div className="container mx-auto px-5 md:px-8 py-8 md:py-12">
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

          {/* ── 3 CTA Buttons — Centered ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="max-w-md mx-auto space-y-3"
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

          {/* Bottom spacing */}
          <div className="h-12 md:h-16" />
        </div>
      </div>
    </div>
  );
}
