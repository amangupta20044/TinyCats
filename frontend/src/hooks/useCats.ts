import { useQuery } from '@tanstack/react-query';
import { catService } from '../services/cat.service';
import type { Cat } from '../types/cat.types';

export const CATS_QUERY_KEY = ['cats'];

export function useCats() {
  return useQuery<Cat[], Error>({
    queryKey: CATS_QUERY_KEY,
    queryFn: () => catService.getAllCats(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
