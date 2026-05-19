'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, MessageCircle, Bus, Building2,
  ArrowRight, ChevronRight, Home, CheckCircle2, Sparkles, X,
  ChevronLeft, Plus, Minus, RotateCcw, Maximize2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ClubData } from '@/lib/clubs-data';
import { WA_NUMBER } from '@/lib/whatsapp';
import { getAmenityIcon } from './amenity-icons';

/* ─── High-quality image URL builder (Next.js Image Optimization) ─── */
function getHdSrc(src: string): string {
  /* External URLs: use as-is */
  if (src.startsWith('http')) return src;
  /* Local images: route through Next.js optimizer at max quality */
  return `/_next/image?url=${encodeURIComponent(src)}&w=3840&q=95`;
}

/* ─── WhatsApp Message Builder ─── */
function encodeWa(text: string): string {
  return encodeURIComponent(text).replace(/%2A/g, '*');
}

function clubWaLink(club: ClubData, type: 'club' | 'transporte' | 'ambos') {
  const base = `Hola equipo *Gincanas Clubes Campestres* 👋`;
  const messages = {
    club: `${base}\n\nMe interesa cotizar el *${club.name}* 🏠\nUbicado en: *${club.location}*\n\nNecesito información sobre:\n📍 Disponibilidad de fechas\n📅 Capacidad para mi grupo\n💰 Tarifas y paquetes\n📋 Servicios incluidos\n\nQuedo atento a su respuesta. ¡Gracias!`,
    transporte: `${base}\n\nNecesito cotizar el servicio de *TRANSPORTE* para mi evento en el *${club.name}* 🚗\n\nDatos del traslado:\n📍 Punto de partida:\n📅 Fecha del evento:\n👥 Número de pasajeros:\n⏰ Hora de recojo preferida:\n\nQuedo atento a la cotización. ¡Gracias!`,
    ambos: `${base}\n\nQuisiera cotizar el *PAQUETE COMPLETO*: *${club.name}* + *TRANSPORTE* 🚀\n\nDetalles del evento:\n📍 Club: *${club.name}* (${club.location})\n📅 Fecha estimada:\n👥 Cantidad de personas:\n🏔️ Tipo de evento: Corporativo / Escolar / Social\n\nSolicito:\n✅ Cotización del club\n✅ Cotización del transporte\n✅ Itinerario sugerido\n\nQuedo atento. ¡Gracias!`,
  };
  return `https://wa.me/${WA_NUMBER}?text=${encodeWa(messages[type])}`;
}

/* ═══════════════════════════════════════════════════════
   PRO LIGHTBOX — Zoom · Pan · Landscape · Swipe
   ═══════════════════════════════════════════════════════ */

const SWIPE_THRESHOLD = 50;
const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DOUBLE_TAP_DELAY = 280;
const DOUBLE_TAP_ZOOM = 2.5;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/* Slide variants for navigation */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 280 : -280,
    opacity: 0,
    scale: 0.94,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -280 : 280,
    opacity: 0,
    scale: 0.94,
  }),
};

const slideTransition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 34,
  mass: 0.7,
};

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  /* ── Navigation ── */
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  /* ── Zoom / Pan ── */
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [smoothAnim, setSmoothAnim] = useState(false);

  /* ── Landscape mode ── */
  const [isLandscape, setIsLandscape] = useState(false);

  /* ── Refs ── */
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });
  const smoothTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Touch tracking */
  const pinchDist0 = useRef(0);
  const isPinching = useRef(false);
  const isPanning = useRef(false);
  const panPos0 = useRef({ x: 0, y: 0 });
  const panTrans0 = useRef({ x: 0, y: 0 });
  const swipeX0 = useRef(0);
  const swipeY0 = useRef(0);
  const touchMoved = useRef(false);
  const lastTapTime = useRef(0);
  const lastTapPos = useRef({ x: 0, y: 0 });
  const gestureDone = useRef(false);

  /* Sync state → refs (for event handlers without stale closure) */
  scaleRef.current = scale;
  translateRef.current = translate;

  /* ── Lock body scroll ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isZoomedRef()) {
        if (e.key === 'ArrowRight') doNavigate(1);
        if (e.key === 'ArrowLeft') doNavigate(-1);
      }
      if (e.key === '+' || e.key === '=') doZoomIn();
      if (e.key === '-') doZoomOut();
      if (e.key === '0') doResetZoom();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const isZoomedRef = () => scaleRef.current > 1.02;

  /* ── Smooth animation helper ── */
  const animateSmooth = useCallback(() => {
    setSmoothAnim(true);
    if (smoothTimerRef.current) clearTimeout(smoothTimerRef.current);
    smoothTimerRef.current = setTimeout(() => setSmoothAnim(false), 280);
  }, []);

  /* ── Navigation ── */
  const doNavigate = useCallback((dir: number) => {
    setCurrent((c) => {
      const next = c + dir;
      if (next >= 0 && next < images.length) {
        setDirection(dir);
        /* Reset zoom on navigate */
        setScale(1);
        setTranslate({ x: 0, y: 0 });
        setIsZoomed(false);
        return next;
      }
      return c;
    });
  }, [images.length]);

  /* ── Zoom controls ── */
  const doResetZoom = useCallback(() => {
    animateSmooth();
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [animateSmooth]);

  const doZoomIn = useCallback(() => {
    animateSmooth();
    const ns = clamp(scaleRef.current * 1.35, MIN_SCALE, MAX_SCALE);
    setScale(ns);
    setIsZoomed(ns > 1.02);
    if (ns <= 1.02) setTranslate({ x: 0, y: 0 });
  }, [animateSmooth]);

  const doZoomOut = useCallback(() => {
    animateSmooth();
    const ns = clamp(scaleRef.current / 1.35, MIN_SCALE, MAX_SCALE);
    setScale(ns);
    setTranslate({ x: 0, y: 0 });
    setIsZoomed(ns > 1.02);
  }, [animateSmooth]);

  /* ── Double tap / click zoom ── */
  const handleDoubleTapZoom = useCallback(
    (clientX: number, clientY: number) => {
      if (scaleRef.current > 1.02) {
        doResetZoom();
        return;
      }
      const el = imgContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = clientX - rect.left - rect.width / 2;
      const my = clientY - rect.top - rect.height / 2;
      animateSmooth();
      setScale(DOUBLE_TAP_ZOOM);
      setTranslate({ x: -mx * (DOUBLE_TAP_ZOOM - 1), y: -my * (DOUBLE_TAP_ZOOM - 1) });
      setIsZoomed(true);
    },
    [animateSmooth, doResetZoom],
  );

  const handleImgDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      handleDoubleTapZoom(e.clientX, e.clientY);
    },
    [handleDoubleTapZoom],
  );

  /* ── Touch handlers ── */
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      gestureDone.current = false;
      touchMoved.current = false;

      if (e.touches.length === 2) {
        /* Pinch start */
        isPinching.current = true;
        isPanning.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchDist0.current = Math.hypot(dx, dy);
        return;
      }

      if (e.touches.length === 1) {
        if (isZoomedRef()) {
          /* Pan start */
          isPanning.current = true;
          panPos0.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          panTrans0.current = { ...translateRef.current };
        } else {
          /* Swipe start */
          swipeX0.current = e.touches[0].clientX;
          swipeY0.current = e.touches[0].clientY;
        }
      }
    },
    [], // uses refs only
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isPinching.current && e.touches.length === 2) {
        e.preventDefault();
        touchMoved.current = true;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / pinchDist0.current;
        const ns = clamp(scaleRef.current * ratio, MIN_SCALE, MAX_SCALE);
        setScale(ns);
        setIsZoomed(ns > 1.02);
        if (ns <= 1.02) setTranslate({ x: 0, y: 0 });
        pinchDist0.current = dist;
        return;
      }

      if (isPanning.current && e.touches.length === 1) {
        e.preventDefault();
        touchMoved.current = true;
        const dx = e.touches[0].clientX - panPos0.current.x;
        const dy = e.touches[0].clientY - panPos0.current.y;
        setTranslate({
          x: panTrans0.current.x + dx,
          y: panTrans0.current.y + dy,
        });
        return;
      }

      /* Swipe tracking (1 finger, not zoomed) */
      if (e.touches.length === 1 && !isZoomedRef()) {
        const dx = Math.abs(e.touches[0].clientX - swipeX0.current);
        const dy = Math.abs(e.touches[0].clientY - swipeY0.current);
        if (dx > 10 || dy > 10) touchMoved.current = true;
      }
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 0) {
        /* Double-tap detection */
        if (!isPinching.current && !isPanning.current && !touchMoved.current && !isZoomedRef()) {
          const now = Date.now();
          const cx = e.changedTouches[0].clientX;
          const cy = e.changedTouches[0].clientY;
          if (
            now - lastTapTime.current < DOUBLE_TAP_DELAY &&
            Math.abs(cx - lastTapPos.current.x) < 30 &&
            Math.abs(cy - lastTapPos.current.y) < 30
          ) {
            handleDoubleTapZoom(cx, cy);
            gestureDone.current = true;
            lastTapTime.current = 0;
            isPinching.current = false;
            isPanning.current = false;
            return;
          }
          lastTapTime.current = now;
          lastTapPos.current = { x: cx, y: cy };
        }

        /* Swipe detection (1 finger, not zoomed, moved horizontally) */
        if (!isPinching.current && !isPanning.current && touchMoved.current && !isZoomedRef()) {
          const dx = e.changedTouches[0].clientX - swipeX0.current;
          const dy = Math.abs(e.changedTouches[0].clientY - swipeY0.current);
          if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > dy) {
            doNavigate(dx < 0 ? 1 : -1);
            gestureDone.current = true;
          }
        }

        isPinching.current = false;
        isPanning.current = false;
      } else if (e.touches.length === 1) {
        /* Went from 2 fingers to 1 — stop pinch */
        isPinching.current = false;
        if (!isZoomedRef()) {
          swipeX0.current = e.touches[0].clientX;
          swipeY0.current = e.touches[0].clientY;
        }
      }
    },
    [handleDoubleTapZoom, doNavigate],
  );

  /* ── Mouse pan (desktop, when zoomed) ── */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isZoomedRef() && e.button === 0) {
        isPanning.current = true;
        gestureDone.current = false;
        panPos0.current = { x: e.clientX, y: e.clientY };
        panTrans0.current = { ...translateRef.current };
      }
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning.current) return;
      gestureDone.current = true;
      const dx = e.clientX - panPos0.current.x;
      const dy = e.clientY - panPos0.current.y;
      setTranslate({
        x: panTrans0.current.x + dx,
        y: panTrans0.current.y + dy,
      });
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  /* ── Wheel zoom (desktop) — zoom toward cursor ── */
  useEffect(() => {
    const el = imgContainerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const s = scaleRef.current;
      const t = translateRef.current;
      const factor = e.deltaY > 0 ? 0.88 : 1.14;
      const ns = clamp(s * factor, MIN_SCALE, MAX_SCALE);
      if (ns === s) return;

      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const ratio = ns / s;
      const ntx = mx - ratio * (mx - t.x);
      const nty = my - ratio * (my - t.y);

      setScale(ns);
      setTranslate({ x: ntx, y: nty });
      setIsZoomed(ns > 1.02);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  /* ── Landscape mode ── */
  const toggleLandscape = useCallback(async () => {
    if (!isLandscape) {
      try {
        const el = lightboxRef.current;
        if (el?.requestFullscreen) await el.requestFullscreen();
      } catch (_) { /* fullscreen not supported */ }
      try {
        if (screen.orientation?.lock) await screen.orientation.lock('landscape');
      } catch (_) { /* orientation lock not supported */ }
      setIsLandscape(true);
      doResetZoom();
    } else {
      try { screen.orientation?.unlock(); } catch (_) {}
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
      } catch (_) {}
      setIsLandscape(false);
    }
  }, [isLandscape, doResetZoom]);

  /* Listen for fullscreen exit (user presses Escape or OS button) */
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsLandscape(false);
        doResetZoom();
      }
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [doResetZoom]);

  /* ── Click-to-close (on backdrop, not after gesture) ── */
  const handleContainerClick = useCallback(() => {
    if (gestureDone.current) {
      gestureDone.current = false;
      return;
    }
    onClose();
  }, [onClose]);

  /* ── Derived ── */
  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;
  const showArrows = !isZoomed;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[99999] bg-black/95"
        style={{
          backdropFilter: 'blur(30px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(30px) saturate(1.3)',
        }}
      />

      {/* Full lightbox container (for fullscreen API) */}
      <motion.div
        ref={lightboxRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100000]"
        onClick={handleContainerClick}
        style={{
          backgroundColor: isLandscape ? '#000' : 'transparent',
        }}
      >
        {/* ── Top bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="fixed top-0 left-0 right-0 z-[100001] flex items-center justify-between px-4 py-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Counter pill */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/[0.08] rounded-full px-3.5 py-1.5">
            <span className="text-white/90 text-xs font-semibold tabular-nums">
              {current + 1}
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/50 text-xs tabular-nums">
              {images.length}
            </span>
          </div>

          {/* Zoom level indicator (when zoomed) */}
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/[0.08] rounded-full px-2.5 py-1"
              >
                <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
                <span className="text-white/80 text-[11px] font-semibold tabular-nums">
                  {Math.round(scale * 100)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-150 backdrop-blur-xl border border-white/[0.08] active:scale-90"
            aria-label="Cerrar"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* ── Navigation arrows (hidden when zoomed) ── */}
        <AnimatePresence>
          {showArrows && hasPrev && (
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); doNavigate(-1); }}
              className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[100002] w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.15] active:bg-white/[0.2] text-white/70 hover:text-white transition-all duration-150 backdrop-blur-xl border border-white/[0.06] active:scale-90"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showArrows && hasNext && (
            <motion.button
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={(e) => { e.stopPropagation(); doNavigate(1); }}
              className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[100002] w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.15] active:bg-white/[0.2] text-white/70 hover:text-white transition-all duration-150 backdrop-blur-xl border border-white/[0.06] active:scale-90"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── Zoomable image area ── */}
        <div
          ref={imgContainerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ touchAction: 'none' }}
        >
          <div className="w-full h-full flex items-center justify-center px-3 py-14 sm:px-8 sm:py-14 md:px-16 md:py-16">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={slideTransition}
                className="w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getHdSrc(images[current].src)}
                  alt={images[current].alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                  draggable={false}
                  onDoubleClick={handleImgDoubleClick}
                  style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    transition: smoothAnim
                      ? 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      : 'none',
                    cursor: isZoomed
                      ? isPanning.current
                        ? 'grabbing'
                        : 'grab'
                      : 'zoom-in',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom controls bar ── */}
        <div
          className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-[100001] flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/[0.06] rounded-full px-2.5 py-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isZoomedRef()) { doResetZoom(); }
                    setDirection(idx > current ? 1 : -1);
                    setCurrent(idx);
                  }}
                  className={`rounded-full transition-all duration-200 ${
                    idx === current
                      ? 'w-5 h-2 bg-white/90'
                      : 'w-2 h-2 bg-white/25 hover:bg-white/45'
                  }`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Zoom toolbar */}
          <div className="flex items-center gap-0.5 bg-black/40 backdrop-blur-xl border border-white/[0.06] rounded-full p-1">
            {/* Zoom out */}
            <button
              onClick={(e) => { e.stopPropagation(); doZoomOut(); }}
              disabled={scale <= MIN_SCALE + 0.01}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition-all duration-150 active:scale-90"
              aria-label="Alejar"
            >
              <Minus className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Reset zoom */}
            <button
              onClick={(e) => { e.stopPropagation(); doResetZoom(); }}
              disabled={scale <= MIN_SCALE + 0.01}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition-all duration-150 active:scale-90"
              aria-label="Restablecer zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            </button>

            {/* Zoom in */}
            <button
              onClick={(e) => { e.stopPropagation(); doZoomIn(); }}
              disabled={scale >= MAX_SCALE - 0.01}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition-all duration-150 active:scale-90"
              aria-label="Acercar"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-white/10 mx-0.5" />

            {/* Landscape mode */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleLandscape(); }}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 active:scale-90 ${
                isLandscape
                  ? 'text-gold bg-gold/15'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Modo horizontal"
            >
              <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Landscape hint overlay ── */}
        <AnimatePresence>
          {isLandscape && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100004] pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2 bg-black/60 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/[0.08]">
                <svg className="w-8 h-8 text-white/50 animate-[spin_1.5s_ease-in-out]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span className="text-white/60 text-xs font-medium">Gira tu dispositivo</span>
              </div>
              {/* Auto-dismiss via CSS animation */}
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  25% { transform: rotate(90deg); }
                  50% { transform: rotate(90deg); }
                  75% { transform: rotate(0deg); }
                  100% { transform: rotate(0deg); }
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Zoom usage hints (first 3s) ── */}
        <AnimatePresence>
          {!isZoomed && !isLandscape && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 0.7, 0.7, 0], y: [20, 0, 0, 20] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.5, times: [0, 0.1, 0.75, 1] }}
              className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-[100003] pointer-events-none"
            >
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-xl rounded-full px-4 py-2 border border-white/[0.06]">
                <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
                <span className="text-white/40 text-[11px]">
                  Doble toque para zoom &middot; Pellizca para acercar
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   CLUB DETAIL — Full-page immersive club page
   ═══════════════════════════════════════════════════════ */
export default function ClubDetail({ club }: { club: ClubData }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  /* All clickable images: hero + gallery */
  const allImages: { src: string; alt: string }[] = [
    { src: club.image, alt: club.name },
    ...(club.gallery || []).map((img, idx) => ({
      src: img,
      alt: `${club.name} — Galería ${idx + 1}`,
    })),
  ];

  const openLightbox = useCallback((index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0a1a14 0%, #022c22 40%, #011a12 100%)',
      }}
    >
      {/* ── Breadcrumb ── */}
      <div className="pt-[100px] sm:pt-[110px] md:pt-[120px]">
        <nav className="container mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-white/40"
          >
            <Link href="/" className="hover:text-gold transition-colors inline-flex items-center gap-1">
              <Home className="w-3 h-3" />
              Inicio
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/clubes" className="hover:text-gold transition-colors">
              Clubes
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{club.name}</span>
          </motion.div>
        </nav>
      </div>

      {/* ── Hero Image (clickable) ── */}
      <div
        className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden mt-4 cursor-zoom-in group"
        onClick={() => openLightbox(0)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient}`} />
        <Image
          src={club.image}
          alt={club.name}
          fill
          priority
          quality={90}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

        {/* Image count badge (if gallery exists) */}
        {allImages.length > 1 && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span className="text-white/80 text-[11px] font-medium">{allImages.length}</span>
          </div>
        )}

        {/* Club Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full mb-3">
              <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
              <span className="text-xs text-white/80 font-medium">{club.location}</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {club.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ── Gallery (if available) ── */}
      {club.gallery && club.gallery.length > 0 && (
        <div className="container mx-auto px-5 md:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 max-w-3xl mx-auto"
          >
            {club.gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl cursor-zoom-in group/img"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
                onClick={() => openLightbox(idx + 1)}
              >
                <div className="aspect-[16/10]">
                  <Image
                    src={img}
                    alt={`${club.name} — Galería ${idx + 1}`}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-300 group-hover/img:scale-[1.05]"
                    sizes="(max-width: 640px) 50vw, 400px"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Content Section ── */}
      <div className="container mx-auto px-5 md:px-8 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-white/70 text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-8"
          >
            {club.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mb-10 md:mb-14"
          >
            {club.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gold bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-full"
              >
                <span className="w-1 h-1 bg-gold rounded-full" />
                {f}
              </span>
            ))}
          </motion.div>

          {/* ── Incluido en el Ingreso ── */}
          {club.included && club.included.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="mb-8 md:mb-10"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#25D366]/15">
                  <CheckCircle2 className="w-[18px] h-[18px] text-[#25D366]" strokeWidth={2} />
                </div>
                <h2 className="font-heading font-bold text-base md:text-lg text-white">
                  Ingreso y Áreas Incluidas
                </h2>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 space-y-3">
                {club.included.map((item, idx) => {
                  const ItemIcon = getAmenityIcon(item);
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-xl bg-[#25D366]/10 border border-[#25D366]/15">
                        <ItemIcon className="w-[18px] h-[18px] text-[#25D366]" />
                      </div>
                      <span className="text-white/80 text-sm md:text-[0.95rem] leading-relaxed">{item}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Actividades Adicionales ── */}
          {club.extraActivities && club.extraActivities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="mb-10 md:mb-14"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gold/15">
                  <Sparkles className="w-[18px] h-[18px] text-gold" strokeWidth={2} />
                </div>
                <h2 className="font-heading font-bold text-base md:text-lg text-white">
                  Actividades Recreativas Adicionales
                </h2>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {club.extraActivities.map((item, idx) => {
                    const ItemIcon = getAmenityIcon(item);
                    return (
                      <div key={idx} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg bg-gold/10 border border-gold/15">
                          <ItemIcon className="w-4 h-4 text-gold" />
                        </div>
                        <span className="text-white/75 text-sm leading-snug">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── 3 CTA Buttons — Centered ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="max-w-sm mx-auto space-y-3"
          >
            {/* CTA 1: Cotizar Club */}
            <a
              href={clubWaLink(club, 'club')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Club
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>

            {/* CTA 2: Cotizar Transporte */}
            <a
              href={clubWaLink(club, 'transporte')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-[#064e3b] hover:bg-[#053d2e] text-white font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bus className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Transporte
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>

            {/* CTA 3: Cotizar Club + Transporte */}
            <a
              href={clubWaLink(club, 'ambos')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-[50px] md:h-[54px] bg-gold hover:bg-gold-dark text-emerald-dark font-semibold text-sm md:text-[0.95rem] transition-all duration-200 rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              Cotizar Club y Transporte
              <ArrowRight className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-12 md:h-16" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={allImages}
            startIndex={lightboxStartIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
