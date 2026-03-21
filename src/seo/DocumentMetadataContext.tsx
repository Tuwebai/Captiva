import { createContext, type PropsWithChildren, useContext } from 'react';

import type { ResolvedDocumentMetadata } from './documentMetadata';

export type DocumentMetadataCollector = {
  set: (metadata: ResolvedDocumentMetadata) => void;
};

const DocumentMetadataContext = createContext<DocumentMetadataCollector | null>(null);

export function DocumentMetadataProvider({
  collector,
  children,
}: PropsWithChildren<{ collector: DocumentMetadataCollector | null }>) {
  return <DocumentMetadataContext.Provider value={collector}>{children}</DocumentMetadataContext.Provider>;
}

export function useDocumentMetadataCollector() {
  return useContext(DocumentMetadataContext);
}
