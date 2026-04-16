import { tempUiBridge } from '../bridge';

export default function Planes() {
  return (
    <section id="planes" className="py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">{tempUiBridge.siteConfig.offer.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.siteConfig.offer.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4">{tempUiBridge.siteConfig.offer.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tempUiBridge.plans.map((plan) => (
            <article key={plan.name} className={`relative overflow-hidden rounded-[2rem] border p-8 ${plan.highlight ? 'border-violet-500/40 bg-violet-500/10 shadow-[0_0_40px_rgba(124,58,237,.18)]' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className={`absolute inset-x-0 top-0 h-1 ${plan.highlight ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700'}`} />
              {plan.highlight ? (
                <span className="absolute top-4 right-4 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.highlight}</span>
              ) : null}

              <h3 className="text-white text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4 text-4xl font-black text-white">{plan.price}</div>
              <p className="text-zinc-400 mt-3">{plan.description}</p>

              <div className="mt-6 rounded-2xl border border-[#27272A] bg-[#111113] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-3 w-16 rounded-full bg-violet-500/30" />
                  <div className="h-8 w-20 rounded-lg bg-violet-600/80" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-white/10" />
                  <div className="h-3 w-4/5 rounded-full bg-white/10" />
                  <div className="h-3 w-3/5 rounded-full bg-white/10" />
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.includes.map((item) => (
                  <li key={item} className="text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tempUiBridge.primaryWaByMessage(plan.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3 font-bold transition-all ${plan.highlight ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
              >
                {tempUiBridge.siteConfig.offer.cardCtaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
