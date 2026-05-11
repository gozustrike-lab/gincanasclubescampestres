import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Gincanas Clubes Campestres — Gestión de Eventos de Alto Impacto",
  description:
    "Más de 15 años conectando a las mejores organizaciones con nuestros 8 clubes campestres exclusivos. Seguridad, logística integral y experiencias inolvidables para corporativos, universidades y colegios.",
  keywords: [
    "Gincanas",
    "Clubes Campestres",
    "Eventos Corporativos",
    "Paseos Escolares",
    "Team Building",
    "Perú",
    "Lima",
  ],
  authors: [{ name: "Gincanas Clubes Campestres" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Gincanas Clubes Campestres",
    description:
      "Gestión de Eventos de Alto Impacto para Instituciones Élite. 8 clubes, 15+ años, 500+ eventos exitosos.",
    url: "https://gincanasclubescampestres.com",
    siteName: "Gincanas Clubes Campestres",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gincanas Clubes Campestres",
    description:
      "Gestión de Eventos de Alto Impacto para Instituciones Élite.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
