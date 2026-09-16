import React from 'react';
import {
  X,
  Bot,
  CheckCircle,
  XCircle,
  Link2,
  ExternalLink,
  ThumbsUp,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { PromptItem, TravelerPersona, BrandProjectConfig } from '../types';

interface ResponseInspectorModalProps {
  promptItem: PromptItem | null;
  onClose: () => void;
  personas: TravelerPersona[];
  brandConfig: BrandProjectConfig;
  onReRunAudit: (prompt: PromptItem) => Promise<void>;
  isAuditing: boolean;
}

export const ResponseInspectorModal: React.FC<ResponseInspectorModalProps> = ({
  promptItem,
  onClose,
  personas,
  brandConfig,
  onReRunAudit,
  isAuditing,
}) => {
  if (!promptItem) return null;

  const res = promptItem.lastResult;
  const persona = personas.find((p) => p.id === promptItem.personaId);

  // Simple highlight helper for brand name
  const renderHighlightedResponse = (text: string) => {
    if (!text) return 'No response recorded.';
    const brand = brandConfig.brandName;
    const parts = text.split(new RegExp(`(${brand})`, 'gi'));

    return parts.map((part, index) => {
      if (part.toLowerCase() === brand.toLowerCase()) {
        return (
          <mark
            key={index}
            className="bg-indigo-100 text-indigo-900 px-1 py-0.5 rounded font-bold border border-indigo-200"
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">LLM Audit Inspection</h3>
              <p className="text-xs text-slate-500">
                Detailed visibility, sentiment, citations, and model reasoning breakdown.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Query & Metadata Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold shadow-2xs">
                {persona?.name || promptItem.personaId}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <MapPin className="h-3 w-3 text-slate-400" />
                {promptItem.destination}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-700 font-semibold">{promptItem.journeyStage}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{promptItem.promptType}</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">"{promptItem.query}"</h4>
          </div>

          {/* Audit Metrics Grid */}
          {res ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {/* Brand Mentioned */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Brand Mentioned</span>
                <div className="mt-1 flex items-center gap-1">
                  {res.brandMentioned ? (
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
                <div className="mt-1 text-xs font-bold text-slate-900 font-mono">
                  {res.brandPosition ? `#${res.brandPosition}` : 'N/A'}
                </div>
              </div>

              {/* Website Cited */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Domain Citation</span>
                <div className="mt-1 flex items-center gap-1">
                  {res.websiteCited ? (
                    <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
                      <Link2 className="h-3.5 w-3.5" />
                      CITED
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-500">NO LINK</span>
                  )}
                </div>
              </div>

              {/* Sentiment */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Brand Sentiment</span>
                <div className="mt-1 text-xs font-bold text-slate-800">
                  {res.sentiment}
                </div>
              </div>

              {/* Booking Intent */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Booking Intent</span>
                <div className="mt-1 text-xs font-bold text-slate-800">
                  {res.bookingIntent ? 'Direct Booking' : 'Informational'}
                </div>
              </div>

              {/* Accuracy Score */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Factual Accuracy</span>
                <div className="mt-1 text-xs font-bold font-mono text-emerald-700">
                  {res.accuracyScore || 90}%
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 text-slate-500 text-xs rounded-xl border border-slate-200">
              This prompt has not been audited yet.
            </div>
          )}

          {/* Full AI Model Response Text */}
          {res && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <span>Full LLM Response ({res.model})</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{res.timestamp}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-72 overflow-y-auto">
                {renderHighlightedResponse(res.rawResponse)}
              </div>
            </div>
          )}

          {/* Strategic Insights & Competitors */}
          {res && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Recommendation Rationale */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>LLM Recommendation Rationale</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {res.recommendationRationale || 'No explicit rationale recorded.'}
                </p>

                {/* Stated strengths */}
                {res.keyStrengths && res.keyStrengths.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">Key Strengths Highlighted:</span>
                    <ul className="space-y-1">
                      {res.keyStrengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Competitors & Drawbacks */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">Competitors Mentioned in this Answer:</span>
                  {res.competitorsMentioned && res.competitorsMentioned.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {res.competitorsMentioned.map((comp) => (
                        <span key={comp} className="text-xs px-2.5 py-1 rounded-md bg-white text-slate-800 border border-slate-200 font-medium shadow-2xs">
                          {comp}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">None mentioned</span>
                  )}
                </div>

                {res.keyDrawbacks && res.keyDrawbacks.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-rose-800 block mb-1">Drawbacks / Caveats Mentioned:</span>
                    <ul className="space-y-1">
                      {res.keyDrawbacks.map((dr, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5">
                          <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                          <span>{dr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => onReRunAudit(promptItem)}
            disabled={isAuditing}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white transition-all shadow-xs ${
              isAuditing ? 'bg-slate-200 text-slate-500 border border-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isAuditing ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin text-indigo-300" />
                <span>Auditing with Gemini...</span>
              </>
            ) : (
              <>
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Re-Audit with Live Gemini</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
