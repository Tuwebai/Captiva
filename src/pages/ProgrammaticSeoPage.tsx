import { Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { siteConfig } from '../config/site';

const ExampleLandingPage = lazy(async () => {
  const module = await import('./ExampleLandingPage');
  return { default: module.ExampleLandingPage };
});

const ComparisonPage = lazy(async () => {
  const module = await import('./ComparisonPage');
  return { default: module.ComparisonPage };
});

const IndustryPage = lazy(async () => {
  const module = await import('./IndustryPage');
  return { default: module.IndustryPage };
});

function ProgrammaticRouteFallback() {
  return (
    <section className="content-section">
      <div className="container">
        <p>Cargando contenido...</p>
      </div>
    </section>
  );
}

export function ProgrammaticSeoPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');

  if (slug.startsWith('landing-page-para-')) {
    return (
      <Suspense fallback={<ProgrammaticRouteFallback />}>
        <IndustryPage />
      </Suspense>
    );
  }

  if (slug.startsWith('landing-page-vs-')) {
    return (
      <Suspense fallback={<ProgrammaticRouteFallback />}>
        <ComparisonPage />
      </Suspense>
    );
  }

  if (slug.startsWith('ejemplo-landing-page-')) {
    return (
      <Suspense fallback={<ProgrammaticRouteFallback />}>
        <ExampleLandingPage />
      </Suspense>
    );
  }

  return <Navigate replace to={siteConfig.routes.captivaDemos} />;
}
