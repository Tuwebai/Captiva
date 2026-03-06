import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { BenefitsSection } from '../sections/BenefitsSection';
import { DemoShowcaseSection } from '../sections/DemoShowcaseSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { HeroSection } from '../sections/HeroSection';
import { ProblemSection } from '../sections/ProblemSection';
import { ProcessSection } from '../sections/ProcessSection';
import { SolutionSection } from '../sections/SolutionSection';

export function HomePage() {
  useDocumentMetadata({
    title: `${siteConfig.productName} | ${siteConfig.companyName}`,
  });

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <DemoShowcaseSection />
      <ProcessSection />
      <FinalCtaSection />
    </>
  );
}
