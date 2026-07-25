import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 md:px-8 max-w-7xl mx-auto">
      <ol className="flex items-center space-x-2 text-xs md:text-sm text-muted-foreground">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
              {isLast ? (
                <span className="font-semibold text-primary capitalize truncate max-w-[150px]">
                  {formattedName}
                </span>
              ) : (
                <Link to={to} className="hover:text-primary transition-colors capitalize">
                  {formattedName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
