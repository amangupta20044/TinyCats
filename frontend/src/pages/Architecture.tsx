import React, { useState } from 'react';
import { Layout, Server, Database, Cpu, Sparkles, CheckCircle2, XCircle, Layers } from 'lucide-react';

interface NodeDetail {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  input: string;
  output: string;
  whyExists: string;
  tech: string;
}

const ARCHITECTURE_NODES: Record<string, NodeDetail> = {
  frontend: {
    id: 'frontend',
    name: 'React 19 Frontend',
    role: 'User Interface & State Management',
    responsibilities: [
      'Render responsive UI components with TailwindCSS and Framer Motion animations',
      'Manage client-side caching and mutations via TanStack Query',
      'Provide interactive Quiz Form and Developer Mode Telemetry UI',
    ],
    input: 'User interactions, quiz preferences (Kids, Apartment, Energy)',
    output: 'JSON HTTP requests via Axios instance to Express API',
    whyExists: 'Delivers an engaging, accessible, and fast web application experience to users across devices.',
    tech: 'React 19, Vite, TypeScript, TailwindCSS, TanStack Query, Axios',
  },
  backend: {
    id: 'backend',
    name: 'Express Node.js Backend',
    role: 'API Gateway & Controller Layer',
    responsibilities: [
      'Handle client REST API requests under /api/*',
      'Connect to MongoDB Atlas using Mongoose ODM',
      'Establish SSE transport connection to the remote MCP Server',
      'Enforce environment variable security and CORS policies',
    ],
    input: 'HTTP POST requests from React Frontend',
    output: 'HTTP 200 JSON responses to Frontend',
    whyExists: 'Protects database credentials, orchestrates service logic, and isolates internal microservices.',
    tech: 'Node.js, Express, TypeScript, Mongoose, @modelcontextprotocol/sdk',
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB Database',
    role: 'Persistent Data Store',
    responsibilities: [
      'Store cat breed documents, traits, lifespan, and image URLs',
      'Execute regex search queries over breed names and descriptions',
    ],
    input: 'Mongoose queries (find, create, findById)',
    output: 'BSON document arrays',
    whyExists: 'Provides flexible document storage for cat breed data and user profiles.',
    tech: 'MongoDB Atlas, Mongoose 9',
  },
  mcp: {
    id: 'mcp',
    name: 'MCP Tool Server',
    role: 'Intelligent Tool Orchestrator',
    responsibilities: [
      'Register tools (recommend_cats, get_all_cats) using Zod schemas',
      'Validate input constraints before AI invocation',
      'Expose Server-Sent Events (/sse) and HTTP /messages endpoints',
      'Format raw Gemini text outputs into structured JSON schemas',
    ],
    input: 'SSE message payloads from Backend API',
    output: 'Validated tool execution results and formatted recommendations',
    whyExists: 'Decouples AI tool definitions from backend routes, enabling modular, secure, and reusable AI capabilities.',
    tech: '@modelcontextprotocol/sdk, Express, SSE Transport, Zod',
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini 3.6 Flash AI Engine',
    role: 'Contextual Reasoning Engine',
    responsibilities: [
      'Analyze user preferences against candidate cat breeds',
      'Generate breed compatibility rankings and match scores',
      'Provide natural language explanations for trade-offs',
    ],
    input: 'Structured prompts containing breed context and user preferences',
    output: 'Reasoned recommendation text & rankings',
    whyExists: 'Delivers intelligent, human-like matching and explanation beyond simple database filters.',
    tech: '@google/genai SDK, Gemini 3.6 Flash Model',
  },
};

export const ArchitecturePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(ARCHITECTURE_NODES.frontend!);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          <Layers className="h-4 w-4" />
          <span>System Blueprint & Data Flow</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground">Tiny Cats Architecture</h1>
        <p className="text-sm text-muted-foreground">
          Explore the production-ready microservice pipeline: React Frontend → Express Backend → MongoDB → MCP Server → Gemini AI.
        </p>
      </div>

      {/* Interactive System Architecture Diagram */}
      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-2xl space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h2 className="text-xl font-bold text-foreground">Interactive System Nodes</h2>
          <span className="text-xs text-muted-foreground">Click any node to inspect detailed responsibilities</span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { id: 'frontend', name: '1. React Frontend', icon: Layout, color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' },
            { id: 'backend', name: '2. Express Backend', icon: Server, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
            { id: 'mongodb', name: '3. MongoDB DB', icon: Database, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
            { id: 'mcp', name: '4. MCP Server', icon: Cpu, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30' },
            { id: 'gemini', name: '5. Gemini AI', icon: Sparkles, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
          ].map((n) => {
            const isSelected = selectedNode.id === n.id;
            const Icon = n.icon;

            return (
              <button
                key={n.id}
                onClick={() => setSelectedNode(ARCHITECTURE_NODES[n.id]!)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${n.color} ${
                  isSelected ? 'scale-105 shadow-xl ring-2 ring-primary font-bold' : 'hover:scale-102 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-primary animate-ping" />}
                </div>
                <h3 className="text-sm font-black text-foreground">{n.name}</h3>
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-muted/40 border border-border space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{selectedNode.role}</span>
              <h3 className="text-2xl font-black text-foreground">{selectedNode.name}</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground">
              Tech: {selectedNode.tech}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Responsibilities</h4>
              <ul className="space-y-2 text-xs text-foreground/90">
                {selectedNode.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-1">Input</h4>
                <p className="text-xs text-foreground/90 p-2.5 rounded-xl bg-card border border-border">{selectedNode.input}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-1">Output</h4>
                <p className="text-xs text-foreground/90 p-2.5 rounded-xl bg-card border border-border">{selectedNode.output}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Why It Exists</h4>
              <p className="text-xs text-muted-foreground leading-relaxed p-3 rounded-xl bg-primary/5 border border-primary/10">
                {selectedNode.whyExists}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: "Why MCP?" Comparison Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Why Model Context Protocol (MCP)?</h2>
          <p className="text-xs text-muted-foreground">Comparing direct AI coupling vs tool-orchestrated MCP architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Without MCP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-red-500/5 border border-red-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-red-500 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                <span>Without MCP Architecture</span>
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-500">Tightly Coupled</span>
            </div>

            <div className="p-3 rounded-xl bg-card/60 text-xs font-mono text-muted-foreground">
              Frontend ➔ Gemini API Direct
            </div>

            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2 text-red-400">
                <span>❌</span> Tight coupling between UI components and LLM prompts
              </li>
              <li className="flex items-center gap-2 text-red-400">
                <span>❌</span> Exposes Gemini API keys or prompt logic to frontend
              </li>
              <li className="flex items-center gap-2 text-red-400">
                <span>❌</span> No structured tool validation (e.g. Zod input schemas)
              </li>
              <li className="flex items-center gap-2 text-red-400">
                <span>❌</span> Hard to scale or add new external tool integrations
              </li>
            </ul>
          </div>

          {/* With MCP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-emerald-500 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>With MCP Server Architecture</span>
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">Modular & Production Ready</span>
            </div>

            <div className="p-3 rounded-xl bg-card/60 text-xs font-mono text-muted-foreground">
              Frontend ➔ Backend ➔ MCP Server ➔ Gemini
            </div>

            <ul className="space-y-2.5 text-xs text-foreground">
              <li className="flex items-center gap-2 text-emerald-500 font-medium">
                <span>✔</span> Reusable, modular tool definitions (<code className="text-emerald-400">recommend_cats</code>)
              </li>
              <li className="flex items-center gap-2 text-emerald-500 font-medium">
                <span>✔</span> Centralized AI logic & secure server-to-server SSE execution
              </li>
              <li className="flex items-center gap-2 text-emerald-500 font-medium">
                <span>✔</span> Guaranteed input validation via Zod schemas
              </li>
              <li className="flex items-center gap-2 text-emerald-500 font-medium">
                <span>✔</span> High scalability and effortless tool extension
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
