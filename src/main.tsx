import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './components/ui/theme/ThemeProvider';
import { AnalyticsProvider } from './lib/analytics';
import { App } from './pages/App';
import './styles/globals.css';

const rootElement = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <ThemeProvider>
      <AnalyticsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AnalyticsProvider>
    </ThemeProvider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
