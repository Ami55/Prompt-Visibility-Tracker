import React from 'react';
import {
  Home,
  Command,
  Play,
  AlignLeft,
  CircleDot,
  Users,
  Diamond,
  Sparkles,
  HelpCircle,
  Settings,
  ChevronDown,
  MoreHorizontal,
  X,
} from 'lucide-react';
import { BrandProjectConfig } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  brandConfig: BrandProjectConfig;
  onOpenSettings: () => void;
  onOpenGenerator: () => void;
  onOpenHowItWorks: () => void;
  totalPromptsCount: number;
  completedResponsesCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  brandConfig,
  onOpenSettings,
  onOpenGenerator,
  onOpenHowItWorks,
  totalPromptsCount,
  completedResponsesCount,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  // Generate 2-letter monogram from brand name, e.g. "Example Travel" -> "ET"
  const getBrandInitials = (name: string) => {
    const cleaned = name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    // If single camelCase word like Example Travel
    const capitals = cleaned.match(/[A-Z]/g);
    if (capitals && capitals.length >= 2) {
      return (capitals[0] + capitals[1]).toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase() || 'TL';
  };

  const brandInitials = getBrandInitials(brandConfig.brandName);

  const handleNavClick = (id: string) => {
    if (id === 'settings') {
      onOpenSettings();
    } else if (id === 'how-it-works') {
      setActiveTab('how-it-works');
    } else {
      setActiveTab(id);
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const isItemActive = (id: string) => {
    if (id === 'overview' && (activeTab === 'overview' || activeTab === 'dashboard')) return true;
    if (id === 'library' && activeTab === 'library') return true;
    if (id === 'runs' && (activeTab === 'runs' || activeTab === 'sandbox')) return true;
    if (id === 'responses' && activeTab === 'responses') return true;
    if (id === 'visibility' && activeTab === 'visibility') return true;
    if (id === 'personas' && activeTab === 'personas') return true;
    if (id === 'competitors' && activeTab === 'competitors') return true;
    if (id === 'opportunities' && activeTab === 'opportunities') return true;
    if (id === 'how-it-works' && activeTab === 'how-it-works') return true;
    return false;
  };

  const navItemClass = (isActive: boolean) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group select-none text-left cursor-pointer ${
      isActive
        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs border border-indigo-200/70'
        : 'text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-700'
    }`;

  const iconClass = (isActive: boolean) =>
    `h-4.5 w-4.5 shrink-0 transition-colors ${
      isActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-600'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-40 lg:z-30 w-68 h-screen bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl z-50' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-6">
          {/* Top Brand Selector Card */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <button
                id="sidebar-brand-card"
                onClick={onOpenSettings}
                className="w-full bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200/80 rounded-2xl p-3 flex items-center justify-between text-left transition-all group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0 tracking-tight shadow-2xs group-hover:bg-indigo-100 group-hover:text-indigo-800 transition-colors">
                    {brandInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-slate-900 truncate leading-tight group-hover:text-indigo-600 transition-colors">
                      {brandConfig.brandName}
                    </h2>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                      AI visibility project
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-1 group-hover:text-indigo-600 transition-colors" />
              </button>

              {/* Mobile Close Button */}
              {onCloseMobile && (
                <button
                  onClick={onCloseMobile}
                  className="lg:hidden ml-2 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Section 1: WORKSPACE */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-3 mb-1.5 select-none">
              Workspace
            </div>

            {/* Overview */}
            <button
              id="nav-item-overview"
              onClick={() => handleNavClick('overview')}
              className={navItemClass(isItemActive('overview'))}
            >
              <Home className={iconClass(isItemActive('overview'))} />
              <span>Overview</span>
            </button>

            {/* Prompt library */}
            <button
              id="nav-item-library"
              onClick={() => handleNavClick('library')}
              className={navItemClass(isItemActive('library'))}
            >
              <Command className={iconClass(isItemActive('library'))} />
              <span>Prompt library</span>
            </button>

            {/* Runs */}
            <button
              id="nav-item-runs"
              onClick={() => handleNavClick('runs')}
              className={navItemClass(isItemActive('runs'))}
            >
              <Play className={iconClass(isItemActive('runs'))} />
              <span>Runs</span>
            </button>

            {/* Responses */}
            <button
              id="nav-item-responses"
              onClick={() => handleNavClick('responses')}
              className={navItemClass(isItemActive('responses'))}
            >
              <AlignLeft className={iconClass(isItemActive('responses'))} />
              <span className="flex-1">Responses</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium font-mono text-[11px] transition-colors ${
                  isItemActive('responses')
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-800'
                }`}
              >
                {completedResponsesCount || 124}
              </span>
            </button>
          </div>

          {/* Section 2: INSIGHTS */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 px-3 mb-1.5 select-none">
              Insights
            </div>

            {/* AI visibility */}
            <button
              id="nav-item-visibility"
              onClick={() => handleNavClick('visibility')}
              className={navItemClass(isItemActive('visibility'))}
            >
              <CircleDot className={iconClass(isItemActive('visibility'))} />
              <span>AI visibility</span>
            </button>

            {/* Personas */}
            <button
              id="nav-item-personas"
              onClick={() => handleNavClick('personas')}
              className={navItemClass(isItemActive('personas'))}
            >
              <Users className={iconClass(isItemActive('personas'))} />
              <span className="flex-1">Personas</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium font-mono text-[11px] transition-colors ${
                  isItemActive('personas')
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-800'
                }`}
              >
                7
              </span>
            </button>

            {/* Competitors */}
            <button
              id="nav-item-competitors"
              onClick={() => handleNavClick('competitors')}
              className={navItemClass(isItemActive('competitors'))}
            >
              <Diamond className={iconClass(isItemActive('competitors'))} />
              <span>Competitors</span>
            </button>

            {/* Opportunities */}
            <button
              id="nav-item-opportunities"
              onClick={() => handleNavClick('opportunities')}
              className={navItemClass(isItemActive('opportunities'))}
            >
              <Sparkles className={iconClass(isItemActive('opportunities'))} />
              <span>Opportunities</span>
            </button>

            {/* Help & feedback */}
            <button
              id="nav-item-help"
              onClick={() => handleNavClick('how-it-works')}
              className={navItemClass(isItemActive('how-it-works'))}
            >
              <HelpCircle className={iconClass(isItemActive('how-it-works'))} />
              <span>Help &amp; feedback</span>
            </button>

            {/* Project settings */}
            <button
              id="nav-item-settings"
              onClick={() => handleNavClick('settings')}
              className={navItemClass(isItemActive('settings'))}
            >
              <Settings className={iconClass(isItemActive('settings'))} />
              <span>Project settings</span>
            </button>
          </div>
        </div>

        {/* Bottom Pinned User Profile */}
        <div className="pt-3 border-t border-slate-200/90 mt-auto">
          <div
            id="sidebar-user-card"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50/60 transition-colors cursor-pointer group"
            onClick={onOpenSettings}
            title="User Profile & Project Settings"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#eed1bd] text-[#5e3820] font-bold text-xs flex items-center justify-center shrink-0 select-none shadow-2xs group-hover:ring-2 group-hover:ring-indigo-300 transition-all">
                AM
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900 truncate leading-tight group-hover:text-indigo-600 transition-colors">
                  Ami M.
                </div>
                <div className="text-xs text-slate-500 truncate font-medium">Admin</div>
              </div>
            </div>
            <button
              className="p-1 text-slate-400 group-hover:text-indigo-600 hover:text-indigo-800 rounded-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSettings();
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
