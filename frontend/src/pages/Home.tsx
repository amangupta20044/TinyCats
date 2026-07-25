import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Compass, Sparkles, Home as HomeIcon, Smile, Heart, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCats } from '../hooks/useCats';
import { CatCard } from '../components/cats/CatCard';

export const Home: React.FC = () => {
  const { data: cats = [] } = useCats();

  const featuredCats = cats.slice(0, 3);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24">
        {/* Glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen Cat Matchmaker Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Find Your Perfect <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Cat Companion
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore hundreds of cat breeds, analyze temperament scores, and let our intelligent AI recommendation engine match you with your dream feline friend.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/explore">
                <Button size="lg" className="shadow-xl shadow-orange-500/25" leftIcon={<Search className="h-5 w-5" />}>
                  Explore Cats
                </Button>
              </Link>
              <Link to="/recommend">
                <Button size="lg" variant="secondary" leftIcon={<Sparkles className="h-5 w-5 text-primary" />}>
                  AI Recommend
                </Button>
              </Link>
            </div>

            {/* Micro Stats Row */}
            <div className="pt-8 border-t border-border/60 flex items-center justify-center lg:justify-start gap-8 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">50+</p>
                <p className="text-xs font-medium text-muted-foreground">Cat Breeds</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-foreground">99%</p>
                <p className="text-xs font-medium text-muted-foreground">Match Accuracy</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-primary flex items-center gap-1">
                  4.9 <Star className="h-4 w-4 fill-primary" />
                </p>
                <p className="text-xs font-medium text-muted-foreground">User Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Animated Cat Illustration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-amber-400/30 rounded-3xl blur-2xl transform rotate-3 scale-95" />
              <Card glass className="p-4 sm:p-6 relative border-border/80 shadow-2xl space-y-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="text-[120px] sm:text-[140px] select-none filter drop-shadow-2xl"
                  >
                    🐱
                  </motion.div>

                  {/* Floating Micro Badges */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                    className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-xs font-bold text-foreground flex items-center gap-1.5 shadow-md"
                  >
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    <span>Highly Loved</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
                    className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-full text-xs font-bold text-foreground flex items-center gap-1.5 shadow-md"
                  >
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>AI Matched</span>
                  </motion.div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Why Use Tiny Cats?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Engineered with modern algorithms and curated feline intelligence to help you make informed adoption & companionship decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Compass,
              title: 'Browse Breed Catalog',
              desc: 'Explore comprehensive breed profiles with detailed temperament, life span, and energy metrics.',
              color: 'text-primary bg-primary/10',
            },
            {
              icon: Sparkles,
              title: 'AI Recommendation',
              desc: 'Our intelligent tool matches cats to your specific household traits and lifestyle.',
              color: 'text-amber-500 bg-amber-500/10',
            },
            {
              icon: HomeIcon,
              title: 'Apartment Friendly',
              desc: 'Filter specifically for indoor-loving breeds suitable for smaller living environments.',
              color: 'text-accent bg-accent/10',
            },
            {
              icon: Smile,
              title: 'Kid Friendly Ratings',
              desc: 'Identify gentle, patient cat breeds that bond wonderfully with children and families.',
              color: 'text-emerald-500 bg-emerald-500/10',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card glass className="p-6 h-full border-border/70 hover:border-primary/40 hover:shadow-lg transition-all">
                <div className={`p-3.5 rounded-2xl ${feature.color} w-fit mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cats Section */}
      {featuredCats.length > 0 && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-foreground">Featured Companions</h2>
              <p className="text-sm text-muted-foreground">Hand-picked popular breeds available in our registry</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View All Cats
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCats.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section>
        <Card className="relative overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white rounded-3xl shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to find your ideal feline match?
            </h2>
            <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
              Take our interactive 4-step recommendation quiz or submit a new cat breed to our growing platform.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/recommend">
                <Button size="lg" className="bg-white text-primary hover:bg-orange-50 shadow-xl">
                  Start Quiz Now
                </Button>
              </Link>
              <Link to="/add-cat">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Add a Cat
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
