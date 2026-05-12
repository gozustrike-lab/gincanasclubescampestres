/* ═══════════════════════════════════════════════════════════════
   WhatsApp — Centralized Config & URL Encoding
   All links are pre-encoded at module load using encodeURIComponent.
   WhatsApp bold markers (*) are preserved via post-replacement.
   ═══════════════════════════════════════════════════════════════ */

export const WA_NUMBER = '51921451844';

/**
 * Encode a WhatsApp message for URL query param.
 * - Uses encodeURIComponent for full coverage (emojis, accents, symbols)
 * - Restores * markers (WhatsApp bold formatting)
 * - Produces: %20 (space), %0A (newline), %F0%9F... (emoji hex)
 */
function encodeWa(text: string): string {
  return encodeURIComponent(text).replace(/%2A/g, '*');
}

/* ─── Route-Aware Messages (for floating FAB) ─── */
const messages: Record<string, string> = {
  '/': encodeWa(
    '\u00a1Hola! Vengo de la web y me gustar\u00eda recibir informaci\u00f3n sobre la *GESTI\u00d3N DE EVENTOS DE ALTO IMPACTO*.\nPor favor, \u00bfpodr\u00edan enviarme su cat\u00e1logo de clubs exclusivos? Gracias.'
  ),
  '/nosotros': encodeWa(
    'Estimados Gincanas Clubes Campestres, me gustar\u00eda conocer m\u00e1s sobre su *HISTORIA Y TRAYECTORIA* institucional.\nQuedo atento a su informaci\u00f3n.'
  ),
  '/clubes': encodeWa(
    '\u00a1Hola! Me interesa conocer los *CLUBES CAMPESTRES EXCLUSIVOS* que ofrecen.\n\u00bfpodr\u00edan enviarme la ficha t\u00e9cnica y disponibilidad?'
  ),
  '/paseos-escolares': encodeWa(
    'Estimados Gincanas Clubes Campestres, solicito informaci\u00f3n para un *PASEO ESCOLAR / ACAD\u00c9MICO*.\n- Instituci\u00f3n:\n- Nro. de Alumnos:\nQuedo atento a su propuesta de seguridad y log\u00edstica.'
  ),
  '/servicios': encodeWa(
    'Hola, solicito informaci\u00f3n sobre los *SERVICIOS ADICIONALES* para eventos.\n- Tipo de evento:\n- Fecha estimada:\nQuedo atento a la cotizaci\u00f3n.'
  ),
  '/contacto': encodeWa(
    '\u00a1Hola! Vengo de la web y deseo comunicarme con un *EJECUTIVO COMERCIAL*.\nPor favor, cont\u00e1ctenme a la brevedad. Gracias.'
  ),
};

/** Build a WhatsApp link for a given route */
export function getWaLink(pathname: string): string {
  const msg = messages[pathname] || messages['/'];
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ─── Pre-built Links for Specific CTAs ─── */
export const WA_LINKS = {
  /** Gincanas Corporativas — Service Card */
  gincanas: `https://wa.me/${WA_NUMBER}?text=${encodeWa(
    'Hola, me interesa el servicio de *GINCANAS CORPORATIVAS Y TEAM BUILDING*. \ud83e\udd1d\ud83c\udfc6\nBuscamos una experiencia de integraci\u00f3n para nuestra empresa. \u00bfpodr\u00edan detallarme las din\u00e1micas y coberturas?'
  )}`,

  /** Flota de Transporte — Service Card */
  transporte: `https://wa.me/${WA_NUMBER}?text=${encodeWa(
    'Buen d\u00eda, solicito cotizaci\u00f3n para el servicio de *FLOTA DE TRANSPORTE DE LUJO*. \ud83d\ude90\ud83d\udca8\n- Origen/Destino:\n- Cantidad de pasajeros:\nDeseamos asegurar la disponibilidad para nuestro pr\u00f3ximo evento.'
  )}`,

  /** Drawer / General CTA */
  drawer: `https://wa.me/${WA_NUMBER}?text=${encodeWa(
    '\u00a1Hola! Vengo de la web y me gustar\u00eda recibir informaci\u00f3n sobre la *GESTI\u00d3N DE EVENTOS DE ALTO IMPACTO*.\nPor favor, \u00bfpodr\u00edan enviarme su cat\u00e1logo de clubs exclusivos? Gracias.'
  )}`,

  /** Hero CTA — Home */
  hero: `https://wa.me/${WA_NUMBER}?text=${encodeWa(
    '\u00a1Hola! Vengo de la web y me gustar\u00eda recibir informaci\u00f3n sobre la *GESTI\u00d3N DE EVENTOS DE ALTO IMPACTO*.\nPor favor, \u00bfpodr\u00edan enviarme su cat\u00e1logo de clubs exclusivos? Gracias.'
  )}`,
};
