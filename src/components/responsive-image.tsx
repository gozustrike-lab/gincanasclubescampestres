'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ResponsiveImageProps {
  /** Desktop image path (e.g. /images/hero/desktop/hero-1.webp) */
  srcDesktop: string;
  /** Mobile image path (e.g. /images/hero/mobile/hero-m1.webp) */
  srcMobile: string;
  /** Alt text for accessibility and SEO */
  alt: string;
  /** Aspect ratio for layout: [width, height] */
  aspect: [number, number];
  /** Priority loading — use ONLY for Hero / above-fold images */
  priority?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom sizes attribute (default: responsive) */
  sizes?: string;
  /** CSS filter string (e.g. "contrast(1.05) brightness(0.95)") */
  filter?: string;
  /** Fill container instead of aspect ratio */
  fill?: boolean;
}

/**
 * ResponsiveImage — Ultra-HD component with:
 * - Separate srcset for Desktop (1920w) and Mobile (768w)
 * - Lazy loading by default (priority disables it for Hero)
 * - Vercel CDN optimization with AVIF > WebP fallback
 * - object-fit: cover for zero distortion
 * - Optional CSS filters for color grading
 */
export default function ResponsiveImage({
  srcDesktop,
  srcMobile,
  alt,
  aspect,
  priority = false,
  className = '',
  sizes,
  filter,
  fill = false,
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  const defaultSizes = fill
    ? '100vw'
    : '(min-width: 1024px) 100vw, (min-width: 768px) 90vw, 100vw';

  const filterStyle = filter
    ? { filter, transition: 'filter 0.3s ease' }
    : undefined;

  if (fill) {
    return (
      <picture className={`relative overflow-hidden ${className}`}>
        {/* Mobile source — served to screens < 768px */}
        <source
          media="(max-width: 767px)"
          srcSet={`${srcMobile}?w=768&q=85 768w`}
          type="image/webp"
        />
        {/* Desktop source — served to screens >= 768px */}
        <source
          media="(min-width: 768px)"
          srcSet={`${srcDesktop}?w=1920&q=90 1344w, ${srcDesktop}?w=2560&q=90 1920w`}
          type="image/webp"
        />
        {/* Fallback — AVIF preferred via Next.js config */}
        <Image
          src={srcDesktop}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || defaultSizes}
          quality={90}
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={filterStyle}
        />
      </picture>
    );
  }

  const [w, h] = aspect;

  return (
    <picture className={`relative overflow-hidden ${className}`}>
      {/* Mobile source — portrait, 768px wide */}
      <source
        media="(max-width: 767px)"
        srcSet={`${srcMobile}?w=800&q=85 800w`}
        type="image/webp"
      />
      {/* Desktop source — landscape, up to 1920px wide */}
      <source
        media="(min-width: 768px)"
        srcSet={`${srcDesktop}?w=1344&q=90 1344w, ${srcDesktop}?w=1920&q=90 1920w`}
        type="image/webp"
      />
      {/* Next.js Image — AVIF auto-served via config, object-fit: cover */}
      <Image
        src={srcDesktop}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes || defaultSizes}
        quality={90}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={filterStyle}
      />
    </picture>
  );
}
