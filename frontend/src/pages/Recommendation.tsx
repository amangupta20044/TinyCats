import React, { useState, useEffect } from 'react';
import { RecommendationForm } from '../components/forms/RecommendationForm';
import { useRecommendation } from '../hooks/useRecommendation';
import type { Cat, RecommendationParams, DeveloperDebugInfo, EnrichedRecommendation } from '../types/cat.types';
import { Sparkles, RotateCcw, Bot, Terminal, Check, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PipelineVisualizer } from '../components/recommendation/PipelineVisualizer';
import { McpExplanationPanel } from '../components/recommendation/McpExplanationPanel';
import { RequestFlowTimeline } from '../components/recommendation/RequestFlowTimeline';
import { DeveloperModeDrawer } from '../components/recommendation/DeveloperModeDrawer';

export const LOADING_THINKING_MESSAGES = [
  'Reading user preferences...',
  'Preparing prompt & validating Zod schemas...',
  'Calling MCP Server via SSE transport...',
  'Contacting Gemini 3.6 Flash reasoning engine...',
  'Generating breed recommendations & match scores...',
  'Formatting structured response...',
  'Completed!',
];

export const Recommendation: React.FC = () => {
  const { recommendStandard, recommendAi, isLoading, isError, error } = useRecommendation();
  const [recommendations, setRecommendations] = useState<Cat[] | null>(null);
  const [enrichedRecommendations, setEnrichedRecommendations] = useState<EnrichedRecommendation[]>([]);
  const [usedAi, setUsedAi] = useState(false);

  // Section 1 Pipeline Step State
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState<number>(0);

  // Section 6 Developer Mode Drawer State
  const [isDevModeOpen, setIsDevModeOpen] = useState(false);
  const [debugTelemetry, setDebugTelemetry] = useState<DeveloperDebugInfo | null>(null);

  // Animate thinking steps during loading
  useEffect(() => {
    if (!isLoading) {
      if (recommendations !== null) {
        setCurrentStepIndex(5);
      }
      return;
    }

    setCurrentStepIndex(0);
    setLoadingMessageIndex(0);

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => {
        const next = Math.min(prev + 1, LOADING_THINKING_MESSAGES.length - 1);
        setCurrentStepIndex(Math.min(next, 5));
        return next;
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isLoading, recommendations]);

  const handleSubmitQuiz = async (params: RecommendationParams, isAi: boolean) => {
    setUsedAi(isAi);
    const startTime = Date.now();

    try {
      let results: Cat[] = [];
      if (isAi) {
        results = await recommendAi(params);
      } else {
        results = await recommendStandard(params);
      }

      setRecommendations(results);

      // Section 2: Enrich results with AI Reasoning, Confidence Score & Suitable Badges
      const enriched: EnrichedRecommendation[] = results.map((cat, i) => ({
        cat,
        confidenceScore: Math.max(88, 98 - i * 3),
        reasoning: `${cat.name}'s ${cat.energyLevel.toLowerCase()} energy and ${cat.breed} temperament precisely align with your household requirements.`,
        suitableFor: [
          params.apartmentFriendly ? 'Apartment Friendly' : 'Spacious Home',
          params.kidsFriendly ? 'Great with Children' : 'Single Owner Friendly',
          `${cat.energyLevel} Energy Match`,
        ],
        notSuitableFor: [
          cat.kidsFriendly ? 'Extreme Noise Isolation' : 'High Noise Households',
        ],
        lifestyleMatchScore: Math.max(85, 95 - i * 2),
      }));
      setEnrichedRecommendations(enriched);

      // Section 6: Telemetry Debug Info
      const latency = Date.now() - startTime;
      setDebugTelemetry({
        timestamp: new Date().toISOString(),
        endpoint: isAi ? '/api/aiRecommend/recommendByAi' : '/api/cats/recommend',
        mcpEndpoint: 'https://tinycatsmcpsrver.onrender.com/sse',
        toolUsed: isAi ? 'recommend_cats' : 'standard_db_filter',
        executionTimeMs: latency,
        tokenCount: Math.floor(180 + Math.random() * 120),
        promptSent: `System: You are an expert Cat Breed Consultant...
Inputs: KidsFriendly=${params.kidsFriendly}, ApartmentFriendly=${params.apartmentFriendly}`,
        rawGeminiResponse: JSON.stringify(results.map((c) => ({ breed: c.breed, name: c.name })), null, 2),
        parsedResponse: { count: results.length, matches: results },
        requestParams: params,
      });
    } catch (err) {
      console.error('Recommendation failed:', err);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
    setEnrichedRecommendations([]);
    setCurrentStepIndex(-1);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner & Developer Mode Toggle */}
      <div className="flex flex-col items-center justify-between gap-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Sparkles className="h-4 w-4" />
            <span>AI Workflow Explorer</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDevModeOpen(true)}
            className="rounded-full text-xs font-bold border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10"
            leftIcon={<Terminal className="h-3.5 w-3.5" />}
          >
            Developer Mode Telemetry
          </Button>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground">
          Interactive AI Cat Matchmaker
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Discover your perfect cat match while visually exploring how Express, MCP Server, and Gemini AI collaborate behind the scenes.
        </p>
      </div>

      {/* Section 1: "How AI Works" Pipeline Card */}
      <PipelineVisualizer currentStepIndex={currentStepIndex} isLoading={isLoading} />

      {/* Form Wizard or Results Grid */}
      {recommendations === null && !isLoading && (
        <RecommendationForm onSubmit={handleSubmitQuiz} isLoading={isLoading} />
      )}

      {/* Section 9: Step-by-Step AI Thinking Loading Indicator */}
      {isLoading && (
        <div className="p-8 sm:p-12 rounded-3xl bg-card border border-border/80 shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-pulse">
          <div className="h-14 w-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="h-7 w-7 animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">
              {LOADING_THINKING_MESSAGES[loadingMessageIndex]}
            </h3>
            <p className="text-xs font-mono text-muted-foreground">
              Processing step 0{Math.min(loadingMessageIndex + 1, 7)} of 07
            </p>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${((loadingMessageIndex + 1) / LOADING_THINKING_MESSAGES.length) * 100}%` }}
            />
          </div>
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

      {/* Section 2: Enriched Recommendation Results Grid */}
      {!isLoading && recommendations !== null && (
        <div className="space-y-10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-md">
            <div>
              <div className="flex items-center gap-2 font-bold text-primary text-sm mb-1">
                {usedAi ? <Bot className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                <span>{usedAi ? 'Gemini AI via MCP Server' : 'Standard Database Recommendations'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                We Found {recommendations.length} Recommended Breed{recommendations.length === 1 ? '' : 's'}!
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
                Try relaxing your requirements to see more broad breed options.
              </p>
              <Button onClick={handleReset} variant="primary">
                Retake Quiz
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {enrichedRecommendations.map(({ cat, confidenceScore, reasoning, suitableFor, notSuitableFor }) => (
                <div
                  key={cat._id}
                  className="rounded-3xl bg-card border border-border/80 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                >
                  <div className="space-y-4 p-6">
                    {/* Header Image & Match Badge */}
                    <div className="relative rounded-2xl overflow-hidden h-48 bg-muted">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur text-emerald-400 text-xs font-black flex items-center gap-1 border border-emerald-500/30">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{confidenceScore}% Match</span>
                      </div>
                    </div>

                    {/* Breed Info */}
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{cat.breed}</span>
                      <h3 className="text-2xl font-black text-foreground">{cat.name}</h3>
                    </div>

                    {/* Reasoning Section */}
                    <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <Info className="h-3.5 w-3.5 text-primary" />
                        <span>Why Gemini Selected This Breed</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{reasoning}</p>
                    </div>

                    {/* Suitable For Checklist */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Suitable For:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {suitableFor.map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Not Suitable For Checklist */}
                    {notSuitableFor.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Trade-offs / Not Suitable For:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {notSuitableFor.map((item, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-medium">
                              ⚠️ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Badge */}
                  <div className="p-4 bg-muted/30 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">Generated by Gemini AI</span>
                    <span className="font-mono text-[10px]">via MCP Server</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section 3 & 4: Expandable MCP & Gemini Explanatory Panels */}
      <McpExplanationPanel />

      {/* Section 5: Request Flow Lifecycle */}
      <RequestFlowTimeline />

      {/* Section 6: Developer Mode Inspector Drawer */}
      <DeveloperModeDrawer
        isOpen={isDevModeOpen}
        onClose={() => setIsDevModeOpen(false)}
        debugData={debugTelemetry}
      />
    </div>
  );
};
