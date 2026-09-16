import React from 'react';
import {
  HelpCircle,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Target,
  Compass,
  Link2,
  CheckCircle2,
  Users,
  Bot,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';
import { BrandProjectConfig } from '../types';

interface HowItWorksTabProps {
  brandConfig: BrandProjectConfig;
  onOpenSettings: () => void;
  onOpenGenerator: () => void;
  onOpenSandbox: () => void;
}

export const HowItWorksTab: React.FC<HowItWorksTabProps> = ({
  brandConfig,
  onOpenSettings,
  onOpenGenerator,
  onOpenSandbox,
}) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-sky-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                Methodology &amp; Architecture
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">Generative Engine Optimization (GEO)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How Prompt Visibility Tracker Works
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Understand the shift from 10 blue links to AI search engine recommendations. See what problems this solves, what data you provide, and the strategic metrics you receive to optimize <strong className="text-indigo-600 font-semibold">{brandConfig.brandName}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
            >
              <span>Edit Brand Settings</span>
            </button>
            <button
              onClick={onOpenSandbox}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Test Live Query</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Blocks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. What Issue It Resolves */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pillar 1</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3">
              What Issue It Resolves
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Travel search has moved from keyword matching to contextual conversation. Traditional SEO leaves major blindspots:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Target className="h-3.5 w-3.5 text-rose-500" />
                  Winner-Take-All AI Answers
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  LLMs answer with 2–3 platforms. Being position #4 or #5 means zero traveler clicks or revenue.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Users className="h-3.5 w-3.5 text-indigo-500" />
                  The Unprompted Blindspot
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Brands test themselves by typing their own name into ChatGPT. But real travelers ask open questions without brand names.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Bot className="h-3.5 w-3.5 text-sky-500" />
                  Aggregator Bias &amp; Citation Gaps
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Aggregators dominate generic web crawls. Prompt Visibility Tracker identifies when and why models skip specialized local tour operators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. What User Should Provide */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Pillar 2</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3">
              What You Should Provide
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Simple configuration points in your project settings that customize the simulation for your travel company:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 mb-1 flex items-center justify-between">
                  <span>1. Brand Identity &amp; Domain</span>
                  <span className="text-[10px] text-indigo-600 font-mono">Current: {brandConfig.brandName}</span>
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Your official brand name and domain (e.g. <code>{brandConfig.brandDomain}</code>) to measure unprompted brand name presence and direct hyperlink citations.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 mb-1">
                  2. Competitors to Benchmark
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Rivals like Viator, GetYourGuide, Withlocals, and Tripadvisor. Used to compute comparative Share of Voice (SoV).
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 mb-1">
                  3. Target Destinations &amp; Persona Profiles
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Key markets (Rome, Tokyo, Paris) and traveler constraints (families, senior mobility, tight budgets, luxury private guides).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. What You Expect to See */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Pillar 3</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3">
              What You Expect to See
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Clear, executive-ready metrics that translate LLM outputs into commercial search intelligence:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  AI Visibility Score (0–100)
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  A composite performance indicator uniting unprompted presence, citation rate, average recommendation rank, and sentiment.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Unprompted Mention Rate (%)
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  How often models recommend your brand when the user has not mentioned you in their prompt.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Share of Voice vs Competitors
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Market share comparison across Gemini, ChatGPT Search, Perplexity, Claude, and Copilot.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Actionable GEO Action Playbook
                </h4>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Specific content, schema markups, and authority citations needed to win the queries you currently lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Traditional SEO vs AI GEO Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs overflow-hidden">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Comparison: Traditional Travel SEO vs. Generative Engine Optimization (GEO)
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Why traditional rank tracking tools fail to measure modern conversational travel discovery.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold">Evaluation Dimension</th>
                <th className="py-3 px-4 font-semibold text-slate-500">Traditional Search SEO</th>
                <th className="py-3 px-4 font-semibold text-indigo-700 bg-indigo-50/60">Generative AI Search (GEO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Query Structure</td>
                <td className="py-3 px-4">Short keyword strings (<em>"rome private guide"</em>)</td>
                <td className="py-3 px-4 bg-indigo-50/20 font-medium text-indigo-950">
                  Multi-constraint natural prompts (<em>"Family with 2 kids in Rome, skip-the-line Colosseum, budget $400"</em>)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Output Format</td>
                <td className="py-3 px-4">10 blue organic link snippets + ad slots</td>
                <td className="py-3 px-4 bg-indigo-50/20 font-medium text-indigo-950">
                  Synthesized direct answer naming 2–3 recommended platforms and citing 1–2 sources
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Success Metric</td>
                <td className="py-3 px-4">SERP rank position (e.g. Position #3)</td>
                <td className="py-3 px-4 bg-indigo-50/20 font-medium text-indigo-950">
                  Unprompted Recommendation Rate, Domain Citation Rate, and Sentiment Alignment
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Ranking Factors</td>
                <td className="py-3 px-4">Backlinks, meta tags, exact-match anchors</td>
                <td className="py-3 px-4 bg-indigo-50/20 font-medium text-indigo-950">
                  Brand entity sentiment, Reddit/Forum consensus, structured schema, domain authority citations
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-900">Auditing Method</td>
                <td className="py-3 px-4">Google Search Console &amp; standard SERP scrapers</td>
                <td className="py-3 px-4 bg-indigo-50/20 font-medium text-indigo-950">
                  Multi-persona synthetic prompt fan-out and real-time LLM grounding audits (Prompt Visibility Tracker)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
