import React from 'react';
import {
  X,
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
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenGenerator?: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenGenerator,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="how-it-works-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Platform Guide &amp; Architecture
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-medium text-slate-500">GEO &amp; AI Search Intelligence</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                How Prompt Visibility Tracker Works
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 text-sm leading-relaxed">
          {/* Executive Summary Callout */}
          <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-slate-800 flex items-start gap-4">
            <Sparkles className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-indigo-950 text-base">
                Generative Engine Optimization (GEO) for Travel
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Travelers no longer just search Google for “tours in Rome.” They ask LLMs (Gemini, ChatGPT Search, Perplexity, Copilot) multi-layered, constraint-rich questions. Prompt Visibility Tracker is an automated auditor that measures whether AI engines organically recommend and cite your travel brand over competitors.
              </p>
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div className="space-y-6">
            {/* PILLAR 1: What Issue It Resolves */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
              <div className="flex items-center gap-2.5 text-amber-700 font-bold text-base mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <span>1. What Issue It Resolves</span>
              </div>
              <p className="text-slate-600 mb-4">
                Traditional SEO focused on ten blue links and keyword density. In generative AI search, the dynamics have fundamentally inverted:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-rose-500" />
                    Zero-Click Synthesis
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    LLMs synthesize 2–3 recommended platforms directly into their answers. If your brand is not mentioned by name in that synthesis, you lose 100% of traveler traffic.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-indigo-500" />
                    The Unprompted Blindspot
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Testing your brand with brand keywords (e.g. <em>“Example Travel reviews”</em>) creates false confidence. The real test is: does the AI suggest you when the traveler asks an unbranded question?
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                    <Link2 className="h-4 w-4 text-sky-500" />
                    Citation &amp; Hallucination Audit
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    AI models frequently cite large aggregators (Viator, GetYourGuide) even when independent platforms fit the user’s exact constraints better. We reveal why models choose competitors.
                  </p>
                </div>
              </div>
            </div>

            {/* PILLAR 2: What User Should Provide */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
              <div className="flex items-center gap-2.5 text-indigo-700 font-bold text-base mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <FileCheck className="h-4 w-4" />
                </div>
                <span>2. What You Should Provide</span>
              </div>
              <p className="text-slate-600 mb-4">
                To tailor the audit to your exact business, simply verify or customize four parameters in Project Settings:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Brand Name &amp; Domain</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Your business name (e.g. <strong>Example Travel</strong>) and official web domain (<strong>example.com</strong>). This enables verification of exact brand mentions and domain link citations.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Top Travel Competitors</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      The key platforms you compete with (e.g. <em>Viator, GetYourGuide, Withlocals, Tripadvisor</em>). This powers your Share of Voice (SoV) benchmark.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Target Destinations &amp; Regions</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Your key geographic revenue centers (e.g. <em>Rome, Tokyo, Paris, Istanbul, Costa Rica</em>) to monitor local query coverage.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    D
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Traveler Personas &amp; Constraints</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Select from our 7 traveler archetypes or use our AI Generator to simulate real-world constraints (family with kids, budget limits, mobility requirements).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PILLAR 3: What to Expect to See */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-base mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span>3. What You Expect to See</span>
              </div>
              <p className="text-slate-600 mb-4">
                Upon running single query audits or batch sweeps across your prompt library, Prompt Visibility Tracker provides:
              </p>
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">AI Visibility Score (0–100):</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      A composite index weighing organic recommendation rate, link citations, rank position, and model sentiment.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Unprompted Organic Mention Rate:</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      The percentage of unbranded traveler prompts where AI engines voluntarily recommended your brand as a top choice.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Share of Voice (SoV) vs Competitors:</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      Interactive distribution chart showing how many times your brand was mentioned compared to Viator, GetYourGuide, and others.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Full Model Answer Inspector:</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      Click into any prompt to inspect the raw synthesized LLM response, highlighted brand mentions, citation links, and extracted strengths.
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Actionable GEO Optimization Playbook:</span>
                    <span className="text-xs text-slate-600 ml-1.5">
                      Prescriptive guidance detailing the exact content, schema markup, and third-party citation signals needed to flip missed queries into wins.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Powered by live Gemini AI Search grounding and multi-model benchmark algorithms.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {onOpenSettings && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
              >
                Configure Brand &amp; Competitors
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
            >
              Got It, Explore Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
