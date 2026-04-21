const testimonials = [
  {
    name: 'Martina García',
    rubro: 'Centro de estética · Rosario',
    avatar: 'MG',
    color: 'from-pink-500 to-rose-600',
    text: 'En la primera semana tuve 8 consultas por WhatsApp. Antes no tenía ninguna plataforma online. Captiva me cambió el negocio.',
    rating: 5,
    metric: '+8 consultas en la primera semana',
  },
  {
    name: 'Diego Sarmiento',
    rubro: 'Odontología · CABA',
    avatar: 'DS',
    color: 'from-blue-500 to-cyan-600',
    text: 'Súper prolijo el trabajo. Entregaron antes del plazo y el diseño quedó exactamente como quería. Los pacientes me preguntan quién me hizo la web.',
    rating: 5,
    metric: '+31 consultas el primer mes',
  },
  {
    name: 'Lucas Pereyra',
    rubro: 'Gym & Fitness · Córdoba',
    avatar: 'LP',
    color: 'from-orange-500 to-amber-600',
    text: 'Lo que más me gustó es que no tuve que explicarles mil cosas. Ellos entendieron mi negocio y lo reflejaron en la landing. Directo al resultado.',
    rating: 5,
    metric: 'Dobló los leads vs. Instagram',
  },
  {
    name: 'Valentina Ruiz',
    rubro: 'Psicología · Mendoza',
    avatar: 'VR',
    color: 'from-violet-500 to-purple-600',
    text: 'Pensé que iba a ser complicado pero en 5 días estaba todo listo. Me avisaron en cada paso. Muy profesionales.',
    rating: 5,
    metric: 'Landing activa en 4 días hábiles',
  },
];

const metrics = [
  {
    value: '+40',
    label: 'landings activas',
    sub: 'en rubros reales',
    icon: '🚀',
  },
  {
    value: '5',
    label: 'días promedio',
    sub: 'de entrega garantizada',
    icon: '⚡',
  },
  {
    value: '10+',
    label: 'rubros de servicio',
    sub: 'que ya confiaron en Captiva',
    icon: '🏢',
  },
  {
    value: '100%',
    label: 'satisfacción',
    sub: 'o lo rehacemos sin costo',
    icon: '✅',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B">
          <path d="M8 1.5l1.75 3.5 3.9.57-2.82 2.75.67 3.88L8 10.35l-3.5 1.85.67-3.88L2.35 5.57l3.9-.57z"/>
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="ui-divider-line absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" />
        <div className="ui-surface absolute inset-0 opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Resultados reales
          </div>
          <h2 className="text-[2rem] sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Lo que pasó cuando{' '}
            <span className="gradient-text">lanzamos estas landings</span>
          </h2>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="ui-card rounded-2xl p-5 text-center hover:border-zinc-700 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{m.value}</div>
              <div className="text-sm font-semibold text-zinc-300">{m.label}</div>
              <div className="text-xs text-zinc-600 mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="ui-card rounded-3xl p-6 flex flex-col hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="mb-4 opacity-30">
                <path d="M4 14h6V8H4v6zm0 0c0 4 2 8 6 10M18 14h6V8h-6v6zm0 0c0 4 2 8 6 10" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>

              {/* Text */}
              <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">
                "{t.text}"
              </p>

              {/* Metric */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 mb-4">
                <span className="text-xs font-semibold text-emerald-400">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.rubro}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="mt-3">
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
