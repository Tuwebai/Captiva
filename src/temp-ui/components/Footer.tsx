import { tempUiBridge } from '../bridge';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-5 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-violet-600 text-white text-xs font-black flex items-center justify-center">V</div>
          <span className="font-bold text-lg text-white tracking-tight">{tempUiBridge.siteConfig.productName}</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5">
          {tempUiBridge.navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={tempUiBridge.siteConfig.contact.ctaHref} target="_blank" rel="noreferrer" className="text-sm text-zinc-300 hover:text-white">
          {tempUiBridge.siteConfig.contact.productEmail}
        </a>
      </div>
    </footer>
  );
}
