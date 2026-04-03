import { useAnalytics } from '../lib/analytics';
import { ButtonLink } from '../components/ui/ButtonLink';
import { siteConfig } from '../config/site';

const faqItems = [
  {
    question: '¿Cuánto tarda Captiva en publicar una landing lista para captar clientes?',
    answer:
      'Depende del rubro y volumen de contenido, pero el proceso está pensado para salir rápido: análisis, diseño y publicación.',
  },
  {
    question: '¿Captiva sirve para cualquier tipo de negocio?',
    answer:
      'Sí. La arquitectura permite adaptar estructura y mensaje para gimnasios, salud, estética, legal, negocios locales y más categorías.',
  },
  {
    question: '¿Puedo usar demos como base para mi página final?',
    answer:
      'Sí. Las demos muestran estructuras reales de conversión que luego se personalizan con la propuesta de valor de cada negocio.',
  },
  {
    question: '¿Incluye hosting y dominio?',
    answer:
      'Sí. La oferta productizada de Captiva incluye hosting profesional y dominio por 1 año para simplificar la puesta en marcha.',
  },
  {
    question: '¿Cómo solicito una propuesta para mi landing?',
    answer:
      'Podés solicitar una propuesta por WhatsApp y te enviamos alcance, tiempos y pasos recomendados para lanzar tu sistema de captación.',
  },
];

export function FaqSection() {
  const { trackWhatsApp } = useAnalytics();

  return (
    <section className="content-section" id="faq">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">FAQ</p>
          <h2>Preguntas frecuentes sobre Captiva</h2>
          <p>Respuestas claras para acelerar decisión y reducir fricción comercial.</p>
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
          <ButtonLink href={siteConfig.contact.ctaHref} variant="primary" onClick={() => trackWhatsApp('faq', 'quiero-mi-landing')}>
            Quiero mi landing
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
