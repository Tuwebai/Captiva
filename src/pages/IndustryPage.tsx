import { Link, Navigate, useParams } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { trackEvent } from '../utils/analytics';
import { getDemosByIndustry, getIndustryBySlug, getIndustryPages } from '../utils/industry';

const placeholderPreview = '/demo-placeholder.svg';

export function IndustryPage() {
  const params = useParams<{ industry: string; slug: string }>();
  const slug = params.slug ?? `landing-page-para-${params.industry ?? ''}`;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <Navigate replace to={siteConfig.routes.captivaDemos} />;
  }

  const demos = getDemosByIndustry(industry.category);
  const related = getIndustryPages().filter((item) => item.slug !== industry.slug).slice(0, 3);
  const pagePath = `/${industry.slug}`;
  const pageTitle = `${industry.title} | Captiva`;
  const pageDescription = `${industry.problem} ${industry.solution}`;

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
        name: 'Demos',
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captivaDemos}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: industry.title,
        item: `${siteConfig.seo.siteUrl}${pagePath}`,
      },
    ],
  };

  useDocumentMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
    keywords: [
      `landing page para ${industry.industryName}`,
      `pagina web para ${industry.industryName}`,
      `ejemplos landing ${industry.industryName}`,
      'captiva',
    ],
    structuredData: [breadcrumbSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Landing por industria"
          title={industry.title}
          description={`${industry.problem} ${industry.solution}`}
        />

        <div className="card-grid card-grid--two industry-seo-grid">
          <SurfaceCard>
            <h2>Problema del sector</h2>
            <p>{industry.problem}</p>
          </SurfaceCard>
          <SurfaceCard>
            <h2>Como lo resuelve Captiva</h2>
            <p>{industry.solution}</p>
          </SurfaceCard>
        </div>

        <section className="industry-benefits">
          <h2>Beneficios de una landing optimizada</h2>
          <div className="card-grid card-grid--three">
            {industry.benefits.map((benefit) => (
              <SurfaceCard key={benefit}>
                <h3>{benefit}</h3>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="industry-demos">
          <h2>Ejemplos de landing pages para {industry.industryName}</h2>
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
                  Ver demo
                </a>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <section className="industry-links">
          <h2>Explorar otras industrias</h2>
          <div className="card-grid card-grid--three">
            {related.map((item) => (
              <SurfaceCard key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.solution}</p>
                <Link
                  className="text-link"
                  to={`/${item.slug}`}
                  onClick={() => trackEvent({ event: 'internal_nav', category: 'industry', label: item.slug })}
                >
                  Ver pagina por industria
                </Link>
              </SurfaceCard>
            ))}
          </div>
        </section>

        <div className="industry-cta">
          <h2>Crear mi landing page para {industry.industryName}</h2>
          <p>
            Solicita informacion y te mostramos la estructura recomendada para captar consultas en tu rubro.
          </p>
          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            onClick={() => trackEvent({ event: 'cta_click', category: 'industry', label: industry.slug })}
          >
            Crear mi landing page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
