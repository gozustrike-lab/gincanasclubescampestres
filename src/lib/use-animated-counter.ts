'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * useAnimatedCounter — Counts from `from` to `to` over `duration` ms.
 * Only starts counting when `inView` is true (typically from useInView).
 * Uses requestAnimationFrame for smooth 60fps animation.
 * Returns the current displayed value and the suffix (appears after count completes).
 */
export function useAnimatedCounter(
  from: number,
  to: number,
  duration: number = 2500,
  inView: boolean = false,
) {
  const [value, setValue] = useState(from);
  const [suffixVisible, setSuffixVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    startTimeRef.current = null;
    setSuffixVisible(false);

    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

    function animate(timestamp: number) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const currentValue = from + (to - from) * easedProgress;

      setValue(Math.round(currentValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(to);
        setSuffixVisible(true);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [from, to, duration, inView]);

  return { value, suffixVisible };
}
