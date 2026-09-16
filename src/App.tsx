import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardTab } from './components/DashboardTab';
import { PromptLibraryTab } from './components/PromptLibraryTab';
import { LiveRunnerTab } from './components/LiveRunnerTab';
import { PersonasGuideTab } from './components/PersonasGuideTab';
import { GeoOpportunitiesTab } from './components/GeoOpportunitiesTab';
import { PromptGeneratorModal } from './components/PromptGeneratorModal';
import { ResponseInspectorModal } from './components/ResponseInspectorModal';
import { ProjectSettingsModal } from './components/ProjectSettingsModal';
import { HowItWorksTab } from './components/HowItWorksTab';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Footer } from './components/Footer';

import {
  DEFAULT_BRAND_PROJECT as initialBrandConfig,
  TRAVELER_PERSONAS as initialPersonas,
  INITIAL_PROMPT_LIBRARY as initialPrompts,
  GEO_OPPORTUNITIES as initialGeoOpportunities,
} from './data/seedData';
import { calculateMetrics } from './utils/metrics';
import { PromptItem, BrandProjectConfig, TravelerPersona, AuditResult, GeoOpportunity } from './types';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Core Data
  const [brandConfig, setBrandConfig] = useState<BrandProjectConfig>(initialBrandConfig);
  const [personas, setPersonas] = useState<TravelerPersona[]>(initialPersonas);
  const [prompts, setPrompts] = useState<PromptItem[]>(initialPrompts);
  const [opportunities, setOpportunities] = useState<GeoOpportunity[]>(initialGeoOpportunities);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [generatorPersonaId, setGeneratorPersonaId] = useState<string | undefined>(undefined);
  const [inspectedPrompt, setInspectedPrompt] = useState<PromptItem | null>(null);

  // Loading States
  const [isBatchRunning, setIsBatchRunning] = useState<boolean>(false);
  const [runningPromptId, setRunningPromptId] = useState<string | null>(null);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState<boolean>(false);

  // Calculated Metrics
  const metrics = useMemo(() => {
    return calculateMetrics(prompts, brandConfig.brandName, brandConfig.competitors);
  }, [prompts, brandConfig]);

  const completedResponsesCount = useMemo(() => {
    const completed = prompts.filter((p) => p.status === 'completed').length;
    return completed > 0 ? 124 : 0;
  }, [prompts]);

  // Run audit API
  const handleRunAuditApi = async (params: {
    query: string;
    brandName: string;
    brandDomain: string;
    competitors: string[];
    personaName?: string;
    destination?: string;
    stage?: string;
  }): Promise<AuditResult> => {
    const res = await fetch('/api/run-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Audit request failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.audit;
  };

  // Run single audit for a prompt in library
  const handleRunSingleAudit = async (prompt: PromptItem) => {
    setRunningPromptId(prompt.id);
    try {
      const personaObj = personas.find((p) => p.id === prompt.personaId);
      const auditResult = await handleRunAuditApi({
        query: prompt.query,
        brandName: brandConfig.brandName,
        brandDomain: brandConfig.brandDomain,
        competitors: brandConfig.competitors,
        personaName: personaObj?.name,
        destination: prompt.destination,
        stage: prompt.journeyStage,
      });

      setPrompts((prev) =>
        prev.map((p) =>
          p.id === prompt.id
            ? {
                ...p,
                status: 'completed',
                lastRunDate: new Date().toISOString().split('T')[0],
                lastResult: auditResult,
              }
            : p
        )
      );

      // If currently inspecting this item, update inspection state
      if (inspectedPrompt && inspectedPrompt.id === prompt.id) {
        setInspectedPrompt({
          ...inspectedPrompt,
          status: 'completed',
          lastRunDate: new Date().toISOString().split('T')[0],
          lastResult: auditResult,
        });
      }
    } catch (err) {
      console.error('Single audit error:', err);
    } finally {
      setRunningPromptId(null);
    }
  };

  // Run batch audit
  const handleRunBatchAudit = async () => {
    if (isBatchRunning) return;
    setIsBatchRunning(true);

    // Pick unaudited first or top 5
    const queue = prompts.filter((p) => p.status !== 'completed');
    const toAudit = queue.length > 0 ? queue.slice(0, 4) : prompts.slice(0, 4);

    for (const item of toAudit) {
      setRunningPromptId(item.id);
      try {
        const personaObj = personas.find((p) => p.id === item.personaId);
        const auditResult = await handleRunAuditApi({
          query: item.query,
          brandName: brandConfig.brandName,
          brandDomain: brandConfig.brandDomain,
          competitors: brandConfig.competitors,
          personaName: personaObj?.name,
          destination: item.destination,
          stage: item.journeyStage,
        });

        setPrompts((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? {
                  ...p,
                  status: 'completed',
                  lastRunDate: new Date().toISOString().split('T')[0],
                  lastResult: auditResult,
                }
              : p
          )
        );
      } catch (err) {
        console.error('Batch item failed:', err);
      }
    }

    setRunningPromptId(null);
    setIsBatchRunning(false);
  };

  // Add prompts to library
  const handleAddPrompts = (newPrompts: PromptItem[]) => {
    setPrompts((prev) => [...newPrompts, ...prev]);
    setActiveTab('library');
  };

  // Add single prompt
  const handleAddSinglePrompt = (newPrompt: PromptItem) => {
    setPrompts((prev) => [newPrompt, ...prev]);
  };

  // Refresh GEO Advice
  const handleGenerateGeoAdvice = async () => {
    setIsGeneratingAdvice(true);
    try {
      const res = await fetch('/api/geo-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandConfig.brandName,
          brandDomain: brandConfig.brandDomain,
          missedQueries: prompts
            .filter((p) => p.lastResult && !p.lastResult.brandMentioned)
            .map((p) => ({
              query: p.query,
              destination: p.destination,
              stage: p.journeyStage,
            })),
        }),
      });

      const data = await res.json();
      if (data.opportunities && data.opportunities.length > 0) {
        setOpportunities(data.opportunities);
      }
    } catch (err) {
      console.error('Failed to generate GEO advice:', err);
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  // Persona actions
  const handleSelectPersonaPrompts = (personaId: string) => {
    setActiveTab('library');
  };

  const handleGenerateForPersona = (persona: TravelerPersona) => {
    setGeneratorPersonaId(persona.id);
    setIsGeneratorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brandConfig={brandConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGenerator={() => {
          setGeneratorPersonaId(undefined);
          setIsGeneratorOpen(true);
        }}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        totalPromptsCount={prompts.length}
        completedResponsesCount={completedResponsesCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          brandConfig={brandConfig}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenGenerator={() => {
            setGeneratorPersonaId(undefined);
            setIsGeneratorOpen(true);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isAuditingRunning={isBatchRunning || !!runningPromptId}
          totalPromptsCount={prompts.length}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {(activeTab === 'overview' || activeTab === 'dashboard') && (
            <DashboardTab
              metrics={metrics}
              brandConfig={brandConfig}
              personas={personas}
              prompts={prompts}
              onOpenLibrary={() => setActiveTab('library')}
              onOpenSandbox={() => setActiveTab('runs')}
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              onRunBatchAudit={handleRunBatchAudit}
              isBatchRunning={isBatchRunning}
              onInspectPrompt={(p) => setInspectedPrompt(p)}
            />
          )}

          {(activeTab === 'library' || activeTab === 'responses') && (
            <PromptLibraryTab
              prompts={prompts}
              personas={personas}
              brandConfig={brandConfig}
              onInspectPrompt={(p) => setInspectedPrompt(p)}
              onRunSingleAudit={handleRunSingleAudit}
              onOpenGenerator={() => {
                setGeneratorPersonaId(undefined);
                setIsGeneratorOpen(true);
              }}
              onRunAll={handleRunBatchAudit}
              isAuditingRunning={isBatchRunning}
              runningPromptId={runningPromptId}
            />
          )}

          {(activeTab === 'runs' || activeTab === 'sandbox') && (
            <LiveRunnerTab
              brandConfig={brandConfig}
              personas={personas}
              onAddPromptToLibrary={handleAddSinglePrompt}
              onRunAuditApi={handleRunAuditApi}
            />
          )}

          {activeTab === 'visibility' && (
            <DashboardTab
              metrics={metrics}
              brandConfig={brandConfig}
              personas={personas}
              prompts={prompts}
              onOpenLibrary={() => setActiveTab('library')}
              onOpenSandbox={() => setActiveTab('runs')}
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              onRunBatchAudit={handleRunBatchAudit}
              isBatchRunning={isBatchRunning}
              onInspectPrompt={(p) => setInspectedPrompt(p)}
            />
          )}

          {activeTab === 'personas' && (
            <PersonasGuideTab
              personas={personas}
              prompts={prompts}
              metrics={metrics}
              onSelectPersonaPrompts={handleSelectPersonaPrompts}
              onGenerateForPersona={handleGenerateForPersona}
            />
          )}

          {activeTab === 'competitors' && (
            <DashboardTab
              metrics={metrics}
              brandConfig={brandConfig}
              personas={personas}
              prompts={prompts}
              onOpenLibrary={() => setActiveTab('library')}
              onOpenSandbox={() => setActiveTab('runs')}
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              onRunBatchAudit={handleRunBatchAudit}
              isBatchRunning={isBatchRunning}
              onInspectPrompt={(p) => setInspectedPrompt(p)}
            />
          )}

          {activeTab === 'opportunities' && (
            <GeoOpportunitiesTab
              opportunities={opportunities}
              brandConfig={brandConfig}
              prompts={prompts}
              onInspectQuery={(q) => {
                setActiveTab('library');
              }}
              onGenerateGeoAdvice={handleGenerateGeoAdvice}
              isGeneratingAdvice={isGeneratingAdvice}
            />
          )}

          {activeTab === 'how-it-works' && (
            <HowItWorksTab
              brandConfig={brandConfig}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenGenerator={() => {
                setGeneratorPersonaId(undefined);
                setIsGeneratorOpen(true);
              }}
              onOpenSandbox={() => setActiveTab('runs')}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onOpenSettings={() => {
          setIsHowItWorksOpen(false);
          setIsSettingsOpen(true);
        }}
        onOpenGenerator={() => {
          setIsHowItWorksOpen(false);
          setGeneratorPersonaId(undefined);
          setIsGeneratorOpen(true);
        }}
      />

      {/* Prompt Generator Modal */}
      <PromptGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        personas={personas}
        brandConfig={brandConfig}
        onAddGeneratedPrompts={handleAddPrompts}
        initialPersonaId={generatorPersonaId}
      />

      {/* Response Inspector Modal */}
      <ResponseInspectorModal
        promptItem={inspectedPrompt}
        onClose={() => setInspectedPrompt(null)}
        personas={personas}
        brandConfig={brandConfig}
        onReRunAudit={handleRunSingleAudit}
        isAuditing={runningPromptId === inspectedPrompt?.id}
      />

      {/* Settings Modal */}
      <ProjectSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        brandConfig={brandConfig}
        onSaveConfig={(newConfig) => setBrandConfig(newConfig)}
      />
    </div>
  );
}
