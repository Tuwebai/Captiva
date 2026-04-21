import { showcaseMockupByIndustry } from './catalog-data';

type DemoIndustryMockupProps = {
  industry: string;
};

export function DemoIndustryMockup({ industry }: DemoIndustryMockupProps) {
  const mockup = showcaseMockupByIndustry[industry] ?? showcaseMockupByIndustry.odontologia;

  return (
    <div className="bg-[#0D0D0F]/80 rounded-xl p-3 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 bg-[#1A1A1F] rounded-md px-2 py-1 text-[10px] text-zinc-500 font-mono truncate">{mockup.domain}</div>
      </div>

      <div className="space-y-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-base">{mockup.icon}</span>
          <div className="w-20 h-3 bg-zinc-700 rounded-full" />
        </div>
        <div className="w-full h-4 bg-zinc-600/40 rounded" />
        <div className="w-4/5 h-4 bg-zinc-600/40 rounded" />
        <div className="w-3/5 h-3 bg-zinc-700/40 rounded" />
        <div className="mt-3 flex gap-2">
          <div className="flex-1 h-8 bg-violet-600/70 rounded-lg flex items-center justify-center">
            <div className="w-16 h-2 bg-white/50 rounded" />
          </div>
          <div className="w-20 h-8 border border-zinc-600/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
