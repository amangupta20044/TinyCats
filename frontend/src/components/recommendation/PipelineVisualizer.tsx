import React from 'react';
import { User, Layout, Server, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface PipelineVisualizerProps {
  currentStepIndex: number;
  isLoading: boolean;
}

export const PIPELINE_STEPS = [
  { id: 'user', label: 'User Preferences', icon: User, desc: 'Inputs: Kids, Apartment, Energy' },
  { id: 'frontend', label: 'React Frontend', icon: Layout, desc: 'Axios Request + State' },
  { id: 'backend', label: 'Backend API', icon: Server, desc: 'Express Router & Controller' },
  { id: 'mcp', label: 'MCP Server', icon: Cpu, desc: 'Tool Orchestrator (recommend_cats)' },
  { id: 'gemini', label: 'Gemini 3.6 AI', icon: Sparkles, desc: 'Reasoning Engine & Prompting' },
  { id: 'output', label: 'Structured Match', icon: CheckCircle2, desc: 'Parsed JSON Response' },
];

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ currentStepIndex, isLoading }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xl space-y-6 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Architecture In Action</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">How AI Recommendation Works</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Real-time End-to-End Execution Flow</span>
        </div>
      </div>

      {/* Pipeline Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
        {PIPELINE_STEPS.map((step, idx) => {
          const isActive = isLoading && currentStepIndex === idx;
          const isCompleted = currentStepIndex > idx || (!isLoading && currentStepIndex >= 0);
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative ${
                isActive
                  ? 'bg-primary/15 border-primary text-primary shadow-lg shadow-orange-500/20 scale-105 ring-2 ring-primary/40'
                  : isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-foreground'
                  : 'bg-muted/30 border-border/60 text-muted-foreground'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-primary text-white animate-bounce'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold opacity-60">0{idx + 1}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold tracking-tight mb-1 text-foreground">
                  {step.label}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{step.desc}</p>
              </div>

              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight
                    className={`h-4 w-4 ${
                      isCompleted ? 'text-emerald-500' : 'text-muted-foreground/30'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
