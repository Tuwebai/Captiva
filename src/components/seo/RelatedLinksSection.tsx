import { Link } from 'react-router-dom';

import { SurfaceCard } from '../ui/SurfaceCard';
import { getRelatedLinks } from '../../utils/seo-autolinks';

type RelatedLinksSectionProps = {
  title?: string;
  industry?: string;
  city?: string;
  maxLinks?: number;
};

export function RelatedLinksSection({
  title = 'Recursos relacionados',
  industry,
  city,
  maxLinks = 6,
}: RelatedLinksSectionProps) {
  const links = getRelatedLinks({ industrySlug: industry, citySlug: city, maxLinks });
  if (links.length === 0) return null;

  return (
    <section className="industry-links">
      <h2>{title}</h2>
      <div className="card-grid card-grid--three">
        {links.map((link) => (
          <SurfaceCard key={link.href}>
            <h3>{link.label}</h3>
            {link.description ? <p>{link.description}</p> : null}
            {link.href.startsWith('/demo/') ? (
              <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                Abrir recurso
              </a>
            ) : (
              <Link className="text-link" to={link.href}>
                Ver recurso
              </Link>
            )}
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}
