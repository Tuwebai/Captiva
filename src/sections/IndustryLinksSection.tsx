import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { getIndustryPages } from '../utils/industry';

const industryPages = getIndustryPages();
const INITIAL_VISIBLE_INDUSTRIES = 4;

export function IndustryLinksSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleItems = isExpanded ? industryPages : industryPages.slice(0, INITIAL_VISIBLE_INDUSTRIES);
  const canToggle = industryPages.length > INITIAL_VISIBLE_INDUSTRIES;

  return (
    <section className="content-section content-section--alt" id="industrias">
      <div className="container">
        <SectionHeading
          eyebrow={siteConfig.pages.industryLinks.eyebrow}
          title={siteConfig.pages.industryLinks.title}
          description={siteConfig.pages.industryLinks.description}
        />

        <div className="card-grid card-grid--two">
          {visibleItems.map((item) => (
            <SurfaceCard key={item.slug}>
              <div className="demo-card__header">
                <span>{siteConfig.pages.industryLinks.seoBadgeLabel}</span>
                <code>/{item.slug}</code>
              </div>
              <h3>{item.title}</h3>
              <p>{item.solution}</p>
              <Link className="text-link" to={`/${item.slug}`}>
                {siteConfig.pages.industryLinks.ctaLabel}
              </Link>
            </SurfaceCard>
          ))}
        </div>

        {canToggle ? (
          <div className="industry-links__toggle">
            <button className="button-link button-link--secondary" type="button" onClick={() => setIsExpanded((current) => !current)}>
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
