import { useEffect, useMemo } from 'react';

import { useDocumentMetadataCollector } from '../seo/DocumentMetadataContext';
import {
  applyResolvedDocumentMetadata,
  resolveDocumentMetadata,
  type DocumentMetadata,
} from '../seo/documentMetadata';

export function useDocumentMetadata({
  title,
  path,
  canonicalUrl,
  prevPath,
  nextPath,
  keywords,
  description,
  robots,
  ogType,
  image,
  structuredData,
}: DocumentMetadata) {
  const collector = useDocumentMetadataCollector();
  const resolvedMetadata = useMemo(
    () =>
      resolveDocumentMetadata({
        title,
        description,
        path,
        canonicalUrl,
        prevPath,
        nextPath,
        robots,
        ogType,
        image,
        keywords,
        structuredData,
      }),
    [canonicalUrl, description, image, keywords, nextPath, ogType, path, prevPath, robots, structuredData, title],
  );

  if (typeof document === 'undefined' && collector) {
    collector.set(resolvedMetadata);
  }

  useEffect(() => {
    applyResolvedDocumentMetadata(resolvedMetadata);
  }, [resolvedMetadata]);
}
