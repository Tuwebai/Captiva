import { Link, Navigate, useParams } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { ButtonLink } from '../components/ui/ButtonLink';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import type { CityLandingEntry } from '../types/city-landing';
import { getCityLandingBySlug } from '../utils/city-landings';
import { getIndustryBySlug } from '../utils/industry';

function buildCitySlug(param: string | undefined) {
  if (!param) return '';
  return `landing-page-para-${param}`;
}

type CityIndustryLandingPageProps = {
  entry?: CityLandingEntry;
};

export function CityIndustryLandingPage({ entry }: CityIndustryLandingPageProps) {
  const { cityLanding } = useParams<{ cityLanding: string }>();
  const slug = buildCitySlug(cityLanding);
  const landing = entry ?? getCityLandingBySlug(slug);

  if (!landing) {
    return <Navigate replace to={siteConfig.routes.captivaDemos} />;
  }

  const industry = getIndustryBySlug(landing.niche.industrySlug);
  const pageTitle = `${landing.title} | Captiva`;
  const pagePath = landing.path;
  const pageDescription = `Descubrí cómo Captiva puede ayudar a ${landing.niche.name} en ${landing.city.name} (${landing.city.country}) a captar más consultas con una landing optimizada para conversión.`;

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
        name: landing.niche.title,
        item: `${siteConfig.seo.siteUrl}/${landing.niche.industrySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${landing.niche.name} en ${landing.city.name}`,
        item: `${siteConfig.seo.siteUrl}${pagePath}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: landing.title,
    description: pageDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      url: 'https://tuweb-ai.com/',
    },
    areaServed: {
      '@type': 'City',
      name: landing.city.name,
    },
    serviceType: `Landing page para ${landing.niche.name}`,
    url: `${siteConfig.seo.siteUrl}${pagePath}`,
  };

  const faqSchema = industry?.faq.length
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
      `landing page para ${landing.niche.name} en ${landing.city.name}`,
      `captación de clientes para ${landing.niche.name} en ${landing.city.name}`,
      `captiva ${landing.niche.slug} ${landing.city.slug}`,
    ],
    structuredData: faqSchema ? [breadcrumbSchema, serviceSchema, faqSchema] : [breadcrumbSchema, serviceSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <SectionHeading as="h1" eyebrow="Landing por ciudad" title={landing.title} description={landing.description} />

        <div className="card-grid card-grid--two industry-seo-grid">
          <SurfaceCard>
            <h2>Problema local</h2>
            {industry?.painPoints.length ? (
              <ul className="blog-related-list">
                {industry.painPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>
                Muchos {landing.niche.name} en {landing.city.name} dependen de canales dispersos y pierden consultas por no
                tener una pagina enfocada en captacion.
              </p>
            )}
          </SurfaceCard>
          <SurfaceCard>
            <h2>Como lo implementa Captiva</h2>
            <p>{industry?.solution ?? `Captiva estructura una landing para ${landing.niche.name} en ${landing.city.name} con mensaje claro, oferta visible y contacto directo.`}</p>
          </SurfaceCard>
        </div>

        <section className="industry-benefits">
          <h2>Beneficios para {landing.city.name}</h2>
          <div className="card-grid card-grid--three">
            {(industry?.benefits ?? ['Mas consultas calificadas', 'Presentacion profesional del servicio', 'Contacto rapido por canal directo']).map((benefit) => (
              <SurfaceCard key={benefit}>
                <h3>{benefit}</h3>
              </SurfaceCard>
            ))}
          </div>
        </section>

        {industry?.faq.length ? (
          <section className="industry-links">
            <h2>Preguntas frecuentes del rubro</h2>
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

        <section className="industry-links">
          <h2>Ver mas recursos</h2>
          <div className="card-grid card-grid--two">
            <SurfaceCard>
              <h3>Ver ejemplos reales</h3>
              <p>Verifica demos por rubro para validar estructura y propuesta antes de implementar.</p>
              <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                Ir a /captiva/demos
              </Link>
            </SurfaceCard>
            <SurfaceCard>
              <h3>Version general por industria</h3>
              <p>Si queres una landing sin enfoque geografico, revisa la version base por rubro.</p>
              <Link className="text-link" to={`/${landing.niche.industrySlug}`}>
                Ver landing por industria
              </Link>
            </SurfaceCard>
          </div>
        </section>

        <RelatedLinksSection
          title={`Mas recursos para ${landing.niche.name}`}
          industry={landing.niche.industrySlug}
          city={landing.city.slug}
          maxLinks={7}
        />

        <div className="industry-cta">
          <h2>
            Crear mi landing para {landing.niche.name} en {landing.city.name}
          </h2>
          <p>Solicita una propuesta y te mostramos una estructura recomendada para captar consultas reales.</p>
          <div className="cta-row">
            <Link className="button-link button-link--secondary" to={siteConfig.routes.captivaDemos}>
              Ver demos
            </Link>
            <PrimaryCTA
              label="Quiero mi landing"
              mode="lead-form"
              leadFormId={`lead-form-${landing.slug}`}
              source="industry-city"
              industry={landing.niche.name}
              city={landing.city.name}
              context={landing.slug}
              variant="primary"
            />
            <ButtonLink href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer" variant="secondary">
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>

        <LeadFormSection
          id={`lead-form-${landing.slug}`}
          source="industry-city"
          industry={landing.niche.name}
          city={landing.city.name}
          context={landing.slug}
          title={`Crear landing para ${landing.niche.name} en ${landing.city.name}`}
        />
      </div>
    </section>
  );
}
