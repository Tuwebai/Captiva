import type { DemoManifestItem } from '../types/demo';
import type { IndustryPageData } from '../types/industry';
import { getBlogPosts } from './blog';
import { getCityLandingsByIndustrySlug } from './city-landings';
import { getComparisonBySlug, getLandingExampleByIndustrySlug, getTopComparisons } from './seo-cluster';
import { getDemosByIndustry, getIndustryBySlug, getIndustryPages } from './industry';

export type SeoAutoLink = {
  href: string;
  label: string;
  description?: string;
  type: 'industry' | 'example' | 'city' | 'demo' | 'blog' | 'comparison';
};

type RelatedLinksOptions = {
  industrySlug?: string;
  citySlug?: string;
  maxLinks?: number;
};

function normalizeIndustryRouteSlug(industrySlug: string) {
  return industrySlug.startsWith('landing-page-para-') ? industrySlug : `landing-page-para-${industrySlug}`;
}

function mapIndustryToLink(industry: IndustryPageData): SeoAutoLink {
  return {
    href: `/${industry.slug}`,
    label: industry.title,
    description: industry.solution,
    type: 'industry',
  };
}

function mapDemoToLink(demo: DemoManifestItem): SeoAutoLink {
  return {
    href: demo.href,
    label: demo.title,
    description: demo.description,
    type: 'demo',
  };
}

export function getIndustryLinks(limit = 4): SeoAutoLink[] {
  return getIndustryPages().slice(0, limit).map(mapIndustryToLink);
}

export function getCityLinks(industrySlug: string, limit = 3): SeoAutoLink[] {
  return getCityLandingsByIndustrySlug(normalizeIndustryRouteSlug(industrySlug), limit).map((item) => ({
    href: item.path,
    label: item.title,
    description: item.description,
    type: 'city',
  }));
}

export function getExampleLinks(industrySlug: string): SeoAutoLink[] {
  const example = getLandingExampleByIndustrySlug(normalizeIndustryRouteSlug(industrySlug));
  if (!example) return [];
  return [
    {
      href: `/${example.slug}`,
      label: example.title,
      description: example.description,
      type: 'example',
    },
  ];
}

export function getBlogLinks(limit = 3): SeoAutoLink[] {
  return getBlogPosts()
    .slice(0, limit)
    .map((post) => ({
      href: `/blog/${post.slug}`,
      label: post.title,
      description: post.description,
      type: 'blog',
    }));
}

export function getDemoLinks(industrySlug: string, limit = 1): SeoAutoLink[] {
  const industry = getIndustryBySlug(normalizeIndustryRouteSlug(industrySlug));
  if (!industry) return [];
  return getDemosByIndustry(industry.category).slice(0, limit).map(mapDemoToLink);
}

export function getComparisonLinks(limit = 1): SeoAutoLink[] {
  const featured = getComparisonBySlug('landing-page-vs-sitio-web');
  if (featured) {
    return [
      {
        href: `/${featured.slug}`,
        label: featured.title,
        description: featured.description,
        type: 'comparison' as const,
      },
      ...getTopComparisons(Math.max(limit - 1, 0))
        .filter((item) => item.slug !== featured.slug)
        .map((item) => ({
          href: `/${item.slug}`,
          label: item.title,
          description: item.description,
          type: 'comparison' as const,
        })),
    ].slice(0, limit);
  }

  return getTopComparisons(limit).map((item) => ({
    href: `/${item.slug}`,
    label: item.title,
    description: item.description,
    type: 'comparison',
  }));
}

export function getRelatedLinks({ industrySlug, citySlug, maxLinks = 8 }: RelatedLinksOptions): SeoAutoLink[] {
  const ordered: SeoAutoLink[] = [];

  if (industrySlug) {
    const normalizedIndustrySlug = normalizeIndustryRouteSlug(industrySlug);
    const industry = getIndustryBySlug(normalizedIndustrySlug);
    if (industry) {
      ordered.push(mapIndustryToLink(industry));
    }
    ordered.push(...getExampleLinks(normalizedIndustrySlug));
    ordered.push(...getCityLinks(normalizedIndustrySlug, citySlug ? 4 : 3));
    ordered.push(...getDemoLinks(normalizedIndustrySlug, 1));
  } else {
    ordered.push(...getIndustryLinks(3));
  }

  ordered.push(...getBlogLinks(2));
  ordered.push(...getComparisonLinks(1));

  const deduped = ordered.filter((link, index, self) => self.findIndex((item) => item.href === link.href) === index);
  const filtered = citySlug ? deduped.filter((link) => !link.href.endsWith(`-${citySlug}`) || link.type !== 'city') : deduped;
  return filtered.slice(0, maxLinks);
}
