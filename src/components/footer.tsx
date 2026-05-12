'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin,
  ArrowRight,
} from 'lucide-react';

interface FooterProps {
  onCotizar: () => void;
}

const quickLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Clubes', href: '/clubes' },
  { label: 'Paseos Escolares', href: '/paseos-escolares' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
];

const services = [
  'Eventos Corporativos',
  'Paseos Escolares',
  'Gincanas Profesionales',
  'Transporte Premium',
  'Catering',
  'Fotografía & Video',
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer({ onCotizar }: FooterProps) {
  return (
    <footer className="bg-emerald-dark text-white pb-[100px] md:pb-0">
      {/* Newsletter bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg">Suscríbase a nuestro Reporte de Tendencias en Eventos Corporativos</h3>
              <p className="text-sm text-white/60">Análisis trimestral del sector, mejores prácticas y novedades de nuestra red de clubes exclusivos.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="su@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 max-w-xs focus-visible:ring-gold/30"
              />
              <Button className="bg-gold hover:bg-gold-dark text-emerald-dark font-semibold flex-shrink-0 rounded" style={{ borderRadius: '4px' }}>
                <Mail className="h-4 w-4 mr-2" />
                Suscribir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <span className="font-heading font-extrabold text-2xl text-gold">GINCANAS</span>
              <p className="text-xs text-white/50 tracking-[0.2em] uppercase">Clubes Campestres</p>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4 mt-3">
              Referente en gestión de eventos de alto impacto para corporaciones y universidades de primer nivel en Perú.
              8 clubes exclusivos, 15+ años de trayectoria institucional.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition-colors group"
                >
                  <social.icon className="h-4 w-4 text-white/60 group-hover:text-gold transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide">Navegación</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide">Servicios</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/60 flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3 text-gold/40" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm mb-4 tracking-wide">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/60">+51 (01) 234-5678</p>
                  <p className="text-xs text-white/40">Lun-Vie 8:00-18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/60">contacto@gincanasclubescampestres.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/60">Av. Rivera Navarrete 1234</p>
                  <p className="text-xs text-white/40">San Isidro, Lima, Perú</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — credits + legal */}
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p>© {new Date().getFullYear()} Gincanas Clubes Campestres. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-white/60 transition-colors">Política de Privacidad</button>
            <button className="hover:text-white/60 transition-colors">Términos de Servicio</button>
          </div>
        </div>
      </div>

      {/* ═══ Sub-footer — FastPagePro Credits (BLINDADO / PERMANENTE) ═══ */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <p className="text-center md:text-right text-[11px] text-white/25">
            Diseñado y desarrollado por{' '}
            <a
              href="https://www.fastpagepro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-gold transition-colors duration-200 underline-offset-2 hover:underline"
            >
              FastPagePro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
