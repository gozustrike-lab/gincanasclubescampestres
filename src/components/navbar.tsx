'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

interface NavbarProps {
  onCotizar: () => void;
  onPortalSocios: () => void;
}

const navLinks = [
  { label: 'Inicio', href: 'inicio' },
  { label: 'Nosotros', href: 'nosotros' },
  { label: 'Clubes', href: 'clubes' },
  { label: 'Paseos Escolares', href: 'paseos' },
  { label: 'Servicios', href: 'servicios' },
  { label: 'Contacto', href: 'contacto' },
];

export default function Navbar({ onCotizar, onPortalSocios }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-emerald-dark/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('inicio')}
          className="flex flex-col items-start"
        >
          <span className="font-heading font-extrabold text-xl md:text-2xl tracking-wide text-gold">
            GINCANAS
          </span>
          <span className="text-[10px] md:text-xs text-white/80 tracking-[0.2em] uppercase -mt-1">
            Clubes Campestres
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/80 hover:text-gold transition-colors duration-200 font-medium tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onPortalSocios}
            className="text-sm text-white/80 hover:text-gold transition-colors duration-200 font-medium"
          >
            Portal Socios
          </button>
          <Button
            onClick={onCotizar}
            className="bg-gold hover:bg-gold-dark text-emerald-dark font-semibold text-sm px-5 transition-all duration-200"
          >
            Cotizar Ahora
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-emerald-dark border-emerald-deep">
            <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              <div className="mb-4">
                <span className="font-heading font-extrabold text-2xl text-gold">GINCANAS</span>
                <p className="text-xs text-white/60 tracking-[0.2em] uppercase">Clubes Campestres</p>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-lg text-white/90 hover:text-gold transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <button
                  onClick={() => { onPortalSocios(); setMobileOpen(false); }}
                  className="text-left text-white/80 hover:text-gold transition-colors font-medium"
                >
                  Portal Socios
                </button>
                <Button
                  onClick={() => { onCotizar(); setMobileOpen(false); }}
                  className="bg-gold hover:bg-gold-dark text-emerald-dark font-semibold w-full"
                >
                  Cotizar Ahora
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
