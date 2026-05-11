'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  FileText, Calendar, Download, Lock, Loader2,
  Building2, FolderOpen, ChevronRight
} from 'lucide-react';

interface PortalSociosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const documents = [
  { name: 'Contrato Marco 2025', type: 'PDF', size: '2.4 MB', icon: FileText },
  { name: 'Cronograma de Eventos 2026', type: 'PDF', size: '1.8 MB', icon: Calendar },
  { name: 'Protocolo de Seguridad', type: 'PDF', size: '3.1 MB', icon: Lock },
  { name: 'Ficha Técnica de Clubes', type: 'PDF', size: '5.2 MB', icon: FolderOpen },
  { name: 'Tarifario Actualizado', type: 'XLSX', size: '890 KB', icon: FileText },
  { name: 'Guía de Coordinación', type: 'PDF', size: '1.5 MB', icon: FileText },
];

const events = [
  { date: '15 Jul 2025', title: 'Jornada de Integración', club: 'Hacienda San Miguel', status: 'Confirmado' },
  { date: '22 Jul 2025', title: 'Paseo Escolar - Primaria', club: 'Villa Verde Premium', status: 'Pendiente' },
  { date: '05 Ago 2025', title: 'Team Building Ejecutivo', club: 'La Quintrala Resort', status: 'Confirmado' },
  { date: '18 Ago 2025', title: 'Gala Anual', club: 'El Encanto Eco', status: 'Planificado' },
  { date: '10 Sep 2025', title: 'Convivencia Universitaria', club: 'Rancho del Sol', status: 'Planificado' },
];

export default function PortalSocios({ open, onOpenChange }: PortalSociosProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instName, setInstName] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 1000);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setInstName('');
    setAccessCode('');
  };

  const handleClose = (open: boolean) => {
    if (!open) handleLogout();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {!loggedIn ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading font-bold text-xl text-emerald-dark flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gold" />
                Portal de Socios
              </DialogTitle>
            </DialogHeader>
            <div className="bg-emerald-light/30 rounded-xl p-4 mb-4 border border-emerald-deep/10">
              <p className="text-sm text-emerald-dark/70">
                Acceda al portal exclusivo para socios institucionales. Aquí encontrará documentación,
                cronogramas y recursos de su institución.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="portal-inst" className="text-sm font-medium text-emerald-dark mb-1.5 block">
                  Nombre de Institución
                </Label>
                <Input
                  id="portal-inst"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  placeholder="Colegio San Ignacio"
                  required
                />
              </div>
              <div>
                <Label htmlFor="portal-code" className="text-sm font-medium text-emerald-dark mb-1.5 block">
                  Código de Acceso
                </Label>
                <Input
                  id="portal-code"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-deep hover:bg-emerald-dark text-white font-semibold"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Ingresar al Portal'
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="font-heading font-bold text-xl text-emerald-dark flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gold" />
                    Portal de Socios
                  </DialogTitle>
                  <p className="text-sm text-corporate-text/50 mt-1">{instName || 'Institución'}</p>
                </div>
                <Badge className="bg-emerald-deep text-white">Activo</Badge>
              </div>
            </DialogHeader>

            <Tabs defaultValue="documents" className="mt-2">
              <TabsList className="w-full bg-corporate-gray">
                <TabsTrigger value="documents" className="flex-1 text-xs">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="events" className="flex-1 text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Eventos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-4">
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-emerald-light/20 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <doc.icon className="h-5 w-5 text-emerald-deep" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-emerald-dark truncate">{doc.name}</p>
                        <p className="text-xs text-corporate-text/40">{doc.type} • {doc.size}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-deep">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-4">
                <div className="space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.date + event.title}
                      className="flex items-start gap-3 p-3 rounded-xl border border-border hover:bg-emerald-light/20 transition-colors"
                    >
                      <div className="text-center flex-shrink-0 w-12">
                        <p className="text-xs text-corporate-text/40">{event.date.split(' ')[0]}</p>
                        <p className="text-lg font-bold text-emerald-dark">{event.date.split(' ')[1]}</p>
                        <p className="text-xs text-corporate-text/40">{event.date.split(' ')[2]}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-emerald-dark">{event.title}</p>
                        <p className="text-xs text-corporate-text/50">{event.club}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs flex-shrink-0 ${
                          event.status === 'Confirmado'
                            ? 'border-emerald-deep/30 text-emerald-deep bg-emerald-light/30'
                            : event.status === 'Pendiente'
                            ? 'border-gold/30 text-gold-dark bg-gold/5'
                            : 'border-border text-corporate-text/40'
                        }`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
