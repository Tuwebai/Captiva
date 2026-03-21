import { siteConfig } from '../config/site';

export type DocumentMetadata = {
  title: string;
  description?: string;
  path?: string;
  canonicalUrl?: string;
  prevPath?: string;
  nextPath?: string;
  robots?: string;
  ogType?: 'website' | 'article' | 'product';
  image?: string;
  keywords?: string[];
  structuredData?: Record<string, unknown>[];
};

export type ResolvedDocumentMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  prevUrl?: string;
  nextUrl?: string;
  robots: string;
  ogType: 'website' | 'article' | 'product';
  image: string;
  keywords?: string[];
  structuredData: Record<string, unknown>[];
};

export function resolveDocumentMetadata({
  title,
  description = siteConfig.description,
  path,
  canonicalUrl,
  prevPath,
  nextPath,
  robots = 'index,follow',
  ogType = 'website',
  image = siteConfig.seo.defaultImage,
  keywords,
  structuredData = [],
}: DocumentMetadata): ResolvedDocumentMetadata {
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, '');
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const resolvedCanonical = canonicalUrl ?? (path ? `${siteUrl}${path}` : `${siteUrl}${siteConfig.routes.captiva}`);

  return {
    title,
    description,
    canonicalUrl: resolvedCanonical,
    prevUrl: prevPath ? `${siteUrl}${prevPath}` : undefined,
    nextUrl: nextPath ? `${siteUrl}${nextPath}` : undefined,
    robots,
    ogType,
    image: absoluteImage,
    keywords,
    structuredData,
  };
}

export function applyResolvedDocumentMetadata(metadata: ResolvedDocumentMetadata) {
  const setMeta = (selector: string, attrs: Record<string, string>) => {
    const existing = document.head.querySelector<HTMLMetaElement>(selector);
    const element = existing ?? document.createElement('meta');

    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    if (!existing) {
      document.head.appendChild(element);
    }
  };

  const setLink = (selector: string, attrs: Record<string, string>) => {
    const existing = document.head.querySelector<HTMLLinkElement>(selector);
    const element = existing ?? document.createElement('link');

    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    if (!existing) {
      document.head.appendChild(element);
    }
  };

  const removeLink = (selector: string) => {
    document.head.querySelector<HTMLLinkElement>(selector)?.remove();
  };

  document.title = metadata.title;

  setMeta('meta[name="description"]', { name: 'description', content: metadata.description });
  setMeta('meta[name="robots"]', { name: 'robots', content: metadata.robots });
  if (metadata.keywords && metadata.keywords.length > 0) {
    setMeta('meta[name="keywords"]', { name: 'keywords', content: metadata.keywords.join(', ') });
  } else {
    document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]')?.remove();
  }

  setLink('link[rel="canonical"]', { rel: 'canonical', href: metadata.canonicalUrl });
  if (metadata.prevUrl) {
    setLink('link[rel="prev"]', { rel: 'prev', href: metadata.prevUrl });
  } else {
    removeLink('link[rel="prev"]');
  }

  if (metadata.nextUrl) {
    setLink('link[rel="next"]', { rel: 'next', href: metadata.nextUrl });
  } else {
    removeLink('link[rel="next"]');
  }

  setMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title });
  setMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description });
  setMeta('meta[property="og:type"]', { property: 'og:type', content: metadata.ogType });
  setMeta('meta[property="og:url"]', { property: 'og:url', content: metadata.canonicalUrl });
  setMeta('meta[property="og:image"]', { property: 'og:image', content: metadata.image });

  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: siteConfig.seo.twitterCard });
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title });
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description });
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: metadata.image });

  document
    .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][data-seo-json-ld="true"]')
    .forEach((node) => node.remove());

  metadata.structuredData.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonLd = 'true';
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
}
