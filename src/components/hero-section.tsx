'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Users, MapPin, Clock, Award } from 'lucide-react';

interface HeroSectionProps {
  onCotizar: () => void;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-white">
      {count}{suffix}
    </div>
  );
}

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Eventos Exitosos' },
  { icon: MapPin, value: 8, suffix: '', label: 'Clubes Élite' },
  { icon: Clock, value: 15, suffix: '+', label: 'Años de Experiencia' },
  { icon: Award, value: 98, suffix: '%', label: 'Satisfacción' },
];

export default function HeroSection({ onCotizar }: HeroSectionProps) {
  const scrollToClubes = () => {
    const el = document.getElementById('clubes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image + Gradient Overlay — Priority: loaded immediately */}
      <Image
        src="/images/hero-bg.webp"
        alt="Vista aérea de club campestres exclusivo con piscinas y áreas de eventos rodeadas de vegetación verde"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-emerald-gradient opacity-85" />
      <div className="absolute inset-0 hero-pattern" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-deep/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/40 rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gold/30 rounded-full" />
      <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 bg-gold/20 rounded-full" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              onClick={onCotizar}
              size="lg"
              className="bg-gold hover:bg-gold-dark text-emerald-dark font-bold text-base px-8 py-6 rounded-lg shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-105"
            >
              Solicitar Cotización
            </Button>
            <Button
              onClick={scrollToClubes}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300"
            >
              Explorar Clubes
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon className="h-5 w-5 text-gold mb-1" />
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <span className="text-sm text-white/60 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
