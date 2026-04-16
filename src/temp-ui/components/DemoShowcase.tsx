const demos = [
  {
    rubro: 'Odontología',
    icon: '🦷',
    name: 'Clínica Dental',
    domain: 'clinicadental.demo',
    color: 'from-blue-500/20 to-cyan-500/10',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
    topBar: 'from-blue-500 to-cyan-400',
    headline: 'Tu sonrisa perfecta, a un turno de distancia',
    cta: 'Reservar turno',
    metrics: '+31 consultas / mes',
    href: '/demo/demo-clinica-dental-sonrisa',
  },
  {
    rubro: 'Estética',
    icon: '💇',
    name: 'Landing para Estética',
    domain: 'estetica.demo',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    accentBg: 'bg-pink-500/10 border-pink-500/20',
    topBar: 'from-pink-500 to-rose-400',
    headline: 'Turno en menos de 2 minutos. Resultado garantizado.',
    cta: 'Quiero mi turno',
    metrics: '+28 WhatsApps / semana',
    href: '/demo/demo-estetica',
  },
  {
    rubro: 'Gimnasio',
    icon: '🏋️',
    name: 'Landing para Gimnasios',
    domain: 'gimnasio.demo',
    color: 'from-orange-500/20 to-amber-500/10',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10 border-orange-500/20',
    topBar: 'from-orange-500 to-amber-400',
    headline: 'Empezá a entrenar hoy. Primera clase gratis.',
    cta: 'Clase de prueba',
    metrics: '+19 consultas / semana',
    href: '/demo/demo-gimnasio',
  },
  {
    rubro: 'Abogados',
    icon: '⚖️',
    name: 'Estudio Jurídico',
    domain: 'legal.demo',
    color: 'from-violet-500/20 to-purple-500/10',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10 border-violet-500/20',
    topBar: 'from-violet-500 to-purple-400',
    headline: 'Asesoramiento legal claro y directo.',
    cta: 'Consulta gratuita',
    metrics: '+12 leads cualificados / mes',
    href: '/demo/demo-estudio-juridico',
  },
];

function DemoCard({ demo, index }: { demo: typeof demos[0]; index: number }) {
  return (
    <div
      className="group relative bg-[#111113] border border-[#27272A] rounded-3xl overflow-hidden hover:border-[#3F3F46] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient top bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${demo.topBar}`} />

      {/* Card header */}
      <div className={`p-5 bg-gradient-to-br ${demo.color}`}>
        {/* Browser bar mock */}
        <div className="bg-[#0D0D0F]/80 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 bg-[#1A1A1F] rounded-md px-2 py-1 text-[10px] text-zinc-500 font-mono truncate">
              {demo.domain}
            </div>
          </div>

          {/* Mini landing preview */}
          <div className="space-y-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-base">{demo.icon}</span>
              <div className="w-20 h-3 bg-zinc-700 rounded-full" />
            </div>
            <div className="w-full h-4 bg-zinc-600/40 rounded" />
            <div className="w-4/5 h-4 bg-zinc-600/40 rounded" />
            <div className="w-3/5 h-3 bg-zinc-700/40 rounded" />
            <div className="mt-3 flex gap-2">
              <div className="flex-1 h-8 bg-violet-600/70 rounded-lg flex items-center justify-center">
                <div className="w-16 h-2 bg-white/50 rounded" />
              </div>
              <div className="w-20 h-8 border border-zinc-600/50 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Metric badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${demo.accentBg} ${demo.accent}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 inline-block" />
          {demo.metrics}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 space-y-3">
        <div>
          <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">{demo.rubro}</div>
          <h3 className="text-base font-bold text-white">{demo.name}</h3>
          <p className="text-sm text-zinc-400 mt-1 leading-snug">"{demo.headline}"</p>
        </div>

        <a
          href={demo.href}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 group-hover:border-opacity-60 ${demo.accentBg} ${demo.accent} hover:opacity-80`}
        >
          Ver esta landing
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function DemoShowcase() {
  return (
    <section id="demos" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Esto puede ser tu negocio
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Mirá lo que ya tienen{' '}
            <span className="gradient-text">tus competidores</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Más de 40 negocios ya tienen su landing activa. Elegís el modelo, nosotros lo adaptamos a vos.
          </p>
        </div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {demos.map((demo, i) => (
            <DemoCard key={demo.rubro} demo={demo} index={i} />
          ))}
        </div>

        {/* Rubros strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            'Inmobiliarias', 'Psicólogos', 'Nutricionistas', 'Peluquerías',
            'Contadores', 'Arquitectos', 'Escuelas', '+30 rubros más'
          ].map((rubro) => (
            <span
              key={rubro}
              className="text-xs text-zinc-500 border border-[#27272A] rounded-full px-3 py-1.5"
            >
              {rubro}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
