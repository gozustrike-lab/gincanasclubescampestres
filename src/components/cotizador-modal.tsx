'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, GraduationCap, School, Users, ChevronRight,
  ChevronLeft, Check, Loader2, Calculator
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface CotizadorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const eventTypes = [
  { value: 'corporativo', label: 'Evento Corporativo', icon: Building2, basePrice: 35 },
  { value: 'escolar', label: 'Paseo Escolar', icon: School, basePrice: 25 },
  { value: 'universitario', label: 'Evento Universitario', icon: GraduationCap, basePrice: 30 },
  { value: 'privado', label: 'Evento Privado / Gala', icon: Users, basePrice: 45 },
];

const clubs = [
  { id: 'hacienda', name: 'Hacienda San Miguel', multiplier: 1.2 },
  { id: 'villa-verde', name: 'Villa Verde Premium', multiplier: 1.3 },
  { id: 'rancho-sol', name: 'Rancho del Sol', multiplier: 1.1 },
  { id: 'encanto', name: 'El Encanto Eco', multiplier: 1.15 },
  { id: 'la-quintrala', name: 'La Quintrala Resort', multiplier: 1.4 },
  { id: 'campestre-sur', name: 'Campestre del Sur', multiplier: 1.0 },
  { id: 'paraiso', name: 'Paraiso Andino', multiplier: 1.35 },
  { id: 'oasis', name: 'El Oasis del Valle', multiplier: 1.05 },
];

const additionalServices = [
  { id: 'transport', label: 'Transporte Premium', price: 15, desc: 'Bus turístico de lujo' },
  { id: 'catering', label: 'Catering Completo', price: 25, desc: 'Menú ejecutivo + refrigerios' },
  { id: 'gincanas', label: 'Gincana Profesional', price: 20, desc: 'Coordinador + materiales' },
  { id: 'photography', label: 'Cobertura Fotográfica', price: 12, desc: 'Fotógrafo profesional + edición' },
  { id: 'av', label: 'Audio & Video', price: 8, desc: 'Equipo de sonido + pantallas' },
];

export default function CotizadorModal({ open, onOpenChange }: CotizadorModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{
    basePrice: number;
    serviceFees: number;
    volumeDiscount: number;
    total: number;
    tier: string;
  } | null>(null);

  const [eventType, setEventType] = useState('');
  const [participants, setParticipants] = useState('');
  const [clubId, setClubId] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculateQuote = async () => {
    setLoading(true);
    const et = eventTypes.find((e) => e.value === eventType);
    const club = clubs.find((c) => c.id === clubId);
    const numParticipants = parseInt(participants) || 0;
    const basePrice = (et?.basePrice || 30) * numParticipants;
    const clubMultiplier = club?.multiplier || 1.0;

    let serviceFees = 0;
    selectedServices.forEach((sId) => {
      const svc = additionalServices.find((s) => s.id === sId);
      if (svc) serviceFees += svc.price * numParticipants;
    });

    const subtotal = basePrice * clubMultiplier + serviceFees;
    const volumeDiscount = numParticipants >= 300 ? 0.15 : numParticipants >= 200 ? 0.12 : numParticipants >= 100 ? 0.1 : 0;
    const discountAmount = subtotal * volumeDiscount;
    const total = subtotal - discountAmount;

    const tier = total >= 20000 ? 'Enterprise' : total >= 10000 ? 'Premium' : total >= 5000 ? 'Standard' : 'Básico';

    const result = {
      basePrice: Math.round(basePrice * clubMultiplier),
      serviceFees: Math.round(serviceFees),
      volumeDiscount: Math.round(discountAmount),
      total: Math.round(total),
      tier,
    };

    setQuoteResult(result);
    setLoading(false);
    setStep(5);
  };

  const reset = () => {
    setStep(1);
    setEventType('');
    setParticipants('');
    setClubId('');
    setSelectedServices([]);
    setQuoteResult(null);
  };

  const handleClose = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-heading font-bold text-xl text-emerald-dark flex items-center gap-2">
            <Calculator className="h-5 w-5 text-gold" />
            Cotizador de Eventos
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-2">
          <Progress value={progress} className="h-1.5 bg-corporate-gray" />
          <p className="text-xs text-corporate-text/40 mt-1">Paso {step} de {totalSteps}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="px-6 pb-6 pt-2"
          >
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-emerald-dark mb-4">
                  Tipo de Evento
                </h3>
                <div className="space-y-2">
                  {eventTypes.map((et) => (
                    <button
                      key={et.value}
                      onClick={() => setEventType(et.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        eventType === et.value
                          ? 'border-emerald-deep bg-emerald-light/30'
                          : 'border-border hover:border-emerald-deep/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        eventType === et.value ? 'bg-emerald-deep' : 'bg-corporate-gray'
                      }`}>
                        <et.icon className={`h-5 w-5 ${eventType === et.value ? 'text-white' : 'text-corporate-text/40'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-emerald-dark text-sm">{et.label}</p>
                        <p className="text-xs text-corporate-text/40">Desde S/ {et.basePrice} por persona</p>
                      </div>
                      {eventType === et.value && <Check className="h-5 w-5 text-emerald-deep" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-emerald-dark mb-2">
                  Número de Participantes
                </h3>
                <p className="text-sm text-corporate-text/50 mb-4">
                  Descuentos automáticos: 100+ personas (10%), 200+ (12%), 300+ (15%)
                </p>
                <div className="space-y-3">
                  {[
                    { label: '30-99 personas', value: '50' },
                    { label: '100-199 personas', value: '150', discount: '10%' },
                    { label: '200-299 personas', value: '250', discount: '12%' },
                    { label: '300+ personas', value: '350', discount: '15%' },
                    { label: 'Personalizado', value: 'custom' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setParticipants(opt.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        participants === opt.value
                          ? 'border-emerald-deep bg-emerald-light/30'
                          : 'border-border hover:border-emerald-deep/30'
                      }`}
                    >
                      <span className="font-medium text-sm text-emerald-dark">{opt.label}</span>
                      <div className="flex items-center gap-2">
                        {opt.discount && (
                          <Badge className="bg-gold text-emerald-dark text-xs">-{opt.discount}</Badge>
                        )}
                        {participants === opt.value && <Check className="h-5 w-5 text-emerald-deep" />}
                      </div>
                    </button>
                  ))}
                </div>
                {participants === 'custom' && (
                  <div className="mt-3">
                    <Label className="text-sm mb-1.5 block">Especificar cantidad:</Label>
                    <Input
                      type="number"
                      min="1"
                      value={participants === 'custom' ? '' : participants}
                      onChange={(e) => setParticipants(e.target.value || 'custom')}
                      placeholder="Número exacto de participantes"
                    />
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-emerald-dark mb-4">
                  Club Preferido
                </h3>
                <Select value={clubId} onValueChange={setClubId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un club..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club.id} value={club.id}>
                        {club.name} — Factor ×{club.multiplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-corporate-text/40">
                  El factor multiplicador refleja la exclusividad y amenidades del club.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-emerald-dark mb-4">
                  Servicios Adicionales
                </h3>
                <div className="space-y-3">
                  {additionalServices.map((svc) => (
                    <div
                      key={svc.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedServices.includes(svc.id)
                          ? 'border-emerald-deep bg-emerald-light/30'
                          : 'border-border hover:border-emerald-deep/30'
                      }`}
                      onClick={() => toggleService(svc.id)}
                    >
                      <Checkbox
                        checked={selectedServices.includes(svc.id)}
                        onCheckedChange={() => toggleService(svc.id)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-emerald-dark">{svc.label}</p>
                        <p className="text-xs text-corporate-text/40">{svc.desc}</p>
                      </div>
                      <Badge variant="outline" className="text-xs border-gold/30 text-gold-dark">
                        S/ {svc.price}/p
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-corporate-text/40 text-center">
                  Precio por participante. No es obligatorio seleccionar servicios adicionales.
                </p>
              </div>
            )}

            {step === 5 && quoteResult && (
              <div className="space-y-5">
                <div className="text-center mb-2">
                  <h3 className="font-heading font-bold text-xl text-emerald-dark">Resumen de Cotización</h3>
                  <Badge className="mt-2 bg-emerald-deep text-white">{quoteResult.tier}</Badge>
                </div>

                <div className="bg-corporate-gray/50 rounded-xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-corporate-text/60">Precio base (club + evento)</span>
                    <span className="font-semibold text-emerald-dark">S/ {quoteResult.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-corporate-text/60">Servicios adicionales</span>
                    <span className="font-semibold text-emerald-dark">S/ {quoteResult.serviceFees.toLocaleString()}</span>
                  </div>
                  {quoteResult.volumeDiscount > 0 && (
                    <div className="flex justify-between text-sm text-gold-dark">
                      <span>Descuento por volumen</span>
                      <span className="font-semibold">- S/ {quoteResult.volumeDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-heading font-bold text-emerald-dark">Total Estimado</span>
                    <span className="font-heading font-bold text-2xl text-emerald-dark">
                      S/ {quoteResult.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-corporate-text/40 text-center">
                  * Esta es una estimación. El precio final puede variar según detalles específicos del evento.
                  Un ejecutivo se contactará con usted para confirmar la cotización exacta.
                </p>

                <Button
                  onClick={handleClose.bind(null, false)}
                  className="w-full bg-gold hover:bg-gold-dark text-emerald-dark font-bold"
                >
                  Solicitar Cotización Formal
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 5 && (
          <div className="flex items-center justify-between px-6 pb-6">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-corporate-text/60"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
            </Button>
            <Button
              onClick={() => {
                if (step === 4) calculateQuote();
                else setStep(step + 1);
              }}
              disabled={
                (step === 1 && !eventType) ||
                (step === 2 && !participants) ||
                (step === 3 && !clubId) ||
                loading
              }
              className="bg-emerald-deep hover:bg-emerald-dark text-white font-semibold"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : step === 4 ? (
                'Calcular'
              ) : (
                'Siguiente'
              )}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
