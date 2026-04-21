import { useEffect, useState } from 'react';

import { homeBridge } from '../bridge';
import { HeroMockup } from './HeroMockup';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg">
      <style>{`
        @keyframes captivaHeroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes captivaHeroFloatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .captiva-hero-float {
          animation: captivaHeroFloat 4s ease-in-out infinite !important;
          will-change: transform;
        }
        .captiva-hero-float-slow {
          animation: captivaHeroFloatSlow 4.6s ease-in-out infinite !important;
          will-change: transform;
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 md:px-8 py-14 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={`space-y-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href={homeBridge.hero.badgeHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/25 text-violet-300 text-xs font-semibold px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot inline-block" />
              {homeBridge.hero.badge}
            </a>

            <p className="text-sm text-zinc-400 font-medium tracking-wide uppercase">{homeBridge.hero.kicker}</p>

            <h1 className="text-[2.7rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black leading-[1.05] tracking-tight text-white">
              {homeBridge.hero.title.split('5 días').map((part: string, index: number, arr: string[]) => (
                <span key={`${part}-${index}`}>
                  {part}
                  {index < arr.length - 1 ? <span className="gradient-text">5 días</span> : null}
                </span>
              ))}
            </h1>

            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-lg">{homeBridge.hero.supportingCopy}</p>

            <div className="flex">
              <div className="ui-card-soft w-full sm:w-auto rounded-2xl px-4 sm:px-5 py-3 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">Desde</div>
                  <div className="text-2xl font-black text-white">{homeBridge.hero.priceAnchor.replace('Desde ', '').replace(' — sin mensualidades', '')}</div>
                </div>
                <div className="ui-surface-2 hidden sm:block w-px h-10" />
                <div className="text-xs text-zinc-400 max-w-none sm:max-w-[100px]">Pago único, sin mensualidades</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={homeBridge.hero.primaryCtaHref} target="_blank" rel="noreferrer" className="ui-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2.5 text-white font-bold text-base px-6 sm:px-7 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 glow-brand-sm">
                {homeBridge.hero.primaryCtaLabel}
              </a>
              <a href={homeBridge.hero.secondaryCtaHref} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border ui-border-strong hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-base px-6 sm:px-7 py-4 rounded-2xl transition-all duration-200 hover:bg-white/[0.03]">
                {homeBridge.hero.secondaryCtaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="text-sm text-zinc-500 flex items-center gap-2">{homeBridge.hero.microcopy}</p>

            <div className="flex flex-wrap gap-4 pt-1">
              {[
                { icon: '🌐', label: homeBridge.siteConfig.offer.guarantee },
                { icon: '⚡', label: homeBridge.siteConfig.hero.panelFlowNodes.join(' → ') },
                { icon: '💬', label: homeBridge.siteConfig.primaryCtaLabel },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

            <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <HeroMockup />
            </div>
        </div>
      </div>
    </section>
  );
}
