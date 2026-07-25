import { useMutation } from '@tanstack/react-query';
import { catService } from '../services/cat.service';
import type { Cat, RecommendationParams } from '../types/cat.types';

export function useRecommendation() {
  const standardMutation = useMutation<Cat[], Error, RecommendationParams>({
    mutationFn: (params) => catService.recommendCats(params),
  });

  const aiMutation = useMutation<Cat[], Error, RecommendationParams>({
    mutationFn: (params) => catService.recommendByAi(params),
  });

  return {
    recommendStandard: standardMutation.mutateAsync,
    recommendAi: aiMutation.mutateAsync,
    isLoading: standardMutation.isPending || aiMutation.isPending,
    isError: standardMutation.isError || aiMutation.isError,
    error: standardMutation.error || aiMutation.error,
    data: standardMutation.data || aiMutation.data,
    reset: () => {
      standardMutation.reset();
      aiMutation.reset();
    },
  };
}
