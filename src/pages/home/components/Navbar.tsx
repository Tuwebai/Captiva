import { useState, useEffect } from 'react';

import { homeBridge } from '../bridge';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navItems = [
    { label: 'Demos', href: homeBridge.siteConfig.routes.captivaDemos, onClick: undefined },
    { label: 'Cómo funciona', href: `${homeBridge.siteConfig.routes.captiva}#como-funciona`, onClick: () => scrollTo('como-funciona') },
    { label: 'Planes', href: `${homeBridge.siteConfig.routes.captiva}#planes`, onClick: () => scrollTo('planes') },
    { label: 'Blog', href: homeBridge.siteConfig.routes.blog, onClick: undefined },
    { label: 'FAQ', href: `${homeBridge.siteConfig.routes.captiva}#faq`, onClick: () => scrollTo('faq') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncViewport = () => setIsMobileViewport(window.innerWidth <= 820);
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href={homeBridge.siteConfig.routes.captiva} className="flex items-center">
          <img
            src="/LOGO-captiva.png"
            alt="Captiva"
            className="h-20 md:h-22 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Nav links - desktop */}
        {!isMobileViewport ? <nav className="flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav> : null}

        {/* CTA */}
        {!isMobileViewport ? <a
          href={homeBridge.waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Empezar
        </a> : null}

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-600/40 text-violet-400"
          style={{ display: isMobileViewport ? 'inline-flex' : 'none' }}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 rounded-full bg-current" />
            <span className="block h-0.5 w-4 rounded-full bg-current" />
            <span className="block h-0.5 w-4 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {menuOpen && isMobileViewport ? (
        <div className="border-t border-white/5 bg-[#09090B]/98 backdrop-blur">
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  item.onClick?.();
                  setMenuOpen(false);
                }}
                className="rounded-xl border border-white/8 px-4 py-3 text-sm font-medium text-zinc-200"
              >
                {item.label}
              </a>
            ))}

            <a
              href={homeBridge.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Empezar
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
