import { Navigate, useLocation } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { ComparisonPage } from './ComparisonPage';
import { ExampleLandingPage } from './ExampleLandingPage';
import { IndustryPage } from './IndustryPage';

export function ProgrammaticSeoPageServer() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');

  if (slug.startsWith('landing-page-para-')) {
    return <IndustryPage />;
  }

  if (slug.startsWith('landing-page-vs-')) {
    return <ComparisonPage />;
  }

  if (slug.startsWith('ejemplo-landing-page-')) {
    return <ExampleLandingPage />;
  }

  return <Navigate replace to={siteConfig.routes.captivaDemos} />;
}
