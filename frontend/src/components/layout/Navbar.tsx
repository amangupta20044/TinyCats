import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, Heart, Compass, Sparkles, PlusCircle, Home } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useFavorites } from '../../hooks/useFavorites';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Recommend', path: '/recommend', icon: Sparkles },
    { label: 'Add Cat', path: '/add-cat', icon: PlusCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 glass">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-primary to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl">🐈</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                Tiny Cats
              </span>
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest -mt-1">
                Cat Recommender
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border/50">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-card text-primary shadow-sm font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`
                }
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Favorites Badge */}
            <Link
              to="/explore?favorite=true"
              className="relative p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all duration-200"
              title="View Favorite Cats"
            >
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500/20" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-xl"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </Button>

            {/* Mobile Drawer Trigger */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden rounded-xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="flex flex-col gap-3 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-base font-semibold rounded-2xl transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-orange-500/20'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </Drawer>
    </>
  );
};
