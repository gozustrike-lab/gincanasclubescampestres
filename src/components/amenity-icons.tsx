/* ═══════════════════════════════════════════════════════════════
   Amenity Icons — Inline SVG icons for club features
   Keyword-matched for auto-resolution from item text
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';

type IconProps = { className?: string };

/* ── Icon Components ─────────────────────────────────── */

const PoolIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 18c-1 0-1.5-.5-2-1s-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1v2c1 0 1.5.5 2 1s1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1v-2zM7 14h2c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm4-3h2c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1zm4-1h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1z"/>
  </svg>
);

const TreeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 14h5v8h6v-8h5L12 2z"/>
  </svg>
);

const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
  </svg>
);

const FerrisWheelIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.24 2 7 4.24 7 7c0 1.63.78 3.09 2 4.01V22h2v-4h2v4h2v-2h2v2h2v-2h-2v-4h-2v-3.01c.95-.65 1.68-1.56 2.06-2.62l1.94 1.12V9.63l-2.18 1.26C17.59 5.96 15.07 2 12 2zm0 2c1.86 0 3.41 1.28 3.86 3H8.14C8.59 5.28 10.14 4 12 4zm0 6a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z"/>
  </svg>
);

const CarouselIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/>
    <path d="M12 2L2 12h3l7-7 7 7h3L12 2z" opacity="0.3"/>
  </svg>
);

const SportsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.96 7.96 0 014 12c0-4.42 3.58-8 8-8zm0 16c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.96 7.96 0 0120 12c0 4.42-3.58 8-8 8z"/>
  </svg>
);

const SoccerBallIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2l2.4 1.2L12 7.6 9.6 5.2 12 4zm-6.5 3.5L8 9.4V12l-2.5 3L4 14c0-2.65 1.06-5.05 2.78-6.8l-.28.3zM5.5 17.4l2.2-1.4L9.6 18l-.4 2.2C7.5 19.3 6 18.5 5.5 17.4zM12 20l-1.6-1.6L12 16l1.6 2.4L12 20zm4.2-1.8l.4-2.2 1.9-2 2.2 1.4c-.5 1.1-2 2.7-4.5 2.8zm4.3-6.2L18 12V9.4l2.5-1.9c.9 1.3 1.5 2.9 1.5 4.6v.8l-1.5-.9z"/>
  </svg>
);

const GrillIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 8l-4 4h3l-4 4h-4l-4 4H3l8-8H8l4-4h4l4-4h5l-2 2h2l-2 2zm-7 2v4h2l-2-2v-2zm-4 0l-2 2h2v-2zm8 0l-2 2h2v-2z"/>
  </svg>
);

const CampfireIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const TentIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2zm0 4.2L18.5 20h-13L12 6.2z"/>
  </svg>
);

const TentModernIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 2H7v2h3v1.4L4 17h2l1-2h10l1 2h2L14 5.4V4h3V2zm-3 5l3.5 6h-7L14 7zM7 17l1 2h8l1-2H7z"/>
  </svg>
);

const RiverIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.1 0 2.14.22 3.09.62C13.84 5.5 13 7.14 13 9c0 .74.17 1.43.42 2.08C12.09 11.03 11 10 9.5 10c-1.65 0-3 1.35-3 3 0 .57.16 1.1.44 1.55-.58-.83-.94-1.83-.94-2.95 0-2.76 2.24-5 5-5 .57 0 1.12.1 1.63.28A4.98 4.98 0 0112 4z"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" opacity="0.3"/>
  </svg>
);

const WaveIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c-1 0-1.5-.5-2-1s-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1v-2c1 0 1.5.5 2 1s1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1v2zM2 18c1 0 1.5.5 2 1s1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1 1.5-.5 2-1 1-1 2-1 1.5.5 2 1 1 1 2 1v-2c-1 0-1.5-.5-2-1s-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1-1.5.5-2 1-1 1-2 1-1.5-.5-2-1-1-1-2-1v2z"/>
  </svg>
);

const FarmIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 9v1h2v10h6v-6h2v6h6V10h2V9l-9-7z"/>
    <path d="M4 2l2 3 2-3h-1l1-2h-2l1 2H4z" opacity="0"/>
  </svg>
);

const PettingZooIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 11.5C4.5 11.5 6 10 6 8c0-1.66-1.34-3-3-3S0 6.34 0 8c0 2 1.5 3.5 1.5 3.5S0 13 0 15c0 1.66 1.34 3 3 3s3-1.34 3-3c0-2-1.5-3.5-1.5-3.5z"/>
    <path d="M22.5 11.5C22.5 11.5 21 10 21 8c0-1.66 1.34-3 3-3s3 1.34 3 3c0 2-1.5 3.5-1.5 3.5S24 13 24 15c0 1.66-1.34 3-3 3s-3-1.34-3-3c0-2 1.5-3.5 1.5-3.5z" transform="translate(-18,0)"/>
    <rect x="8" y="3" width="8" height="18" rx="2" opacity="0.5"/>
  </svg>
);

const HotelIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
  </svg>
);

const BedIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 10V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33l.67 2h2l.67-2h8.67l.66 2h2l.67-2H23v-5c0-1.1-.9-2-2-2zm-9 0H5V7h7v3zm9 0h-7V7h7v3z"/>
  </svg>
);

const BoatIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
  </svg>
);

const AtvIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z"/>
    <circle cx="9" cy="14" r="2"/>
    <circle cx="15" cy="14" r="2"/>
    <path d="M9 8h6v3H9z"/>
  </svg>
);

const MotorcycleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.44 9.03L15 7V3h-2v4l-4.44 2.03c-.32.14-.56.46-.56.82v4.15c0 1.1.9 2 2 2h2.56c-.68.61-1.12 1.48-1.12 2.45C11.44 20.65 12.79 22 14.44 22s3-1.35 3-3c0-.97-.44-1.84-1.12-2.45H20c.55 0 1-.45 1-1v-4.15c0-.37-.24-.69-.56-.82zM8 12.45V11l3-1.35v3.8H8.44c.34-.32.56-.77.56-1.3v-.7zM12 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-3v-2h6v2h-6z"/>
    <circle cx="16" cy="18" r="1.5"/>
  </svg>
);

const HorseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 3l-3 1.5L16 2l-4 3v3l-2 1-1 4 2 2v2l-3 4h2l3-3 3 3h2l-3-5 2-3h1l2 3 1 4h2l-1-5-2-4 1-4 3-2V3z"/>
    <circle cx="18" cy="4.5" r="1"/>
  </svg>
);

const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
  </svg>
);

const ZipLineIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 16v-2l-4-4 1-5c.1-.4-.1-.8-.4-1.1-.4-.3-.8-.3-1.2-.1L9 7l-3 2H3v2h3.5l2-1.3L7 14l-3 2v2h2l3.5-2.3L14 16h6zM7.5 17L11 14l-2-4 3 2 .5-2.5 2 2L7.5 17z"/>
  </svg>
);

const SpinningIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c.83 0 1.63.13 2.38.36l-3.58 6.2L6.6 5.72A7.95 7.95 0 0112 4zm-7 8c0-.95.18-1.86.5-2.7L9 13.5 5 17.6A7.94 7.94 0 015 12zm7 8c-1.4 0-2.7-.36-3.84-1l4.84-3.5 3 5.04A7.9 7.9 0 0112 20zm6.3-3.4L14 13l4-6.9c.63 1.17 1 2.51 1 3.9 0 2.6-1.24 4.9-3.16 6.36z"/>
  </svg>
);

const RideIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.09 3.41L13 5h-2l.09.41L12 2zm-1 5h2l3 9h-2.5L12 11l-1.5 5H8l3-9zm-5 4l-2 6h2l1-3h2.5l-.67-2H7l.5-1h.5zm12 0l2 6h-2l-1-3h-2.5l.67-2H17l-.5-1h-.5z"/>
  </svg>
);

const ToboganIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 3l2 4h2l-1.5-4H4zm4 0l2 4h2l-1.5-4H8zm12 2l-4 8H8l-2 4h2l1-2h6l1.5 2h2.2l-2.1-2.8L20 7l-2 4-2.5-4H20zm-8 4l2 4h2l-2-4h-2z"/>
  </svg>
);

const SlideIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h2v18H3V3zm4 0l10 9-10 9V3z" transform="rotate(0)"/>
  </svg>
);

const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const DefaultIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const CanchaIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PlaygroundIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 20h20v-2H2v2zm4-6l2-4h8l2 4H6zm2-6l2-6h4l2 6H8z"/>
  </svg>
);

const PawIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 11.5C4.5 11.5 6 10 6 8c0-1.1-.9-2-2-2s-2 .9-2 2c0 2 1.5 3.5 1.5 3.5S2 13 2 15c0 1.1.9 2 2 2s2-.9 2-2c0-2-1.5-3.5-1.5-3.5z"/>
    <path d="M12 9.5c0 0 1.5-1.5 1.5-3.5S12.6 4 11.5 4 10 4.9 10 6s1.5 3.5 1.5 3.5S10 11 10 13s.9 2 2 2 1.5-.9 1.5-2c0-2-1.5-3.5-1.5-3.5z"/>
    <path d="M19.5 11.5c0 0-1.5-1.5-1.5-3.5s.9-2 2-2 1.5.9 1.5 2c0 2-1.5 3.5-1.5 3.5S22 13 22 15s-.9 2-2 2-1.5-.9-1.5-2c0-2 1.5-3.5 1.5-3.5z"/>
    <ellipse cx="8" cy="16" rx="2" ry="3"/>
    <ellipse cx="16" cy="16" rx="2" ry="3"/>
  </svg>
);

const AnimalIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm15 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 6a3 3 0 100 6 3 3 0 000-6zM2 17c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v2c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-2z"/>
    <path d="M7 11v3h10v-3H7z" opacity="0.5"/>
  </svg>
);

const WaterSlideIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 2v3h4V2H5zm2 5L4 14l3 3h10l3-3L17 7H7zm0 2h8.5l2 4H8.5L9 9z"/>
    <path d="M2 21h20v-2H2v2z"/>
  </svg>
);

/* ── Keyword → Icon Mapping ─────────────────────────── */

interface IconMatch {
  keywords: string[];
  Icon: React.FC<IconProps>;
}

const ICON_MAP: IconMatch[] = [
  /* Piscinas / toboganes */
  { keywords: ['piscina', 'pool', 'natación', 'swim'], Icon: PoolIcon },
  { keywords: ['tobogán', 'tobogan', 'water slide', 'waterslide'], Icon: WaterSlideIcon },
  { keywords: ['deslizad', 'slide'], Icon: SlideIcon },

  /* Áreas verdes / naturaleza */
  { keywords: ['área verde', 'areas verde', 'áreas verde', 'zonas verde', 'bosque', 'árbol', 'arbol', 'jardín', 'jardin'], Icon: TreeIcon },
  { keywords: ['naturaleza', 'natural', 'entorno natural'], Icon: LeafIcon },

  /* Deportes */
  { keywords: ['deport', 'cancha', 'fútbol', 'futbol', 'baloncesto'], Icon: CanchaIcon },
  { keywords: ['juego', 'playground', 'juegos clás'], Icon: PlaygroundIcon },

  /* Mecánicos / atracciones */
  { keywords: ['mecánic', 'mecanic', 'tagada', 'atracción', 'feria', 'carrusel', 'carousel'], Icon: SpinningIcon },
  { keywords: ['norias', 'noria', 'ferris', 'rueda'], Icon: FerrisWheelIcon },

  /* Parrilla / BBQ */
  { keywords: ['parrilla', 'bbq', 'asado', 'grill', 'barbacoa'], Icon: GrillIcon },

  /* Campamento */
  { keywords: ['campament', 'camping', 'carpa', 'acampar', 'fogat'], Icon: CampfireIcon },
  { keywords: ['tienda', 'tent'], Icon: TentModernIcon },

  /* Río / agua */
  { keywords: ['río', 'rio', 'river', 'laguna', 'lago'], Icon: RiverIcon },
  { keywords: ['ola', 'wave'], Icon: WaveIcon },

  /* Granja / animales */
  { keywords: ['granja', 'minigranja', 'animal', 'petting', 'paw'], Icon: AnimalIcon },
  { keywords: ['caballo', 'horse', 'equin', 'paseo a caballo', 'paseos a caballo'], Icon: HorseIcon },

  /* Transporte / vehículos */
  { keywords: ['cuatrimot', 'atv', 'moto', 'quad'], Icon: AtvIcon },
  { keywords: ['bote', 'boat', 'barco', 'kayak', 'embarcaci'], Icon: BoatIcon },
  { keywords: ['canopy', 'tirolina', 'tirolesa', 'zip line'], Icon: ZipLineIcon },

  /* Hotel / hospedaje */
  { keywords: ['hotel', 'hostal', 'alojamiento', 'hospedaje'], Icon: HotelIcon },
  { keywords: ['cama', 'bed', 'dormitorio', 'habitaci'], Icon: BedIcon },

  /* Temporada / eventos */
  { keywords: ['temporada', 'estación', 'calendario', 'disponib', 'fecha'], Icon: CalendarIcon },
  { keywords: ['estacionamiento', 'parqueo', 'parking'], Icon: TentModernIcon },
  { keywords: ['salón', 'salon', 'evento', 'banquete', 'fiesta'], Icon: HotelIcon },
  { keywords: ['seguridad', 'guardia', 'vigilancia'], Icon: DefaultIcon },
  { keywords: ['logística', 'servicio', 'complet'], Icon: DefaultIcon },
  { keywords: ['descanso', 'relaj'], Icon: CampfireIcon },
  { keywords: ['campestre', 'campo', 'día de campo'], Icon: TreeIcon },
  { keywords: ['paseo', 'excursión'], Icon: LeafIcon },
  { keywords: ['integración', 'integracion', 'familiar', 'grupo'], Icon: SpinningIcon },
  { keywords: ['verde'], Icon: TreeIcon },
  { keywords: ['espectacular', 'espectáculo', 'show'], Icon: StarIcon },
];

/* ── Resolver ───────────────────────────────────────── */

export function getAmenityIcon(text: string): React.FC<IconProps> {
  const lower = text.toLowerCase();
  for (const match of ICON_MAP) {
    for (const kw of match.keywords) {
      if (lower.includes(kw)) return match.Icon;
    }
  }
  return DefaultIcon;
}
