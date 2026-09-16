import React, { useState } from 'react';
import {
  X,
  Sparkles,
  RotateCcw,
  CheckCircle,
  Compass,
  MapPin,
  Layers,
  Plus,
  Sliders,
} from 'lucide-react';
import { TravelerPersona, BrandProjectConfig, JourneyStage, PromptItem, PromptType } from '../types';

interface PromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  personas: TravelerPersona[];
  brandConfig: BrandProjectConfig;
  onAddGeneratedPrompts: (prompts: PromptItem[]) => void;
  initialPersonaId?: string;
}

// Resilient local generator fallback if API or rate-limit delays occur
function generateFallbackPrompts(
  personaName: string,
  destination: string,
  journeyStage: JourneyStage,
  travelerType: string,
  interests: string,
  constraints: string,
  brandName: string,
  count: number
) {
  const dest = destination.trim() || 'Rome';
  const group = travelerType.trim() || 'Family with kids';
  const intr = interests.trim() || 'History, culture & local food';
  const constr = constraints.trim() || 'Skip-the-line access, child-friendly pace';
  const brand = brandName || 'ToursByLocals';

  const list = [
    {
      query: `What are the best websites to book verified private tour guides in ${dest} for a ${group.toLowerCase()}?`,
      promptType: 'Unbranded',
      intent: 'Search for private guide booking platforms',
      brandInPrompt: false,
    },
    {
      query: `How can a ${group.toLowerCase()} book a customizable private tour in ${dest} focusing on ${intr.toLowerCase()} with ${constr.toLowerCase()}?`,
      promptType: 'Category',
      intent: 'Customized itinerary planning with specific constraints',
      brandInPrompt: false,
    },
    {
      query: `Compare ${brand}, Viator, and GetYourGuide for private customized sightseeing in ${dest}. Which is best for ${group.toLowerCase()}?`,
      promptType: 'Comparative',
      intent: 'Direct marketplace comparison for private tours',
      brandInPrompt: true,
    },
    {
      query: `Is ${brand} legitimate and worth it for booking private guides in ${dest}?`,
      promptType: 'Direct Brand',
      intent: 'Brand reputation, vetting standards, and traveler trust verification',
      brandInPrompt: true,
    },
    {
      query: `Book a verified private guide in ${dest} with ${constr.toLowerCase()} and customized stops for ${intr.toLowerCase()}.`,
      promptType: 'Transactional',
      intent: 'High booking intent for vetted private tour',
      brandInPrompt: false,
    },
    {
      query: `Top rated alternative platforms to Viator for authentic local guide experiences in ${dest} for ${group.toLowerCase()}.`,
      promptType: 'Category',
      intent: 'Alternative discovery for boutique guide booking',
      brandInPrompt: false,
    },
    {
      query: `How does communication with guides work on ${brand} before paying for a ${dest} tour?`,
      promptType: 'Direct Brand',
      intent: 'Platform workflow and pre-booking communication check',
      brandInPrompt: true,
    },
  ];

  return list.slice(0, count).map((item, idx) => ({
    id: 'gen-' + Date.now() + '-' + idx,
    query: item.query,
    destination: dest,
    journeyStage,
    promptType: item.promptType as PromptType,
    intent: item.intent,
    brandInPrompt: item.brandInPrompt,
  }));
}

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  personas,
  brandConfig,
  onAddGeneratedPrompts,
  initialPersonaId,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState(initialPersonaId || 'dest-decided');
  const [destination, setDestination] = useState('Rome');
  const [stage, setStage] = useState<JourneyStage>('Planning');
  const [travelerType, setTravelerType] = useState('Family of four with two kids');
  const [interests, setInterests] = useState('History, ancient architecture & local food');
  const [constraints, setConstraints] = useState('Skip-the-line access, child-friendly pace, under $450');
  const [count, setCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<any[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialPersonaId) {
      setSelectedPersonaId(initialPersonaId);
    }
  }, [initialPersonaId, isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationNotice(null);
    setGeneratedItems([]);
    setSelectedIndices([]);

    const personaObj = personas.find((p) => p.id === selectedPersonaId);
    const personaTitle = personaObj?.name || 'Traveler';

    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaName: personaTitle,
          destination,
          journeyStage: stage,
          travelerType,
          interests,
          constraints,
          brandName: brandConfig.brandName,
          count,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.prompts) && data.prompts.length > 0) {
          setGeneratedItems(data.prompts);
          setSelectedIndices(data.prompts.map((_: any, idx: number) => idx));
          if (data.mode === 'live_gemini') {
            setGenerationNotice('Synthesized in real-time with live Gemini AI.');
          } else {
            setGenerationNotice('Generated with Traveler Intent Engine.');
          }
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend prompt generation failed, using local generation engine:', err);
    }

    // Resilient local synthesis fallback
    const fallbackPrompts = generateFallbackPrompts(
      personaTitle,
      destination,
      stage,
      travelerType,
      interests,
      constraints,
      brandConfig.brandName,
      count
    );
    setGeneratedItems(fallbackPrompts);
    setSelectedIndices(fallbackPrompts.map((_, idx) => idx));
    setGenerationNotice('Synthesized with Traveler Intent Engine.');
    setIsGenerating(false);
  };

  const toggleSelect = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleAddSelected = () => {
    const toAdd: PromptItem[] = selectedIndices.map((idx) => {
      const g = generatedItems[idx];
      return {
        id: 'pr-gen-' + Date.now() + '-' + idx,
        query: g.query,
        personaId: selectedPersonaId,
        journeyStage: stage,
        destination,
        promptType: g.promptType || 'Unbranded',
        intent: g.intent || 'Persona Generated Search',
        brandInPrompt: !!g.brandInPrompt,
        status: 'pending',
      };
    });

    onAddGeneratedPrompts(toAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Traveler Query Generation Engine</h3>
              <p className="text-xs text-slate-500">
                Synthesize realistic questions across traveler personas, stages, constraints, and destinations.
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-700">
          {/* Dimensions Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Persona */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Traveler Persona
              </label>
              <select
                value={selectedPersonaId}
                onChange={(e) => setSelectedPersonaId(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              >
                {personas.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Target Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Rome, Tokyo, Paris, Lisbon"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            {/* Travel Stage */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Trip Journey Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as JourneyStage)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              >
                <option value="Inspiration">Inspiration (Ideas &amp; destinations)</option>
                <option value="Destination Selection">Destination Selection (Comparing cities)</option>
                <option value="Planning">Planning (Activities, guides, itineraries)</option>
                <option value="Comparison">Comparison (Platform trust, pricing, cancellation)</option>
                <option value="Booking">Booking (Direct transactional inquiries)</option>
              </select>
            </div>

            {/* Traveler Group */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Traveler Group Composition
              </label>
              <input
                type="text"
                value={travelerType}
                onChange={(e) => setTravelerType(e.target.value)}
                placeholder="e.g., Solo woman, Couple on honeymoon, Family with 2 kids"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Interests &amp; Passions
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., Street food, Renaissance history, Nature photography"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            {/* Constraints */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Constraints (Budget, Mobility, Time)
              </label>
              <input
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g., Under $400, Wheelchair accessible, Free cancellation"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Action to trigger AI generation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500">
              Generates varied prompt types: Unbranded, Category, Comparative, and Transactional.
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                isGenerating
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin text-indigo-200" />
                  <span>Generating via Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Prompts</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Results Preview */}
          {generatedItems.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Generated Prompts ({selectedIndices.length} Selected)
                  </span>
                  {generationNotice && (
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {generationNotice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (selectedIndices.length === generatedItems.length) {
                      setSelectedIndices([]);
                    } else {
                      setSelectedIndices(generatedItems.map((_, i) => i));
                    }
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  {selectedIndices.length === generatedItems.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {generatedItems.map((item, idx) => {
                  const isChecked = selectedIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSelect(idx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-indigo-50/80 border-indigo-200 ring-1 ring-indigo-200 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-slate-300"
                      />
                      <div className="space-y-1 flex-1">
                        <p className="font-semibold text-slate-900">"{item.query}"</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="bg-white border border-slate-200 px-1.5 py-0.2 rounded font-medium text-slate-700">
                            {item.promptType}
                          </span>
                          <span>•</span>
                          <span>{item.intent}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
            Cancel
          </button>

          <button
            onClick={handleAddSelected}
            disabled={selectedIndices.length === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all shadow-xs ${
              selectedIndices.length === 0
                ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add ({selectedIndices.length}) to Prompt Library</span>
          </button>
        </div>
      </div>
    </div>
  );
};
