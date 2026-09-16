import React, { useState } from 'react';
import {
  Lightbulb,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Sparkles,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { GeoOpportunity, BrandProjectConfig, PromptItem } from '../types';

interface GeoOpportunitiesTabProps {
  opportunities: GeoOpportunity[];
  brandConfig: BrandProjectConfig;
  prompts: PromptItem[];
  onInspectQuery: (queryText: string) => void;
  onGenerateGeoAdvice: () => Promise<void>;
  isGeneratingAdvice: boolean;
}

export const GeoOpportunitiesTab: React.FC<GeoOpportunitiesTabProps> = ({
  opportunities,
  brandConfig,
  prompts,
  onInspectQuery,
  onGenerateGeoAdvice,
  isGeneratingAdvice,
}) => {
  const missedPrompts = prompts.filter(
    (p) => p.status === 'completed' && p.lastResult && !p.lastResult.brandMentioned
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            <span>GEO Opportunities &amp; Content Strategy</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Queries where travel competitors win AI recommendations while <span className="text-indigo-700 font-semibold">{brandConfig.brandName}</span> is omitted, with actionable Generative Engine Optimization (GEO) tactics.
          </p>
        </div>

        <button
          onClick={onGenerateGeoAdvice}
          disabled={isGeneratingAdvice}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-xs"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isGeneratingAdvice ? 'Analyzing LLMs...' : 'Refresh AI Optimization Advice'}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Missed Queries</span>
          <div className="text-3xl font-black text-slate-900 font-mono mt-1">
            {missedPrompts.length}
          </div>
          <p className="text-xs text-rose-600 font-medium mt-1">Queries where competitors captured 100% voice</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Top Competitors in Gaps</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            Viator &amp; GetYourGuide
          </div>
          <p className="text-xs text-slate-500 mt-1">Dominating high-volume attraction search intents</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Potential AI Visibility Lift</span>
          <div className="text-3xl font-black text-emerald-600 font-mono mt-1">
            +28%
          </div>
          <p className="text-xs text-slate-500 mt-1">Estimated mention growth with recommended schema &amp; FAQs</p>
        </div>
      </div>

      {/* Actionable Opportunity Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Prioritized Opportunity Backlog</h3>

        <div className="space-y-4">
          {opportunities.map((opp) => {
            const isCritical = opp.priority === 'Critical';
            const isHigh = opp.priority === 'High';

            return (
              <div
                key={opp.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isCritical
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : isHigh
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {opp.priority} Priority
                    </span>
                    <span className="text-xs text-slate-600 font-medium">{opp.destination}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-600">{opp.personaName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-indigo-700 font-medium">{opp.stage}</span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Potential Lift: {opp.potentialLift}
                  </span>
                </div>

                {/* Query */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="text-xs text-slate-500 font-medium mb-0.5">Target Query:</div>
                  <div className="text-sm font-semibold text-slate-900">"{opp.query}"</div>
                  <div className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                    <span>Competitor winning LLM answer:</span>
                    <strong className="text-rose-700 font-bold">{opp.competitorWinner}</strong>
                  </div>
                </div>

                {/* Analysis & Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      Why AI Left Your Brand Out:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {opp.recommendation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80">
                    <span className="text-xs font-bold text-indigo-900 block mb-1">
                      Recommended GEO Action:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {opp.actionItem}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generative Engine Optimization (GEO) Best Practice Playbook */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-indigo-600" />
          <span>GEO Tactical Playbook for Travel Platforms</span>
        </h3>
        <p className="text-xs text-slate-500">
          Proven techniques to make LLMs cite and recommend your travel brand naturally during early planning and transactional searches:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">1. Entity-Rich Schema Markup</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Embed structured JSON-LD with <code className="text-indigo-700 font-mono bg-white px-1 py-0.5 rounded border border-slate-200">LocalBusiness</code>, <code className="text-indigo-700 font-mono bg-white px-1 py-0.5 rounded border border-slate-200">GuideService</code>, and explicit <code className="text-indigo-700 font-mono bg-white px-1 py-0.5 rounded border border-slate-200">knowsAbout</code> tags for specific cities (e.g., Rome, Tokyo).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">2. Persona Constraint FAQ Pages</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Create explicit Q&amp;A content answering "Are private tours worth it for families with toddlers?" and "Wheelchair access in Paris with a private van guide".
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-900">3. Direct Comparison Indexes</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              LLMs love balanced comparison matrices. Transparently compare private guide pricing against mass bus tickets to be quoted when travelers ask "Is a private guide cheaper for 5 people?".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
