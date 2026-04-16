import { useEffect, useState } from 'react';

import { tempUiBridge } from '../bridge';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.35);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden md:block relative">
        <div className="bg-[#111113] border border-[#27272A] text-zinc-300 text-xs font-semibold px-4 py-2.5 rounded-2xl whitespace-nowrap shadow-xl">
          ¡Empezá ahora por WhatsApp!
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#111113] border-r border-t border-[#27272A] rotate-45" />
        </div>
      </div>

      <a
        href={tempUiBridge.waLink}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20B958] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/30 transition-all duration-200 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <span className="text-white text-2xl">✆</span>
      </a>
    </div>
  );
}
