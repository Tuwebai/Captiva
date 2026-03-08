import { Link } from 'react-router-dom';

import { getRelatedLinks } from '../../utils/seo-autolinks';
import { SurfaceCard } from '../ui/SurfaceCard';

type RelatedLinksSectionProps = {
  title?: string;
  industry?: string;
  city?: string;
  maxLinks?: number;
  compact?: boolean;
};

function getResourceKind(href: string) {
  if (href.startsWith('/blog/')) return 'Guia';
  if (href.startsWith('/ejemplo-landing-page-')) return 'Ejemplo';
  if (href.startsWith('/landing-page-para-')) return 'Industria';
  if (href.startsWith('/demo/')) return 'Demo';
  return 'Recurso';
}

export function RelatedLinksSection({
  title = 'Recursos relacionados',
  industry,
  city,
  maxLinks = 6,
  compact = false,
}: RelatedLinksSectionProps) {
  const links = getRelatedLinks({ industrySlug: industry, citySlug: city, maxLinks });
  if (links.length === 0) return null;

  return (
    <section className={`industry-links related-links${compact ? ' related-links--compact' : ''}`}>
      {title ? <h2>{title}</h2> : null}
      <div className={`related-links__grid${compact ? ' related-links__grid--compact' : ''}`}>
        {links.map((link) =>
          link.href.startsWith('/demo/') ? (
            <a key={link.href} className="related-link-card-link" href={link.href} target="_blank" rel="noreferrer">
              <SurfaceCard className={`related-link-card${compact ? ' related-link-card--compact' : ''}`}>
                <span className="related-link-card__kind">{getResourceKind(link.href)}</span>
                <h3 className="related-link-card__title">{link.label}</h3>
                {link.description ? <p className="related-link-card__description">{link.description}</p> : null}
                <span className="related-link-card__cta">Abrir recurso -&gt;</span>
              </SurfaceCard>
            </a>
          ) : (
            <Link key={link.href} className="related-link-card-link" to={link.href}>
              <SurfaceCard className={`related-link-card${compact ? ' related-link-card--compact' : ''}`}>
                <span className="related-link-card__kind">{getResourceKind(link.href)}</span>
                <h3 className="related-link-card__title">{link.label}</h3>
                {link.description ? <p className="related-link-card__description">{link.description}</p> : null}
                <span className="related-link-card__cta">Ver recurso -&gt;</span>
              </SurfaceCard>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
