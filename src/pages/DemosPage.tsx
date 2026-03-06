import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { DemosGallerySection } from '../sections/DemosGallerySection';

export function DemosPage() {
  useDocumentMetadata({
    title: `Demos de Landing Pages | ${siteConfig.companyName}`,
    description:
      'Galería de demos de Captiva para explorar ejemplos reales de landing pages por rubro.',
  });

  return <DemosGallerySection />;
}
