import React from 'react';
import {
  Compass,
  BarChart3,
  ListFilter,
  Sparkles,
  Users,
  Lightbulb,
  Settings,
  Bot,
  HelpCircle,
  SlidersHorizontal,
  Loader2,
} from 'lucide-react';
import { BrandProjectConfig } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandConfig: BrandProjectConfig;
  onOpenSettings: () => void;
  onOpenGenerator: () => void;
  onOpenHowItWorks: () => void;
  isAuditingRunning: boolean;
  totalPromptsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  brandConfig,
  onOpenSettings,
  onOpenGenerator,
  onOpenHowItWorks,
  isAuditingRunning,
  totalPromptsCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'library', label: 'Prompt Library', icon: ListFilter, count: totalPromptsCount },
    { id: 'sandbox', label: 'Live Audit', icon: Bot },
    { id: 'personas', label: 'Personas', icon: Users, count: 7 },
    { id: 'opportunities', label: 'GEO Opportunities', icon: Lightbulb },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
  ];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 gap-4">
          {/* Left: Brand Identity & Monitored Target */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Compass className="h-4.5 w-4.5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-base text-slate-900 tracking-tight">Prompt Visibility Tracker</span>
                <span className="hidden sm:inline-block text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                  AI Monitor
                </span>
              </div>
            </button>

            {/* Target Brand Selector Pill */}
            <div className="hidden md:flex items-center">
              <span className="text-slate-300 mx-1">/</span>
              <button
                id="nav-brand-pill"
                onClick={onOpenSettings}
                title="Change monitored brand or competitors"
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors group cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {brandConfig.brandName}
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden xl:inline">
                  ({brandConfig.brandDomain})
                </span>
                <SlidersHorizontal className="h-3 w-3 text-slate-400 group-hover:text-slate-600 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Center: Clean, Single-Line Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                        isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Auditing status indicator */}
            {isAuditingRunning && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-800 animate-pulse whitespace-nowrap">
                <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
                <span>Auditing LLMs...</span>
              </span>
            )}

            <button
              id="btn-generate-prompts"
              onClick={onOpenGenerator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-xs whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate Prompts</span>
            </button>

            <button
              id="btn-open-settings"
              onClick={onOpenSettings}
              title="Project & Competitor Settings"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Scroll Tab Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-[10px] px-1 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
