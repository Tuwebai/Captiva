import { tempUiBridge } from '../bridge';

export default function SocialProof() {
  return (
    <section id="prueba-social" className="py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">{tempUiBridge.socialProof.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.socialProof.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4">{tempUiBridge.socialProof.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {tempUiBridge.socialProof.metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-3xl font-black text-white">{metric.value}</div>
              <div className="text-zinc-400 mt-2">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tempUiBridge.socialProof.items.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-300">
                ✦
              </div>
              <h3 className="text-white text-xl font-bold">{item.title}</h3>
              <p className="text-zinc-400 mt-3 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
