/**
 * Framer Motion Variants — Gincanas Corporate Design System
 * All animations follow "Smooth & Subtle" principle:
 * - easeOut curves (no springs/bounces)
 * - 20-30px translate for reveals
 * - 0.4-0.6s durations
 * - Staggered delays for group items
 */

/* ─── Fade In Up — Hero text, section headers ─── */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

/* ─── Fade In — Subtle opacity only ─── */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

/* ─── Slide In Left — Contact info panel ─── */
export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

/* ─── Slide In Right — Contact form panel ─── */
export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

/* ─── Stagger Container — Parent for staggered children ─── */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

/* ─── Stagger Item — Each child in a staggered group ─── */
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut' as const,
    },
  },
};

/* ─── Scale In — Counter stats, badges ─── */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

/* ─── Card Hover — Interactive state for cards ─── */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  hover: {
    y: -8,
    boxShadow: '0 8px 30px rgba(6, 78, 59, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

/* ─── Icon Hover — Scale 1.1 on card hover ─── */
export const iconHover = {
  rest: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  hover: { scale: 1.1, transition: { duration: 0.3, ease: 'easeOut' as const } },
};
