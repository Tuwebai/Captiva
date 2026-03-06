import { siteConfig } from '../config/site';
import { ButtonLink } from '../components/ui/ButtonLink';

const faqItems = [
  {
    question: 'Cuanto tarda Captiva en publicar una landing page?',
    answer:
      'Depende del rubro y volumen de contenido, pero el proceso esta pensado para salir rapido: analisis, diseno y publicacion.',
  },
  {
    question: 'Captiva sirve para cualquier tipo de negocio?',
    answer:
      'Si. La arquitectura permite adaptar estructura y mensaje para gimnasios, salud, estetica, legal, negocios locales y mas categorias.',
  },
  {
    question: 'Puedo usar demos como base para mi pagina final?',
    answer:
      'Si. Las demos muestran estructuras reales de conversion que luego se personalizan con la propuesta de valor de cada negocio.',
  },
  {
    question: 'Como solicito una propuesta para mi landing?',
    answer:
      'Podes solicitar informacion por WhatsApp y te enviamos alcance, tiempos y pasos recomendados para lanzar tu pagina.',
  },
];

export function FaqSection() {
  return (
    <section className="content-section" id="faq">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">FAQ</p>
          <h2>Preguntas frecuentes sobre Captiva</h2>
          <p>Respuestas claras para acelerar decision y reduccion de friccion comercial.</p>
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
          <ButtonLink href={siteConfig.contact.ctaHref} variant="primary">
            Solicitar demo
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
