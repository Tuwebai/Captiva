import { Link, Navigate, useLocation } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getRouteCta } from '../config/cta-strategy';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { trackEvent } from '../utils/analytics';
import { getCityLandingBySlug } from '../utils/city-landings';
import { getDemosByIndustry, getIndustryBySlug, getIndustryPages } from '../utils/industry';
import { CityIndustryLandingPage } from './CityIndustryLandingPage';

const placeholderPreview = '/demo-placeholder.svg';

export function IndustryPage() {
  const industriesCta = getRouteCta('industries');
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const cityLanding = getCityLandingBySlug(slug);

  if (cityLanding) {
    return <CityIndustryLandingPage entry={cityLanding} />;
  }

  const industry = getIndustryBySlug(slug);
  if (!industry) {
    return <Navigate replace to={siteConfig.routes.captivaDemos} />;
  }

  const demos = getDemosByIndustry(industry.category);
  const related = getIndustryPages().filter((item) => item.slug !== industry.slug).slice(0, 3);
  const pagePath = `/${industry.slug}`;
  const pageTitle = `${industry.title} | Captiva`;
  const pageDescription = `${industry.heroDescription} ${industry.solution}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Captiva',
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Landing pages por industria',
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}#demos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: industry.title,
        item: `${siteConfig.seo.siteUrl}${pagePath}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: industry.title,
    serviceType: 'LeadGenerationService',
    description: pageDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: 'https://tuweb-ai.com/',
    },
    areaServed: 'Latam',
    url: `${siteConfig.seo.siteUrl}${pagePath}`,
  };

  const faqSchema = industry.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: industry.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  useDocumentMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
    keywords: [
      `landing page para ${industry.industryName}`,
      `captación de clientes para ${industry.industryName}`,
      `ejemplos landing ${industry.industryName}`,
      'captiva',
    ],
    structuredData: faqSchema ? [breadcrumbSchema, serviceSchema, faqSchema] : [breadcrumbSchema, serviceSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading as="h1" eyebrow={siteConfig.pages.industry.eyebrow} title={industry.heroTitle} description={industry.heroDescription} />

        <div className="card-grid card-grid--two industry-seo-grid">
          <SurfaceCard>
            <h2>{siteConfig.pages.industry.sectorProblemTitle}</h2>
            <p>{industry.problem}</p>
            <ul className="blog-related-list">
              {industry.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </SurfaceCard>
          <SurfaceCard>
            <h2>{siteConfig.pages.industry.solutionTitle}</h2>
            <p>{industry.solution}</p>
          </SurfaceCard>
        </div>

        <section className="industry-benefits">
          <h2>{siteConfig.pages.industry.benefitsTitle}</h2>
          <div className="card-grid card-grid--three">
            {industry.benefits.map((benefit) => (
              <SurfaceCard key={benefit}>
                <h3>{benefit}</h3>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="industry-demos">
          <h2>
            {siteConfig.pages.industry.demosTitlePrefix} {industry.industryName}
          </h2>
          <div className="card-grid card-grid--three">
            {demos.map((demo) => (
              <SurfaceCard key={demo.slug} className="demo-gallery-card">
                <a className="demo-gallery-card__preview" href={demo.href} target="_blank" rel="noreferrer">
                  <img
                    src={demo.preview ?? placeholderPreview}
                    alt={demo.title}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1000}
                  />
                </a>
                <h3>{demo.title}</h3>
                <p>{demo.description}</p>
                <a
                  className="text-link"
                  href={demo.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent({ event: 'demo_click', category: industry.category, label: demo.publicSlug })}
                >
                  {industriesCta.primary}
                </a>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {industry.faq.length > 0 ? (
          <section className="industry-links">
            <h2>Preguntas frecuentes</h2>
            <div className="card-grid card-grid--two">
              {industry.faq.map((item) => (
                <SurfaceCard key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </SurfaceCard>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedLinksSection title={`Ver mas recursos para ${industry.industryName}`} industry={industry.slug} maxLinks={8} />

        <section className="industry-links">
          <h2>{siteConfig.pages.industry.exploreOtherTitle}</h2>
          <div className="card-grid card-grid--three">
            {related.map((item) => (
              <SurfaceCard key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.solution}</p>
                <Link className="text-link" to={`/${item.slug}`} onClick={() => trackEvent({ event: 'internal_nav', category: 'industry', label: item.slug })}>
                  {siteConfig.pages.industry.industryLinkLabel}
                </Link>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <div className="industry-cta">
          <h2>
            {siteConfig.pages.industry.ctaTitlePrefix} {industry.industryName}
          </h2>
          <p>{siteConfig.pages.industry.ctaDescription}</p>
          <div className="cta-row">
            <Link className="button-link button-link--secondary" to={siteConfig.routes.captivaDemos}>
              {industriesCta.primary}
            </Link>
            <PrimaryCTA
              label={industriesCta.secondary ?? 'Quiero mi landing'}
              mode="lead-form"
              leadFormId={`lead-form-${industry.slug}`}
              source="industry"
              industry={industry.industryName}
              context={industry.slug}
              variant="primary"
            />
            <ButtonLink href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer" variant="secondary">
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>

        <LeadFormSection
          id={`lead-form-${industry.slug}`}
          source="industry"
          industry={industry.industryName}
          context={industry.slug}
          title={`Solicitar landing para ${industry.industryName}`}
        />
      </div>
    </section>
  );
}
