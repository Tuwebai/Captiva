import { tempUiBridge } from '../bridge';

const icons = ['①', '②', '③'];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Cómo funciona</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.howItWorks.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4">{tempUiBridge.howItWorks.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tempUiBridge.howItWorks.steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/20 text-violet-300 flex items-center justify-center text-xl font-bold mb-6">
                {icons[index] ?? '•'}
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-zinc-300 font-medium mb-3">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={tempUiBridge.waLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold">
            {tempUiBridge.siteConfig.primaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
