'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trophy, Bus, UtensilsCrossed, Camera, Music,
  Target, Zap, Users, ArrowRight, CheckCircle2,
  Palette, Route
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Trophy,
    title: 'Gincanas Profesionales',
    tagline: 'Team Building & Experiencias Corporativas',
    description:
      'Diseñamos gincanas temáticas de alto impacto que fortalecen los vínculos entre equipos, fomentan el liderazgo y generan experiencias memorables para su organización.',
    features: [
      'Team Building personalizado por sector',
      'Gincanas de competencia corporativa',
      'Eventos de integración con gamificación',
      'Dinámicas de liderazgo y creatividad',
      'Coordinadores profesionales especializados',
    ],
    extras: [
      { icon: Target, label: 'Objetivos Medibles' },
      { icon: Palette, label: 'Temáticas Personalizadas' },
      { icon: Camera, label: 'Cobertura Fotográfica' },
    ],
    color: 'emerald',
    gradient: 'from-emerald-deep to-emerald-deep/80',
  },
  {
    icon: Bus,
    title: 'Flota de Transporte Turístico de Lujo',
    tagline: 'Movilidad Premium con Seguridad Integral',
    description:
      'Nuestra flota de buses turísticos de última generación garantiza comodidad, seguridad y estilo en cada traslado. Conductores profesionales y seguros de viaje completos.',
    features: [
      'Buses premium con aire acondicionado',
      'Conductores profesionales certificados',
      'Seguro de pasajeros completo',
      'GPS y monitoreo en tiempo real',
      'Asientos reclinables y entretenimiento',
    ],
    extras: [
      { icon: Route, label: 'Rutas Optimizadas' },
      { icon: Users, label: 'Hasta 50 Pasajeros' },
      { icon: Zap, label: 'Disponibilidad 24/7' },
    ],
    color: 'gold',
    gradient: 'from-gold to-gold/80',
  },
];

const ecosystem = [
  { icon: Trophy, label: 'Gincanas', pos: 'top' },
  { icon: Bus, label: 'Transporte', pos: 'right' },
  { icon: UtensilsCrossed, label: 'Catering', pos: 'bottom' },
  { icon: Camera, label: 'Fotografía', pos: 'left' },
  { icon: Music, label: 'Audio/Video', pos: 'top' },
  { icon: CheckCircle2, label: 'Coordinación', pos: 'right' },
];

export default function ServiciosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicios" className="py-20 md:py-28 bg-corporate-gray" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Servicios Complementarios
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            El Ecosistema de Servicios{' '}
            <span className="text-gold">Gincanas</span>
          </h2>
          <p className="text-corporate-text/70 text-lg">
            Más allá de nuestros clubes, ofrecemos un ecosistema integral de servicios
            que convierte cada evento en una experiencia completa y sin preocupaciones.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
            >
              <Card className="card-premium overflow-hidden border border-border h-full">
                <div className={`h-3 bg-gradient-to-r ${service.gradient}`} />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      service.color === 'emerald' ? 'bg-emerald-light' : 'bg-gold/10'
                    }`}>
                      <service.icon className={`h-7 w-7 ${
                        service.color === 'emerald' ? 'text-emerald-deep' : 'text-gold-dark'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-emerald-dark">
                        {service.title}
                      </h3>
                      <p className="text-sm text-corporate-text/50">{service.tagline}</p>
                    </div>
                  </div>

                  <p className="text-corporate-text/70 leading-relaxed mb-6">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-deep mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-corporate-text/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.extras.map((extra) => (
                      <Badge
                        key={extra.label}
                        variant="outline"
                        className={`text-xs ${
                          service.color === 'emerald'
                            ? 'border-emerald-deep/20 text-emerald-dark/70 bg-emerald-light/20'
                            : 'border-gold/30 text-gold-dark bg-gold/5'
                        }`}
                      >
                        <extra.icon className="h-3 w-3 mr-1" />
                        {extra.label}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className={`w-full font-semibold ${
                      service.color === 'emerald'
                        ? 'border-emerald-deep text-emerald-dark hover:bg-emerald-deep hover:text-white'
                        : 'border-gold text-gold-dark hover:bg-gold hover:text-emerald-dark'
                    }`}
                  >
                    Solicitar Información <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <h3 className="font-heading font-bold text-xl text-center text-emerald-dark mb-8">
            Ecosistema Integrado
          </h3>
          <div className="relative">
            {/* Center */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-emerald-dark rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-deep/20 rotate-0">
                <Trophy className="h-10 w-10 text-gold" />
              </div>
            </div>
            {/* Surrounding services */}
            <div className="grid grid-cols-3 gap-3">
              {ecosystem.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl p-3 text-center border border-border card-premium"
                >
                  <item.icon className="h-5 w-5 text-emerald-deep mx-auto mb-1" />
                  <span className="text-xs font-medium text-corporate-text/70">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-corporate-text/40 mt-4">
              Todos los servicios se conectan para una experiencia sin fricciones
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
