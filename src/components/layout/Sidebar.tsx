import type { ReactEventHandler } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';
import { ButtonLink } from '../ui/ButtonLink';
import { FeatureIcon } from '../ui/FeatureIcon';
import { PanelToggleIcon } from '../ui/PanelToggleIcon';
import { ThemeSwitch } from '../ui/theme/ThemeSwitch';
import type { RailItem } from './types';

type SidebarProps = {
  visible: boolean;
  isRailCollapsed: boolean;
  isHomeNavActive: boolean;
  fullLogoSrc: string;
  onLogoError: ReactEventHandler<HTMLImageElement>;
  railItems: RailItem[];
  isAnchorActive: (href: string) => boolean;
  onToggleRail: () => void;
  onSelectAnchor: (href: string) => void;
};

export function Sidebar({
  visible,
  isRailCollapsed,
  isHomeNavActive,
  fullLogoSrc,
  onLogoError,
  railItems,
  isAnchorActive,
  onToggleRail,
  onSelectAnchor,
}: SidebarProps) {
  if (!visible) {
    return null;
  }

  return (
    <>
      <aside
        id="captiva-rail"
        className={`section-rail${isRailCollapsed ? ' section-rail--collapsed' : ''}`}
        aria-label="Navegación de secciones"
      >
        <div className="section-rail__brand">
          <img
            className="section-rail__logo"
            src={isRailCollapsed ? '/LOGO-captiva-icon.png' : fullLogoSrc}
            alt={siteConfig.productName}
            width={isRailCollapsed ? 64 : 280}
            height={isRailCollapsed ? 64 : 84}
            loading="eager"
            decoding="async"
            onError={onLogoError}
          />
          <div className="section-rail__brand-copy">
            <strong>{siteConfig.productBar.title}</strong>
            <span>{siteConfig.productBar.subtitle}</span>
            <em>
              Producto de{' '}
              <a href="https://tuweb-ai.com/" target="_blank" rel="noreferrer">
                {siteConfig.companyName}
              </a>
            </em>
          </div>
        </div>

        <button
          className="section-rail__toggle"
          type="button"
          aria-label={isRailCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          data-tooltip={isRailCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          onClick={onToggleRail}
        >
          <PanelToggleIcon collapsed={isRailCollapsed} />
        </button>

        <nav className="section-rail__nav">
          {railItems.map((item) =>
            item.type === 'route' ? (
              item.href === siteConfig.routes.captiva ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`section-rail__link${isHomeNavActive ? ' is-active' : ''}`}
                  aria-current={isHomeNavActive ? 'page' : undefined}
                  aria-label={isRailCollapsed ? item.label : undefined}
                  data-tooltip={item.label}
                >
                  <FeatureIcon name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `section-rail__link${isActive ? ' is-active' : ''}`}
                  aria-label={isRailCollapsed ? item.label : undefined}
                  data-tooltip={item.label}
                >
                  <FeatureIcon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              )
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={`section-rail__link${isAnchorActive(item.href) ? ' is-active' : ''}`}
                aria-current={isAnchorActive(item.href) ? 'location' : undefined}
                aria-label={isRailCollapsed ? item.label : undefined}
                data-tooltip={item.label}
                onClick={() => onSelectAnchor(item.href)}
              >
                <FeatureIcon name={item.icon} />
                <span>{item.label}</span>
              </a>
            ),
          )}
        </nav>

        <ButtonLink
          className="section-rail__cta"
          href={siteConfig.contact.ctaHref}
          variant="primary"
          data-tooltip="Hablar por WhatsApp y solicitar landing"
          onClick={() => trackEvent({ event: 'cta_click', category: 'rail', label: 'solicitar-landing' })}
        >
          Hablar por WhatsApp
        </ButtonLink>
        <ThemeSwitch source="sidebar" compact={isRailCollapsed} className="section-rail__theme-switch" />
      </aside>

      <ThemeSwitch source="mobile" compact className="mobile-floating-theme-switch" />

      <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
        <Link
          className={`mobile-bottom-nav__item${isHomeNavActive ? ' is-active' : ''}`}
          aria-current={isHomeNavActive ? 'page' : undefined}
          to={siteConfig.routes.captiva}
          onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'inicio' })}
        >
          <FeatureIcon name="home" />
          <span>Inicio</span>
        </Link>
        <NavLink
          className={({ isActive }) => `mobile-bottom-nav__item${isActive ? ' is-active' : ''}`}
          to={siteConfig.routes.captivaDemos}
          onClick={() => trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'demos' })}
        >
          <FeatureIcon name="demos" />
          <span>Demos</span>
        </NavLink>
        <a
          className="mobile-bottom-nav__cta"
          href={siteConfig.contact.ctaHref}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent({ event: 'cta_click', category: 'mobile-nav', label: 'whatsapp' })}
        >
          <span className="mobile-bottom-nav__whatsapp-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" focusable="false">
              <path
                d="M19.11 17.27c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.27-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.28.39-.41.13-.13.17-.22.26-.37.09-.15.04-.28-.02-.41-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44-.15-.01-.33-.01-.5-.01s-.45.06-.69.32c-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.84 2.81 4.45 3.94.62.27 1.11.43 1.49.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.74-1.23.22-.6.22-1.11.15-1.22-.06-.11-.24-.17-.5-.3Z"
                fill="currentColor"
              />
              <path
                d="M16 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.24.58 4.43 1.69 6.36L3.2 28.8l6.58-1.67a12.75 12.75 0 0 0 6.21 1.61c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2Zm0 23.28c-2.01 0-3.98-.54-5.71-1.56l-.41-.24-3.91.99 1.04-3.81-.27-.43a10.53 10.53 0 0 1-1.64-5.61c0-5.86 4.77-10.63 10.63-10.63s10.63 4.77 10.63 10.63S21.86 26.48 16 26.48Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>WhatsApp</span>
        </a>
        <a
          className={`mobile-bottom-nav__item${isAnchorActive(`${siteConfig.routes.captiva}#oferta`) ? ' is-active' : ''}`}
          aria-current={isAnchorActive(`${siteConfig.routes.captiva}#oferta`) ? 'location' : undefined}
          href={`${siteConfig.routes.captiva}#oferta`}
          onClick={() => {
            onSelectAnchor(`${siteConfig.routes.captiva}#oferta`);
            trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'oferta' });
          }}
        >
          <FeatureIcon name="industries" />
          <span>Oferta</span>
        </a>
        <a
          className={`mobile-bottom-nav__item${isAnchorActive(`${siteConfig.routes.captiva}#contacto`) ? ' is-active' : ''}`}
          aria-current={isAnchorActive(`${siteConfig.routes.captiva}#contacto`) ? 'location' : undefined}
          href={`${siteConfig.routes.captiva}#contacto`}
          onClick={() => {
            onSelectAnchor(`${siteConfig.routes.captiva}#contacto`);
            trackEvent({ event: 'internal_nav', category: 'mobile-nav', label: 'contacto' });
          }}
        >
          <FeatureIcon name="contact-nav" />
          <span>Contacto</span>
        </a>
      </nav>
    </>
  );
}
