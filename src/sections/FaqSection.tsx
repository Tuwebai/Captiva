import { useAnalytics } from '../lib/analytics';
import { ButtonLink } from '../components/ui/ButtonLink';
import { siteConfig } from '../config/site';

const faqItems = [
  {
    question: '¿Necesito tener dominio propio antes de empezar?',
    answer: 'No. El dominio está incluido en todos los planes. Nosotros lo gestionamos.',
  },
  {
    question: '¿En cuánto tiempo está lista mi landing?',
    answer: 'Entre 3 y 5 días hábiles desde que nos mandás la información de tu negocio.',
  },
  {
    question: '¿Puedo pedir cambios después de publicada?',
    answer: 'Sí. Todos los planes incluyen al menos una ronda de revisión post-lanzamiento.',
  },
  {
    question: '¿Qué pasa cuando vence el año de hosting?',
    answer: 'Te avisamos con anticipación. Podés renovar o gestionar el hosting por tu cuenta, sin lockout.',
  },
  {
    question: '¿Funciona para cualquier rubro?',
    answer:
      'Sí. Ya tenemos landings activas en gimnasios, odontología, inmobiliarias, estéticas, abogados y más. Si tu rubro no está en la galería, igual podemos armarlo.',
  },
  {
    question: '¿Necesito saber de diseño o código?',
    answer: 'No. Vos nos contás tu negocio, nosotros hacemos todo. Solo necesitás revisar y aprobar.',
  },
];

export function FaqSection() {
  const { trackWhatsApp } = useAnalytics();

  return (
    <section className="content-section" id="faq">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">FAQ</p>
          <h2>Preguntas frecuentes</h2>
          <p>Respuestas claras para resolver objeciones antes de avanzar.</p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="faq-cta">
          <ButtonLink href={siteConfig.contact.ctaHref} variant="primary" onClick={() => trackWhatsApp('faq', 'quiero-empezar-ahora')}>
            Quiero empezar ahora
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};
