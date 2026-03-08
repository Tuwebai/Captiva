import { Link, Navigate, useParams } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { getDemoForCategory, getLandingExampleBySlug, getTopComparisons } from '../utils/seo-cluster';

function buildSlug(param: string | undefined) {
  if (!param) return '';
  return `ejemplo-landing-page-${param}`;
}

export function ExampleLandingPage() {
  const { example } = useParams<{ example: string }>();
  const slug = buildSlug(example);
  const entry = getLandingExampleBySlug(slug);

  if (!entry) {
    return <Navigate replace to={siteConfig.routes.captivaDemos} />;
  }

  const demo = getDemoForCategory(entry.category);
  const path = `/${entry.slug}`;
  const comparisons = getTopComparisons(3);

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
        name: 'Ejemplos',
        item: `${siteConfig.seo.siteUrl}${path}`,
      },
    ],
  };

  useDocumentMetadata({
    title: `${entry.title} | Captiva`,
    description: entry.description,
    path,
    keywords: [
      entry.title.toLowerCase(),
      `diseno ${entry.title.toLowerCase()}`,
      'ejemplos de landing pages',
    ],
    structuredData: [breadcrumbSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading as="h1" eyebrow="Ejemplo de landing" title={entry.title} description={entry.description} />

        <div className="card-grid card-grid--two industry-seo-grid">
          <SurfaceCard>
            <h2>Caso y objetivo</h2>
            <p>{entry.focus}</p>
          </SurfaceCard>
          <SurfaceCard>
            <h2>Estructura que convierte</h2>
            <ul className="blog-related-list">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </SurfaceCard>
        </div>

        <section className="industry-demos">
          <h2>Demo analizada</h2>
          {demo ? (
            <div className="demo-embed">
              <iframe
                src={demo.href}
                title={`Demo ${demo.title}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p>
                Si no carga dentro del frame, abrila en una pestaña nueva:{' '}
                <a className="text-link" href={demo.href} target="_blank" rel="noreferrer">
                  Ver demo
                </a>
              </p>
            </div>
          ) : (
            <SurfaceCard>
              <p>No hay demo publicada para esta categoria todavia.</p>
            </SurfaceCard>
          )}
        </section>

        {comparisons.length > 0 ? (
          <section className="industry-links">
            <h2>Comparativas relacionadas</h2>
            <div className="card-grid card-grid--three">
              {comparisons.map((item) => (
                <SurfaceCard key={item.slug}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link className="text-link" to={`/${item.slug}`}>
                    Ver comparativa
                  </Link>
                </SurfaceCard>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedLinksSection
          title="Landing pages relacionadas"
          industry={entry.industrySlug}
          maxLinks={7}
        />

        <div className="industry-cta">
          <h2>Queres una landing con esta estructura?</h2>
          <p>Solicita una propuesta y armamos una version adaptada a tu negocio y objetivo comercial.</p>
          <div className="cta-row">
            <Link className="button-link button-link--secondary" to={siteConfig.routes.captivaDemos}>
              Ver demos
            </Link>
            <PrimaryCTA
              label="Quiero mi landing"
              mode="lead-form"
              leadFormId={`lead-form-${entry.slug}`}
              source="example-page"
              industry={entry.industry ?? entry.category}
              context={entry.slug}
              variant="primary"
            />
            <ButtonLink href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer" variant="secondary">
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>

        <LeadFormSection
          id={`lead-form-${entry.slug}`}
          source="example-page"
          industry={entry.industry ?? entry.category}
          context={entry.slug}
          title={`Solicitar landing para ${entry.industry ?? entry.category}`}
        />
      </div>
    </section>
  );
}
