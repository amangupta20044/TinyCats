import React, { useState } from 'react';
import { Cpu, Bot, ChevronDown, ChevronUp, ShieldCheck, Wrench, Code2, Database, Sparkles } from 'lucide-react';

export const McpExplanationPanel: React.FC = () => {
  const [openSection, setOpenSection] = useState<'mcp' | 'gemini' | null>('mcp');
  const [geminiTab, setGeminiTab] = useState<'explanation' | 'prompt' | 'response'>('explanation');

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Section 3: Inside the MCP Server */}
      <div className="rounded-3xl bg-card border border-border/80 shadow-md overflow-hidden transition-all">
        <button
          onClick={() => setOpenSection(openSection === 'mcp' ? null : 'mcp')}
          className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground">Section 3: Inside the MCP Server</h3>
              <p className="text-xs text-muted-foreground">The Tool Orchestrator bridging Express Backend and Gemini AI</p>
            </div>
          </div>
          {openSection === 'mcp' ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
        </button>

        {openSection === 'mcp' && (
          <div className="p-6 border-t border-border/60 bg-card/50 space-y-6">
            <p className="text-sm text-foreground/90 leading-relaxed">
              The <strong>Model Context Protocol (MCP) Server</strong> acts as an intelligent tool orchestrator. Instead of the frontend or backend communicating directly with Gemini AI, the backend sends structured requests to the MCP Server over standard SSE/HTTP interfaces.
            </p>

            {/* Core Responsibilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-500 text-sm">
                  <Wrench className="h-4 w-4" />
                  <span>Tool Resolution</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Decides whether to execute <code className="text-indigo-400">recommend_cats</code> or <code className="text-indigo-400">get_all_cats</code> based on input schema.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-500 text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Input Validation</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Uses Zod schemas to guarantee inputs (e.g. <code className="text-emerald-400">kidsFriendly: boolean</code>) before invocation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-500 text-sm">
                  <Code2 className="h-4 w-4" />
                  <span>Structured Output</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Formats Gemini text responses into clean, validated JSON payloads for the frontend.
                </p>
              </div>
            </div>

            {/* Diagram */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-xs space-y-2">
              <div className="font-bold text-foreground">MCP Tool Execution Flow:</div>
              <div className="flex items-center gap-2 flex-wrap text-muted-foreground font-mono text-[11px]">
                <span className="px-2 py-1 rounded bg-card border border-border">Backend API Call</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/30">MCP Endpoint (/sse)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-card border border-border">recommend_cats tool</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30">Gemini 3.6 API</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: What Gemini AI Does */}
      <div className="rounded-3xl bg-card border border-border/80 shadow-md overflow-hidden transition-all">
        <button
          onClick={() => setOpenSection(openSection === 'gemini' ? null : 'gemini')}
          className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-foreground">Section 4: What Gemini AI Does</h3>
              <p className="text-xs text-muted-foreground">Reasoning Engine & Prompt Construction</p>
            </div>
          </div>
          {openSection === 'gemini' ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
        </button>

        {openSection === 'gemini' && (
          <div className="p-6 border-t border-border/60 bg-card/50 space-y-6">
            {/* Inner Sub-Tabs */}
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <button
                onClick={() => setGeminiTab('explanation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  geminiTab === 'explanation' ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                How Gemini Works
              </button>
              <button
                onClick={() => setGeminiTab('prompt')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  geminiTab === 'prompt' ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                Sample Prompt Sent
              </button>
              <button
                onClick={() => setGeminiTab('response')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  geminiTab === 'response' ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                Sample Gemini Output
              </button>
            </div>

            {geminiTab === 'explanation' && (
              <div className="space-y-4">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <strong>Gemini AI does NOT query MongoDB directly.</strong> Instead, the MCP Server fetches verified cat breed documents from MongoDB (or local models), constructs a structured context prompt, and supplies user constraints.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                      <Database className="h-4 w-4 text-emerald-500" />
                      <span>Data Ingestion</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Receives structured JSON of cat breeds (temperament, energy, apartment suitability).</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                    <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Reasoning & Ranking</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Evaluates trade-offs, generates confidence match scores, and explains WHY each breed is chosen.</p>
                  </div>
                </div>
              </div>
            )}

            {geminiTab === 'prompt' && (
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {`System: You are an expert Cat Breed Consultant.
Analyze the following user preferences:
- Kids Friendly: true
- Apartment Friendly: true

Available Cat Data:
[
  { "breed": "Scottish Fold", "apartmentFriendly": true, "kidsFriendly": true, "energyLevel": "Medium" },
  { "breed": "Siamese", "apartmentFriendly": true, "kidsFriendly": true, "energyLevel": "High" }
]

Instructions:
Recommend top breeds, generate confidence match score (0-100), explain pros and cons.`}
              </pre>
            )}

            {geminiTab === 'response' && (
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                {`{
  "recommendedBreed": "Scottish Fold",
  "confidenceScore": 96,
  "reasoning": "Calm temperament and affectionate nature make it ideal for apartment living with kids.",
  "suitableFor": ["Apartment Living", "Families with Children", "Low Noise Environments"],
  "notSuitableFor": ["Outdoors Only Environments"],
  "lifestyleMatchScore": 95
}`}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
