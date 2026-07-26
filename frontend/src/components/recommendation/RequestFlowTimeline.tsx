import React, { useState } from 'react';
import { CheckCircle2, Circle, Play, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export const REQUEST_STEPS = [
  { step: 1, title: 'User Submits Preferences', desc: 'User completes Quiz Form (Kids, Apartment, Energy).' },
  { step: 2, title: 'Frontend Calls Backend API', desc: 'POST /api/aiRecommend/recommendByAi sent via Axios.' },
  { step: 3, title: 'Backend Calls MCP Server', desc: 'Express service invokes getMcpClient() SSE transport endpoint.' },
  { step: 4, title: 'MCP Server Prepares AI Prompt', desc: 'Executes recommend_cats tool and validates Zod schema.' },
  { step: 5, title: 'Gemini Generates Recommendation', desc: 'Gemini 3.6 Flash processes prompt and reasons over breed options.' },
  { step: 6, title: 'MCP Validates & Formats Output', desc: 'MCP formats text output into structured JSON schema.' },
  { step: 7, title: 'Backend Returns API JSON', desc: 'Express controller responds with HTTP 200 JSON payload.' },
  { step: 8, title: 'Frontend Renders AI Match Cards', desc: 'React components display interactive breed match results.' },
];

export const RequestFlowTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current > 8) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStep(current);
      }
    }, 600);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xl space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Section 5</span>
          <h2 className="text-2xl font-black text-foreground">Interactive Request Lifecycle Flow</h2>
          <p className="text-xs text-muted-foreground">Trace the exact 8-step journey of a single recommendation request</p>
        </div>
        <Button
          onClick={startSimulation}
          disabled={isSimulating}
          variant="primary"
          size="sm"
          leftIcon={isSimulating ? <RotateCcw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
        >
          {isSimulating ? 'Simulating Step Flow...' : 'Simulate Request Journey'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
        {REQUEST_STEPS.map((s) => {
          const isDone = activeStep >= s.step;
          const isCurrent = activeStep === s.step;

          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                isCurrent
                  ? 'bg-primary/15 border-primary shadow-md scale-[1.02] ring-2 ring-primary/30'
                  : isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-muted/30 border-border/50 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/40" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Step {s.step}
                  </span>
                  <h4 className="text-sm font-bold text-foreground">{s.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
