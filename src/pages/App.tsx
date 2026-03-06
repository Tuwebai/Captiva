import { Navigate, Route, Routes } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { PageShell } from '../layout/PageShell';
import { BlogPage } from './BlogPage';
import { DemoFallbackPage } from './DemoFallbackPage';
import { DemosPage } from './DemosPage';
import { HomePage } from './HomePage';
import { IndustryPage } from './IndustryPage';

export function App() {
  return (
    <PageShell>
      <Routes>
        <Route path={siteConfig.routes.home} element={<Navigate replace to={siteConfig.routes.captiva} />} />
        <Route path={siteConfig.routes.captiva} element={<HomePage />} />
        <Route path={siteConfig.routes.captivaDemos} element={<DemosPage />} />
        <Route path="/demo/:slug" element={<DemoFallbackPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/landing-page-para-:industry" element={<IndustryPage />} />
        <Route path="/:slug" element={<IndustryPage />} />
      </Routes>
    </PageShell>
  );
}
