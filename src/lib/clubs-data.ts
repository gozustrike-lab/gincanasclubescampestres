/* ═══════════════════════════════════════════════════════════════
   Clubs Data — 14 Clubes Campestres Reales
   Fuente: Listado oficial de Gincanas Clubes Campestres
   ═══════════════════════════════════════════════════════════════ */

export interface ClubData {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
  features: string[];
  image: string;
  gradient: string;
  gallery?: string[];
  included?: string[];
  extraActivities?: string[];
}

export const CLUBS: ClubData[] = [
  {
    slug: 'club-certse',
    name: 'Club Certse',
    shortName: 'Certse',
    location: 'Lima',
    description:
      'Club campestre de primer nivel con amplias áreas verdes, piscinas, zonas deportivas y una completa oferta de actividades recreativas. El ingreso incluye el uso libre de todas las áreas principales: piscinas para adultos y niños, juegos mecánicos y clásicos, canchas deportivas, zonas de parrilla y áreas de campamento. Ideal para eventos corporativos, integraciones, paseos escolares y celebraciones especiales en un entorno natural privilegiado.',
    features: ['Piscinas', 'Áreas verdes', 'Deportes', 'Parrillas'],
    image: '/images/clubes/club-certse.webp',
    gradient: 'from-emerald-deep to-emerald-dark',
    gallery: [
      '/images/clubes/club-certse-galeria-1.webp',
      '/images/clubes/club-certse-galeria-2.webp',
    ],
    included: [
      '02 piscinas para adultos y niños',
      'Amplias áreas verdes',
      'Juegos mecánicos y clásicos',
      'Zona deportiva (cancha y áreas de juego)',
      'Acceso a zonas de parrilla',
      'Área de campamento',
    ],
    extraActivities: [
      'Paseos a botes',
      'Cuatrimotos',
      'Paseos a caballo',
      'Más actividades según temporada',
    ],
  },
  {
    slug: 'club-arrayanes',
    name: 'Club Arrayanes',
    shortName: 'Arrayanes',
    location: 'Lima',
    description:
      'Entorno natural privilegiado con acceso al río, 03 piscinas, juegos mecánicos, minigranja y amplias áreas verdes. Ideal para el día de campo, descanso y actividades grupales. Sus amplias zonas de esparcimiento y área de campamento lo convierten en la opción perfecta para paseos escolares, eventos corporativos y celebraciones familiares.',
    features: ['Piscinas', 'Áreas verdes', 'Río', 'Minigranja'],
    image: '/images/clubes/club-arrayanes.webp',
    gradient: 'from-emerald-deep/90 to-emerald-dark',
    gallery: [
      '/images/clubes/club-arrayanes-galeria-1.webp',
      '/images/clubes/club-arrayanes-galeria-2.webp',
      '/images/clubes/club-arrayanes-galeria-3.webp',
    ],
    included: [
      '03 piscinas',
      'Amplias áreas verdes',
      'Juegos mecánicos',
      'Zona deportiva',
      'Acceso al río',
      'Minigranja',
      'Área de campamento',
    ],
    extraActivities: [
      'Paseos en bote',
      'Cuatrimotos',
      'Tagada (atracción mecánica)',
    ],
  },
  {
    slug: 'club-toboganes',
    name: 'Club Toboganes',
    shortName: 'Toboganes',
    location: 'Chosica',
    description:
      'Club recreativo ubicado en el Km 39 de la Carretera Central — Chosica, con 03 piscinas equipadas con toboganes, amplias áreas verdes, juegos mecánicos, zona deportiva, área de campamento y servicio de hotel. Perfecto para paseos divertidos, eventos donde la diversión acuática es el protagonista, colegios y empresas que buscan una experiencia lúdica única con opciones de hospedaje.',
    features: ['Piscinas', 'Toboganes', 'Hotel', 'Campamento'],
    image: '/images/clubes/club-toboganes.webp',
    gradient: 'from-gold/90 to-gold-dark',
    gallery: [
      '/images/clubes/club-toboganes-galeria-1.webp',
      '/images/clubes/club-toboganes-galeria-2.webp',
      '/images/clubes/club-toboganes-galeria-3.webp',
    ],
    included: [
      '03 piscinas con toboganes',
      'Amplias áreas verdes',
      'Juegos mecánicos',
      'Zona deportiva',
      'Área de campamento',
      'Hotel',
    ],
    extraActivities: [
      'Paseos en bote',
      'Cuatrimotos',
      'Tagada',
      'Canopy',
    ],
  },
  {
    slug: 'club-ricardo-palma',
    name: 'Club Ricardo Palma',
    shortName: 'Ricardo Palma',
    location: 'Km 41 Carretera Central — Chosica',
    description:
      'Ubicado en el Km 41 de la Carretera Central, a solo 10 minutos de Chosica. Un espacio amplio con mirador panorámico, piscinas, áreas verdes y canchas deportivas pensadas para el entretenimiento de toda la familia. El ingreso incluye acceso libre a todas las instalaciones principales. Ideal para eventos corporativos, integraciones, paseos escolares y celebraciones especiales con vista panorámica a los alrededores.',
    features: ['Piscinas', 'Mirador panorámico', 'Áreas verdes', 'Deportes'],
    image: '/images/clubes/club-ricardo-palma.webp',
    gradient: 'from-emerald-deep to-emerald-deep/80',
    gallery: [
      '/images/clubes/club-ricardo-palma-galeria-1.webp',
      '/images/clubes/club-ricardo-palma-galeria-2.webp',
      '/images/clubes/club-ricardo-palma-galeria-3.webp',
    ],
    included: [
      '02 piscinas para adultos y niños',
      'Amplias áreas verdes',
      'Juegos infantiles',
      'Losa y canchas deportivas',
      'Mirador panorámico',
      'Zonas de parrilla',
    ],
    extraActivities: [
      'Paseos en bote',
      'Cuatrimotos',
      'Paintball',
    ],
  },
  {
    slug: 'club-samana',
    name: 'Club Samaña',
    shortName: 'Samaña',
    location: 'Km 27 Carretera Central — Chaclacayo',
    description:
      'Ubicado en el Km 27 de la Carretera Central — Chaclacayo, un espacio amplio con piscinas, áreas verdes, juegos mecánicos y zona de campamento diseñado para el descanso, la recreación y la diversión familiar. El ingreso incluye acceso libre a todas las instalaciones principales. Ideal para eventos corporativos, integraciones, paseos escolares y celebraciones especiales en un entorno natural privilegiado a minutos de Lima.',
    features: ['Piscinas', 'Áreas verdes', 'Juegos mecánicos', 'Campamento'],
    image: '/images/clubes/club-samana.webp',
    gradient: 'from-emerald-dark to-emerald-deep',
    gallery: [
      '/images/clubes/club-samana-galeria-1.webp',
      '/images/clubes/club-samana-galeria-2.webp',
      '/images/clubes/club-samana-galeria-3.webp',
    ],
    included: [
      '02 piscinas',
      'Amplias áreas verdes',
      'Zona deportiva',
      'Juegos mecánicos',
      'Área de campamento',
    ],
    extraActivities: [
      'Paseos en bote',
      'Cuatrimotos',
      'Cama saltarina',
    ],
  },
  {
    slug: 'club-koricancha',
    name: 'Club Koricancha',
    shortName: 'Koricancha',
    location: 'Km 27.5 Carretera Central — Chaclacayo',
    description:
      'Ubicado en el Km 27.5 de la Carretera Central — Chaclacayo, un espacio con amplias instalaciones recreativas ideales para el descanso y la diversión familiar. Cuenta con 04 piscinas, amplias áreas verdes, zona deportiva, área de campamento, hotel y auditorio. Perfecto para eventos corporativos, integraciones, paseos escolares y celebraciones especiales con todas las comodidades en un entorno natural privilegiado.',
    features: ['04 piscinas', 'Áreas verdes', 'Hotel', 'Auditorio'],
    image: '/images/clubes/club-koricancha.webp',
    gradient: 'from-gold/80 to-gold-dark',
    gallery: [
      '/images/clubes/club-koricancha-galeria-1.webp',
      '/images/clubes/club-koricancha-galeria-2.webp',
      '/images/clubes/club-koricancha-galeria-3.webp',
      '/images/clubes/club-koricancha-galeria-4.webp',
      '/images/clubes/club-koricancha-galeria-5.webp',
      '/images/clubes/club-koricancha-galeria-6.webp',
    ],
    included: [
      '04 piscinas',
      'Amplias áreas verdes',
      'Zona deportiva',
      'Área de campamento',
      'Hotel',
      'Auditorio',
    ],
    extraActivities: [
      'Restaurante',
    ],
  },
  {
    slug: 'club-ceande',
    name: 'Club Ceande',
    shortName: 'Ceande',
    location: 'Lima',
    description:
      'Espacio versátil con actividades recreativas y zonas de descanso que se adaptan a cualquier tipo de evento. Su ubicación accesible y servicios completos lo hacen ideal para grupos de todas las edades.',
    features: ['Espacio versátil', 'Actividades recreativas', 'Zonas de descanso', 'Servicios completos'],
    image: '/images/clubes/club-ceande.webp',
    gradient: 'from-emerald-deep/85 to-emerald-dark',
  },
  {
    slug: 'club-cogollo',
    name: 'Club Cogollo',
    shortName: 'Cogollo',
    location: 'Lima',
    description:
      'Club campestre rodeado de naturaleza, ideal para el día de campo y actividades al aire libre. Sus amplias extensiones de terreno permiten organizar eventos de gran escala con total comodidad.',
    features: ['Rodeado de naturaleza', 'Día de campo', 'Actividades al aire libre', 'Gran extensión'],
    image: '/images/clubes/club-cogollo.webp',
    gradient: 'from-emerald-deep to-emerald-deep/70',
  },
  {
    slug: 'club-cecal-abogados',
    name: 'Club Cecal Abogados',
    shortName: 'Cecal Abogados',
    location: 'Lima',
    description:
      'Club privado con espacios recreativos exclusivos para eventos y visitas organizadas. Diseñado para colegios de profesionales y gremios que buscan privacidad y servicios de primer nivel.',
    features: ['Club privado', 'Espacios exclusivos', 'Eventos privados', 'Servicios premium'],
    image: '/images/clubes/club-cecal-abogados.webp',
    gradient: 'from-gold to-gold-dark',
  },
  {
    slug: 'club-07-agosto',
    name: 'Club 07 de Agosto',
    shortName: '07 de Agosto',
    location: 'Lima',
    description:
      'Club campestre amplio, adecuado para grupos grandes y paseos escolares con gran capacidad de atención. Su extensa área permite múltiples actividades simultáneas con total seguridad.',
    features: ['Capacidad grande', 'Múltiples actividades', 'Seguridad', 'Grupos grandes'],
    image: '/images/clubes/club-07-agosto.webp',
    gradient: 'from-emerald-dark to-emerald-deep/90',
  },
  {
    slug: 'club-pinos-eucaliptos',
    name: 'Club Pinos y Eucaliptos',
    shortName: 'Pinos y Eucaliptos',
    location: 'Lima',
    description:
      'Entorno natural con áreas arboladas de pinos y eucaliptos, ideal para descanso y recreación. Su clima fresco y paisaje boscoso lo convierten en un refugio perfecto fuera de la ciudad.',
    features: ['Bosque de pinos', 'Eucaliptos', 'Clima fresco', 'Áreas de descanso'],
    image: '/images/clubes/club-pinos-eucaliptos.webp',
    gradient: 'from-emerald-deep to-emerald-dark/80',
  },
  {
    slug: 'club-retamas-trapiche',
    name: 'Club Retamas Trapiche',
    shortName: 'Retamas Trapiche',
    location: 'Lima',
    description:
      'Club campestre con espacios abiertos y zonas de descanso y recreación en un entorno campestre auténtico. Ideal para quienes buscan una experiencia tradicional de campo con todos los servicios.',
    features: ['Espacios abiertos', 'Entorno campestre', 'Zonas de descanso', 'Recreación'],
    image: '/images/clubes/club-retamas-trapiche.webp',
    gradient: 'from-gold/85 to-gold-dark',
  },
  {
    slug: 'club-los-angeles',
    name: 'Club Los Ángeles',
    shortName: 'Los Ángeles',
    location: 'Lima',
    description:
      'Espacio familiar para paseos, integraciones y días de campo en un ambiente cálido y acogedor. Sus instalaciones están diseñadas para garantizar la diversión y seguridad de todos los asistentes.',
    features: ['Ambiente familiar', 'Integraciones', 'Día de campo', 'Seguridad'],
    image: '/images/clubes/club-los-angeles.webp',
    gradient: 'from-emerald-deep/90 to-emerald-dark',
  },
  {
    slug: 'club-el-tumi-trapiche',
    name: 'Club El Tumi Trapiche',
    shortName: 'El Tumi Trapiche',
    location: 'Lima',
    description:
      'Club campestre recreativo, ideal para paseos y actividades grupales en un entorno natural y acogedor. Cuenta con toda la infraestructura necesaria para eventos exitosos de cualquier tipo.',
    features: ['Entorno recreativo', 'Actividades grupales', 'Infraestructura completa', 'Naturaleza'],
    image: '/images/clubes/club-el-tumi-trapiche.webp',
    gradient: 'from-emerald-dark to-emerald-deep',
  },
];
