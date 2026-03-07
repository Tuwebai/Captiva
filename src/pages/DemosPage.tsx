import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { DemosGallerySection } from '../sections/DemosGallerySection';

export function DemosPage() {
  const demosSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Template Library de Landing Pages',
    description:
      'Galeria de ejemplos de landing pages para negocios, optimizadas para conversion y captacion de consultas.',
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
        name: 'Demos',
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captivaDemos}`,
      },
    ],
  };

  useDocumentMetadata({
    title: `Template Library de Landing Pages | ${siteConfig.companyName}`,
    description:
      'Explora la biblioteca de templates de Captiva por industria: fitness, salud, legal, belleza y negocios para convertir visitas en consultas.',
    path: siteConfig.routes.captivaDemos,
    keywords: [
      'ejemplos de landing pages',
      'landing page para negocios',
      'ejemplos de paginas web profesionales',
      'demos de landing pages',
      'captiva demos',
    ],
    structuredData: [demosSchema, breadcrumbSchema],
  });

  return <DemosGallerySection />;
}
