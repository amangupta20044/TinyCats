import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Zap, Home, Smile, ArrowRight } from 'lucide-react';
import type { Cat } from '../../types/cat.types';
import { useFavorites } from '../../hooks/useFavorites';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FALLBACK_CAT_IMAGE } from '../../constants';

export interface CatCardProps {
  cat: Cat;
}

export const CatCard: React.FC<CatCardProps> = ({ cat }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(cat._id);

  const getEnergyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'primary';
      case 'medium':
        return 'secondary';
      default:
        return 'ghost';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card glass className="h-full flex flex-col group border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <img
            src={cat.image || FALLBACK_CAT_IMAGE}
            alt={cat.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_CAT_IMAGE;
            }}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Overlays */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <Badge variant={getEnergyColor(cat.energyLevel)}>
              <Zap className="h-3 w-3" />
              <span>{cat.energyLevel} Energy</span>
            </Badge>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(cat._id, cat.name);
              }}
              className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
                favorited
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
                  : 'bg-black/30 text-white hover:bg-black/50 hover:scale-110'
              }`}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                {cat.lifeSpan} yrs avg
              </span>
            </div>
            <p className="text-xs font-semibold text-primary/90 tracking-wide uppercase mb-2">
              {cat.breed}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {cat.description}
            </p>
          </div>

          {/* Badges Bar */}
          <div className="space-y-3 pt-2 border-t border-border/40">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant={cat.kidsFriendly ? 'success' : 'ghost'} className="text-[11px]">
                <Smile className="h-3 w-3" />
                {cat.kidsFriendly ? 'Kid Friendly' : 'Adults Preferred'}
              </Badge>
              <Badge variant={cat.apartmentFriendly ? 'accent' : 'ghost'} className="text-[11px]">
                <Home className="h-3 w-3" />
                {cat.apartmentFriendly ? 'Apartment Friendly' : 'Needs Space'}
              </Badge>
            </div>

            {/* View Details Button */}
            <Link to={`/cats/${cat._id}`} className="block w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
