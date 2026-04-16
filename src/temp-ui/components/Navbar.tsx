import { useEffect, useState } from 'react';

import { tempUiBridge } from '../bridge';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/65 backdrop-blur-xl border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href={tempUiBridge.siteConfig.routes.captiva} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 text-white text-xs font-black flex items-center justify-center">V</div>
            <span className="font-bold text-lg text-white tracking-tight">{tempUiBridge.siteConfig.productName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {tempUiBridge.navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={tempUiBridge.siteConfig.contact.ctaHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-all"
          >
            {tempUiBridge.siteConfig.primaryCtaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
