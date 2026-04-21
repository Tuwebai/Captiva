import { getIndustryLabel } from '../../utils/demos';
import type { DemoCategoryGroup } from '../../types/demo';
import { showcaseMockupByIndustry } from './catalog-data';
import { DemoIndustryMockup } from './DemoIndustryMockup';

type DemoCatalogCardProps = {
  item: DemoCategoryGroup['items'][number];
  index: number;
  onOpen: () => void;
};

export function DemoCatalogCard({ item, index, onOpen }: DemoCatalogCardProps) {
  const mockup = showcaseMockupByIndustry[item.industry] ?? showcaseMockupByIndustry.odontologia;

  return (
    <div className="group relative bg-surface border border-border rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`h-1 w-full bg-linear-to-r ${mockup.topBar}`} />

      <a
        className={`block p-5 bg-linear-to-br ${mockup.color}`}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        data-tooltip="Ver esta landing page en modo interactivo."
        onClick={onOpen}
      >
        <DemoIndustryMockup industry={item.industry} />

        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${mockup.accentBg}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 inline-block" />
        </div>
      </a>

      <div className="p-5 space-y-3">
        <div>
          <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-1">{getIndustryLabel(item.industry)}</div>
          <h3 className="text-base font-bold text-white">{item.title}</h3>
          <p className="text-sm text-zinc-400 mt-1 leading-snug">"{item.description}"</p>
        </div>

        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 group-hover:border-opacity-60 ${mockup.accentBg} hover:opacity-80`}
          data-tooltip="Ver esta landing page en modo interactivo."
          onClick={onOpen}
        >
          Ver esta landing
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
