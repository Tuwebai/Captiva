import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { initTooltipSystem } from '../components/ui/tooltip-system';
import { siteConfig } from '../config/site';
import { PageShell } from '../layout/PageShell';
import { BlogPage } from './BlogPage';
import { BlogPostPageServer } from './BlogPostPageServer';
import { DemosPage } from './DemosPage';
import { HomePage } from './HomePage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { ProgrammaticSeoPageServer } from './ProgrammaticSeoPageServer';
import { TermsOfServicePage } from './TermsOfServicePage';

export function AppServer() {
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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/page/:page" element={<BlogPage />} />
        <Route path="/blog/tag/:tag" element={<BlogPage />} />
        <Route path="/blog/tag/:tag/page/:page" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPageServer />} />
        <Route path="*" element={<ProgrammaticSeoPageServer />} />
      </Routes>
      <div id="global-tooltip" role="tooltip" aria-hidden="true" />
    </PageShell>
  );
}
