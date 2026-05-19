/* ═══════════════════════════════════════════════════════════════
   Amenity Icons — Professional keyword-matched icons
   Sources: Material Design (md), Game Icons (gi),
            Font Awesome 6 (fa6), Tabler (tb), Remix (ri)
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { MdPool, MdForest, MdWaves, MdSportsSoccer, MdOutdoorGrill,
         MdDirectionsBoat, MdHotel, MdSportsMotorsports,
         MdCalendarViewMonth, MdLocalParking, MdSecurity, MdNature,
         MdEmojiEvents, MdSetMeal, MdBed, MdChildFriendly } from 'react-icons/md';
import { GiCampfire, GiChicken, GiCarousel, GiSpinningWheel,
         GiForestCamp, GiKidSlide, GiSheep, GiPig,
         GiFarmTractor, GiDogHouse, GiCrosshair } from 'react-icons/gi';
import { FaHorse, FaCableCar, FaTent, FaBus, FaCow,
         FaMountain, FaTree, FaPersonSwimming, FaBinoculars } from 'react-icons/fa6';
import { TbCampfireFilled, TbSwimming, TbHorse,
         TbKayak, TbMountainFilled,
         TbPlant, TbBed } from 'react-icons/tb';
import { RiBusWifiFill } from 'react-icons/ri';

type IconComponent = React.FC<{ className?: string }>;

/* ── Keyword → Icon Mapping ─────────────────────────── */

interface IconMatch {
  keywords: string[];
  Icon: IconComponent;
}

const ICON_MAP: IconMatch[] = [
  /* ── Piscinas y agua ── */
  { keywords: ['piscina', 'pool'], Icon: MdPool },
  { keywords: ['nadar', 'nadando'], Icon: FaPersonSwimming },
  { keywords: ['tobogán', 'tobogan', 'water slide', 'waterslide'], Icon: MdWaves },
  { keywords: ['ola', 'wave'], Icon: MdWaves },

  /* ── Áreas verdes y naturaleza ── */
  { keywords: ['área verde', 'area verde', 'áreas verde', 'zonas verde'], Icon: MdForest },
  { keywords: ['bosque', 'selva'], Icon: MdForest },
  { keywords: ['árbol', 'arbol', 'tree'], Icon: FaTree },
  { keywords: ['naturaleza', 'natural', 'entorno natural'], Icon: MdNature },
  { keywords: ['planta', 'plant', 'jardín', 'jardin'], Icon: TbPlant },
  { keywords: ['montaña', 'mountain'], Icon: FaMountain },

  /* ── Deportes y canchas ── */
  { keywords: ['deport', 'cancha', 'fútbol', 'futbol'], Icon: MdSportsSoccer },
  { keywords: ['baloncesto', 'basketball'], Icon: MdSportsSoccer },
  { keywords: ['voleibol', 'volley'], Icon: MdSportsSoccer },
  { keywords: ['gimnasio', 'gym', 'fitness'], Icon: MdSportsSoccer },

  /* ── Juegos mecánicos y atracciones ── */
  { keywords: ['mecánic', 'mecanic', 'tagada'], Icon: GiSpinningWheel },
  { keywords: ['norias', 'noria', 'ferris', 'rueda'], Icon: GiCarousel },
  { keywords: ['carrusel', 'carousel', 'tiovivo'], Icon: GiCarousel },
  { keywords: ['clásico', 'clasico', 'playground', 'juegos cl'], Icon: GiKidSlide },
  { keywords: ['atracción', 'feria'], Icon: GiSpinningWheel },

  /* ── Parrilla y fuego ── */
  { keywords: ['parrilla', 'bbq', 'asado', 'grill', 'barbacoa'], Icon: MdOutdoorGrill },
  { keywords: ['fogat', 'fogata'], Icon: TbCampfireFilled },

  /* ── Campamento ── */
  { keywords: ['campament', 'camping', 'fogata'], Icon: GiCampfire },
  { keywords: ['carpa', 'acampar', 'tienda de camp'], Icon: FaTent },

  /* ── Río y agua ── */
  { keywords: ['río', 'rio', 'river'], Icon: MdWaves },
  { keywords: ['laguna', 'lago', 'lake'], Icon: MdWaves },

  /* ── Granja y animales ── */
  { keywords: ['granja', 'minigranja'], Icon: GiChicken },
  { keywords: ['caballo', 'horse', 'equin', 'paseo a caballo', 'paseos a caballo'], Icon: TbHorse },
  { keywords: ['oveja', 'sheep'], Icon: GiSheep },
  { keywords: ['cerdo', 'pig', 'chancho'], Icon: GiPig },
  { keywords: ['vaca', 'cow', 'ganado', 'lech'], Icon: FaCow },
  { keywords: ['perro', 'dog', 'mascota'], Icon: GiDogHouse },
  { keywords: ['animal', 'petting'], Icon: GiChicken },
  { keywords: ['tractor'], Icon: GiFarmTractor },

  /* ── Transporte y vehículos ── */
  { keywords: ['cuatrimot', 'atv', 'quad', 'moto'], Icon: MdSportsMotorsports },
  { keywords: ['bote', 'boat', 'barco', 'embarcaci', 'kayak'], Icon: MdDirectionsBoat },
  { keywords: ['kayak'], Icon: TbKayak },
  { keywords: ['canopy', 'tirolina', 'tirolesa', 'zip line', 'zipline'], Icon: FaCableCar },

  /* ── Hotel y hospedaje ── */
  { keywords: ['hotel', 'hostal', 'alojamiento', 'hospedaje'], Icon: MdHotel },
  { keywords: ['saltarina', 'trampolín', 'trampolin', 'inflable', 'castillo hinchable'], Icon: GiKidSlide },
  { keywords: ['cama', 'bed', 'dormitorio', 'habitaci', 'cuarto'], Icon: MdBed },

  /* ── Transporte de pasajeros ── */
  { keywords: ['bus', 'autobus', 'omnibus'], Icon: FaBus },
  { keywords: ['transporte'], Icon: RiBusWifiFill },

  /* ── Temporada y eventos ── */
  { keywords: ['temporada', 'estación', 'calendario', 'fecha', 'disponib'], Icon: MdCalendarViewMonth },
  { keywords: ['evento', 'salón', 'salon', 'banquete', 'fiesta', 'celebracion'], Icon: MdEmojiEvents },
  { keywords: ['show', 'espectáculo', 'espectacular', 'musica', 'música'], Icon: MdEmojiEvents },

  /* ── Servicios ── */
  { keywords: ['estacionamiento', 'parqueo', 'parking'], Icon: MdLocalParking },
  { keywords: ['seguridad', 'guardia', 'vigilancia', 'protección'], Icon: MdSecurity },
  { keywords: ['logística', 'servicio', 'complet', 'integral'], Icon: MdEmojiEvents },

  /* ── Ambiente y experiencias ── */
  { keywords: ['descanso', 'relaj', 'hamaca', 'tranquil'], Icon: TbBed },
  { keywords: ['campestre', 'campo', 'día de campo', 'picnic', 'picker'], Icon: MdForest },
  { keywords: ['paseo', 'excursión', 'caminata'], Icon: MdNature },
  { keywords: ['integración', 'integracion', 'familiar', 'grupo', 'reunión', 'grupal'], Icon: GiForestCamp },
  { keywords: ['aventura'], Icon: FaCableCar },
  { keywords: ['gastronomía', 'gastronomia', 'comida', 'aliment', 'restaur'], Icon: MdSetMeal },

  /* ── Catch-all para verde/naturaleza ── */
  { keywords: ['verde'], Icon: MdForest },
  { keywords: ['amplio', 'espacio'], Icon: MdNature },

  /* ── Natación/kayak/pesca específicos ── */
  { keywords: ['natación', 'swimming'], Icon: TbSwimming },
  { keywords: ['pesca', 'fishing', 'pescar'], Icon: MdDirectionsBoat },

  /* ── Actividades especiales ── */
  { keywords: ['paintball'], Icon: GiCrosshair },
  { keywords: ['infantil', 'niño', 'niños', 'niña', 'bebe'], Icon: MdChildFriendly },
  { keywords: ['mirador', 'mirador panorámico', 'panorámica', 'panoramico', 'vista'], Icon: FaBinoculars },
  { keywords: ['losa'], Icon: MdSportsSoccer },
];

/* ── Default icon ── */
import { MdStar } from 'react-icons/md';

const DefaultIcon: IconComponent = MdStar;

/* ── Resolver ───────────────────────────────────────── */

export function getAmenityIcon(text: string): IconComponent {
  const lower = text.toLowerCase();
  for (const match of ICON_MAP) {
    for (const kw of match.keywords) {
      if (lower.includes(kw)) return match.Icon;
    }
  }
  return DefaultIcon;
}
