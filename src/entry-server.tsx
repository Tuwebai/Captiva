import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { ThemeProvider } from './components/ui/theme/ThemeProvider';
import { AppServer } from './pages/AppServer';
import { DocumentMetadataProvider, type DocumentMetadataCollector } from './seo/DocumentMetadataContext';
import type { ResolvedDocumentMetadata } from './seo/documentMetadata';

type RenderResult = {
  appHtml: string;
  metadata: ResolvedDocumentMetadata | null;
};

export function render(url: string): RenderResult {
  let metadata: ResolvedDocumentMetadata | null = null;
  const collector: DocumentMetadataCollector = {
    set(nextMetadata) {
      metadata = nextMetadata;
    },
  };

  const appHtml = renderToString(
    <React.StrictMode>
      <DocumentMetadataProvider collector={collector}>
        <ThemeProvider>
          <StaticRouter location={url}>
            <AppServer />
          </StaticRouter>
        </ThemeProvider>
      </DocumentMetadataProvider>
    </React.StrictMode>,
  );

  return { appHtml, metadata };
}
