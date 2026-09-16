import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Link2,
  ExternalLink,
  Plus,
  Compass,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PromptItem, TravelerPersona, BrandProjectConfig, JourneyStage, PromptType } from '../types';

interface PromptLibraryTabProps {
  prompts: PromptItem[];
  personas: TravelerPersona[];
  brandConfig: BrandProjectConfig;
  onInspectPrompt: (prompt: PromptItem) => void;
  onRunSingleAudit: (prompt: PromptItem) => Promise<void>;
  onOpenGenerator: () => void;
  onRunAll: () => void;
  isAuditingRunning: boolean;
  runningPromptId: string | null;
}

export const PromptLibraryTab: React.FC<PromptLibraryTabProps> = ({
  prompts,
  personas,
  brandConfig,
  onInspectPrompt,
  onRunSingleAudit,
  onOpenGenerator,
  onRunAll,
  isAuditingRunning,
  runningPromptId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMentionFilter, setSelectedMentionFilter] = useState<'all' | 'mentioned' | 'missed'>('all');

  // Filtered list
  const filteredPrompts = useMemo(() => {
    return prompts.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = item.query.toLowerCase().includes(q);
        const matchesDest = item.destination.toLowerCase().includes(q);
        if (!matchesQuery && !matchesDest) return false;
      }

      // Persona
      if (selectedPersona !== 'all' && item.personaId !== selectedPersona) {
        return false;
      }

      // Stage
      if (selectedStage !== 'all' && item.journeyStage !== selectedStage) {
        return false;
      }

      // Type
      if (selectedType !== 'all' && item.promptType !== selectedType) {
        return false;
      }

      // Mention Filter
      if (selectedMentionFilter === 'mentioned') {
        if (!item.lastResult?.brandMentioned) return false;
      } else if (selectedMentionFilter === 'missed') {
        if (item.lastResult?.brandMentioned) return false;
      }

      return true;
    });
  }, [prompts, searchQuery, selectedPersona, selectedStage, selectedType, selectedMentionFilter]);

  const getPersonaName = (id: string) => {
    return personas.find((p) => p.id === id)?.name || id;
  };

  const getStageColor = (stage: JourneyStage) => {
    switch (stage) {
      case 'Inspiration': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Destination Selection': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Planning': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Comparison': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Booking': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeColor = (type: PromptType) => {
    switch (type) {
      case 'Unbranded': return 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold';
      case 'Category': return 'bg-sky-50 text-sky-800 border border-sky-200';
      case 'Comparative': return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'Direct Brand': return 'bg-indigo-50 text-indigo-800 border border-indigo-200';
      case 'Transactional': return 'bg-rose-50 text-rose-800 border border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Primary Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Traveler Query &amp; Prompt Library</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filteredPrompts.length} of {prompts.length} Queries
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real questions asked by prospective travelers before booking, categorized by persona, journey stage, and intent.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenGenerator}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Queries</span>
          </button>

          <button
            onClick={onRunAll}
            disabled={isAuditingRunning}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
              isAuditingRunning
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
            }`}
          >
            {isAuditingRunning ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-slate-600" />
                <span>Run Batch Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Search row */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search traveler questions, destinations, or keywords (e.g., Rome, skip the line, family, budget)..."
            className="w-full bg-slate-50/80 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Dropdown filters row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Persona Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Traveler Persona</label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Personas (7)</option>
              {personas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Journey Stage */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Journey Stage</label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Stages (5)</option>
              <option value="Inspiration">Inspiration</option>
              <option value="Destination Selection">Destination Selection</option>
              <option value="Planning">Planning</option>
              <option value="Comparison">Comparison</option>
              <option value="Booking">Booking</option>
            </select>
          </div>

          {/* Prompt Type */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Prompt Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Types (5)</option>
              <option value="Unbranded">Unbranded (Pure Organic)</option>
              <option value="Category">Category Search</option>
              <option value="Comparative">Comparative</option>
              <option value="Direct Brand">Direct Brand</option>
              <option value="Transactional">Transactional</option>
            </select>
          </div>

          {/* Mention Status */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Brand Presence</label>
            <select
              value={selectedMentionFilter}
              onChange={(e) => setSelectedMentionFilter(e.target.value as any)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              <option value="all">All Results</option>
              <option value="mentioned">Brand Mentioned (Wins)</option>
              <option value="missed">Brand Omitted (Gaps)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prompts Table / Card List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {filteredPrompts.length === 0 ? (
            <div className="py-16 text-center">
              <Compass className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">No matching traveler queries found</p>
              <p className="text-xs text-slate-500 mt-1">Try relaxing filters or generate new prompts.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedPersona('all');
                  setSelectedStage('all');
                  setSelectedType('all');
                  setSelectedMentionFilter('all');
                }}
                className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredPrompts.map((item) => {
              const res = item.lastResult;
              const isRunning = runningPromptId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-4 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {/* Persona Badge */}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {getPersonaName(item.personaId)}
                      </span>

                      {/* Stage Badge */}
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${getStageColor(item.journeyStage)}`}>
                        {item.journeyStage}
                      </span>

                      {/* Prompt Type Badge */}
                      <span className={`px-2 py-0.5 rounded-md text-[11px] ${getTypeColor(item.promptType)}`}>
                        {item.promptType}
                      </span>

                      {/* Destination */}
                      <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {item.destination}
                      </span>

                      {/* Brand in prompt indicator */}
                      {item.brandInPrompt ? (
                        <span className="text-[10px] text-indigo-700 font-medium bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded">
                          Prompted
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">
                          Unprompted
                        </span>
                      )}
                    </div>

                    {/* Query text */}
                    <div
                      onClick={() => onInspectPrompt(item)}
                      className="cursor-pointer font-medium text-slate-900 group-hover:text-indigo-700 transition-colors text-sm sm:text-base"
                    >
                      "{item.query}"
                    </div>

                    {/* Competitors summary if audited */}
                    {res && res.competitorsMentioned && res.competitorsMentioned.length > 0 && (
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="text-slate-400">Competitors cited:</span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {res.competitorsMentioned.map((comp) => (
                            <span key={comp} className="bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.2 rounded text-[10px]">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Results & Actions */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {/* Status / Mention Result */}
                    {res ? (
                      <div className="text-right">
                        {res.brandMentioned ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>Rank #{res.brandPosition || 1}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Missed</span>
                          </div>
                        )}
                        {res.websiteCited && (
                          <div className="text-[10px] text-sky-700 font-medium mt-1 flex items-center justify-end gap-0.5">
                            <Link2 className="h-2.5 w-2.5" />
                            <span>URL Cited</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not tested yet</span>
                    )}

                    {/* Run Single Audit Button */}
                    <button
                      id={`btn-audit-${item.id}`}
                      onClick={() => onRunSingleAudit(item)}
                      disabled={isRunning || isAuditingRunning}
                      title="Run query through Gemini AI Search"
                      className={`p-2 rounded-xl text-xs font-medium transition-all ${
                        isRunning
                          ? 'bg-slate-100 text-emerald-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
                      }`}
                    >
                      {isRunning ? (
                        <RotateCcw className="h-4 w-4 animate-spin text-emerald-600" />
                      ) : (
                        <Play className="h-4 w-4 fill-slate-500 group-hover:fill-slate-800" />
                      )}
                    </button>

                    {/* Inspect Button */}
                    <button
                      onClick={() => onInspectPrompt(item)}
                      title="Inspect full LLM answer & rationale"
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 border border-indigo-200 transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
