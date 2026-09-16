import React from 'react';
import { Menu, Sparkles, Settings, Loader2, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { BrandProjectConfig } from '../types';

interface HeaderProps {
  activeTab: string;
  brandConfig: BrandProjectConfig;
  onOpenMobileSidebar: () => void;
  onOpenGenerator: () => void;
  onOpenSettings: () => void;
  isAuditingRunning: boolean;
  totalPromptsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  brandConfig,
  onOpenMobileSidebar,
  onOpenGenerator,
  onOpenSettings,
  isAuditingRunning,
  totalPromptsCount,
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'overview':
      case 'dashboard':
        return { category: 'Workspace', title: 'Overview', desc: 'AI visibility, citations, and LLM coverage metrics' };
      case 'library':
        return { category: 'Workspace', title: 'Prompt Library', desc: `${totalPromptsCount} traveler prompts mapped across 7 personas` };
      case 'runs':
      case 'sandbox':
        return { category: 'Workspace', title: 'Runs & Live Audit', desc: 'Execute live real-time LLM audits with citation verification' };
      case 'responses':
        return { category: 'Workspace', title: 'Audit Responses', desc: 'Historical LLM answers, brand ranks, and source citations' };
      case 'visibility':
        return { category: 'Insights', title: 'AI Visibility', desc: 'AI visibility, citations, and LLM coverage metrics' };
      case 'personas':
        return { category: 'Insights', title: 'Traveler Personas', desc: 'The 7 Traveler Personas & Search Intent Profiles' };
      case 'competitors':
        return { category: 'Insights', title: 'Competitor Intelligence', desc: `Market share of voice vs. ${brandConfig.competitors.join(', ')}` };
      case 'opportunities':
        return { category: 'Insights', title: 'GEO Opportunities', desc: 'Actionable Generative Engine Optimization recommendations' };
      case 'how-it-works':
        return { category: 'Insights', title: 'Help & Feedback', desc: 'Methodology, problem definition, and configuration guide' };
      default:
        return { category: 'Workspace', title: 'Overview', desc: 'AI visibility and coverage dashboard' };
    }
  };

  const { category, title } = getTabTitle(activeTab);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-15 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Toggle */}
        <button
          id="btn-open-sidebar-mobile"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-2 text-sm min-w-0">
          <span className="font-bold text-indigo-700 tracking-tight hidden md:inline">Prompt Visibility Tracker</span>
          <span className="text-slate-300 hidden md:inline">·</span>
          <span className="text-slate-400 font-medium hidden sm:inline">{category}</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <h1 className="font-bold text-slate-900 text-base truncate">{title}</h1>
        </div>

        {/* Monitored Brand Pill */}
        <div className="hidden xl:flex items-center ml-2">
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 transition-colors"
            title="Project settings"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-800">{brandConfig.brandName}</span>
            <span className="text-slate-400 font-mono text-[11px]">{brandConfig.brandDomain}</span>
            <ExternalLink className="h-3 w-3 text-slate-400 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Live Running Indicator */}
        {isAuditingRunning && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800 animate-pulse whitespace-nowrap">
            <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
            <span>Auditing LLMs...</span>
          </span>
        )}

        {/* Generate Prompts CTA */}
        <button
          id="btn-header-generate-prompts"
          onClick={onOpenGenerator}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-xs whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Generate Prompts</span>
        </button>

        {/* Settings button */}
        <button
          id="btn-header-open-settings"
          onClick={onOpenSettings}
          title="Project & Competitor Settings"
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
