import { Link } from 'react-router-dom';

import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getIndustryPages } from '../utils/industry';

const industryPages = getIndustryPages();

export function IndustryLinksSection() {
  return (
    <section className="content-section content-section--alt" id="industrias">
      <div className="container">
        <SectionHeading
          eyebrow="Industrias"
          title="Landing pages por industria para captar busquedas long-tail."
          description="Cada rubro tiene una pagina SEO dedicada con contenido orientado a conversion y enlaces a demos reales."
        />

        <div className="card-grid card-grid--two">
          {industryPages.map((item) => (
            <SurfaceCard key={item.slug}>
              <div className="demo-card__header">
                <span>Pagina SEO</span>
                <code>/{item.slug}</code>
              </div>
              <h3>{item.title}</h3>
              <p>{item.solution}</p>
              <Link className="text-link" to={`/${item.slug}`}>
                Ver pagina por industria
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
