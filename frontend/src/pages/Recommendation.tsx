import React, { useState } from 'react';
import { RecommendationForm } from '../components/forms/RecommendationForm';
import { CatCard } from '../components/cats/CatCard';
import { CatSkeletonGrid } from '../components/cats/CatSkeleton';
import { useRecommendation } from '../hooks/useRecommendation';
import type { Cat, RecommendationParams } from '../types/cat.types';
import { Sparkles, RotateCcw, Bot } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Recommendation: React.FC = () => {
  const { recommendStandard, recommendAi, isLoading, isError, error } = useRecommendation();
  const [recommendations, setRecommendations] = useState<Cat[] | null>(null);
  const [usedAi, setUsedAi] = useState(false);

  const handleSubmitQuiz = async (params: RecommendationParams, isAi: boolean) => {
    setUsedAi(isAi);
    try {
      let results: Cat[] = [];
      if (isAi) {
        results = await recommendAi(params);
      } else {
        results = await recommendStandard(params);
      }
      setRecommendations(results);
    } catch (err) {
      console.error('Recommendation failed:', err);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <Sparkles className="h-4 w-4" />
          <span>Tailored Cat Matchmaker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">Find Your Matched Cat</h1>
        <p className="text-sm text-muted-foreground">
          Answer a few quick questions about your home environment, family, and preferred energy level to receive personalized recommendations.
        </p>
      </div>

      {/* Form Wizard or Results Grid */}
      {recommendations === null && (
        <RecommendationForm onSubmit={handleSubmitQuiz} isLoading={isLoading} />
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 animate-spin" />
            <span>Analyzing your preferences and calculating breed compatibility...</span>
          </div>
          <CatSkeletonGrid count={3} />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 text-center space-y-4 max-w-md mx-auto">
          <h3 className="font-bold text-foreground">Failed to process recommendation</h3>
          <p className="text-xs text-muted-foreground">{error?.message}</p>
          <Button onClick={handleReset} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Recommendation Results Grid */}
      {!isLoading && recommendations !== null && (
        <div className="space-y-8 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-card border border-border/80 shadow-md">
            <div>
              <div className="flex items-center gap-2 font-bold text-primary text-sm mb-1">
                {usedAi ? <Bot className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                <span>{usedAi ? 'AI Powered Recommendations' : 'Standard Recommendations'}</span>
              </div>
              <h2 className="text-2xl font-black text-foreground">
                We Found {recommendations.length} Matching Breed{recommendations.length === 1 ? '' : 's'}!
              </h2>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              leftIcon={<RotateCcw className="h-4 w-4" />}
            >
              Retake Quiz
            </Button>
          </div>

          {recommendations.length === 0 ? (
            <div className="p-12 text-center space-y-4 rounded-3xl bg-card border border-border">
              <div className="text-5xl">🐱</div>
              <h3 className="text-xl font-bold">No exact cat matches found</h3>
              <p className="text-sm text-muted-foreground">
                Try relaxing your apartment or kids requirement to see more broad breed options.
              </p>
              <Button onClick={handleReset} variant="primary">
                Retake Quiz
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((cat) => (
                <CatCard key={cat._id} cat={cat} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
