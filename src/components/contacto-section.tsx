'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, Loader2,
  Building2, CheckCircle2, Star, Crown, Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function calculateLeadScore(data: {
  institution: string;
  participants: number;
  eventType: string;
}): { score: number; tier: string; tierLabel: string } {
  let score = 0;

  // Institution type scoring
  const instLower = data.institution.toLowerCase();
  if (instLower.includes('universidad') || instLower.includes('university')) score += 35;
  else if (instLower.includes('corporación') || instLower.includes('corporativo') || instLower.includes('empresa')) score += 40;
  else if (instLower.includes('colegio') || instLower.includes('escuela') || instLower.includes('school')) score += 30;
  else if (instLower.includes('banco') || instLower.includes('minera') || instLower.includes('telecom')) score += 45;
  else score += 15;

  // Participants scoring
  if (data.participants >= 300) score += 30;
  else if (data.participants >= 100) score += 20;
  else if (data.participants >= 50) score += 15;
  else score += 5;

  // Event type scoring
  const eventLower = data.eventType.toLowerCase();
  if (eventLower.includes('corporativo') || eventLower.includes('team')) score += 25;
  else if (eventLower.includes('escolar') || eventLower.includes('paseo')) score += 20;
  else if (eventLower.includes('universitario')) score += 22;
  else if (eventLower.includes('gala') || eventLower.includes('privado')) score += 28;
  else score += 10;

  // Cap at 100
  score = Math.min(score, 100);

  let tier: string, tierLabel: string;
  if (score >= 75) { tier = 'platino'; tierLabel = 'Lead Platino'; }
  else if (score >= 50) { tier = 'oro'; tierLabel = 'Lead Oro'; }
  else if (score >= 30) { tier = 'plata'; tierLabel = 'Lead Plata'; }
  else { tier = 'bronce'; tierLabel = 'Lead Bronce'; }

  return { score, tier, tierLabel };
}

const contactInfo = [
  { icon: Phone, label: 'Llámanos', value: '+51 (01) 234-5678', sub: 'Lun-Vie 8:00-18:00' },
  { icon: Mail, label: 'Escríbenos', value: 'contacto@gincanasclubescampestres.com', sub: 'Respuesta en 24h' },
  { icon: MapPin, label: 'Visítanos', value: 'Av. Rivera Navarrete 1234, San Isidro', sub: 'Lima, Perú' },
  { icon: Clock, label: 'Horario', value: 'Lunes a Viernes: 8:00 - 18:00', sub: 'Sábados: 9:00 - 13:00' },
];

export default function ContactoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadResult, setLeadResult] = useState<{ score: number; tier: string; tierLabel: string } | null>(null);

  const [form, setForm] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    eventType: '',
    participants: '',
    dateRange: '',
    message: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const scoreResult = calculateLeadScore({
      institution: form.institution,
      participants: parseInt(form.participants) || 0,
      eventType: form.eventType,
    });
    setLeadResult(scoreResult);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          participants: parseInt(form.participants) || 0,
          score: scoreResult.score,
          tier: scoreResult.tier,
        }),
      });
    } catch {
      // Silently handle - still show result
    }

    setLoading(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: '', institution: '', email: '', phone: '', eventType: '', participants: '', dateRange: '', message: '' });
    setSubmitted(false);
    setLeadResult(null);
  };

  const tierIcon = leadResult?.tier === 'platino' ? Crown : leadResult?.tier === 'oro' ? Star : Award;
  const TierIcon = tierIcon || Award;

  return (
    <section id="contacto" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Business Lounge
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            Conectemos — <span className="text-gold">Hablemos de su Evento</span>
          </h2>
          <p className="text-corporate-text/70 text-lg">
            Nuestro equipo ejecutivo está listo para diseñar la experiencia perfecta
            para su institución. Complete el formulario y recibirá una respuesta personalizada en 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="h-5 w-5 text-emerald-deep" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-emerald-dark">{info.label}</h4>
                  <p className="text-sm text-corporate-text/80">{info.value}</p>
                  <p className="text-xs text-corporate-text/40">{info.sub}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="bg-corporate-gray rounded-2xl h-48 flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-emerald-deep/30 mx-auto mb-2" />
                <p className="text-sm text-corporate-text/40">San Isidro, Lima, Perú</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-corporate-gray/30 rounded-2xl p-6 md:p-8 border border-border space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Dr. Juan Pérez"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Institución / Empresa *
                    </Label>
                    <Input
                      id="institution"
                      required
                      value={form.institution}
                      onChange={(e) => updateField('institution', e.target.value)}
                      placeholder="Corporación ABC S.A.C."
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Email Corporativo *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="juan@corporacion.com"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+51 999 888 777"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventType" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Tipo de Evento *
                    </Label>
                    <Select value={form.eventType} onValueChange={(v) => updateField('eventType', v)} required>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                        <SelectItem value="team-building">Team Building</SelectItem>
                        <SelectItem value="gala">Gala / Ceremonia</SelectItem>
                        <SelectItem value="escolar">Paseo Escolar</SelectItem>
                        <SelectItem value="universitario">Evento Universitario</SelectItem>
                        <SelectItem value="gincana">Gincana Profesional</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="participants" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                      Participantes Estimados *
                    </Label>
                    <Input
                      id="participants"
                      type="number"
                      min="1"
                      required
                      value={form.participants}
                      onChange={(e) => updateField('participants', e.target.value)}
                      placeholder="150"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateRange" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                    Rango de Fechas Preferido
                  </Label>
                  <Input
                    id="dateRange"
                    value={form.dateRange}
                    onChange={(e) => updateField('dateRange', e.target.value)}
                    placeholder="15-20 de Julio 2025"
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-emerald-dark font-medium mb-1.5 block text-sm">
                    Mensaje / Detalles Adicionales
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Cuéntenos más sobre su evento, objetivos especiales, requisitos..."
                    className="bg-white min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-deep hover:bg-emerald-dark text-white font-bold text-base py-5 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Solicitud
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="bg-corporate-gray/30 rounded-2xl p-6 md:p-8 border border-border text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-emerald-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-deep" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-emerald-dark mb-2">
                    ¡Solicitud Enviada!
                  </h3>
                  <p className="text-corporate-text/60 mb-6">
                    Nuestro equipo ejecutivo revisará su solicitud y se contactará en un plazo máximo de 24 horas.
                  </p>

                  {leadResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-xl p-6 border border-border inline-block mb-6"
                    >
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <TierIcon className="h-8 w-8 text-gold" />
                        <div>
                          <p className="text-xs text-corporate-text/40">Su clasificación</p>
                          <p className="font-heading font-bold text-xl text-emerald-dark">
                            {leadResult.tierLabel}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-corporate-gray rounded-full h-2.5 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${leadResult.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gold h-2.5 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-corporate-text/40">
                        Puntuación: {leadResult.score}/100
                      </p>
                    </motion.div>
                  )}

                  <Button variant="outline" onClick={resetForm} className="border-emerald-deep text-emerald-dark">
                    Enviar Otra Solicitud
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
