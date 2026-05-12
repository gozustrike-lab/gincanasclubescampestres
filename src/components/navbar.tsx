'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─── Responsive breakpoints ─── */
const NAVBAR_HEIGHT_DESKTOP = 70;
const NAVBAR_HEIGHT_TABLET = 70;
const NAVBAR_HEIGHT_MOBILE = 76;
const NAVBAR_HEIGHT_MOBILE_SCROLLED = 60;
const SCROLL_THRESHOLD = 50;

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Clubes', href: '/clubes' },
  { label: 'Paseos Escolares', href: '/paseos-escolares' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
];

interface NavbarProps {
  onCotizar: () => void;
  onPortalSocios: () => void;
}

/* ─── Easing: cubic-bezier(0.4, 0, 0.2, 1) ─── */
const SLIDE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const SLIDE_DURATION = 0.4;
const OVERLAY_DURATION = 0.35;

export default function Navbar({ onCotizar, onPortalSocios }: NavbarProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  /* ─── Scroll detection ─── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* Escape key closes drawer */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  /*
    BACKGROUND LOGIC:
    • Home + not scrolled  → fully transparent (image shows through)
    • Home + scrolled       → solid emerald with blur + shadow
    • Subpages (not home)   → ALWAYS solid (never transparent)
  */
  const isTransparent = isHome && !scrolled;
  const isSolid = !isHome || scrolled;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          NAVBAR — Dynamic, Responsive, Pixel-Perfect
          ═══════════════════════════════════════════════════════ */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] navbar-main',
          /* Universal transition for all state changes */
          'transition-all duration-[400ms] ease-in-out',
        )}
        style={{
          height: scrolled
            ? `${NAVBAR_HEIGHT_MOBILE_SCROLLED}px`
            : `${NAVBAR_HEIGHT_MOBILE}px`,
        }}
      >
        {/* ── Background layer ── */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-[400ms] ease-in-out',
            isTransparent
              ? 'bg-transparent'
              : 'navbar-solid-bg',
          )}
        />

        <nav
          className="relative max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between w-full h-full"
        >
          {/* ── Logo — scale 0.9 on scroll ── */}
          <Link href="/" className="flex flex-col items-start group flex-shrink-0 z-10 transition-transform duration-[400ms] ease-in-out"
            style={{
              transform: scrolled ? 'scale(0.9)' : 'scale(1)',
              transformOrigin: 'left center',
            }}
          >
            <span className={cn(
              'font-heading font-extrabold text-lg md:text-2xl tracking-wide leading-none transition-colors duration-[400ms]',
              isTransparent ? 'text-white' : 'text-gold',
            )}>
              GINCANAS
            </span>
            <span className={cn(
              'text-[9px] md:text-[10px] tracking-[0.22em] uppercase leading-none mt-0.5 transition-colors duration-[400ms]',
              isTransparent ? 'text-white/70' : 'text-white/60',
            )}>
              Clubes Campestres
            </span>
          </Link>

          {/* ═══ Desktop Navigation (>1024px) ═══ */}
          <div className="hidden lg:flex items-center" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[13px] font-medium tracking-wide px-1 py-2 transition-all duration-200',
                  isActive(link.href)
                    ? isTransparent
                      ? 'text-gold'
                      : 'text-gold'
                    : isTransparent
                      ? 'text-white/90 hover:text-gold'
                      : 'text-white/75 hover:text-gold',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ═══ Tablet CTAs (768px – 1024px): Portal + Cotizar only ═══ */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <button
              onClick={onPortalSocios}
              className="text-[13px] hover:text-gold transition-colors duration-200 font-medium"
              style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.75)' }}
            >
              Portal Socios
            </button>
            <button
              onClick={onCotizar}
              className={cn(
                'btn-corporate font-semibold text-[13px] px-5 transition-all duration-200',
                isActive('/cotizar') ? 'bg-gold text-emerald-dark' : '',
              )}
              style={{
                borderRadius: '4px',
                background: '#b4945c',
                color: '#022c22',
              }}
            >
              Cotizar Ahora
            </button>
          </div>

          {/* ═══ Desktop CTAs (>1024px): Portal + Cotizar ═══ */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onPortalSocios}
              className={cn(
                'text-[13px] font-medium transition-colors duration-200',
                isTransparent ? 'text-white/75 hover:text-gold' : 'text-white/75 hover:text-gold',
              )}
            >
              Portal Socios
            </button>
            <button
              onClick={onCotizar}
              className="btn-corporate bg-gold hover:bg-gold-dark text-emerald-dark font-semibold text-[13px] px-5 transition-all duration-200"
              style={{ borderRadius: '4px' }}
            >
              Cotizar Ahora
            </button>
          </div>

          {/* ═══ Mobile Hamburger (<768px) ═══ */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={cn(
              'md:hidden w-11 h-11 flex items-center justify-center z-10 rounded-lg transition-colors duration-200',
              isTransparent ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10',
            )}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" strokeWidth={1.8} />
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════
          OFF-CANVAS DRAWER — Full-Screen Panel
          ═══════════════════════════════════════════════════════ */}

      {/* Backdrop: blur(8px) + dark overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: OVERLAY_DURATION, ease: SLIDE_EASE }}
            className="fixed inset-0 z-[1001] bg-black/50"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={closeDrawer}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer Panel — slide-in from right */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: SLIDE_DURATION,
              ease: SLIDE_EASE,
            }}
            className="fixed top-0 right-0 bottom-0 z-[1002] w-[88vw] max-w-[380px] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 40%, #0d1f17 100%)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* ── Drawer Header ── */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-white/[0.06]">
              <Link href="/" onClick={closeDrawer} className="flex flex-col items-start">
                <span className="font-heading font-extrabold text-xl text-gold leading-none tracking-wide">
                  GINCANAS
                </span>
                <span className="text-[9px] text-white/40 tracking-[0.22em] uppercase mt-0.5">
                  Clubes Campestres
                </span>
              </Link>
              <button
                onClick={closeDrawer}
                className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/[0.06] active:scale-95"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* ── Nav Links ── */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              <nav className="flex flex-col">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className={cn(
                      'group flex items-center px-4 h-[56px] text-[1.05rem] font-bold tracking-[0.01em] transition-all duration-200 rounded-xl mx-1',
                      isActive(link.href)
                        ? 'text-gold bg-white/[0.04]'
                        : 'text-white/85 hover:text-gold hover:bg-white/[0.03]'
                    )}
                  >
                    <span className="relative">
                      {link.label}
                      {isActive(link.href) && (
                        <motion.span
                          layoutId="drawer-active-indicator"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gold/60 rounded-full"
                          transition={{ duration: 0.3, ease: SLIDE_EASE }}
                        />
                      )}
                    </span>
                    {isActive(link.href) && (
                      <ArrowRight className="ml-auto w-4 h-4 text-gold/60" strokeWidth={2} />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── Drawer Footer / CTA Zone ── */}
            <div className="px-5 pb-7 pt-4 space-y-3 border-t border-white/[0.06]">
              {/* VIP — Portal Socios */}
              <button
                onClick={() => { onPortalSocios(); closeDrawer(); }}
                className="w-full flex items-center justify-center gap-2.5 h-[50px] text-white/70 hover:text-gold text-[0.9rem] font-semibold transition-all duration-200 border border-white/[0.08] rounded-xl hover:border-white/[0.15] hover:bg-white/[0.03] active:scale-[0.98]"
              >
                <Lock className="w-4 h-4" strokeWidth={1.8} />
                Portal Socios
              </button>

              {/* Primary CTA — Gold pill */}
              <button
                onClick={() => { onCotizar(); closeDrawer(); }}
                className="w-full flex items-center justify-center gap-2 h-[54px] bg-gold hover:bg-gold-light text-emerald-dark font-bold text-[0.95rem] transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-gold/30 active:scale-[0.98]"
                style={{ borderRadius: '9999px' }}
              >
                Cotizar Ahora
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/51921451844?text=%C2%A1Hola!%20Vengo%20de%20la%20web%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20la%20*GESTI%C3%93N%20DE%20EVENTOS%20DE%20ALTO%20IMPACTO*.%20Por%20favor%2C%20%C2%BFpodr%C3%ADan%20enviarme%20su%20cat%C3%A1logo%20de%20clubs%20exclusivos%3F%20Gracias."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 h-[50px] text-white/60 hover:text-white text-[0.85rem] font-medium transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                Hablar con un Ejecutivo de Cuentas
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
