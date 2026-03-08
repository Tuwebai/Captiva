import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { DemosGallerySection } from '../sections/DemosGallerySection';

export function DemosPage() {
  const demosSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: siteConfig.pages.demos.collectionName,
    description: siteConfig.pages.demos.collectionDescription,
    url: `${siteConfig.seo.siteUrl}${siteConfig.routes.captivaDemos}`,
    inLanguage: 'es',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
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
    ],
  };

  useDocumentMetadata({
    title: `${siteConfig.pages.demos.seoTitle} | ${siteConfig.companyName}`,
    description: siteConfig.pages.demos.seoDescription,
    path: siteConfig.routes.captivaDemos,
    keywords: siteConfig.pages.demos.seoKeywords,
    structuredData: [demosSchema, breadcrumbSchema],
  });

  return <DemosGallerySection />;
}
