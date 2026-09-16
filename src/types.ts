export type JourneyStage = 'Inspiration' | 'Destination Selection' | 'Planning' | 'Comparison' | 'Booking';

export type PromptType = 'Unbranded' | 'Category' | 'Comparative' | 'Direct Brand' | 'Transactional';

export type Sentiment = 'Positive' | 'Neutral' | 'Negative' | 'Warning' | 'Not Mentioned';

export type LLMModel = 'Gemini 2.5 Flash' | 'ChatGPT Search' | 'Claude 3.5 Sonnet' | 'Perplexity AI' | 'MS Copilot';

export interface TravelerPersona {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  avatarIcon: string;
  color: string;
  keyConcerns: string[];
  typicalStages: JourneyStage[];
}

export interface AuditResult {
  id: string;
  promptId: string;
  query: string;
  model: LLMModel;
  timestamp: string;
  rawResponse: string;
  brandMentioned: boolean;
  brandPosition: number | null; // 1, 2, 3, etc.
  websiteCited: boolean;
  citedUrls?: string[];
  sentiment: Sentiment;
  competitorsMentioned: string[];
  recommendationRationale: string;
  accuracyScore: number; // 0 to 100
  bookingIntent: boolean;
  keyStrengths?: string[];
  keyDrawbacks?: string[];
}

export interface PromptItem {
  id: string;
  query: string;
  personaId: string;
  journeyStage: JourneyStage;
  destination: string;
  promptType: PromptType;
  intent: string;
  constraints?: string;
  interests?: string;
  brandInPrompt: boolean;
  status: 'pending' | 'running' | 'completed' | 'failed';
  lastRunDate?: string;
  lastResult?: AuditResult;
}

export interface BrandProjectConfig {
  brandName: string;
  brandDomain: string;
  brandCategory: string;
  brandDescription: string;
  competitors: string[];
  targetDestinations: string[];
  targetPersonas: string[];
  targetLanguage: string;
}

export interface GeoOpportunity {
  id: string;
  destination: string;
  personaName: string;
  stage: JourneyStage;
  query: string;
  competitorWinner: string;
  priority: 'High' | 'Medium' | 'Critical';
  recommendation: string;
  actionItem: string;
  potentialLift: string;
}

export interface DashboardMetrics {
  totalQueries: number;
  completedAudits: number;
  visibilityScore: number; // 0-100
  unpromptedMentionRate: number; // %
  citationRate: number; // %
  shareOfVoice: { [brand: string]: number };
  averagePosition: number;
  positiveRecommendationRate: number; // %
  accuracyScore: number; // %
  stageCoverage: { [stage: string]: { total: number; mentioned: number; rate: number } };
  personaCoverage: { [personaId: string]: { total: number; mentioned: number; rate: number } };
  destinationCoverage: { [dest: string]: { total: number; mentioned: number; rate: number } };
  modelComparison: { [model: string]: { mentioned: number; total: number; rate: number; citationRate: number } };
}
