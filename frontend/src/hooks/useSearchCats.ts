import { useQuery } from '@tanstack/react-query';
import { catService } from '../services/cat.service';
import type { Cat } from '../types/cat.types';

export function useSearchCats(query: string) {
  return useQuery<Cat[], Error>({
    queryKey: ['cats', 'search', query],
    queryFn: () => catService.searchCats(query),
    enabled: true,
  });
}
