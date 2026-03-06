import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { siteConfig } from '../config/site';

export function DemoFallbackPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';

  useEffect(() => {
    if (!slug) return;

    window.location.href = `/demos/${slug}/index.html`;
  }, [slug]);

  if (!slug) {
    return <Navigate replace to={siteConfig.routes.captivaDemos} />;
  }

  return null;
}
