'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, ShieldCheck, ClipboardList, CalendarCheck,
  ClipboardCheck, Star, ChevronLeft, ChevronRight, Quote,
  BookOpen, Bus, Users, Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const focusAreas = [
  {
    icon: GraduationCap,
    title: 'Formación Integral',
    desc: 'Actividades diseñadas para complementar el currículo académico, fomentando habilidades blandas, trabajo en equipo y liderazgo.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad Garantizada',
    desc: 'Protocolos de seguridad certificados, personal médico en sitio, seguros de viaje y coordinación con autoridades locales.',
  },
  {
    icon: ClipboardList,
    title: 'Logística Completa',
    desc: 'Transporte premium, alimentación, materiales educativos y coordinación con docentes. Nosotros nos encargamos de todo.',
  },
];

const processSteps = [
  { icon: CalendarCheck, step: '01', title: 'Planificación', desc: 'Coordinamos con la institución los objetivos pedagógicos, fechas, presupuesto y preferencias de actividades.' },
  { icon: ClipboardCheck, step: '02', title: 'Coordinación', desc: 'Gestionamos logistics, permisos, transporte, alimentación y preparamos todo el material necesario.' },
  { icon: Star, step: '03', title: 'Ejecución', desc: 'Nuestro equipo de coordinadores acompaña la experiencia completa, asegurando la calidad en cada detalle.' },
  { icon: BookOpen, step: '04', title: 'Evaluación', desc: 'Entregamos un reporte detallado con fotos, evaluación de actividades y recomendaciones para futuros paseos.' },
];

const testimonials = [
  {
    text: 'Gincanas transformó nuestros paseos escolares en experiencias educativas inolvidables. La seguridad y organización son impecables.',
    author: 'Dra. María Elena Torres',
    role: 'Directora, Colegio San Ignacio',
  },
  {
    text: 'El programa de formación integral que ofrecen es excepcional. Nuestros estudiantes vuelven motivados y con nuevas habilidades.',
    author: 'Mg. Carlos Ramos',
    role: 'Coordinador Académico, Universidad Peruana de Ciencias',
  },
  {
    text: 'La logística impecable nos permite a los docentes enfocarnos en lo pedagógico. Confiamos plenamente en su equipo.',
    author: 'Lic. Ana María Gutiérrez',
    role: 'Coordinadora de Tutoría, Colegio Villa María',
  },
];

const faqs = [
  {
    q: '¿Cuáles son las medidas de seguridad durante los paseos?',
    a: 'Contamos con protocolos de seguridad certificados ISO 9001, personal médico en cada evento, seguros de viaje para todos los participantes, radios de comunicación, y coordinación previa con autoridades locales del destino.',
  },
  {
    q: '¿Qué incluye el servicio de paseos escolares?',
    a: 'Nuestro servicio incluye: transporte premium con asientos de seguridad, alimentación completa (desayuno, almuerzo, refrigerios), materiales didácticos, coordinadores especializados, kit de emergencia, y reporte fotográfico post-evento.',
  },
  {
    q: '¿Cuál es el número mínimo y máximo de estudiantes?',
    a: 'Trabajamos con grupos desde 30 estudiantes hasta 500+. Para grupos grandes, implementamos un sistema de subgrupos con coordinadores dedicados para asegurar la calidad de la experiencia.',
  },
  {
    q: '¿Los paseos se adaptan al currículo escolar?',
    a: 'Sí, cada paseo es diseñado en coordinación con el equipo pedagógico de la institución. Alineamos las actividades con los objetivos curriculares y áreas de desarrollo de los estudiantes.',
  },
  {
    q: '¿Qué destinos ofrecen para paseos escolares?',
    a: 'Operamos en nuestros 8 clubes campestres y en destinos naturales seleccionados: Chosica, Cieneguilla, Chaclacayo, Valle Sagrado del Cusco, Ica, entre otros. Cada destino ofrece actividades específicas según la edad y objetivos del grupo.',
  },
];

const paseoStats = [
  { value: '120+', label: 'Colegios Atendidos', icon: GraduationCap },
  { value: '25,000+', label: 'Estudiantes Participantes', icon: Users },
  { value: '100%', label: 'Registro de Seguridad', icon: ShieldCheck },
  { value: '4.9/5', label: 'Calificación Promedio', icon: Heart },
];

export default function PaseosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="paseos" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Programa Educativo
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            Programa Académico de{' '}
            <span className="text-gold">Paseos Escolares</span>
          </h2>
          <p className="text-corporate-text/70 text-lg">
            Experiencias educativas transformadoras que complementan el currículo escolar
            con actividades diseñadas por pedagogos profesionales en entornos naturales excepcionales.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {paseoStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="text-center bg-emerald-light/30 rounded-xl p-4 md:p-5"
            >
              <stat.icon className="h-6 w-6 text-emerald-deep mx-auto mb-2" />
              <div className="font-heading font-bold text-2xl md:text-3xl text-emerald-dark">{stat.value}</div>
              <div className="text-xs md:text-sm text-corporate-text/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Focus Areas */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="card-premium bg-white rounded-2xl p-6 md:p-8 border border-border"
            >
              <div className="w-14 h-14 bg-emerald-light rounded-xl flex items-center justify-center mb-5">
                <area.icon className="h-7 w-7 text-emerald-deep" />
              </div>
              <h3 className="font-heading font-bold text-xl text-emerald-dark mb-3">{area.title}</h3>
              <p className="text-corporate-text/70 leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-2xl text-center text-emerald-dark mb-10">
            Nuestro Proceso de 4 Etapas
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative text-center"
              >
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 to-transparent" />
                )}
                <div className="w-20 h-20 bg-emerald-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="h-9 w-9 text-gold" />
                </div>
                <div className="text-xs font-bold text-gold mb-2 tracking-wider">ETAPA {step.step}</div>
                <h4 className="font-heading font-bold text-lg text-emerald-dark mb-2">{step.title}</h4>
                <p className="text-sm text-corporate-text/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-2xl text-center text-emerald-dark mb-10">
            Lo Que Dicen las Instituciones
          </h3>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-emerald-light/20 border-emerald-deep/5">
              <CardContent className="p-6 md:p-8">
                <Quote className="h-8 w-8 text-gold/30 mb-4" />
                <p className="text-corporate-text/80 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-deep rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {testimonials[currentTestimonial].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-emerald-dark">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-xs text-corporate-text/50">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-emerald-deep/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial ? 'bg-emerald-deep w-6' : 'bg-emerald-deep/20'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-emerald-deep/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-center text-emerald-dark mb-10">
            Preguntas Frecuentes
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-4 data-[state=open]:border-emerald-deep/20 data-[state=open]:bg-emerald-light/20 transition-all"
              >
                <AccordionTrigger className="font-heading font-semibold text-left text-emerald-dark hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-corporate-text/70 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
