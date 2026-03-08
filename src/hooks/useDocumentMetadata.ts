import { useEffect } from 'react';

import { siteConfig } from '../config/site';

type DocumentMetadata = {
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

export function useDocumentMetadata({
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
}: DocumentMetadata) {
  useEffect(() => {
    const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, '');
    const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const resolvedCanonical = canonicalUrl ?? (path ? `${siteUrl}${path}` : `${siteUrl}${siteConfig.routes.captiva}`);

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

    document.title = title;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: robots });
    if (keywords && keywords.length > 0) {
      setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    } else {
      document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]')?.remove();
    }

    setLink('link[rel="canonical"]', { rel: 'canonical', href: resolvedCanonical });
    if (prevPath) {
      setLink('link[rel="prev"]', { rel: 'prev', href: `${siteUrl}${prevPath}` });
    } else {
      removeLink('link[rel="prev"]');
    }
    if (nextPath) {
      setLink('link[rel="next"]', { rel: 'next', href: `${siteUrl}${nextPath}` });
    } else {
      removeLink('link[rel="next"]');
    }

    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: ogType });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: resolvedCanonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: siteConfig.seo.twitterCard });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage });

    document
      .querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][data-seo-json-ld="true"]')
      .forEach((node) => node.remove());

    structuredData.forEach((item) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonLd = 'true';
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }, [canonicalUrl, description, image, keywords, nextPath, ogType, path, prevPath, robots, structuredData, title]);
}
