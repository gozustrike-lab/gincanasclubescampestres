'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  MapPin, ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import { CLUBS } from '@/lib/clubs-data';

/* ═══════════════════════════════════════════════════════
   CLUBES SECTION — Full Immersive Cards Grid
   ═══════════════════════════════════════════════════════ */
export default function ClubesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const router = useRouter();

  return (
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
      <div className="pb-16 md:pb-24">
        <div className="flex flex-col gap-6 px-3.5 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-0 lg:grid-cols-3 xl:grid-cols-4 md:gap-5 container mx-auto">
          {CLUBS.map((club, i) => (
            <motion.div
              key={club.slug}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group cursor-pointer"
              onClick={() => router.push(`/clubes/${club.slug}`)}
            >
              {/* FULL CARD — Image-first immersive design */}
              <div
                className="relative w-full overflow-hidden border-b sm:border border-border/60 aspect-[16/10] sm:aspect-auto sm:h-[340px] md:h-[360px]"
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)', borderRadius: '14px' }}
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
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-5 md:p-5">
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
  );
}
