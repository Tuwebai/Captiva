import type { ReactEventHandler } from 'react';

import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';
import { ButtonLink } from '../ui/ButtonLink';

type NavbarProps = {
  visible: boolean;
  fullLogoSrc: string;
  onLogoError: ReactEventHandler<HTMLImageElement>;
};

export function Navbar({ visible, fullLogoSrc, onLogoError }: NavbarProps) {
  if (!visible) {
    return null;
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand-mark" href={siteConfig.routes.captiva}>
          <img
            className="brand-mark__logo"
            src={fullLogoSrc}
            alt={siteConfig.productName}
            width={400}
            height={120}
            decoding="async"
            fetchPriority="high"
            onError={onLogoError}
          />
        </a>

        <div className="site-header__actions">
          <ButtonLink
            href={siteConfig.contact.ctaHref}
            variant="primary"
            onClick={() => trackEvent({ event: 'cta_click', category: 'header', label: 'solicitar-informacion' })}
          >
            {siteConfig.primaryCtaLabel}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
