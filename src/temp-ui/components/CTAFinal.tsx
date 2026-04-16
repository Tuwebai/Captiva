import { tempUiBridge } from '../bridge';

export default function CTAFinal() {
  return (
    <section className="py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-600/15 via-white/[0.03] to-emerald-500/10 p-10 md:p-14 text-center shadow-2xl">
        <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Listo para lanzar</p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.finalCta.title}</h2>
        <p className="text-zinc-300 text-lg max-w-2xl mx-auto mt-5">{tempUiBridge.finalCta.description}</p>
        <a href={tempUiBridge.finalCta.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold">
          {tempUiBridge.finalCta.label}
        </a>
      </div>
    </section>
  );
}
