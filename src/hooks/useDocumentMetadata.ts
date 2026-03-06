import { useEffect } from 'react';

import { siteConfig } from '../config/site';

type DocumentMetadata = {
  title: string;
  description?: string;
};

export function useDocumentMetadata({
  title,
  description = siteConfig.description,
}: DocumentMetadata) {
  useEffect(() => {
    document.title = title;

    const metaDescription =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
      document.createElement('meta');

    metaDescription.name = 'description';
    metaDescription.content = description;

    if (!metaDescription.parentNode) {
      document.head.appendChild(metaDescription);
    }
  }, [description, title]);
}
