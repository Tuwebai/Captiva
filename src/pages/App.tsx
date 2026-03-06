import { Navigate, Route, Routes } from 'react-router-dom';

import { siteConfig } from '../config/site';
import { PageShell } from '../layout/PageShell';
import { DemosPage } from './DemosPage';
import { HomePage } from './HomePage';

export function App() {
  return (
    <PageShell>
      <Routes>
        <Route path={siteConfig.routes.home} element={<Navigate replace to={siteConfig.routes.captiva} />} />
        <Route path={siteConfig.routes.captiva} element={<HomePage />} />
        <Route path={siteConfig.routes.captivaDemos} element={<DemosPage />} />
      </Routes>
    </PageShell>
  );
}
