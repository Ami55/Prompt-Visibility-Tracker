import React, { useState } from 'react';
import { X, Settings, Plus, Trash2, Check, Globe } from 'lucide-react';
import { BrandProjectConfig } from '../types';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandConfig: BrandProjectConfig;
  onSaveConfig: (newConfig: BrandProjectConfig) => void;
}

export const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  isOpen,
  onClose,
  brandConfig,
  onSaveConfig,
}) => {
  const [name, setName] = useState(brandConfig.brandName);
  const [domain, setDomain] = useState(brandConfig.brandDomain);
  const [category, setCategory] = useState(brandConfig.brandCategory || '');
  const [competitors, setCompetitors] = useState<string[]>([...brandConfig.competitors]);
  const [newCompetitor, setNewCompetitor] = useState('');
  const [destinations, setDestinations] = useState<string[]>([...brandConfig.targetDestinations]);
  const [newDestination, setNewDestination] = useState('');

  if (!isOpen) return null;

  const handleAddCompetitor = () => {
    if (newCompetitor.trim() && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const handleRemoveCompetitor = (comp: string) => {
    setCompetitors(competitors.filter((c) => c !== comp));
  };

  const handleAddDestination = () => {
    if (newDestination.trim() && !destinations.includes(newDestination.trim())) {
      setDestinations([...destinations, newDestination.trim()]);
      setNewDestination('');
    }
  };

  const handleRemoveDestination = (dest: string) => {
    setDestinations(destinations.filter((d) => d !== dest));
  };

  const handleSave = () => {
    onSaveConfig({
      ...brandConfig,
      brandName: name.trim() || 'Example Travel',
      brandDomain: domain.trim() || 'example.com',
      brandCategory: category.trim(),
      competitors,
      targetDestinations: destinations,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-sky-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Brand &amp; Competitor Settings</h3>
              <p className="text-xs text-slate-500">
                Configure your monitored brand, primary domain, and tracked competitors.
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-700">
          {/* Brand Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Monitored Brand Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Brand Domain (for citation tracking)
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Category &amp; Value Proposition
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Competitors List */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Tracked Competitors
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                placeholder="Add competitor (e.g. Airbnb Experiences)"
                className="flex-1 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
              <button
                onClick={handleAddCompetitor}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-1 shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {competitors.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium"
                >
                  <span>{c}</span>
                  <button
                    onClick={() => handleRemoveCompetitor(c)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Target Destinations */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Target Monitored Destinations
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDestination}
                onChange={(e) => setNewDestination(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddDestination()}
                placeholder="Add destination (e.g. Florence, Amsterdam)"
                className="flex-1 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500"
              />
              <button
                onClick={handleAddDestination}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-1 shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {destinations.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium"
                >
                  <span>{d}</span>
                  <button
                    onClick={() => handleRemoveDestination(d)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-all"
          >
            <Check className="h-4 w-4" />
            <span>Save &amp; Recompute Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
