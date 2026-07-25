import { useMutation, useQueryClient } from '@tanstack/react-query';
import { catService } from '../services/cat.service';
import { CATS_QUERY_KEY } from './useCats';
import type { Cat, CreateCatPayload } from '../types/cat.types';
import { toast } from 'sonner';

export function useCreateCat() {
  const queryClient = useQueryClient();

  return useMutation<Cat, Error, CreateCatPayload>({
    mutationFn: (payload) => catService.createCat(payload),
    onSuccess: (newCat) => {
      toast.success(`🎉 ${newCat.name} was successfully added to Tiny Cats!`);
      queryClient.invalidateQueries({ queryKey: CATS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create cat profile.');
    },
  });
}
