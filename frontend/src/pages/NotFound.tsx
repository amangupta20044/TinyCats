import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card glass className="p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl border-border/80 space-y-6">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-8xl select-none filter drop-shadow-xl"
        >
          😿
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-foreground">Page Not Found</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Oops! The cat page you are looking for has strayed off into the distance or doesn't exist.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" leftIcon={<Search className="h-4 w-4" />}>
              Explore Directory
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
