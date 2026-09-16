import React from 'react';
import {
  MapPin,
  Globe2,
  Compass,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { TravelerPersona, PromptItem, DashboardMetrics } from '../types';

interface PersonasGuideTabProps {
  personas: TravelerPersona[];
  prompts: PromptItem[];
  metrics: DashboardMetrics;
  onSelectPersonaPrompts: (personaId: string) => void;
  onGenerateForPersona: (persona: TravelerPersona) => void;
}

export const PersonasGuideTab: React.FC<PersonasGuideTabProps> = ({
  personas,
  prompts,
  metrics,
  onSelectPersonaPrompts,
  onGenerateForPersona,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return MapPin;
      case 'Globe2': return Globe2;
      case 'Compass': return Compass;
      case 'Sparkles': return Sparkles;
      case 'ShieldAlert': return ShieldAlert;
      case 'CheckCircle2': return CheckCircle2;
      case 'CreditCard': return CreditCard;
      default: return HelpCircle;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Compass className="h-6 w-6 text-indigo-600" />
          <span>The 7 Traveler Personas &amp; Search Intent Profiles</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-3xl">
          Understanding the distinct mental models, booking hesitation factors, and question types prospective travelers ask AI models prior to booking.
        </p>
      </div>

      {/* Grid of 7 Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, index) => {
          const Icon = getIcon(persona.avatarIcon);
          const personaPrompts = prompts.filter((p) => p.personaId === persona.id);
          const stat = metrics.personaCoverage[persona.id] || { total: 0, mentioned: 0, rate: 0 };

          return (
            <div
              key={persona.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div className="space-y-4">
                {/* Persona Avatar & Top Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                        Persona 0{index + 1}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{persona.name}</h3>
                    </div>
                  </div>

                  {/* Visibility Rate Badge */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-indigo-700">{stat.rate}%</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">AI Visibility</div>
                  </div>
                </div>

                {/* Subtitle / Archetype */}
                <div className="text-xs font-semibold text-indigo-800 bg-indigo-50/70 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {persona.title}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {persona.description}
                </p>

                {/* Key Concerns */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                    Core Booking Concerns:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {persona.keyConcerns.map((concern) => (
                      <span
                        key={concern}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sample Prompt Examples */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Sample Query:</span>
                  {personaPrompts[0] ? (
                    <div className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 leading-normal">
                      "{personaPrompts[0].query}"
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">No queries added yet.</div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectPersonaPrompts(persona.id)}
                  className="text-xs font-semibold text-slate-700 hover:text-indigo-700 flex items-center gap-1 transition-colors"
                >
                  <span>View Queries ({personaPrompts.length})</span>
                  <ArrowRight className="h-3 w-3" />
                </button>

                <button
                  onClick={() => onGenerateForPersona(persona)}
                  className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                >
                  + Generate More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
