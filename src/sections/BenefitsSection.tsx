import { LeadFormSection } from '../components/forms/LeadFormSection';
import { FeatureIcon } from '../components/ui/FeatureIcon';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';

const benefitIcons = ['inbox', 'page', 'clarity', 'signal'] as const;

export function BenefitsSection() {
  return (
    <section className="content-section" id="beneficios">
      <div className="container">
        <SectionHeading
          eyebrow="Beneficios"
          title={siteConfig.benefits.title}
          description={siteConfig.benefits.description}
        />

        <div className="benefits-grid">
          {siteConfig.benefits.items.map((item, index) => (
            <SurfaceCard key={item.title}>
              <FeatureIcon name={benefitIcons[index] ?? 'signal'} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </SurfaceCard>
          ))}
        </div>

        <LeadFormSection
          id="lead-form-benefits"
          source="benefits"
          context="captiva-home-mid"
          title="Contanos que resultado buscas"
          description="Con esta informacion te proponemos una estructura de landing orientada a conversion para tu rubro."
        />
      </div>
    </section>
  );
}
