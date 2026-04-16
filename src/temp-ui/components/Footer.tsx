import { tempUiBridge } from '../bridge';

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#18181B] bg-[#09090B] py-12">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="/captiva" className="inline-flex items-center">
              <img
                src="/LOGO-captiva.png"
                alt="Captiva"
                className="h-8 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="text-xs text-zinc-600 max-w-[200px] text-center md:text-left">
              Landings que convierten visitas en consultas.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            {[
              { label: 'Demos', id: 'demos' },
              { label: 'Cómo funciona', id: 'como-funciona' },
              { label: 'Planes', id: 'planes' },
              { label: 'FAQ', id: 'faq' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <a
              href={tempUiBridge.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-semibold"
            >
              WhatsApp →
            </a>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Captiva. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-700">
            Hecho con
            <span className="text-red-500 mx-0.5">♥</span>
            para negocios de Argentina y Latinoamérica
          </div>
        </div>
      </div>
    </footer>
  );
}
