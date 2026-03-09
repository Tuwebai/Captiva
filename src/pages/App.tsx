import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { usePageTracking } from '../hooks/usePageTracking';
import { useScrollDepth } from '../hooks/useScrollDepth';
import { PageShell } from '../layout/PageShell';
import { initAnalytics } from '../utils/analytics';
import { setupOutboundLinkTracking } from '../utils/outbound-links';
import { initTooltipSystem } from '../components/ui/tooltip-system';
import { DemosPage } from './DemosPage';
import { HomePage } from './HomePage';
import { IndustryPage } from './IndustryPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfServicePage } from './TermsOfServicePage';

const BlogPage = lazy(async () => {
  const module = await import('./BlogPage');
  return { default: module.BlogPage };
});

const BlogPostPage = lazy(async () => {
  const module = await import('./BlogPostPage');
  return { default: module.BlogPostPage };
});

const ExampleLandingPage = lazy(async () => {
  const module = await import('./ExampleLandingPage');
  return { default: module.ExampleLandingPage };
});

const ComparisonPage = lazy(async () => {
  const module = await import('./ComparisonPage');
  return { default: module.ComparisonPage };
});

function BlogRouteFallback() {
  return (
    <section className="content-section">
      <div className="container">
        <p>Cargando contenido...</p>
      </div>
    </section>
  );
}

export function App() {
  usePageTracking();
  useScrollDepth();

  useEffect(() => {
    initAnalytics();
    const cleanupOutboundTracking = setupOutboundLinkTracking();
    return () => cleanupOutboundTracking();
  }, []);

  useEffect(() => {
    const cleanupTooltipSystem = initTooltipSystem();
    return () => cleanupTooltipSystem();
  }, []);

  return (
    <PageShell>
      <Routes>
        <Route path={siteConfig.routes.home} element={<Navigate replace to={siteConfig.routes.captiva} />} />
        <Route path={siteConfig.routes.captiva} element={<HomePage />} />
        <Route path={siteConfig.routes.captivaDemos} element={<DemosPage />} />
        <Route path={`${siteConfig.routes.captivaDemos}/industria/:industry`} element={<DemosPage />} />
        <Route path={siteConfig.routes.termsOfService} element={<TermsOfServicePage />} />
        <Route path={siteConfig.routes.privacyPolicy} element={<PrivacyPolicyPage />} />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/page/:page"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/tag/:tag"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/tag/:tag/page/:page"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <BlogPostPage />
            </Suspense>
          }
        />
        <Route
          path="/ejemplo-landing-page-:example"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <ExampleLandingPage />
            </Suspense>
          }
        />
        <Route
          path="/landing-page-vs-:comparison"
          element={
            <Suspense fallback={<BlogRouteFallback />}>
              <ComparisonPage />
            </Suspense>
          }
        />
        <Route path="/landing-page-para-:industry" element={<IndustryPage />} />
        <Route path="/:slug" element={<IndustryPage />} />
      </Routes>
      <div id="global-tooltip" role="tooltip" aria-hidden="true" />
    </PageShell>
  );
}
