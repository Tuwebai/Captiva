const WA_STARTER = "https://wa.me/5491100000000?text=Hola%2C+me+interesa+el+plan+Starter+de+Captiva.+Tengo+un+negocio+de+%5Brubro%5D+y+quiero+empezar+a+captar+clientes.+%C2%BFMe+pod%C3%A9s+dar+m%C3%A1s+info%3F";
const WA_GROWTH = "https://wa.me/5491100000000?text=Hola%2C+quiero+el+plan+Growth+de+Captiva.+Tengo+un+negocio+de+%5Brubro%5D+y+quiero+una+landing+optimizada.+%C2%BFCu%C3%A1ndo+podemos+empezar%3F";
const WA_SCALE = "https://wa.me/5491100000000?text=Hola%2C+me+interesa+el+plan+Scale+de+Captiva+para+campa%C3%B1as.+%C2%BFPueden+darme+una+propuesta%3F";

const planes = [
  {
    id: 'starter',
    name: 'Starter',
    audiencia: 'Empezar a captar clientes',
    price: '$320',
    currency: 'USD',
    badge: null,
    highlighted: false,
    waLink: WA_STARTER,
    cta: 'Quiero el Starter',
    microcopy: 'Hosting + dominio incluidos. Sin sorpresas.',
    features: [
      'Landing page de 1 página',
      'Diseño profesional personalizado',
      'Copy orientado a conversión',
      'WhatsApp integrado',
      'Hosting + dominio 1er año',
      'Formulario de contacto',
      'Adaptado para mobile',
      '1 revisión incluida',
    ],
    notIncluded: [
      'Blog o contenido múltiple',
      'Integración con ads',
      'Múltiples idiomas',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    audiencia: 'El más elegido por negocios nuevos',
    price: '$490',
    currency: 'USD',
    badge: 'Recomendado',
    highlighted: true,
    waLink: WA_GROWTH,
    cta: 'Quiero el Growth',
    microcopy: 'El más elegido. Podés empezar esta semana.',
    features: [
      'Todo lo de Starter, más:',
      'Secciones adicionales (FAQ, testimonios)',
      'SEO básico configurado',
      'Integración Google Analytics',
      'Pixel de Facebook/Meta',
      'Copy A/B optimizado',
      '3 revisiones incluidas',
      'Soporte 30 días post-lanzamiento',
    ],
    notIncluded: [
      'Múltiples idiomas',
      'E-commerce',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    audiencia: 'Para campañas pagas o varios rubros',
    price: '$720',
    currency: 'USD',
    badge: null,
    highlighted: false,
    waLink: WA_SCALE,
    cta: 'Quiero el Scale',
    microcopy: 'Ideal para campañas pagas o varios frentes.',
    features: [
      'Todo lo de Growth, más:',
      'Hasta 2 landings distintas',
      'Páginas de campaña (Ads)',
      'Integración CRM básica',
      'Thank you page personalizada',
      'Setup completo de conversiones',
      'Revisiones ilimitadas (30 días)',
      'Reporte mensual básico',
    ],
    notIncluded: [
      'E-commerce completo',
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill="rgba(124,58,237,0.15)"/>
      <path d="M5 8l2 2 4-4" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill="rgba(63,63,70,0.3)"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#52525B" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function Planes() {
  return (
    <section id="planes" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Precios claros, sin sorpresas
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Elegí el plan que necesita{' '}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Todos los planes incluyen hosting + dominio el primer año.{' '}
            <span className="text-zinc-300">Sin costos ocultos.</span>
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-violet-600/20 to-[#111113] border-2 border-violet-500/60 shadow-2xl shadow-violet-500/10 scale-[1.02] md:scale-105'
                  : 'bg-[#111113] border border-[#27272A] hover:border-[#3F3F46]'
              }`}
            >
              {/* Recommended glow top bar */}
              {plan.highlighted && (
                <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-violet-400 to-emerald-400" />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-7">
                {/* Plan header */}
                <div className="mb-6">
                  <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlighted ? 'text-violet-400' : 'text-zinc-500'}`}>
                    {plan.name}
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">{plan.audiencia}</p>

                  {/* Price */}
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-lg text-zinc-400 mb-1">{plan.currency}</span>
                  </div>
                  <div className="text-xs text-zinc-600 mt-1">Pago único · sin mensualidades</div>
                </div>

                {/* Divider */}
                <div className={`h-px mb-6 ${plan.highlighted ? 'bg-violet-500/20' : 'bg-[#27272A]'}`} />

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckIcon />
                      <span className={f.includes('Todo lo de') ? 'font-semibold text-zinc-200' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Not included */}
                {plan.notIncluded.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600">
                        <CrossIcon />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <a
                  href={plan.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.highlighted
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30'
                      : 'bg-[#18181B] hover:bg-[#1F1F23] text-zinc-200 border border-[#3F3F46] hover:border-[#52525B]'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {plan.cta}
                </a>
                <p className="text-xs text-zinc-600 text-center mt-3">{plan.microcopy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-[#111113] border border-[#27272A] rounded-2xl px-6 py-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">Garantía de satisfacción:</span>{' '}
              Si no te gusta el resultado antes de publicar, lo rehacemos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
