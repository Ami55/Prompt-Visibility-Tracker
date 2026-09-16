import { PromptItem, DashboardMetrics } from '../types';

export function calculateMetrics(
  prompts: PromptItem[],
  primaryBrand: string = 'ToursByLocals',
  competitors: string[] = ['Viator', 'GetYourGuide', 'Withlocals', 'Tripadvisor']
): DashboardMetrics {
  const completedPrompts = prompts.filter((p) => p.status === 'completed' && p.lastResult);
  const total = completedPrompts.length;

  if (total === 0) {
    return {
      totalQueries: prompts.length,
      completedAudits: 0,
      visibilityScore: 0,
      unpromptedMentionRate: 0,
      citationRate: 0,
      shareOfVoice: { [primaryBrand]: 0 },
      averagePosition: 0,
      positiveRecommendationRate: 0,
      accuracyScore: 0,
      stageCoverage: {},
      personaCoverage: {},
      destinationCoverage: {},
      modelComparison: {},
    };
  }

  let brandMentionedCount = 0;
  let unpromptedTotal = 0;
  let unpromptedMentioned = 0;
  let citationCount = 0;
  let positiveCount = 0;
  let totalPosition = 0;
  let positionCount = 0;
  let totalAccuracy = 0;

  // Share of Voice count
  const brandMentionsMap: { [brand: string]: number } = {
    [primaryBrand]: 0,
  };
  competitors.forEach((c) => {
    brandMentionsMap[c] = 0;
  });

  // Journey stage coverage
  const stageMap: { [stage: string]: { total: number; mentioned: number; rate: number } } = {};
  // Persona coverage
  const personaMap: { [personaId: string]: { total: number; mentioned: number; rate: number } } = {};
  // Destination coverage
  const destMap: { [dest: string]: { total: number; mentioned: number; rate: number } } = {};
  // Model comparison
  const modelMap: { [model: string]: { mentioned: number; total: number; rate: number; citationRate: number } } = {};

  completedPrompts.forEach((p) => {
    const res = p.lastResult!;

    // Brand mentioned
    if (res.brandMentioned) {
      brandMentionedCount++;
      brandMentionsMap[primaryBrand] = (brandMentionsMap[primaryBrand] || 0) + 1;
      if (res.brandPosition !== null) {
        totalPosition += res.brandPosition;
        positionCount++;
      }
    }

    // Unprompted check
    if (!p.brandInPrompt) {
      unpromptedTotal++;
      if (res.brandMentioned) {
        unpromptedMentioned++;
      }
    }

    // Website cited
    if (res.websiteCited) {
      citationCount++;
    }

    // Sentiment
    if (res.sentiment === 'Positive') {
      positiveCount++;
    }

    // Accuracy
    totalAccuracy += res.accuracyScore || 90;

    // Competitors mentioned
    if (res.competitorsMentioned && Array.isArray(res.competitorsMentioned)) {
      res.competitorsMentioned.forEach((comp) => {
        // match existing or record
        const matchingComp = competitors.find((c) => c.toLowerCase() === comp.toLowerCase()) || comp;
        brandMentionsMap[matchingComp] = (brandMentionsMap[matchingComp] || 0) + 1;
      });
    }

    // Stage breakdown
    if (!stageMap[p.journeyStage]) {
      stageMap[p.journeyStage] = { total: 0, mentioned: 0, rate: 0 };
    }
    stageMap[p.journeyStage].total++;
    if (res.brandMentioned) stageMap[p.journeyStage].mentioned++;

    // Persona breakdown
    if (!personaMap[p.personaId]) {
      personaMap[p.personaId] = { total: 0, mentioned: 0, rate: 0 };
    }
    personaMap[p.personaId].total++;
    if (res.brandMentioned) personaMap[p.personaId].mentioned++;

    // Destination breakdown
    const dest = p.destination || 'Global';
    if (!destMap[dest]) {
      destMap[dest] = { total: 0, mentioned: 0, rate: 0 };
    }
    destMap[dest].total++;
    if (res.brandMentioned) destMap[dest].mentioned++;

    // Model comparison
    const model = res.model || 'Gemini 2.5 Flash';
    if (!modelMap[model]) {
      modelMap[model] = { mentioned: 0, total: 0, rate: 0, citationRate: 0 };
    }
    modelMap[model].total++;
    if (res.brandMentioned) modelMap[model].mentioned++;
  });

  // Calculate rates
  Object.keys(stageMap).forEach((st) => {
    stageMap[st].rate = Math.round((stageMap[st].mentioned / stageMap[st].total) * 100);
  });
  Object.keys(personaMap).forEach((pe) => {
    personaMap[pe].rate = Math.round((personaMap[pe].mentioned / personaMap[pe].total) * 100);
  });
  Object.keys(destMap).forEach((de) => {
    destMap[de].rate = Math.round((destMap[de].mentioned / destMap[de].total) * 100);
  });
  Object.keys(modelMap).forEach((mo) => {
    modelMap[mo].rate = Math.round((modelMap[mo].mentioned / modelMap[mo].total) * 100);
    modelMap[mo].citationRate = Math.round((citationCount / modelMap[mo].total) * 100);
  });

  const unpromptedMentionRate = unpromptedTotal > 0 ? Math.round((unpromptedMentioned / unpromptedTotal) * 100) : 0;
  const citationRate = Math.round((citationCount / total) * 100);
  const positiveRecommendationRate = Math.round((positiveCount / total) * 100);
  const averagePosition = positionCount > 0 ? Number((totalPosition / positionCount).toFixed(1)) : 0;
  const accuracyScore = Math.round(totalAccuracy / total);

  // SoV calculation (share of total mentions)
  const allMentionsSum = Object.values(brandMentionsMap).reduce((acc, curr) => acc + curr, 0);
  const shareOfVoice: { [brand: string]: number } = {};
  Object.keys(brandMentionsMap).forEach((b) => {
    shareOfVoice[b] = allMentionsSum > 0 ? Math.round((brandMentionsMap[b] / allMentionsSum) * 100) : 0;
  });

  // Composite AI Visibility Score (0 to 100)
  // Weighted: 40% Unprompted Mentions, 25% Share of Voice, 20% Citations, 15% Positive Sentiment
  const brandSoV = shareOfVoice[primaryBrand] || 0;
  const visibilityScore = Math.min(
    100,
    Math.round(
      unpromptedMentionRate * 0.4 +
      brandSoV * 0.25 +
      citationRate * 0.2 +
      positiveRecommendationRate * 0.15
    )
  );

  return {
    totalQueries: prompts.length,
    completedAudits: total,
    visibilityScore,
    unpromptedMentionRate,
    citationRate,
    shareOfVoice,
    averagePosition,
    positiveRecommendationRate,
    accuracyScore,
    stageCoverage: stageMap,
    personaCoverage: personaMap,
    destinationCoverage: destMap,
    modelComparison: modelMap,
  };
}
