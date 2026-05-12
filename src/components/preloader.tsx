'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Preloader — Elite corporate brand reveal (0.6s hold + 0.4s exit = 1s total).
 * - Full-screen emerald background
 * - Centered "GINCANAS" logo text in white + gold accent
 * - Animated gold line that sweeps across
 * - Slide-up exit animation
 * - Body scroll locked while active
 */
export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll while preloader is visible
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#064e3b' }}
        >
          {/* Logo Text */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-wider text-white leading-none">
                GINCANAS
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mt-2">
                Clubes Campestres
              </p>
            </motion.div>

            {/* Gold Loading Line */}
            <div className="mt-6 w-32 h-px bg-white/10 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-full w-full"
                style={{ background: 'linear-gradient(90deg, transparent, #b4945c, transparent)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
