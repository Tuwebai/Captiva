import { LegalDocumentPage } from './LegalDocumentPage';
import { termsOfServiceDocument } from '../content/legal';

export function TermsOfServicePage() {
  return <LegalDocumentPage document={termsOfServiceDocument} />;
}
