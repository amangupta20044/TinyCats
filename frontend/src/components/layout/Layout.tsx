import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { ScrollToTop } from '../common/ScrollToTop';
import { Toaster } from 'sonner';
import { useTheme } from '../../hooks/useTheme';

export const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Breadcrumbs />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster
        theme={theme}
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '1rem',
          },
        }}
      />
    </div>
  );
};
