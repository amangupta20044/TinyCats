import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/50 bg-card/60 mt-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐈</span>
              <span className="text-2xl font-black tracking-tight text-foreground">Tiny Cats</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your ultimate intelligent cat recommendation platform. Find your ideal feline companion using personalized criteria or smart AI algorithms.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-primary transition-colors">
                  Explore Breeds
                </Link>
              </li>
              <li>
                <Link to="/recommend" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  AI Recommendation
                </Link>
              </li>
              <li>
                <Link to="/add-cat" className="hover:text-primary transition-colors">
                  Add New Cat
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Powered By</h4>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'Vite', 'TypeScript', 'Tailwind', 'TanStack Query', 'Axios', 'Zod'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-lg border border-border/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tiny Cats Platform. Production-grade frontend architecture.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for cat lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
