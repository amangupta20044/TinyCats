import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCat } from '../hooks/useCat';
import { useFavorites } from '../hooks/useFavorites';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { FALLBACK_CAT_IMAGE } from '../constants';
import { ArrowLeft, Heart, Home, Smile, Sparkles, Share2, Info } from 'lucide-react';
import { toast } from 'sonner';

export const CatDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cat, isLoading, isError, error } = useCat(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorited = cat ? isFavorite(cat._id) : false;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Cat details link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-32 rounded-xl" />
        <Card className="p-6 md:p-8 space-y-6">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (isError || !cat) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="text-6xl">😿</div>
        <h2 className="text-2xl font-bold text-foreground">Cat Details Not Found</h2>
        <p className="text-sm text-muted-foreground">{error?.message || 'Unable to locate cat profile.'}</p>
        <Button onClick={() => navigate('/explore')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} leftIcon={<Share2 className="h-4 w-4" />}>
            Share Profile
          </Button>

          <Button
            variant={favorited ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFavorite(cat._id, cat.name)}
            leftIcon={<Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />}
          >
            {favorited ? 'Favorited' : 'Save Favorite'}
          </Button>
        </div>
      </div>

      {/* Main Cat Detail Showcase Card */}
      <Card glass className="overflow-hidden border-border/80 shadow-2xl p-6 md:p-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-muted shadow-lg border border-border"
          >
            <img
              src={cat.image || FALLBACK_CAT_IMAGE}
              alt={cat.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_CAT_IMAGE;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="primary" className="px-3 py-1 text-xs shadow-md">
                <Sparkles className="h-3.5 w-3.5" /> Recommended Breed
              </Badge>
            </div>
          </motion.div>

          {/* Core Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-black text-foreground tracking-tight">{cat.name}</h1>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {cat.breed}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                Origin: Worldwide Standard Breed
              </p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed">{cat.description}</p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground font-semibold">Life Span</p>
                <p className="text-xl font-bold text-foreground mt-0.5">{cat.lifeSpan} yrs</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground font-semibold">Energy</p>
                <p className="text-xl font-bold text-primary mt-0.5">{cat.energyLevel}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/60 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground font-semibold">Family</p>
                <p className="text-xl font-bold text-emerald-500 mt-0.5">
                  {cat.kidsFriendly ? 'High' : 'Moderate'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Traits & Compatibility Meters */}
        <div className="pt-8 border-t border-border/60 space-y-6">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <span>Compatibility & Personality Attributes</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Apartment Friendly Meter */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold flex items-center gap-2">
                  <Home className="h-4 w-4 text-accent" /> Apartment Adaptability
                </span>
                <Badge variant={cat.apartmentFriendly ? 'accent' : 'ghost'}>
                  {cat.apartmentFriendly ? 'Highly Suitable' : 'Needs Space'}
                </Badge>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.apartmentFriendly ? 'bg-accent w-full' : 'bg-amber-400 w-1/2'}`}
                />
              </div>
            </div>

            {/* Kid Friendly Meter */}
            <div className="p-5 rounded-2xl bg-card border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold flex items-center gap-2">
                  <Smile className="h-4 w-4 text-emerald-500" /> Kid & Family Safety
                </span>
                <Badge variant={cat.kidsFriendly ? 'success' : 'ghost'}>
                  {cat.kidsFriendly ? 'Very Patient' : 'Adult Quiet Preferred'}
                </Badge>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.kidsFriendly ? 'bg-emerald-500 w-full' : 'bg-slate-400 w-2/5'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
