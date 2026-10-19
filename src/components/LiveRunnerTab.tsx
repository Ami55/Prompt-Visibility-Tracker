import React, { useState } from 'react';
import {
  Bot,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Link2,
  ExternalLink,
  Sparkles,
  Award,
  ThumbsUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { BrandProjectConfig, TravelerPersona, AuditResult, LLMModel, PromptItem } from '../types';

interface LiveRunnerTabProps {
  brandConfig: BrandProjectConfig;
  personas: TravelerPersona[];
  onAddPromptToLibrary: (prompt: PromptItem) => void;
  onRunAuditApi: (params: any) => Promise<AuditResult>;
}

export const LiveRunnerTab: React.FC<LiveRunnerTabProps> = ({
  brandConfig,
  personas,
  onAddPromptToLibrary,
  onRunAuditApi,
}) => {
  const [queryInput, setQueryInput] = useState(
    'What are the most reputable websites to book a private local tour guide in Rome with custom itineraries?'
  );
  const [selectedPersonaId, setSelectedPersonaId] = useState('dest-decided');
  const [selectedDestination, setSelectedDestination] = useState('Rome');
  const [selectedStage, setSelectedStage] = useState('Planning');
  const [selectedModel, setSelectedModel] = useState<LLMModel>('Gemini 2.5 Flash');
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Quick preset queries
  const presets = [
    {
      title: 'Unbranded: Rome Private Guide',
      query: 'What are the most reputable websites to book a private local tour guide in Rome with custom itineraries?',
      persona: 'dest-decided',
      dest: 'Rome',
      stage: 'Planning',
    },
    {
      title: 'Constraint: Layover in Istanbul',
      query: 'For an 8-hour layover in Istanbul, what private tour company provides airport pickup and guaranteed on-time return?',
      persona: 'constraint-driven',
      dest: 'Istanbul',
      stage: 'Booking',
    },
    {
      title: 'Comparative: Example Travel vs Viator',
      query: 'Compare Example Travel, Viator, and GetYourGuide for private personalized tours in Italy.',
      persona: 'dest-decided',
      dest: 'Italy',
      stage: 'Comparison',
    },
    {
      title: 'Experience: Authentic Tokyo Local',
      query: 'What culinary and artisan experiences in Tokyo require a private local guide, and where do I book them?',
      persona: 'experience-driven',
      dest: 'Tokyo',
      stage: 'Planning',
    },
    {
      title: 'Trust: Scam Protection & Vetting',
      query: 'How safe is booking with Example Travel and what happens if my guide cancels?',
      persona: 'trust-cautious',
      dest: 'Global',
      stage: 'Comparison',
    },
    {
      title: 'Inspiration: October $3000 Trip',
      query: 'Where should I travel in October with mild weather, great food, and history on a $3,000 budget?',
      persona: 'undecided',
      dest: 'Global / Europe',
      stage: 'Inspiration',
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setQueryInput(p.query);
    setSelectedPersonaId(p.persona);
    setSelectedDestination(p.dest);
    setSelectedStage(p.stage);
    setAuditResult(null);
    setIsSaved(false);
  };

  const handleRunAudit = async () => {
    if (!queryInput.trim() || isLoading) return;
    setIsLoading(true);
    setIsSaved(false);

    try {
      const activePersona = personas.find((p) => p.id === selectedPersonaId);
      const res = await onRunAuditApi({
        query: queryInput,
        brandName: brandConfig.brandName,
        brandDomain: brandConfig.brandDomain,
        competitors: brandConfig.competitors,
        personaName: activePersona?.name || 'Traveler',
        destination: selectedDestination,
        stage: selectedStage,
      });
      setAuditResult(res);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToLibrary = () => {
    if (!auditResult) return;
    const isBrandInPrompt = queryInput.toLowerCase().includes(brandConfig.brandName.toLowerCase());

    const newPrompt: PromptItem = {
      id: 'pr-custom-' + Date.now(),
      query: queryInput,
      personaId: selectedPersonaId,
      journeyStage: selectedStage as any,
      destination: selectedDestination,
      promptType: isBrandInPrompt ? 'Direct Brand' : 'Unbranded',
      intent: 'Custom Tested Query',
      brandInPrompt: isBrandInPrompt,
      status: 'completed',
      lastRunDate: new Date().toISOString().split('T')[0],
      lastResult: auditResult,
    };

    onAddPromptToLibrary(newPrompt);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Bot className="h-6 w-6 text-indigo-600" />
          <span>Live AI Search Audit &amp; Sandbox</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Execute any real traveler question against Gemini AI Search, simulate cross-model answers, and instantly extract brand mentions, citations, position rankings, and sentiment.
        </p>
      </div>

      {/* Preset Quick Chips */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Quick Preset Scenarios
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.title}
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all text-left flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="h-3 w-3 text-indigo-600" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Box & Configuration Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Traveler Search Query (What the traveler asks the LLM)
          </label>
          <textarea
            rows={3}
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Type any realistic traveler prompt (e.g., 'What is the best website to book a local guide in Rome?')..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
          />
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Persona</label>
            <select
              value={selectedPersonaId}
              onChange={(e) => setSelectedPersonaId(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Destination</label>
            <input
              type="text"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              placeholder="e.g. Rome, Tokyo, Paris"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Journey Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="Inspiration">Inspiration</option>
              <option value="Destination Selection">Destination Selection</option>
              <option value="Planning">Planning</option>
              <option value="Comparison">Comparison</option>
              <option value="Booking">Booking</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target LLM Engine</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as LLMModel)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="Gemini 2.5 Flash">Gemini 2.5 Flash (Live Grounded)</option>
              <option value="ChatGPT Search">ChatGPT Search (Benchmark)</option>
              <option value="Perplexity AI">Perplexity AI (Benchmark)</option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
              <option value="MS Copilot">Microsoft Copilot</option>
            </select>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
            <span>Evaluating for:</span>
            <span className="font-semibold text-indigo-700">{brandConfig.brandName}</span>
            <span className="text-slate-300">•</span>
            <span>vs Competitors:</span>
            <span className="text-slate-700 font-medium">{brandConfig.competitors.join(', ')}</span>
          </div>

          <button
            id="btn-run-live-audit"
            onClick={handleRunAudit}
            disabled={isLoading || !queryInput.trim()}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
              isLoading
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <RotateCcw className="h-4 w-4 animate-spin text-indigo-200" />
                <span>Running Live Audit...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Audit Query with Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Result Display */}
      {auditResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Scorecard Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold uppercase text-slate-500">Audit Scorecard</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-indigo-700 font-semibold font-mono bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{auditResult.model}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">{auditResult.timestamp}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToLibrary}
                  disabled={isSaved}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSaved
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Saved to Library</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5 text-slate-600" />
                      <span>Save to Prompt Library</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scorecard Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              {/* Mention */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Brand Mentioned</span>
                <div className="mt-1 flex items-center gap-1.5">
                  {auditResult.brandMentioned ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      YES
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                      <XCircle className="h-3.5 w-3.5" />
                      NO
                    </span>
                  )}
                </div>
              </div>

              {/* Position */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Recommendation Rank</span>
                <div className="mt-1 text-sm font-bold text-slate-900 font-mono">
                  {auditResult.brandPosition ? `#${auditResult.brandPosition}` : 'N/A'}
                </div>
              </div>

              {/* Citation */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Website Cited</span>
                <div className="mt-1 flex items-center gap-1">
                  {auditResult.websiteCited ? (
                    <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
                      <Link2 className="h-3.5 w-3.5" />
                      CITED
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">NO LINK</span>
                  )}
                </div>
              </div>

              {/* Sentiment */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Brand Sentiment</span>
                <div className="mt-1 text-xs font-bold text-slate-800">
                  {auditResult.sentiment}
                </div>
              </div>

              {/* Booking Intent */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Recommendation Type</span>
                <div className="mt-1 text-xs font-bold text-slate-800">
                  {auditResult.bookingIntent ? 'Direct Booking' : 'Informational Only'}
                </div>
              </div>

              {/* Info Accuracy */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Accuracy Score</span>
                <div className="mt-1 text-sm font-bold font-mono text-emerald-700">
                  {auditResult.accuracyScore}%
                </div>
              </div>
            </div>
          </div>

          {/* Response Text & LLM Reasoning Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Raw LLM Answer (2 cols) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <span>AI Generated Traveler Answer</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Real-time Gemini Output</span>
              </div>

              <div className="max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {auditResult.rawResponse}
              </div>

              {auditResult.citedUrls && auditResult.citedUrls.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-600 block mb-1.5">Extracted Citations &amp; URLs:</span>
                  <div className="flex flex-wrap gap-2">
                    {auditResult.citedUrls.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200 hover:underline"
                      >
                        <Link2 className="h-3 w-3" />
                        <span>{url}</span>
                        <ExternalLink className="h-2.5 w-2.5 ml-0.5 text-sky-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Recommendation Rationale & Competitive Intel */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>LLM Recommendation Rationale</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {auditResult.recommendationRationale || 'No specific rationale extracted.'}
                </p>

                {/* Competitors mentioned */}
                <div>
                  <span className="text-xs font-semibold text-slate-600 block mb-1.5">Competitors Mentioned in Response</span>
                  {auditResult.competitorsMentioned && auditResult.competitorsMentioned.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {auditResult.competitorsMentioned.map((c) => (
                        <span key={c} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No competitors mentioned</span>
                  )}
                </div>

                {/* Key Strengths stated by LLM */}
                {auditResult.keyStrengths && auditResult.keyStrengths.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 block mb-1.5">Stated Brand Strengths</span>
                    <ul className="space-y-1">
                      {auditResult.keyStrengths.map((str, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
