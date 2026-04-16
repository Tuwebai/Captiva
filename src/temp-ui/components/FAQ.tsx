import { useState } from 'react';

import { tempUiBridge } from '../bridge';

const faqs = [
  {
    q: '¿Necesito tener dominio propio antes de empezar?',
    a: 'No. Si no tenés dominio, lo gestionamos nosotros como parte del servicio. Hosting y dominio el primer año están incluidos en todos los planes. Si ya tenés uno, lo usamos sin problema.',
  },
  {
    q: '¿En cuánto tiempo está lista mi landing?',
    a: 'En 5 días hábiles desde que nos confirmás la info de tu negocio. El proceso es: día 1-2 diseño y copy, día 3-4 desarrollo y configuración, día 5 revisión final y publicación.',
  },
  {
    q: '¿Puedo pedir cambios después de publicada?',
    a: 'Sí. Cada plan incluye revisiones: Starter trae 1, Growth trae 3, y Scale tiene revisiones ilimitadas durante los primeros 30 días. Cambios mayores de estructura se cotizan por separado.',
  },
  {
    q: '¿Qué pasa cuando vence el año de hosting?',
    a: 'Antes de que venza te avisamos. La renovación anual del hosting + dominio tiene un costo aproximado de $60-80 USD dependiendo del dominio. No hay sorpresas y vos decidís si continuás.',
  },
  {
    q: '¿Funciona para cualquier rubro?',
    a: 'Sí. Hemos trabajado con gimnasios, clínicas, estudios jurídicos, psicólogos, inmobiliarias, nutricionistas, peluquerías, contadores, arquitectos, entre otros. Si tu negocio necesita clientes, necesita una landing.',
  },
  {
    q: '¿Necesito saber de diseño o código?',
    a: 'Para nada. Vos solo nos contás tu negocio y nosotros hacemos todo. Diseño, copy, código, configuración técnica. Cuando esté listo, solo tenés que decir "me gusta" y lanzamos.',
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-violet-500/30 ui-surface' : 'ui-border ui-surface-topbar hover:border-zinc-700'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span className={`text-xs font-bold tabular-nums mt-0.5 ${open ? 'text-violet-400' : 'text-zinc-600'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-sm md:text-base font-semibold leading-snug ${open ? 'text-white' : 'text-zinc-300'}`}>
            {item.q}
          </span>
        </div>
        <div className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${open ? 'ui-btn-primary rotate-45' : 'ui-surface-3 border ui-border'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v8M2 6h8" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pl-14">
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="ui-divider-line absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="ui-card-soft inline-flex items-center gap-2 text-zinc-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Sin letra chica
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-zinc-500 text-sm">
            Si tu duda no está acá, mandanos un WhatsApp y te respondemos en menos de 2 horas.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3 mb-12">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={tempUiBridge.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-primary inline-flex items-center gap-2.5 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero empezar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
