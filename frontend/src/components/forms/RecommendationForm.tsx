import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check, Bot, Settings2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { RecommendationParams } from '../../types/cat.types';

export interface RecommendationFormProps {
  onSubmit: (params: RecommendationParams, isAi: boolean) => void;
  isLoading: boolean;
}

export const RecommendationForm: React.FC<RecommendationFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [step, setStep] = useState(1);
  const [isAiMode, setIsAiMode] = useState(true);

  const [formState, setFormState] = useState<RecommendationParams>({
    kidsFriendly: true,
    apartmentFriendly: true,
    energyPreference: 'Medium',
    longHair: false,
    shortHair: true,
    quiet: false,
    playful: true,
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState, isAiMode);
  };

  return (
    <Card glass className="p-6 md:p-10 max-w-2xl mx-auto shadow-2xl border-border/80 relative overflow-hidden">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Matchmaker</span>
          </div>
          <h2 className="text-2xl font-black text-foreground">Cat Recommendation Wizard</h2>
        </div>

        {/* AI / Standard Toggle pill */}
        <div className="flex items-center gap-1.5 bg-muted/80 p-1.5 rounded-2xl border border-border/60 shadow-inner self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAiMode(false)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              !isAiMode
                ? 'bg-amber-400 text-amber-950 shadow-lg shadow-amber-400/30 scale-[1.02] border border-amber-300'
                : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
            }`}
          >
            <Settings2 className="h-4 w-4" />
            <span>Standard API</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAiMode(true)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              isAiMode
                ? 'bg-amber-400 text-amber-950 shadow-lg shadow-amber-400/30 scale-[1.02] border border-amber-300'
                : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>AI Recommended</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-amber-400"
            initial={{ width: '25%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmitForm}>
        <AnimatePresence mode="wait">
          {/* Step 1: Kids & Apartment */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-foreground">Living Environment & Family</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Do you have children at home?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormState((prev) => ({ ...prev, kidsFriendly: true }))}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formState.kidsFriendly
                          ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                          : 'border-border bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-1">👶 Yes</div>
                      <div className="text-xs text-muted-foreground">Gentle & child-safe breed needed</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormState((prev) => ({ ...prev, kidsFriendly: false }))}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        !formState.kidsFriendly
                          ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                          : 'border-border bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏡 No Kids</div>
                      <div className="text-xs text-muted-foreground">Adult-only household</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Do you live in an apartment?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormState((prev) => ({ ...prev, apartmentFriendly: true }))}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formState.apartmentFriendly
                          ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                          : 'border-border bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏢 Apartment</div>
                      <div className="text-xs text-muted-foreground">Loves cozy indoor spaces</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormState((prev) => ({ ...prev, apartmentFriendly: false }))}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        !formState.apartmentFriendly
                          ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                          : 'border-border bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-1">🌳 House with Yard</div>
                      <div className="text-xs text-muted-foreground">Loves room to roam</div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Energy Level */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-foreground">Energy Level Preference</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { level: 'High', emoji: '⚡', title: 'High Energy', desc: 'Playful, energetic, high activity' },
                  { level: 'Medium', emoji: '⚖️', title: 'Balanced', desc: 'Active play & relaxing cuddle time' },
                  { level: 'Low', emoji: '🛋️', title: 'Calm & Laid back', desc: 'Loves couch naps & peaceful surroundings' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setFormState((prev) => ({ ...prev, energyPreference: item.level }))}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      formState.energyPreference === item.level
                        ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                        : 'border-border bg-card hover:bg-muted text-foreground'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{item.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Coat Length */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-foreground">Coat & Grooming Preference</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, shortHair: true, longHair: false }))
                  }
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    formState.shortHair
                      ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                      : 'border-border bg-card hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="text-3xl mb-2">🐈‍⬛ Short Hair</div>
                  <div className="text-xs text-muted-foreground">Low maintenance coat, quick brushing</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, longHair: true, shortHair: false }))
                  }
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    formState.longHair
                      ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                      : 'border-border bg-card hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="text-3xl mb-2">🦁 Fluffy / Long Hair</div>
                  <div className="text-xs text-muted-foreground">Plush coat, luxurious grooming bonding</div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Temperament */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-foreground">Temperament & Personality</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, quiet: !prev.quiet }))
                  }
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    formState.quiet
                      ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                      : 'border-border bg-card hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-3xl">🤫</span>
                    {formState.quiet && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="font-bold text-sm">Quiet Companion</div>
                  <div className="text-xs text-muted-foreground">Soft meows, calm vocal tendencies</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, playful: !prev.playful }))
                  }
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    formState.playful
                      ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                      : 'border-border bg-card hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-3xl">🧶</span>
                    {formState.playful && <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="font-bold text-sm">Playful & Curious</div>
                  <div className="text-xs text-muted-foreground">Loves feather wands & interactive toys</div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/60">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="shadow-lg shadow-orange-500/25"
              leftIcon={<Sparkles className="h-5 w-5" />}
            >
              {isAiMode ? 'Get AI Recommendations' : 'Get Recommendations'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
