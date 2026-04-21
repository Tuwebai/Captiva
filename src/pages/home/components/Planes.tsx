import { PlanCard } from './PlanCard';
import { homePlanCatalog } from './plan-catalog';

export default function Planes() {
  return (
    <section id="planes" className="py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="ui-divider-line absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            Precios claros, sin sorpresas
          </div>
          <h2 className="text-[2rem] sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Elegí el plan que necesita{' '}
            <span className="gradient-text">tu negocio</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Todos los planes incluyen hosting + dominio el primer año.{' '}
            <span className="text-zinc-300">Sin costos ocultos.</span>
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-start">
          {homePlanCatalog.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <div className="ui-card inline-flex items-center gap-3 rounded-2xl px-6 py-4">
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
