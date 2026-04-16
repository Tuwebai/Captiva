const WA_LINK = "https://wa.me/5491100000000?text=Hola%2C+vi+Captiva+y+quiero+una+landing+para+mi+negocio.+Rubro%3A+%5Btu+rubro%5D.+%C2%BFC%C3%B3mo+arrancamos%3F";

const steps = [
  {
    num: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Nos contás tu negocio',
    desc: 'Completás un formulario rápido o nos mandás un WhatsApp. 5 minutos y listo.',
    detail: 'Te preguntamos sobre tu rubro, tus clientes ideales y qué querés que hagan cuando entren a tu página.',
    time: '5 min',
    timeLabel: 'de tu tiempo',
  },
  {
    num: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Armamos tu landing',
    desc: 'Diseño, copy y configuración técnica. Vos revisás y aprobás antes de publicar.',
    detail: 'Nuestro equipo diseña, escribe y programa tu página. Te compartimos una preview para que des el ok.',
    time: '4 días',
    timeLabel: 'nosotros trabajamos',
  },
  {
    num: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 11.7 19.79 19.79 0 0 1 1.27 3.1 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.62-.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
      </svg>
    ),
    title: 'Empezás a recibir WhatsApps',
    desc: 'Publicamos en tu dominio. Desde ese momento, cada visita puede convertirse en una consulta.',
    detail: 'Te entregamos el acceso, te explicamos cómo ver las visitas y listo. Vos solo respondés.',
    time: 'Día 5',
    timeLabel: 'tu landing activa',
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
        <div className="absolute inset-0 bg-[#111113]/40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Sin complicaciones
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Tres pasos.{' '}
            <span className="gradient-text">Cinco días.</span>{' '}
            Tu landing activa.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-violet-600/30 via-violet-400/50 to-emerald-500/30" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Step card */}
              <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-7 h-full hover:border-[#3F3F46] transition-all duration-300 hover:shadow-xl group">
                {/* Number + icon row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    {/* Circle with icon */}
                    <div className="w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-600/20 transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  {/* Step number */}
                  <span className="text-4xl font-black text-[#1E1E24] group-hover:text-[#27272A] transition-colors duration-300">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                <p className="text-zinc-600 text-xs leading-relaxed">{step.detail}</p>

                {/* Time badge */}
                <div className="mt-6 inline-flex items-center gap-2 bg-[#18181B] border border-[#27272A] rounded-xl px-3 py-2">
                  <div>
                    <div className="text-sm font-bold text-white">{step.time}</div>
                    <div className="text-[10px] text-zinc-500">{step.timeLabel}</div>
                  </div>
                </div>
              </div>

              {/* Arrow between cards - mobile only */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-zinc-700">
                    <path d="M10 4v12M6 12l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero la mía
          </a>
          <p className="text-sm text-zinc-600 mt-3">En menos de 2 horas te respondemos para arrancar.</p>
        </div>
      </div>
    </section>
  );
}
