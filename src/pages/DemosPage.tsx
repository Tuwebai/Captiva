import { useParams, useSearchParams } from 'react-router-dom';

import demosManifest from '../generated/demos-index.json';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { DemosGallerySection } from '../sections/DemosGallerySection';
import type { DemoManifestItem } from '../types/demo';
import { getCatalogDemos, getIndustryFilterOptions } from '../utils/demos';

const activeDemos = getCatalogDemos(demosManifest as DemoManifestItem[]);
const industryFilters = getIndustryFilterOptions(activeDemos);

function getCatalogPath(industry?: string) {
  if (!industry) return siteConfig.routes.captivaDemos;
  return `${siteConfig.routes.captivaDemos}/industria/${industry}`;
}

export function DemosPage() {
  const { industry } = useParams();
  const [searchParams] = useSearchParams();
  const activeIndustry = industryFilters.find((item) => item.key === industry);
  const activeTag = searchParams.get('tag');
  const filteredDemos = activeIndustry ? activeDemos.filter((item) => item.industry === activeIndustry.key) : activeDemos;
  const pagePath = getCatalogPath(activeIndustry?.key);
  const pageTitle = activeIndustry
    ? `Demos de landing pages para ${activeIndustry.label} | ${siteConfig.companyName}`
    : `${siteConfig.pages.demos.seoTitle} | ${siteConfig.companyName}`;
  const pageDescription = activeIndustry
    ? `Explora demos de landing pages para ${activeIndustry.label.toLowerCase()} con estructura de conversion, CTA visible y contacto directo para captar consultas.`
    : siteConfig.pages.demos.seoDescription;
  const keywords = activeIndustry
    ? [
        `demos landing page ${activeIndustry.label.toLowerCase()}`,
        `ejemplos landing ${activeIndustry.label.toLowerCase()}`,
        'landing page para captar clientes',
        'captiva demos',
      ]
    : siteConfig.pages.demos.seoKeywords;

  const demosSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: activeIndustry ? `Demos para ${activeIndustry.label}` : siteConfig.pages.demos.collectionName,
    description: pageDescription,
    url: `${siteConfig.seo.siteUrl}${pagePath}`,
    inLanguage: 'es',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredDemos.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.seo.siteUrl}${item.href}`,
        name: item.title,
      })),
    },
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Captiva',
      item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: siteConfig.pages.demos.breadcrumbDemosLabel,
      item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captivaDemos}`,
    },
  ];

  if (activeIndustry) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: activeIndustry.label,
      item: `${siteConfig.seo.siteUrl}${pagePath}`,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  useDocumentMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
    canonicalUrl: `${siteConfig.seo.siteUrl}${pagePath}`,
    keywords,
    structuredData: [demosSchema, breadcrumbSchema],
  });

  return <DemosGallerySection industrySlug={activeIndustry?.key} key={`${activeIndustry?.key ?? 'all'}:${activeTag ?? 'all'}`} />;
}
