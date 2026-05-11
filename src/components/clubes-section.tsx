'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users, Waves, Dumbbell, TreePine, UtensilsCrossed,
  Music, Wifi, Car, Search, X, ChevronRight, Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type CapacityFilter = 'all' | 'small' | 'medium' | 'large';
type AmenityFilter = 'all' | 'pool' | 'spa' | 'hall' | 'sports';

interface Club {
  id: string;
  name: string;
  location: string;
  capacity: 'small' | 'medium' | 'large';
  capacityLabel: string;
  amenities: string[];
  amenitiesList: { icon: typeof Users; label: string }[];
  color: string;
  distance: string;
  description: string;
  vip: boolean;
}

const clubs: Club[] = [
  {
    id: 'club-1',
    name: 'Hacienda San Miguel',
    location: 'Chosica, Lima',
    capacity: 'large',
    capacityLabel: 'Hasta 500 personas',
    amenities: ['pool', 'hall', 'sports', 'wifi'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Music, label: 'Salón Eventos' },
      { icon: Dumbbell, label: 'Deportes' },
      { icon: Wifi, label: 'WiFi' },
    ],
    color: 'from-emerald-deep to-emerald-deep/80',
    distance: '45 min de Lima',
    description: 'Nuestro club insignia con capacidad para grandes eventos corporativos.',
    vip: true,
  },
  {
    id: 'club-2',
    name: 'Villa Verde Premium',
    location: 'Cieneguilla, Lima',
    capacity: 'medium',
    capacityLabel: 'Hasta 250 personas',
    amenities: ['pool', 'spa', 'hall', 'wifi'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Star, label: 'Spa' },
      { icon: Music, label: 'Salón Eventos' },
      { icon: Wifi, label: 'WiFi' },
    ],
    color: 'from-emerald-deep/90 to-emerald-deep/70',
    distance: '50 min de Lima',
    description: 'Ambiente exclusivo ideal para eventos de categoría premium.',
    vip: true,
  },
  {
    id: 'club-3',
    name: 'Rancho del Sol',
    location: 'Chaclacayo, Lima',
    capacity: 'large',
    capacityLabel: 'Hasta 450 personas',
    amenities: ['pool', 'sports', 'hall'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Dumbbell, label: 'Deportes' },
      { icon: Music, label: 'Salón Eventos' },
    ],
    color: 'from-emerald-deep/85 to-emerald-deep/65',
    distance: '40 min de Lima',
    description: 'Amplios espacios verdes y áreas de recreación al aire libre.',
    vip: false,
  },
  {
    id: 'club-4',
    name: 'El Encanto Eco',
    location: 'San Jerónimo, Cusco',
    capacity: 'medium',
    capacityLabel: 'Hasta 200 personas',
    amenities: ['pool', 'spa', 'sports'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Star, label: 'Spa' },
      { icon: Dumbbell, label: 'Deportes' },
    ],
    color: 'from-emerald-deep/80 to-emerald-deep/60',
    distance: 'Cusco',
    description: 'Inmersión en la naturaleza con instalaciones modernas.',
    vip: true,
  },
  {
    id: 'club-5',
    name: 'La Quintrala Resort',
    location: 'Lurín, Lima',
    capacity: 'small',
    capacityLabel: 'Hasta 120 personas',
    amenities: ['pool', 'spa', 'wifi'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Star, label: 'Spa' },
      { icon: Wifi, label: 'WiFi' },
    ],
    color: 'from-gold/90 to-gold/70',
    distance: '35 min de Lima',
    description: 'Exclusividad y privacidad para eventos íntimos de alto nivel.',
    vip: true,
  },
  {
    id: 'club-6',
    name: 'Campestre del Sur',
    location: 'Mala, Lima',
    capacity: 'large',
    capacityLabel: 'Hasta 400 personas',
    amenities: ['pool', 'sports', 'hall', 'wifi'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Dumbbell, label: 'Deportes' },
      { icon: Music, label: 'Salón Eventos' },
      { icon: Wifi, label: 'WiFi' },
    ],
    color: 'from-emerald-deep/75 to-emerald-deep/55',
    distance: '1 hr de Lima',
    description: 'Infraestructura completa para eventos académicos y corporativos.',
    vip: false,
  },
  {
    id: 'club-7',
    name: 'Paraiso Andino',
    location: 'Urubamba, Cusco',
    capacity: 'small',
    capacityLabel: 'Hasta 100 personas',
    amenities: ['pool', 'spa'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Star, label: 'Spa' },
    ],
    color: 'from-gold/80 to-gold/60',
    distance: 'Valle Sagrado',
    description: 'Entorno andino único con servicios de primer nivel.',
    vip: true,
  },
  {
    id: 'club-8',
    name: 'El Oasis del Valle',
    location: 'Ica',
    capacity: 'medium',
    capacityLabel: 'Hasta 280 personas',
    amenities: ['pool', 'hall', 'sports'],
    amenitiesList: [
      { icon: Waves, label: 'Piscina' },
      { icon: Music, label: 'Salón Eventos' },
      { icon: Dumbbell, label: 'Deportes' },
    ],
    color: 'from-emerald-deep/70 to-emerald-deep/50',
    distance: '3 hrs de Lima',
    description: 'Destino exclusivo en el sur con clima privilegiado todo el año.',
    vip: false,
  },
];

export default function ClubesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [capacityFilter, setCapacityFilter] = useState<CapacityFilter>('all');
  const [amenityFilter, setAmenityFilter] = useState<AmenityFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClubs = clubs.filter((club) => {
    const matchCapacity = capacityFilter === 'all' || club.capacity === capacityFilter;
    const matchAmenity = amenityFilter === 'all' || club.amenities.includes(amenityFilter);
    const matchSearch =
      searchTerm === '' ||
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCapacity && matchAmenity && matchSearch;
  });

  const clearFilters = () => {
    setCapacityFilter('all');
    setAmenityFilter('all');
    setSearchTerm('');
  };

  return (
    <section id="clubes" className="py-20 md:py-28 bg-corporate-gray" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="secondary" className="bg-emerald-light text-emerald-deep font-medium mb-4">
            Red Exclusiva
          </Badge>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-emerald-dark mb-6">
            Nuestra Colección de{' '}
            <span className="text-gold">Clubes Élite</span>
          </h2>
          <p className="text-corporate-text/70 text-lg">
            Cada uno de nuestros 8 clubes ha sido seleccionado por su excelencia,
            ubicación privilegiada y capacidad para crear experiencias memorables.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 md:p-6 mb-10 shadow-sm border border-border"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-corporate-text/40" />
              <input
                type="text"
                placeholder="Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Capacity filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={capacityFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCapacityFilter('all')}
                className={capacityFilter === 'all' ? 'bg-emerald-deep hover:bg-emerald-deep/90 text-white' : ''}
              >
                Todos
              </Button>
              <Button
                variant={capacityFilter === 'small' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCapacityFilter('small')}
                className={capacityFilter === 'small' ? 'bg-emerald-deep hover:bg-emerald-deep/90 text-white' : ''}
              >
                <Users className="h-3.5 w-3.5 mr-1" /> Pequeño
              </Button>
              <Button
                variant={capacityFilter === 'medium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCapacityFilter('medium')}
                className={capacityFilter === 'medium' ? 'bg-emerald-deep hover:bg-emerald-deep/90 text-white' : ''}
              >
                <Users className="h-3.5 w-3.5 mr-1" /> Mediano
              </Button>
              <Button
                variant={capacityFilter === 'large' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCapacityFilter('large')}
                className={capacityFilter === 'large' ? 'bg-emerald-deep hover:bg-emerald-deep/90 text-white' : ''}
              >
                <Users className="h-3.5 w-3.5 mr-1" /> Grande
              </Button>
            </div>

            {/* Amenity filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={amenityFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAmenityFilter('all')}
                className={amenityFilter === 'all' ? 'bg-gold hover:bg-gold-dark text-emerald-dark' : ''}
              >
                Todas
              </Button>
              <Button
                variant={amenityFilter === 'pool' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAmenityFilter('pool')}
                className={amenityFilter === 'pool' ? 'bg-gold hover:bg-gold-dark text-emerald-dark' : ''}
              >
                <Waves className="h-3.5 w-3.5 mr-1" /> Piscina
              </Button>
              <Button
                variant={amenityFilter === 'spa' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAmenityFilter('spa')}
                className={amenityFilter === 'spa' ? 'bg-gold hover:bg-gold-dark text-emerald-dark' : ''}
              >
                <Star className="h-3.5 w-3.5 mr-1" /> Spa
              </Button>
              <Button
                variant={amenityFilter === 'hall' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAmenityFilter('hall')}
                className={amenityFilter === 'hall' ? 'bg-gold hover:bg-gold-dark text-emerald-dark' : ''}
              >
                <Music className="h-3.5 w-3.5 mr-1" /> Salón
              </Button>
            </div>

            {/* Clear */}
            {(capacityFilter !== 'all' || amenityFilter !== 'all' || searchTerm) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-corporate-text/60">
                <X className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            )}
          </div>
        </motion.div>

        {/* Club Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClubs.map((club, i) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
            >
              <Card className="card-premium overflow-hidden border border-border h-full flex flex-col">
                {/* Club image placeholder */}
                <div className={`h-40 bg-gradient-to-br ${club.color} relative flex items-center justify-center`}>
                  <TreePine className="h-16 w-16 text-white/30" />
                  {club.vip && (
                    <Badge className="absolute top-3 right-3 bg-gold text-emerald-dark text-xs font-bold">
                      VIP
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute bottom-3 left-3 bg-white/90 text-emerald-dark text-xs">
                    <Car className="h-3 w-3 mr-1" />{club.distance}
                  </Badge>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg text-emerald-dark mb-1">{club.name}</h3>
                  <p className="text-sm text-corporate-text/60 mb-3 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full" />
                    {club.location}
                  </p>
                  <p className="text-sm text-corporate-text/70 mb-4 flex-1">{club.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {club.amenitiesList.map((a) => (
                      <Badge key={a.label} variant="outline" className="text-xs border-emerald-deep/20 text-emerald-dark/80 bg-emerald-light/30">
                        <a.icon className="h-3 w-3 mr-1" />{a.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-corporate-text/50 font-medium">
                      <Users className="h-3.5 w-3.5 inline mr-1" />
                      {club.capacityLabel}
                    </span>
                    <Button size="sm" variant="ghost" className="text-emerald-deep hover:text-emerald-deep hover:bg-emerald-light p-0 h-auto font-semibold text-sm">
                      Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-corporate-text/20 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-corporate-text/40 mb-2">
              No se encontraron clubes
            </h3>
            <p className="text-sm text-corporate-text/40 mb-4">
              Intenta ajustar los filtros de búsqueda
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
