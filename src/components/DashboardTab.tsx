import React from 'react';
import {
  TrendingUp,
  Eye,
  Link2,
  Award,
  ThumbsUp,
  CheckCircle,
  Users,
  Compass,
  MapPin,
  Bot,
  ArrowUpRight,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { DashboardMetrics, BrandProjectConfig, TravelerPersona, PromptItem } from '../types';

interface DashboardTabProps {
  metrics: DashboardMetrics;
  brandConfig: BrandProjectConfig;
  personas: TravelerPersona[];
  prompts: PromptItem[];
  onOpenLibrary: () => void;
  onOpenSandbox: () => void;
  onRunBatchAudit: () => void;
  isBatchRunning: boolean;
  onInspectPrompt: (prompt: PromptItem) => void;
  onOpenHowItWorks?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  metrics,
  brandConfig,
  personas,
  prompts,
  onOpenLibrary,
  onOpenSandbox,
  onRunBatchAudit,
  isBatchRunning,
  onInspectPrompt,
  onOpenHowItWorks,
}) => {
  const recentAudits = prompts
    .filter((p) => p.status === 'completed' && p.lastResult)
    .slice(0, 5);

  const getPersonaName = (id: string) => {
    return personas.find((p) => p.id === id)?.name || id;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Banner / Welcome with Batch Trigger */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/80 border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                AI Search &amp; GEO Intelligence
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">Live Model: Gemini 2.5 / Multi-LLM Benchmark</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Brand Recommendation &amp; Citation Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Measuring how AI search engines recommend <strong className="text-indigo-700 font-semibold">{brandConfig.brandName}</strong> across 7 traveler personas, 5 journey stages, and unprompted commercial queries.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {onOpenHowItWorks && (
              <button
                onClick={onOpenHowItWorks}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-indigo-600" />
                <span>How It Works</span>
              </button>
            )}

            <button
              id="btn-run-batch-audit"
              disabled={isBatchRunning}
              onClick={onRunBatchAudit}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs ${
                isBatchRunning
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white'
              }`}
            >
              {isBatchRunning ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin text-emerald-600" />
                  <span>Auditing Prompts...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Run Batch Audit ({prompts.length})</span>
                </>
              )}
            </button>

            <button
              id="btn-test-sandbox"
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Test Single Query</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7 Core Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* 1. Overall Visibility Score */}
        <div className="bg-white border border-indigo-200 rounded-xl p-4 flex flex-col justify-between shadow-xs col-span-2 sm:col-span-2 lg:col-span-1 ring-1 ring-indigo-500/10">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">AI Visibility</span>
            <Eye className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 font-mono">{metrics.visibilityScore}</span>
              <span className="text-xs text-slate-400 font-semibold">/100</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-sky-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${metrics.visibilityScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-tight">Composite organic presence</p>
          </div>
        </div>

        {/* 2. Unprompted Mention Rate */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Unprompted</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.unpromptedMentionRate}%</div>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">Without brand in prompt</p>
            <p className="text-[10px] text-slate-400 mt-0.5">True organic discovery</p>
          </div>
        </div>

        {/* 3. Citation Rate */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Citation Rate</span>
            <Link2 className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.citationRate}%</div>
            <p className="text-[11px] text-sky-700 mt-1 font-medium">Direct domain linked</p>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{brandConfig.brandDomain}</p>
          </div>
        </div>

        {/* 4. Share of Voice */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Share of Voice</span>
            <Award className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.shareOfVoice[brandConfig.brandName] || 0}%</div>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">vs Top Competitors</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Total mentions share</p>
          </div>
        </div>

        {/* 5. Average Position */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Avg Position</span>
            <Award className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">#{metrics.averagePosition || '-'}</div>
            <p className="text-[11px] text-purple-700 mt-1 font-medium">Rank in suggestions</p>
            <p className="text-[10px] text-slate-400 mt-0.5">When recommended</p>
          </div>
        </div>

        {/* 6. Positive Recommendation Rate */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Positive Rate</span>
            <ThumbsUp className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.positiveRecommendationRate}%</div>
            <p className="text-[11px] text-teal-700 mt-1 font-medium">Positive endorsement</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Sentiment score</p>
          </div>
        </div>

        {/* 7. Information Accuracy */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold text-slate-700">Info Accuracy</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.accuracyScore}%</div>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">Service fidelity</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Correct details</p>
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Share of Voice & Competitor Ranking (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Share of Voice Visual Matrix */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <span>Share of Voice (SoV) vs Travel Competitors</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Percentage of total model mentions across {metrics.completedAudits} audited traveler scenarios
                </p>
              </div>
              <span className="text-xs text-indigo-700 font-mono font-semibold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                {brandConfig.brandName}: {metrics.shareOfVoice[brandConfig.brandName] || 0}%
              </span>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner mb-6">
              {Object.entries(metrics.shareOfVoice).map(([brand, share], index) => {
                const colors = [
                  'bg-indigo-600', // Our Brand
                  'bg-emerald-600', // Viator
                  'bg-amber-500',   // GetYourGuide
                  'bg-cyan-600',    // Withlocals
                  'bg-rose-500',    // Airbnb / Tripadvisor
                  'bg-purple-600'
                ];
                if (share === 0) return null;
                return (
                  <div
                    key={brand}
                    style={{ width: `${share}%` }}
                    className={`${colors[index % colors.length]} h-full transition-all duration-500 hover:opacity-90 relative group`}
                    title={`${brand}: ${share}%`}
                  />
                );
              })}
            </div>

            {/* Competitor Breakdown Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(metrics.shareOfVoice)
                .sort(([, a], [, b]) => Number(b) - Number(a))
                .map(([brand, share], idx) => {
                  const isPrimary = brand.toLowerCase() === brandConfig.brandName.toLowerCase();
                  return (
                    <div
                      key={brand}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        isPrimary
                          ? 'bg-indigo-50/70 border-indigo-200 ring-1 ring-indigo-300/60 shadow-xs'
                          : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          isPrimary ? 'bg-indigo-600 ring-2 ring-indigo-200' : 'bg-slate-400'
                        }`} />
                        <div>
                          <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                            {brand}
                            {isPrimary && (
                              <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 px-1.5 rounded">You</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">Rank #{idx + 1}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold font-mono text-slate-900">{share}%</div>
                        <div className="text-[10px] text-slate-400">SoV</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Visibility by Journey Stage */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-indigo-600" />
                  <span>Travel Journey Stage Visibility Funnel</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  How well the brand is mentioned as traveler moves from Inspiration to Booking
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                { stage: 'Inspiration', desc: 'Where should I go? Seasonal & budget queries', icon: '✨' },
                { stage: 'Destination Selection', desc: 'Comparing countries, cities, and regions', icon: '🗺️' },
                { stage: 'Planning', desc: 'Finding local guides, private tours, itineraries', icon: '📝' },
                { stage: 'Comparison', desc: 'Comparing platforms, refund policies, reviews', icon: '⚖️' },
                { stage: 'Booking', desc: 'Direct booking, availability, pricing for group', icon: '🎟️' }
              ].map(({ stage, desc, icon }) => {
                const stat = metrics.stageCoverage[stage] || { total: 0, mentioned: 0, rate: 0 };
                return (
                  <div key={stage} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{icon}</span>
                        <div>
                          <span className="font-semibold text-slate-800">{stage}</span>
                          <span className="hidden sm:inline-block text-xs text-slate-500 ml-2">({desc})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">
                          {stat.mentioned} / {stat.total} queries
                        </span>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          stat.rate >= 75
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : stat.rate >= 40
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}>
                          {stat.rate}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          stat.rate >= 75
                            ? 'bg-emerald-600'
                            : stat.rate >= 40
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${stat.rate}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Persona Coverage & LLM Comparison */}
        <div className="space-y-6">
          {/* Persona Breakdown Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Users className="h-4 w-4 text-sky-600" />
                  <span>Visibility by Persona</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Which traveler types see your brand?</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {personas.map((persona) => {
                const stat = metrics.personaCoverage[persona.id] || { total: 0, mentioned: 0, rate: 0 };
                return (
                  <div
                    key={persona.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-800 truncate pr-2">{persona.name}</span>
                      <span className="font-mono font-bold text-indigo-700">{stat.rate}%</span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stat.rate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                      <span className="truncate">{persona.typicalStages.join(' • ')}</span>
                      <span className="shrink-0 ml-1">{stat.mentioned} / {stat.total} audits</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Comparison */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  <span>AI Engine Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Cross-model citation performance</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Gemini 2.5 Flash', mentionRate: 88, citeRate: 64, badge: 'Live Active' },
                { name: 'ChatGPT Search', mentionRate: 76, citeRate: 58, badge: 'Indexed' },
                { name: 'Perplexity AI', mentionRate: 82, citeRate: 72, badge: 'High Citation' },
                { name: 'Claude 3.5 Sonnet', mentionRate: 70, citeRate: 45, badge: 'Knowledge' },
                { name: 'Microsoft Copilot', mentionRate: 65, citeRate: 50, badge: 'Bing-backed' },
              ].map((m) => (
                <div key={m.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <span>{m.name}</span>
                      <span className="text-[9px] font-medium text-slate-600 bg-white border border-slate-200 px-1.5 py-0.2 rounded shadow-2xs">
                        {m.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Citation: <span className="text-sky-700 font-semibold">{m.citeRate}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-700">{m.mentionRate}%</span>
                    <div className="text-[10px] text-slate-400">Mention Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent LLM Response Inspections */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <span>Recent LLM Traveler Query Audits</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect full AI model responses, highlighted mentions, citations, and LLM reasoning
            </p>
          </div>
          <button
            onClick={onOpenLibrary}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>View all {prompts.length} queries</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAudits.map((item) => {
            const res = item.lastResult!;
            return (
              <div
                key={item.id}
                onClick={() => onInspectPrompt(item)}
                className="py-3.5 px-3 -mx-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                      {getPersonaName(item.personaId)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {item.destination}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-indigo-700 font-medium">{item.journeyStage}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-900 transition-colors">
                    "{item.query}"
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  {/* Mention Badge */}
                  {res.brandMentioned ? (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Rank #{res.brandPosition || 1}</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
                      Not Mentioned
                    </span>
                  )}

                  {/* Citation Badge */}
                  {res.websiteCited && (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-sky-50 text-sky-700 border border-sky-200 rounded-full flex items-center gap-1">
                      <Link2 className="h-2.5 w-2.5" />
                      <span>Cited</span>
                    </span>
                  )}

                  <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center gap-0.5">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
