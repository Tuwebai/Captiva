import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import type { LegalDocument } from '../content/legal';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

type LegalDocumentPageProps = {
  document: LegalDocument;
};

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  const location = useLocation();
  const breadcrumbSchema = useMemo(
    () => ({
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
          name: document.title,
          item: `${siteConfig.seo.siteUrl}${document.path}`,
        },
      ],
    }),
    [document.path, document.title],
  );

  const webPageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${document.title} | ${siteConfig.productName}`,
      description: document.description,
      url: `${siteConfig.seo.siteUrl}${document.path}`,
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.productName,
        url: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
      },
      about: {
        '@type': 'Organization',
        name: siteConfig.companyName,
      },
    }),
    [document.description, document.path, document.title],
  );

  useDocumentMetadata({
    title: `${document.title} | ${siteConfig.productName}`,
    description: document.description,
    path: document.path,
    ogType: 'website',
    structuredData: [webPageSchema, breadcrumbSchema],
  });

  const activeSectionId = useMemo(() => {
    const hash = location.hash.replace('#', '').trim();
    const exists = document.sections.some((section) => section.id === hash);
    return exists ? hash : document.sections[0]?.id ?? '';
  }, [document.sections, location.hash]);

  const activeSectionIndex = document.sections.findIndex((section) => section.id === activeSectionId);
  const activeSection = activeSectionIndex >= 0 ? document.sections[activeSectionIndex] : document.sections[0];
  const previousSection = activeSectionIndex > 0 ? document.sections[activeSectionIndex - 1] : null;
  const nextSection =
    activeSectionIndex >= 0 && activeSectionIndex < document.sections.length - 1
      ? document.sections[activeSectionIndex + 1]
      : null;

  return (
    <section className="content-section legal-page">
      <div className="container legal-page__container">
        <div className="legal-page__hero">
          <SectionHeading
            eyebrow="Legal"
            title={document.title}
            description={document.description}
            as="h1"
          />
          <div className="legal-page__meta-row">
            <p className="legal-page__updated">
              Última actualización: <strong>{document.updatedAt}</strong>
            </p>
            <div className="cta-row">
              <Link className="button-link button-link--secondary" to={siteConfig.routes.captiva}>
                Volver a Captiva
              </Link>
              <a className="button-link button-link--primary" href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer">
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="legal-layout">
          <aside className="legal-layout__sidebar">
            <SurfaceCard className="legal-toc legal-toc--desktop">
              <h2>Índice</h2>
              <nav aria-label={`Índice de ${document.title}`}>
                <ol className="legal-toc__list">
                  {document.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        className={`legal-toc__link${section.id === activeSectionId ? ' is-active' : ''}`}
                        href={`${document.path}#${section.id}`}
                        aria-current={section.id === activeSectionId ? 'location' : undefined}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </SurfaceCard>

            <details className="legal-toc legal-toc--mobile">
              <summary>Índice del documento</summary>
              <nav aria-label={`Índice móvil de ${document.title}`}>
                <ol className="legal-toc__list">
                  {document.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        className={`legal-toc__link${section.id === activeSectionId ? ' is-active' : ''}`}
                        href={`${document.path}#${section.id}`}
                        aria-current={section.id === activeSectionId ? 'location' : undefined}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </aside>

          <article className="legal-layout__content">
            <SurfaceCard className="legal-section">
              <section id={activeSection.id} aria-labelledby={`${activeSection.id}-title`}>
                <div className="legal-section__eyebrow">
                  <span>
                    Sección {activeSectionIndex + 1} de {document.sections.length}
                  </span>
                  <span>{document.title}</span>
                </div>
                <h2 id={`${activeSection.id}-title`}>{activeSection.title}</h2>
                {activeSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {activeSection.bullets?.length ? (
                  <ul className="legal-section__list">
                    {activeSection.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </SurfaceCard>

            <div className="legal-section-nav">
              {previousSection ? (
                <a className="legal-section-nav__link" href={`${document.path}#${previousSection.id}`}>
                  <span>Sección anterior</span>
                  <strong>{previousSection.title}</strong>
                </a>
              ) : (
                <div className="legal-section-nav__spacer" />
              )}
              {nextSection ? (
                <a className="legal-section-nav__link legal-section-nav__link--next" href={`${document.path}#${nextSection.id}`}>
                  <span>Siguiente sección</span>
                  <strong>{nextSection.title}</strong>
                </a>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
