import { useState, useEffect } from 'react';

const WA_LINK = "https://wa.me/5491100000000?text=Hola%2C+vi+Captiva+y+quiero+una+landing+para+mi+negocio.+Rubro%3A+%5Btu+rubro%5D.+%C2%BFC%C3%B3mo+arrancamos%3F";

function LandingPreview() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center p-4">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-emerald-500/5 rounded-3xl" />
      
      {/* Main preview card */}
      <div className="relative w-full max-w-[340px] bg-[#111113] rounded-2xl border border-[#27272A] overflow-hidden shadow-2xl float-anim">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1F1F23] bg-[#0D0D0F]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-[#1A1A1F] rounded-md px-3 py-1 text-xs text-zinc-500 font-mono">
            tuclinica.com.ar
          </div>
        </div>

        {/* Mock hero */}
        <div className="p-5 space-y-4">
          {/* Nav mock */}
          <div className="flex items-center justify-between">
            <div className="w-20 h-5 bg-violet-500/30 rounded-md" />
            <div className="w-16 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <div className="w-10 h-2 bg-white/60 rounded" />
            </div>
          </div>

          {/* Hero text mock */}
          <div className="space-y-2 pt-2">
            <div className="w-3/4 h-3 bg-zinc-600 rounded-full" />
            <div className="w-full h-6 bg-zinc-200/10 rounded-lg" />
            <div className="w-4/5 h-6 bg-zinc-200/10 rounded-lg" />
            <div className="w-2/3 h-3 bg-zinc-700 rounded-full mt-3" />
            <div className="w-3/4 h-3 bg-zinc-700 rounded-full" />
          </div>

          {/* CTA mock */}
          <div className="flex gap-2 pt-1">
            <div className="flex-1 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
              <div className="w-24 h-2.5 bg-white/60 rounded" />
            </div>
            <div className="w-24 h-10 border border-zinc-600 rounded-xl" />
          </div>

          {/* Trust bar mock */}
          <div className="flex gap-2 pt-1">
            {['✓ Dominio', '✓ 5 días', '✓ WhatsApp'].map((t) => (
              <div key={t} className="flex-1 text-center text-[9px] text-emerald-400 font-medium">
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Services strip */}
        <div className="px-5 pb-5 grid grid-cols-3 gap-2">
          {[
            { icon: '🦷', label: 'Odontología' },
            { icon: '💇', label: 'Estética' },
            { icon: '⚖️', label: 'Abogados' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#1A1A1F] rounded-xl p-3 text-center border border-[#27272A]"
            >
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-[9px] text-zinc-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active badge */}
        <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot inline-block" />
          Live
        </div>
      </div>

      {/* Floating metric cards */}
      <div className="absolute -bottom-2 -left-2 bg-[#18181B] border border-[#27272A] rounded-2xl px-4 py-3 shadow-xl">
        <div className="text-xs text-zinc-500 mb-1">WhatsApps recibidos</div>
        <div className="text-xl font-bold text-white">+24 <span className="text-emerald-400 text-sm">↑</span></div>
        <div className="text-[10px] text-emerald-400">esta semana</div>
      </div>

      <div className="absolute -top-2 -right-2 bg-[#18181B] border border-[#27272A] rounded-2xl px-4 py-3 shadow-xl">
        <div className="text-xs text-zinc-500 mb-1">Tiempo de entrega</div>
        <div className="text-xl font-bold text-white">5 días</div>
        <div className="text-[10px] text-violet-400">garantizados</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
      {/* Background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div
            className={`space-y-7 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/25 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot inline-block" />
              Servicio productizado · Lanzamos en días, no en meses
            </div>

            {/* Eyebrow */}
            <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">
              Para negocios en Argentina y Latinoamérica
            </p>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.05] tracking-tight text-white">
              Tu página lista{' '}
              <span className="gradient-text">en 5 días.</span>{' '}
              Tus clientes empiezan{' '}
              <span className="text-white">a llegar el lunes.</span>
            </h1>

            {/* Supporting copy */}
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg">
              Armamos tu landing con diseño profesional, copy que vende y WhatsApp integrado.{' '}
              <span className="text-zinc-200 font-medium">Hosting + dominio el primer año van incluidos.</span>{' '}
              Vos solo te ocupás de responder las consultas.
            </p>

            {/* Price anchor */}
            <div className="flex items-center gap-3">
              <div className="bg-[#18181B] border border-[#27272A] rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">Desde</div>
                  <div className="text-2xl font-black text-white">$320 <span className="text-lg font-bold text-zinc-300">USD</span></div>
                </div>
                <div className="w-px h-10 bg-[#27272A]" />
                <div className="text-xs text-zinc-400 max-w-[100px]">
                  Pago único, sin mensualidades
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-base px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 glow-brand-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Quiero empezar ahora
              </a>
              <button
                onClick={() => scrollTo('demos')}
                className="inline-flex items-center justify-center gap-2 border border-[#3F3F46] hover:border-[#52525B] text-zinc-300 hover:text-white font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200 hover:bg-white/[0.03]"
              >
                Ver ejemplos por rubro
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3l5 5-5 5M3 8h10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Microcopy */}
            <p className="text-sm text-zinc-500 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 1v6l4 2" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="7"/>
              </svg>
              Sin compromiso. Te respondemos en menos de 2 horas.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap gap-4 pt-1">
              {[
                { icon: '🌐', label: 'Hosting + dominio 1 año' },
                { icon: '⚡', label: 'En 5 días hábiles' },
                { icon: '💰', label: 'Sin costos ocultos' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <LandingPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
