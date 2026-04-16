import { tempUiBridge } from '../bridge';

export default function CTAFinal() {
  return (
    <section id="cta-final" className="py-20 md:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0D0D10]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        {/* Badge */}
        <div className="ui-chip inline-flex items-center gap-2 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot inline-block" />
          Podés empezar hoy mismo
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
          ¿Seguís perdiendo clientes{' '}
          <span className="gradient-text">por no tener una página?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl mx-auto">
          Empezá hoy. Tu landing puede estar activa{' '}
          <span className="text-zinc-200 font-medium">esta semana.</span>
        </p>

        {/* Main CTA */}
        <a
          href={tempUiBridge.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ui-btn-primary inline-flex items-center justify-center gap-3 text-white font-black text-lg px-10 py-5 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-violet-500/30 hover:-translate-y-1 mb-5 glow-brand"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Quiero empezar ahora
        </a>

        {/* Reassurance */}
        <p className="text-sm text-zinc-500 mb-12">
          Sin contrato. Sin compromiso largo.{' '}
          <span className="text-zinc-400">Si no te gusta el resultado, lo rehacemos.</span>
        </p>

        {/* Trust signals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
          {[
            { icon: '⚡', label: 'Respondemos en menos de 2 horas' },
            { icon: '🔒', label: 'Pago único, sin mensualidades' },
            { icon: '🎯', label: 'Resultado garantizado o lo rehacemos' },
          ].map((item) => (
            <div
              key={item.label}
              className="ui-card-soft flex flex-col items-center gap-2 rounded-2xl p-4"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs text-zinc-500 text-center leading-snug">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
