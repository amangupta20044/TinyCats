import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ENERGY_LEVELS, SORT_OPTIONS } from '../../constants';
import type { CatFilterOptions } from '../../types/cat.types';

export interface CatFilterProps {
  filters: CatFilterOptions;
  onFilterChange: (updated: Partial<CatFilterOptions>) => void;
  onReset: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (term: string) => void;
}

export const CatFilter: React.FC<CatFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  suggestions = [],
  onSelectSuggestion,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Input with Instant Suggestions */}
        <div className="md:col-span-5 relative">
          <Input
            placeholder="Search by cat name, breed..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            leftIcon={<Search className="h-4 w-4" />}
          />

          {/* Instant Suggestions Dropdown */}
          {isFocused && suggestions.length > 0 && filters.searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-xl z-30 overflow-hidden py-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Matching Suggestions
              </div>
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (onSelectSuggestion) onSelectSuggestion(item);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center justify-between"
                >
                  <span>{item}</span>
                  <span className="text-xs text-primary font-medium">Select</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Energy Level Filter */}
        <div className="md:col-span-3">
          <Select
            value={filters.energyLevel}
            onChange={(e) => onFilterChange({ energyLevel: e.target.value })}
            options={ENERGY_LEVELS.map((level) => ({
              label: level === 'All' ? 'All Energy Levels' : `${level} Energy`,
              value: level,
            }))}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="md:col-span-4">
          <Select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({ sortBy: e.target.value as CatFilterOptions['sortBy'] })
            }
            options={SORT_OPTIONS.map((opt) => ({
              label: `Sort: ${opt.label}`,
              value: opt.value,
            }))}
          />
        </div>
      </div>

      {/* Toggles & Reset Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/80 hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={filters.kidsFriendlyOnly}
              onChange={(e) => onFilterChange({ kidsFriendlyOnly: e.target.checked })}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <span>👶 Kid Friendly Only</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/80 hover:bg-muted transition-colors">
            <input
              type="checkbox"
              checked={filters.apartmentFriendlyOnly}
              onChange={(e) => onFilterChange({ apartmentFriendlyOnly: e.target.checked })}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
            />
            <span>🏢 Apartment Friendly Only</span>
          </label>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
