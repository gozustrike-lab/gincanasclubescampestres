'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, Loader2,
  CheckCircle2, Star, Crown, Award, Shield
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
  const instLower = data.institution.toLowerCase();
  if (instLower.includes('universidad') || instLower.includes('university')) score += 35;
  else if (instLower.includes('corporación') || instLower.includes('corporativo') || instLower.includes('empresa')) score += 40;
  else if (instLower.includes('colegio') || instLower.includes('escuela') || instLower.includes('school')) score += 30;
  else if (instLower.includes('banco') || instLower.includes('minera') || instLower.includes('telecom')) score += 45;
  else score += 15;
  if (data.participants >= 300) score += 30;
  else if (data.participants >= 100) score += 20;
  else if (data.participants >= 50) score += 15;
  else score += 5;
  const eventLower = data.eventType.toLowerCase();
  if (eventLower.includes('corporativo') || eventLower.includes('team')) score += 25;
  else if (eventLower.includes('escolar') || eventLower.includes('paseo')) score += 20;
  else if (eventLower.includes('universitario')) score += 22;
  else if (eventLower.includes('gala') || eventLower.includes('privado')) score += 28;
  else score += 10;
  score = Math.min(score, 100);
  let tier: string, tierLabel: string;
  if (score >= 75) { tier = 'platino'; tierLabel = 'Lead Platino'; }
  else if (score >= 50) { tier = 'oro'; tierLabel = 'Lead Oro'; }
  else if (score >= 30) { tier = 'plata'; tierLabel = 'Lead Plata'; }
  else { tier = 'bronce'; tierLabel = 'Lead Bronce'; }
  return { score, tier, tierLabel };
}

const contactInfo = [
  { icon: Phone, label: 'Llámanos', value: '+51 921 451 844', sub: 'WhatsApp y llamadas' },
  { icon: Mail, label: 'Escríbenos', value: 'contacto@gincanasclubescampestres.com', sub: 'Respuesta en 24h' },
  { icon: MapPin, label: 'Visítanos', value: 'Av. Rivera Navarrete 1234, San Isidro', sub: 'Lima, Perú' },
  { icon: Clock, label: 'Horario', value: 'Lunes a Viernes: 8:00 - 18:00', sub: 'Sábados: 9:00 - 13:00' },
];

export default function ContactoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadResult, setLeadResult] = useState<{ score: number; tier: string; tierLabel: string } | null>(null);

  const [form, setForm] = useState({
    name: '', institution: '', email: '', phone: '',
    eventType: '', participants: '', dateRange: '', message: '',
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
        body: JSON.stringify({ ...form, participants: parseInt(form.participants) || 0, score: scoreResult.score, tier: scoreResult.tier }),
      });
    } catch { /* silently handle */ }
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
    <section id="contacto" className="py-16 md:py-24 bg-corporate-gray" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Business Lounge
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            Conectemos — <span className="text-gold">Hablemos de su Evento</span>
          </h2>
          <p className="text-corporate-text/70 text-base md:text-lg">
            Nuestro equipo ejecutivo está listo para diseñar la experiencia perfecta
            para su institución. Complete el formulario y recibirá una respuesta personalizada en 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-3 md:gap-4 bg-white rounded-2xl p-4 border border-border/50"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                <div className="w-10 h-10 bg-emerald-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="h-4.5 w-4.5 text-emerald-deep" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-xs md:text-sm text-emerald-dark">{info.label}</h4>
                  <p className="text-xs md:text-sm text-corporate-text/80 truncate">{info.value}</p>
                  <p className="text-[10px] md:text-xs text-corporate-text/40">{info.sub}</p>
                </div>
              </div>
            ))}

            {/* Map — Interactive Luxury placeholder */}
            <div
              className="w-full rounded-2xl overflow-hidden border border-border/50"
              style={{ height: '250px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            >
              <div className="w-full h-full bg-emerald-light/30 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(180,148,92,0.12)' }}>
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-sm text-emerald-dark">San Isidro, Lima, Perú</p>
                  <p className="text-xs text-corporate-text/40 mt-0.5">Av. Rivera Navarrete 1234, Oficina 501</p>
                </div>
                <a
                  href="https://maps.google.com/?q=-12.0981,-77.0334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-gold hover:text-gold-dark transition-colors underline underline-offset-2"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form — Premium Card Design */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-5 md:p-6 border border-border/50 pb-8 space-y-4"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="name" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="name" required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Dr. Juan Pérez"
                      className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Institución / Empresa *
                    </Label>
                    <Input
                      id="institution" required
                      value={form.institution}
                      onChange={(e) => updateField('institution', e.target.value)}
                      placeholder="Universidad Nacional Mayor de San Marcos"
                      className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="email" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Email Corporativo *
                    </Label>
                    <Input
                      id="email" type="email" required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="juan.perez@unmsm.edu.pe"
                      className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+51 921 451 844"
                      className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="eventType" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Tipo de Evento *
                    </Label>
                    <Select value={form.eventType} onValueChange={(v) => updateField('eventType', v)} required>
                      <SelectTrigger className="bg-corporate-gray border-border/60 h-11 md:h-12 text-sm">
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
                    <Label htmlFor="participants" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                      Participantes Estimados *
                    </Label>
                    <Input
                      id="participants" type="number" min="1" required
                      value={form.participants}
                      onChange={(e) => updateField('participants', e.target.value)}
                      placeholder="150"
                      className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateRange" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                    Rango de Fechas Preferido
                  </Label>
                  <Input
                    id="dateRange"
                    value={form.dateRange}
                    onChange={(e) => updateField('dateRange', e.target.value)}
                    placeholder="15-20 de Julio 2025"
                    className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 h-11 md:h-12 text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-emerald-dark font-medium mb-1 block text-xs md:text-sm">
                    Mensaje / Detalles Adicionales
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Cuéntenos más sobre su evento, objetivos especiales, requisitos de catering o transporte..."
                    className="bg-corporate-gray border-border/60 focus:border-gold focus:ring-gold/20 min-h-[100px] text-sm"
                  />
                </div>

                {/* Submit Button — Full width, emerald, bold */}
                <Button
                  type="submit" disabled={loading}
                  className="w-full bg-emerald-deep hover:bg-emerald-dark text-white font-bold text-sm md:text-base py-5 transition-all duration-300"
                  style={{ borderRadius: '12px' }}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Procesando...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" /> Enviar Solicitud</>
                  )}
                </Button>

                {/* Data Protection Notice */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-corporate-text/35">
                  <Shield className="h-3 w-3" />
                  Sus datos están protegidos. No compartimos información con terceros.
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 text-center" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
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
                  <p className="text-corporate-text/60 mb-6 text-sm md:text-base">
                    Nuestro equipo ejecutivo revisará su solicitud y se contactará en un plazo máximo de 24 horas.
                  </p>

                  {leadResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-corporate-gray rounded-xl p-5 md:p-6 inline-block mb-6 w-full max-w-xs mx-auto"
                    >
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <TierIcon className="h-8 w-8 text-gold" />
                        <div className="text-left">
                          <p className="text-[10px] text-corporate-text/40">Su clasificación</p>
                          <p className="font-heading font-bold text-lg text-emerald-dark">{leadResult.tierLabel}</p>
                        </div>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${leadResult.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gold h-2 rounded-full"
                        />
                      </div>
                      <p className="text-[10px] text-corporate-text/40">Puntuación: {leadResult.score}/100</p>
                    </motion.div>
                  )}

                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-emerald-deep text-emerald-dark hover:bg-emerald-light"
                    style={{ borderRadius: '12px' }}
                  >
                    Enviar Otra Solicitud
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Extra bottom margin so WhatsApp FAB doesn't cover last form element */}
        <div className="h-20 md:h-4" />
      </div>
    </section>
  );
}
