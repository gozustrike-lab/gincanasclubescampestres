'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CotizadorModal from '@/components/cotizador-modal';
import PortalSocios from '@/components/portal-socios';
import ChatbotWidget from '@/components/chatbot-widget';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/* WhatsApp config */
const WA_NUMBER = '51921451844';

const WA_MESSAGES: Record<string, string> = {
  '/': encodeURI('¡Hola! 👋 Vengo de la web y me gustaría recibir información sobre la *GESTIÓN DE EVENTOS DE ALTO IMPACTO*. 🏛️✨\nPor favor, ¿podrían enviarme su catálogo de clubs exclusivos? Gracias.'),
  '/nosotros': encodeURI('Estimados Gincanas Clubes Campestres, me gustaría conocer más sobre su *HISTORIA Y TRAYECTORIA* institucional. 🏆\nQuedo atento a su información.'),
  '/clubes': encodeURI('¡Hola! 👋 Me interesa conocer los *CLUBES CAMPESTRES EXCLUSIVOS* que ofrecen. 🏝️\n¿Podrían enviarme la ficha técnica y disponibilidad?'),
  '/paseos-escolares': encodeURI('Estimados Gincanas Clubes Campestres, solicito información para un *PASEO ESCOLAR / ACADÉMICO*. 🎓🚌\n- Institución:\n- Nro. de Alumnos:\nQuedo atento a su propuesta de seguridad y logística.'),
  '/servicios': encodeURI('Hola, solicito información sobre los *SERVICIOS ADICIONALES* para eventos. ⚙️\n- Tipo de evento:\n- Fecha estimada:\nQuedo atento a la cotización.'),
  '/contacto': encodeURI('¡Hola! 👋 Vengo de la web y deseo comunicarme con un *EJECUTIVO COMERCIAL*. 📞\nPor favor, contáctenme a la brevedad. Gracias.'),
};

function getWaLink(pathname: string): string {
  const msg = WA_MESSAGES[pathname] || WA_MESSAGES['/'];
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [cotizadorOpen, setCotizadorOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [waTooltip, setWaTooltip] = useState(false);
  const pathname = usePathname();

  /* Auto-hide WA tooltip after 5s */
  useEffect(() => {
    const t = setTimeout(() => setWaTooltip(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const waLink = getWaLink(pathname);

  return (
    <>
      <Navbar
        onCotizar={() => setCotizadorOpen(true)}
        onPortalSocios={() => setPortalOpen(true)}
      />
      {children}
      <Footer onCotizar={() => setCotizadorOpen(true)} />
      <CotizadorModal open={cotizadorOpen} onOpenChange={setCotizadorOpen} />
      <PortalSocios open={portalOpen} onOpenChange={setPortalOpen} />
      <ChatbotWidget />

      {/* Sticky WhatsApp Button — only on mobile */}
      <div className="fixed bottom-5 right-5 z-[55] lg:hidden">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className={cn(
            'w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-xl transition-all duration-300 wa-btn-pulse',
          )}
        >
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
        </a>
      </div>

      {/* Desktop WhatsApp — positioned above chatbot */}
      <div className="fixed bottom-24 right-6 z-[40] hidden lg:block">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="group relative w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-emerald-dark text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            WhatsApp Directo
          </span>
        </a>
      </div>
    </>
  );
}
