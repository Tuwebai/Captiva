export function HeroMockup() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-emerald-500/5 rounded-3xl" />

      <div className="captiva-hero-float ui-card relative w-full max-w-[340px] rounded-2xl overflow-hidden">
        <div className="ui-surface-topbar flex items-center gap-2 px-4 py-3 border-b ui-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-[#1A1A1F] rounded-md px-3 py-1 text-xs text-zinc-500 font-mono">tuclinica.com.ar</div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-20 h-5 bg-violet-500/30 rounded-md" />
            <div className="ui-btn-primary w-16 h-7 rounded-lg flex items-center justify-center">
              <div className="w-10 h-2 bg-white/60 rounded" />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="w-3/4 h-3 bg-zinc-600 rounded-full" />
            <div className="w-full h-6 bg-zinc-200/10 rounded-lg" />
            <div className="w-4/5 h-6 bg-zinc-200/10 rounded-lg" />
            <div className="w-2/3 h-3 bg-zinc-700 rounded-full mt-3" />
            <div className="w-3/4 h-3 bg-zinc-700 rounded-full" />
          </div>

          <div className="flex gap-2 pt-1">
            <div className="ui-btn-primary flex-1 h-10 rounded-xl flex items-center justify-center">
              <div className="w-24 h-2.5 bg-white/60 rounded" />
            </div>
            <div className="w-24 h-10 border border-zinc-600 rounded-xl" />
          </div>

          <div className="flex gap-2 pt-1">
            {['✓ Dominio', '✓ 5 días', '✓ WhatsApp'].map((item) => (
              <div key={item} className="flex-1 text-center text-[9px] text-emerald-400 font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5 grid grid-cols-3 gap-2">
          {[
            { icon: '🦷', label: 'Odontología' },
            { icon: '🙋', label: 'Estética' },
            { icon: '⚖️', label: 'Abogados' },
          ].map((stat) => (
            <div key={stat.label} className="ui-surface-3 rounded-xl p-3 text-center border ui-border">
              <div className="text-lg mb-1">{stat.icon}</div>
              <div className="text-[9px] text-zinc-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot inline-block" />
          Live
        </div>
      </div>

      <div className="captiva-hero-float-slow ui-card-soft absolute -bottom-2 -left-2 rounded-2xl px-4 py-3 shadow-xl" style={{ animationDelay: '180ms' }}>
        <div className="text-xs text-zinc-500 mb-1">WhatsApps recibidos</div>
        <div className="text-xl font-bold text-white">+24 <span className="text-emerald-400 text-sm">↑</span></div>
        <div className="text-[10px] text-emerald-400">esta semana</div>
      </div>

      <div className="captiva-hero-float ui-card-soft absolute -top-2 -right-2 rounded-2xl px-4 py-3 shadow-xl" style={{ animationDelay: '320ms' }}>
        <div className="text-xs text-zinc-500 mb-1">Tiempo de entrega</div>
        <div className="text-xl font-bold text-white">5 días</div>
        <div className="text-[10px] text-violet-400">garantizados</div>
      </div>
    </div>
  );
}
