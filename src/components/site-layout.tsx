'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CotizadorModal from '@/components/cotizador-modal';
import PortalSocios from '@/components/portal-socios';
import ChatbotWidget from '@/components/chatbot-widget';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [cotizadorOpen, setCotizadorOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

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
    </>
  );
}
