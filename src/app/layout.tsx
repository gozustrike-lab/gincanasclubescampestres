import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SiteLayout from "@/components/site-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Gincanas Clubes Campestres — Gestión de Eventos de Alto Impacto",
    template: "%s — Gincanas Clubes Campestres",
  },
  description:
    "Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres exclusivos. Seguridad, logística integral y experiencias inolvidables para corporativos, universidades y colegios.",
  keywords: [
    "Gincanas",
    "Clubes Campestres",
    "Eventos Corporativos",
    "Paseos Escolares",
    "Team Building",
    "Gincanas Profesionales",
    "Transporte Turístico",
    "Perú",
    "Lima",
    "Chosica",
    "Cieneguilla",
    "Eventos Empresariales",
    "Integración Corporativa",
    "Paseo Escolar Lima",
  ],
  authors: [{ name: "Gincanas Clubes Campestres" }],
  icons: {
    icon: "/images/logo-icon.webp",
    apple: "/images/logo-icon.webp",
  },
  openGraph: {
    title: "Gincanas Clubes Campestres | Eventos para Instituciones Élite",
    description:
      "Logística y eventos premium en los 8 clubes campestres más exclusivos de Lima.",
    url: "https://gincanasclubescampestres.com",
    siteName: "Gincanas Clubes Campestres",
    type: "website",
    locale: "es_PE",
    images: [
      {
        url: "/og-gincanas.png",
        width: 1200,
        height: 630,
        alt: "Gincanas Clubes Campestres — Eventos de Alto Impacto",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gincanas Clubes Campestres | Eventos para Instituciones Élite",
    description:
      "Logística y eventos premium en los 8 clubes campestres más exclusivos de Lima.",
    images: ["/og-gincanas.png"],
  },
  alternates: {
    canonical: "https://gincanasclubescampestres.com",
  },
  metadataBase: new URL("https://gincanasclubescampestres.com"),
};

/* ─── JSON-LD Structured Data ─── */

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gincanas Clubes Campestres",
  url: "https://gincanasclubescampestres.com",
  logo: "https://gincanasclubescampestres.com/images/logo-icon.webp",
  description:
    "Empresa líder en gestión de eventos de alto impacto con 8 clubes campestres exclusivos en Perú.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Rivera Navarrete 1234",
    addressLocality: "Lima",
    addressRegion: "Lima",
    postalCode: "15023",
    addressCountry: "PE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51-921-451-844",
    contactType: "sales",
    availableLanguage: ["Spanish"],
    areaServed: "PE",
  },
  sameAs: [
    "https://www.facebook.com/gincanasclubescampestres",
    "https://www.instagram.com/gincanasclubescampestres",
    "https://www.linkedin.com/company/gincanasclubescampestres",
  ],
  foundingDate: "2009",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 20, maxValue: 50 },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://gincanasclubescampestres.com/#localbusiness",
  name: "Gincanas Clubes Campestres",
  image: "https://gincanasclubescampestres.com/images/hero/desktop/hero-1.webp",
  url: "https://gincanasclubescampestres.com",
  telephone: "+51-921-451-844",
  email: "contacto@gincanasclubescampestres.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Rivera Navarrete 1234",
    addressLocality: "San Isidro",
    addressRegion: "Lima",
    postalCode: "15023",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.0984,
    longitude: -77.0346,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
  },
};

const jsonLdEventVenue = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Gincanas Clubes Campestres - Red de Clubes",
  description:
    "8 clubes campestres exclusivos para eventos corporativos, educativos y sociales en Perú.",
  url: "https://gincanasclubescampestres.com/clubes",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Carretera Central Km 38",
      addressLocality: "Chosica",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Cieneguilla",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Chaclacayo",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Urubamba",
      addressRegion: "Cusco",
      addressCountry: "PE",
    },
  ],
  maximumAttendeeCapacity: 500,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Piscina", value: true },
    { "@type": "LocationFeatureSpecification", name: "Salón de Eventos", value: true },
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Estacionamiento", value: true },
    { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
    { "@type": "LocationFeatureSpecification", name: "Canchas Deportivas", value: true },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://gincanasclubescampestres.com" },
    { "@type": "ListItem", position: 2, name: "Nosotros", item: "https://gincanasclubescampestres.com/nosotros" },
    { "@type": "ListItem", position: 3, name: "Clubes", item: "https://gincanasclubescampestres.com/clubes" },
    { "@type": "ListItem", position: 4, name: "Paseos Escolares", item: "https://gincanasclubescampestres.com/paseos-escolares" },
    { "@type": "ListItem", position: 5, name: "Servicios", item: "https://gincanasclubescampestres.com/servicios" },
    { "@type": "ListItem", position: 6, name: "Contacto", item: "https://gincanasclubescampestres.com/contacto" },
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuáles son las medidas de seguridad durante los paseos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contamos con protocolos de seguridad certificados ISO 9001, personal médico en cada evento, seguros de viaje para todos los participantes, radios de comunicación, y coordinación previa con autoridades locales del destino.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué incluye el servicio de paseos escolares?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestro servicio incluye: transporte premium con asientos de seguridad, alimentación completa, materiales didácticos, coordinadores especializados, kit de emergencia, y reporte fotográfico post-evento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el número mínimo y máximo de estudiantes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabajamos con grupos desde 30 estudiantes hasta 500+. Para grupos grandes, implementamos un sistema de subgrupos con coordinadores dedicados para asegurar la calidad de la experiencia.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los paseos se adaptan al currículo escolar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, cada paseo es diseñado en coordinación con el equipo pedagógico de la institución. Alineamos las actividades con los objetivos curriculares y áreas de desarrollo de los estudiantes.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué destinos ofrecen para paseos escolares?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Operamos en nuestros 8 clubes campestres y en destinos naturales seleccionados: Chosica, Cieneguilla, Chaclacayo, Valle Sagrado del Cusco, Ica, entre otros.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEventVenue) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />

        {/* Preconnect to origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        <SiteLayout>{children}</SiteLayout>
        <Toaster />
      </body>
    </html>
  );
}
