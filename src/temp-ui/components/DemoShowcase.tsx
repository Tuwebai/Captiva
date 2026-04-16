import { tempUiBridge } from '../bridge';

export default function DemoShowcase() {
  return (
    <section id="demos" className="relative py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">{tempUiBridge.siteConfig.demos.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.siteConfig.demos.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4">{tempUiBridge.siteConfig.demos.description}</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tempUiBridge.demos.slice(0, 6).map((demo, index) => (
            <article key={demo.title} className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl">
              <div className={`h-56 ${index === 0 ? 'bg-gradient-to-br from-violet-600/20 to-fuchsia-500/10' : 'bg-gradient-to-br from-emerald-500/15 to-cyan-500/10'} p-6 flex items-end`}>
                <div className="w-full rounded-2xl border border-white/10 bg-[#111113] p-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-violet-300/80 mb-3">{demo.eyebrow}</div>
                  <div className="h-3 w-24 rounded-full bg-white/10 mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 rounded-full bg-white/10" />
                    <div className="h-3 w-4/5 rounded-full bg-white/10" />
                    <div className="h-10 rounded-xl bg-violet-600/70 mt-4" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white text-2xl font-bold">{demo.title}</h3>
                <p className="text-zinc-400 mt-3 leading-relaxed">{demo.description}</p>
                <div className="mt-6">
                  <a href={demo.href} className="inline-flex items-center gap-2 text-violet-300 hover:text-white font-semibold">
                    {demo.cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={tempUiBridge.siteConfig.routes.captivaDemos}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-white font-semibold hover:bg-white/[0.06]"
          >
            Ver catálogo completo
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
