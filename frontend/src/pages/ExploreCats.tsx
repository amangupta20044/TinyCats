import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CatFilter } from '../components/cats/CatFilter';
import { CatCard } from '../components/cats/CatCard';
import { CatSkeletonGrid } from '../components/cats/CatSkeleton';
import { useCats } from '../hooks/useCats';
import { useDebounce } from '../hooks/useDebounce';
import { useFavorites } from '../hooks/useFavorites';
import type { CatFilterOptions } from '../types/cat.types';
import { Compass, AlertCircle, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ITEMS_PER_PAGE = 6;

export const ExploreCats: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const showFavoritesOnly = searchParams.get('favorite') === 'true';

  const { favorites } = useFavorites();
  const { data: allCats = [], isLoading, isError, error, refetch } = useCats();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<CatFilterOptions>({
    searchQuery: '',
    kidsFriendlyOnly: false,
    apartmentFriendlyOnly: false,
    energyLevel: 'All',
    sortBy: 'name-asc',
  });

  const debouncedSearch = useDebounce(filters.searchQuery, 250);

  const handleFilterChange = (updated: Partial<CatFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      kidsFriendlyOnly: false,
      apartmentFriendlyOnly: false,
      energyLevel: 'All',
      sortBy: 'name-asc',
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  // Instant Suggestions calculation
  const searchSuggestions = useMemo(() => {
    if (!filters.searchQuery.trim()) return [];
    const q = filters.searchQuery.toLowerCase();
    const suggestionsSet = new Set<string>();

    allCats.forEach((cat) => {
      if (cat.name.toLowerCase().includes(q)) suggestionsSet.add(cat.name);
      if (cat.breed.toLowerCase().includes(q)) suggestionsSet.add(cat.breed);
    });

    return Array.from(suggestionsSet).slice(0, 5);
  }, [allCats, filters.searchQuery]);

  // Filtering & Sorting Pipeline
  const filteredCats = useMemo(() => {
    let result = [...allCats];

    // Filter by favorites if requested
    if (showFavoritesOnly) {
      result = result.filter((cat) => favorites.includes(cat._id));
    }

    // Search query filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (cat) =>
          cat.name.toLowerCase().includes(q) ||
          cat.breed.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q)
      );
    }

    // Kids friendly filter
    if (filters.kidsFriendlyOnly) {
      result = result.filter((cat) => cat.kidsFriendly);
    }

    // Apartment friendly filter
    if (filters.apartmentFriendlyOnly) {
      result = result.filter((cat) => cat.apartmentFriendly);
    }

    // Energy level filter
    if (filters.energyLevel !== 'All') {
      result = result.filter(
        (cat) => cat.energyLevel.toLowerCase() === filters.energyLevel.toLowerCase()
      );
    }

    // Sorting logic
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'energy-high': {
          const rank = { High: 3, Medium: 2, Low: 1 };
          const rankA = rank[a.energyLevel as keyof typeof rank] || 0;
          const rankB = rank[b.energyLevel as keyof typeof rank] || 0;
          return rankB - rankA;
        }
        case 'lifespan-high':
          return b.lifeSpan - a.lifeSpan;
        default:
          return 0;
      }
    });

    return result;
  }, [allCats, debouncedSearch, filters, showFavoritesOnly, favorites]);

  // Pagination slice
  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE) || 1;
  const paginatedCats = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCats.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCats, currentPage]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
            <Compass className="h-4 w-4" />
            <span>Cat Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground">
            {showFavoritesOnly ? 'Your Favorite Cats ❤️' : 'Explore Cat Breeds'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {showFavoritesOnly
              ? `Showing ${filteredCats.length} saved favorites in your collection`
              : `Showing ${filteredCats.length} registered breeds available for adoption & care`}
          </p>
        </div>

        {showFavoritesOnly && (
          <Button variant="outline" size="sm" onClick={() => setSearchParams({})}>
            View All Breeds
          </Button>
        )}
      </div>

      {/* Filter Component */}
      <CatFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        suggestions={searchSuggestions}
        onSelectSuggestion={(term) => handleFilterChange({ searchQuery: term })}
      />

      {/* Error State */}
      {isError && (
        <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center space-y-4 max-w-md mx-auto">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <div>
            <h3 className="font-bold text-foreground">Failed to load cat directory</h3>
            <p className="text-xs text-muted-foreground mt-1">{error?.message}</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => refetch()} leftIcon={<RefreshCcw className="h-4 w-4" />}>
            Try Again
          </Button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && <CatSkeletonGrid count={6} />}

      {/* Empty State */}
      {!isLoading && !isError && paginatedCats.length === 0 && (
        <div className="p-12 rounded-3xl bg-card border border-border/80 text-center space-y-4 max-w-md mx-auto">
          <div className="text-6xl select-none">😿</div>
          <h3 className="text-xl font-bold text-foreground">No cats match your filter criteria</h3>
          <p className="text-sm text-muted-foreground">
            {showFavoritesOnly
              ? "You haven't saved any favorite cats yet. Click the heart icon on any cat card to add them!"
              : 'Try clearing your search terms or adjusting energy level filters.'}
          </p>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Cat Grid */}
      {!isLoading && !isError && paginatedCats.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCats.map((cat) => (
              <CatCard key={cat._id} cat={cat} />
            ))}
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-border/60">
              <span className="text-xs text-muted-foreground font-medium">
                Page {currentPage} of {totalPages} ({filteredCats.length} total results)
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  leftIcon={<ChevronLeft className="h-4 w-4" />}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${
                        currentPage === idx + 1
                          ? 'bg-primary text-white shadow-md'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
