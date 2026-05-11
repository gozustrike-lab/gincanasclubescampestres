'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import NosotrosSection from '@/components/nosotros-section';
import ClubesSection from '@/components/clubes-section';
import PaseosSection from '@/components/paseos-section';
import ServiciosSection from '@/components/servicios-section';
import ContactoSection from '@/components/contacto-section';
import Footer from '@/components/footer';
import CotizadorModal from '@/components/cotizador-modal';
import PortalSocios from '@/components/portal-socios';
import ChatbotWidget from '@/components/chatbot-widget';

export default function Home() {
  const [cotizadorOpen, setCotizadorOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar
        onCotizar={() => setCotizadorOpen(true)}
        onPortalSocios={() => setPortalOpen(true)}
      />
      <HeroSection onCotizar={() => setCotizadorOpen(true)} />
      <NosotrosSection />
      <ClubesSection />
      <PaseosSection />
      <ServiciosSection />
      <ContactoSection />
      <Footer onCotizar={() => setCotizadorOpen(true)} />
      <CotizadorModal open={cotizadorOpen} onOpenChange={setCotizadorOpen} />
      <PortalSocios open={portalOpen} onOpenChange={setPortalOpen} />
      <ChatbotWidget />
    </main>
  );
}
