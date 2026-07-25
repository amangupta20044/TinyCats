import { useQuery } from '@tanstack/react-query';
import { catService } from '../services/cat.service';
import type { Cat } from '../types/cat.types';

export function useCat(id?: string) {
  return useQuery<Cat, Error>({
    queryKey: ['cat', id],
    queryFn: () => {
      if (!id) throw new Error('Cat ID is required');
      return catService.getCatById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
