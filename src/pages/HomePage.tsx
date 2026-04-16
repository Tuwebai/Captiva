import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { DemoShowcaseSection } from '../sections/DemoShowcaseSection';
import { FaqSection, faqSchema } from '../sections/FaqSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';
import { HeroSection } from '../sections/HeroSection';
import { HowItWorksSection } from '../sections/HowItWorksSection';
import { OfferSection } from '../sections/OfferSection';
import { SocialProofSection } from '../sections/SocialProofSection';

export function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.companyName,
    url: siteConfig.seo.siteUrl,
    email: siteConfig.contact.primaryEmail,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: siteConfig.contact.productEmail,
        telephone: `+${siteConfig.contact.whatsapp}`,
      },
    ],
    sameAs: [],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: siteConfig.productName,
    description: siteConfig.seo.defaultDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.companyName,
    },
    url: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
    areaServed: 'AR',
    serviceType: 'Landing pages de conversión para negocios',
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.productName,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: siteConfig.seo.defaultDescription,
    url: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultImage}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${siteConfig.productName} | ${siteConfig.companyName}`,
    url: siteConfig.seo.siteUrl,
    inLanguage: 'es',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.seo.siteUrl}${siteConfig.routes.captivaDemos}?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  useDocumentMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    path: siteConfig.routes.captiva,
    keywords: [
      'landing pages',
      'landing pages para negocios',
      'sistema de captación de clientes',
      'landing pages de conversión',
      'captiva',
      'tuwebai',
    ],
    structuredData: [organizationSchema, serviceSchema, softwareApplicationSchema, websiteSchema, faqSchema],
  });

  return (
    <>
      <HeroSection />
      <DemoShowcaseSection />
      <HowItWorksSection />
      <OfferSection />
      <SocialProofSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
