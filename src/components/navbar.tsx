'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onCotizar: () => void;
  onPortalSocios: () => void;
}

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Clubes', href: '/clubes' },
  { label: 'Paseos Escolares', href: '/paseos-escolares' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Navbar({ onCotizar, onPortalSocios }: NavbarProps) {
  const scrolled = true;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledState, setScrolledState] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledState(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolledState
          ? 'bg-emerald-dark/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-emerald-dark/80 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-heading font-extrabold text-xl md:text-2xl tracking-wide text-gold group-hover:text-gold-light transition-colors">
            GINCANAS
          </span>
          <span className="text-[10px] md:text-xs text-white/80 tracking-[0.2em] uppercase -mt-1">
            Clubes Campestres
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium tracking-wide px-3 py-2 rounded-lg transition-all duration-200',
                isActive(link.href)
                  ? 'text-gold bg-white/10'
                  : 'text-white/80 hover:text-gold hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'text-left text-lg font-medium transition-colors py-1',
                    isActive(link.href)
                      ? 'text-gold'
                      : 'text-white/90 hover:text-gold'
                  )}
                >
                  {link.label}
                </Link>
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
