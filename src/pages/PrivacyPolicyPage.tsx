import { privacyPolicyDocument } from '../content/legal';

import { LegalDocumentPage } from './LegalDocumentPage';

export function PrivacyPolicyPage() {
  return <LegalDocumentPage document={privacyPolicyDocument} />;
}
