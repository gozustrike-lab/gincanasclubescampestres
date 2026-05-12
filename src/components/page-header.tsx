'use client';

import Link from 'next/link';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  breadcrumbHref?: string;
}

export default function PageHeader({
  badge,
  title,
  description,
  breadcrumbLabel,
  breadcrumbHref = '/',
}: PageHeaderProps) {
  return (
    <section className="page-header-mini relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 page-header-bg" />
      <div className="absolute inset-0 page-header-overlay" />

      {/* Content — vertically centered within mini-hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6">
        {/* Badge pill */}
        <span className="inline-flex items-center gap-2 bg-white/[0.10] backdrop-blur-sm border border-white/[0.08] text-gold font-medium text-xs md:text-sm mb-3 md:mb-4 px-3.5 py-1.5">
          {badge}
        </span>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-[1.5rem] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-2 md:mb-3 max-w-3xl">
          {title}
        </h1>

        {/* Description — hidden on very small screens */}
        <p className="hidden sm:block text-white/55 text-sm md:text-base max-w-xl mb-3 md:mb-4 leading-relaxed">
          {description}
        </p>

        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-1.5 text-[0.7rem] md:text-[0.8rem] text-white/50">
          <Link href={breadcrumbHref} className="hover:text-gold/80 transition-colors">
            Inicio
          </Link>
          <svg
            className="w-3 h-3 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gold/70">{breadcrumbLabel}</span>
        </nav>
      </div>

      {/* Bottom curve — subtle separator */}
      <div className="absolute bottom-0 left-0 right-0 page-header-curve-bar" />
    </section>
  );
}
