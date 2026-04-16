import { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';

export function FloatingWhatsAppCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`floating-whatsapp-cta${isVisible ? ' floating-whatsapp-cta--visible' : ''}`}
      href={siteConfig.contact.ctaHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
    >
      Consultar
    </a>
  );
}
