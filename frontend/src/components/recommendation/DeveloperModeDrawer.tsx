import React, { useState } from 'react';
import type { DeveloperDebugInfo } from '../../types/cat.types';
import { Terminal, Cpu, Activity, Clock, X } from 'lucide-react';

interface DeveloperModeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  debugData: DeveloperDebugInfo | null;
}

export const DeveloperModeDrawer: React.FC<DeveloperModeDrawerProps> = ({ isOpen, onClose, debugData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prompt' | 'raw' | 'parsed'>('overview');

  if (!isOpen) return null;

  const mockData: DeveloperDebugInfo = debugData || {
    timestamp: new Date().toISOString(),
    endpoint: '/api/aiRecommend/recommendByAi',
    mcpEndpoint: 'https://tinycatsmcpsrver.onrender.com/sse',
    toolUsed: 'recommend_cats',
    executionTimeMs: 412,
    tokenCount: 284,
    promptSent: `System: You are an expert Cat Breed Consultant...
Input Parameters:
- Kids Friendly: true
- Apartment Friendly: true

Recommend best matching breeds from available data.`,
    rawGeminiResponse: `{\n  "recommendedBreed": "Scottish Fold",\n  "confidenceScore": 96,\n  "reasoning": "Quiet, gentle, and highly adaptable.",\n  "suitableFor": ["Apartments", "Kids"]\n}`,
    parsedResponse: {
      recommendedBreed: 'Scottish Fold',
      confidenceScore: 96,
      reasoning: 'Quiet, gentle, and highly adaptable.',
      suitableFor: ['Apartments', 'Kids'],
    },
    requestParams: { kidsFriendly: true, apartmentFriendly: true },
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-slate-950 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Developer Mode Telemetry</h3>
            <p className="text-[11px] text-slate-400">Live API, Prompt & MCP Telemetry Inspector</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Clock className="h-3 w-3 text-amber-400" /> Execution
          </span>
          <p className="font-mono font-bold text-amber-400">{mockData.executionTimeMs} ms</p>
        </div>

        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Activity className="h-3 w-3 text-emerald-400" /> Tokens
          </span>
          <p className="font-mono font-bold text-emerald-400">{mockData.tokenCount} tokens</p>
        </div>

        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            <Cpu className="h-3 w-3 text-indigo-400" /> MCP Tool
          </span>
          <p className="font-mono font-bold text-indigo-400 text-[11px] truncate">{mockData.toolUsed}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 px-4 pt-2 gap-2 text-xs bg-slate-900/40">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 border-b-2 font-semibold transition-colors ${
            activeTab === 'overview' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Endpoints
        </button>
        <button
          onClick={() => setActiveTab('prompt')}
          className={`px-3 py-2 border-b-2 font-semibold transition-colors ${
            activeTab === 'prompt' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Prompt Sent
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`px-3 py-2 border-b-2 font-semibold transition-colors ${
            activeTab === 'raw' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Raw AI Output
        </button>
        <button
          onClick={() => setActiveTab('parsed')}
          className={`px-3 py-2 border-b-2 font-semibold transition-colors ${
            activeTab === 'parsed' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Parsed Payload
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Backend Endpoint</span>
              <p className="text-emerald-400 font-semibold">{mockData.endpoint}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">MCP Transport SSE URL</span>
              <p className="text-indigo-400 font-semibold">{mockData.mcpEndpoint}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Request Parameters</span>
              <pre className="text-slate-300 leading-relaxed">{JSON.stringify(mockData.requestParams, null, 2)}</pre>
            </div>
          </div>
        )}

        {activeTab === 'prompt' && (
          <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed">
            {mockData.promptSent}
          </pre>
        )}

        {activeTab === 'raw' && (
          <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 whitespace-pre-wrap leading-relaxed">
            {mockData.rawGeminiResponse}
          </pre>
        )}

        {activeTab === 'parsed' && (
          <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 whitespace-pre-wrap leading-relaxed">
            {JSON.stringify(mockData.parsedResponse, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
