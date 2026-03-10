import { Link, Navigate, useParams } from 'react-router-dom';

import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getRouteCta } from '../config/cta-strategy';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { trackEvent } from '../utils/analytics';
import { getComparisonBySlug, getTopLandingExamples } from '../utils/seo-cluster';

function buildSlug(param: string | undefined) {
  if (!param) return '';
  return `landing-page-vs-${param}`;
}

export function ComparisonPage() {
  const comparisonCta = getRouteCta('comparatives');
  const { comparison } = useParams<{ comparison: string }>();
  const slug = buildSlug(comparison);
  const entry = getComparisonBySlug(slug);

  if (!entry) {
    return <Navigate replace to={siteConfig.routes.captiva} />;
  }

  const path = `/${entry.slug}`;
  const examples = getTopLandingExamples(3);

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
        name: 'Comparativas',
        item: `${siteConfig.seo.siteUrl}${path}`,
      },
    ],
  };

  useDocumentMetadata({
    title: `${entry.title} | Captiva`,
    description: entry.description,
    path,
    keywords: [entry.slug.replace(/-/g, ' '), 'comparativa landing page', 'captiva'],
    structuredData: [breadcrumbSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading as="h1" eyebrow="Comparativa" title={entry.title} description={entry.description} />

        <SurfaceCard>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Criterio</th>
                  <th>Landing con Captiva</th>
                  <th>Alternativa</th>
                </tr>
              </thead>
              <tbody>
                {entry.rows.map((row) => (
                  <tr key={row.criteria}>
                    <td>{row.criteria}</td>
                    <td>{row.landingPage}</td>
                    <td>{row.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>

        {examples.length > 0 ? (
          <section className="industry-links">
            <h2>Ejemplos relacionados</h2>
            <div className="card-grid card-grid--three">
              {examples.map((item) => (
                <SurfaceCard key={item.slug}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="text-link" to={`/${item.slug}`}>
                    Ver ejemplo
                  </Link>
                </SurfaceCard>
              ))}
            </div>
          </section>
        ) : null}

        <div className="industry-cta">
          <h2>¿Querés validar qué estructura te conviene?</h2>
          <p>Podemos recomendarte el formato ideal según tu objetivo de captación y ciclo comercial.</p>
          <div className="cta-row">
            <Link className="button-link button-link--secondary" to={siteConfig.routes.captivaDemos}>
              {comparisonCta.primary}
            </Link>
            <ButtonLink
              href={siteConfig.contact.ctaHref}
              variant="primary"
              onClick={() => trackEvent({ event: 'cta_click', category: 'comparison-page', label: `${entry.slug}-landing` })}
            >
              Quiero mi landing
            </ButtonLink>
            <ButtonLink
              href={siteConfig.contact.ctaHref}
              variant="secondary"
              onClick={() => trackEvent({ event: 'cta_click', category: 'comparison-page', label: `${entry.slug}-whatsapp` })}
            >
              {comparisonCta.secondary ?? 'Hablar por WhatsApp'}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
