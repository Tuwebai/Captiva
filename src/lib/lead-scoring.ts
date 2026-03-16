import type { PageType } from '../utils/page-context';

export type LeadScoreLevel = 'exploratorio' | 'interesado' | 'caliente' | 'muy caliente';

export type LeadScoringInput = {
  pageType?: PageType;
  source?: string;
  action?: 'view' | 'contact';
  industry?: string;
  city?: string;
  context?: string;
};

export type LeadScoringResult = {
  score: number;
  level: LeadScoreLevel;
};

const PAGE_TYPE_SCORES: Partial<Record<PageType, number>> = {
  home: 5,
  blog: 10,
  'blog-post': 10,
  industry: 15,
  city: 15,
  demos: 20,
  demo: 20,
  comparison: 25,
};

const SOURCE_BONUSES: Array<[pattern: RegExp, points: number]> = [
  [/organic/i, 10],
  [/ads?/i, 5],
  [/(demo|catalogo|catalog)/i, 8],
  [/(industry|industria|seo)/i, 6],
  [/(final-cta|hero|offer|plan)/i, 5],
];

export function classifyLeadScore(score: number): LeadScoreLevel {
  if (score <= 20) return 'exploratorio';
  if (score <= 40) return 'interesado';
  if (score <= 60) return 'caliente';
  return 'muy caliente';
}

export function scoreLead(input: LeadScoringInput): LeadScoringResult {
  let score = 0;

  if (input.pageType) {
    score += PAGE_TYPE_SCORES[input.pageType] ?? 0;
  }

  if (input.source) {
    for (const [pattern, points] of SOURCE_BONUSES) {
      if (pattern.test(input.source)) {
        score += points;
        break;
      }
    }
  }

  if (input.industry) score += 5;
  if (input.city) score += 5;
  if (input.context) score += 5;
  if (input.action === 'contact') score += 40;

  return {
    score,
    level: classifyLeadScore(score),
  };
}
