import type { ReactEventHandler } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ANALYTICS_EVENTS, useAnalytics } from '../../lib/analytics';
import { siteConfig } from '../../config/site';
import { ButtonLink } from '../ui/ButtonLink';
import { FeatureIcon } from '../ui/FeatureIcon';
import { PanelToggleIcon } from '../ui/PanelToggleIcon';
import { ThemeSwitch } from '../ui/theme/ThemeSwitch';
import type { RailItem } from './types';

type SidebarProps = {
  visible: boolean;
  isRailCollapsed: boolean;
  isMobileRailOpen: boolean;
  isHomeNavActive: boolean;
  fullLogoSrc: string;
  onLogoError: ReactEventHandler<HTMLImageElement>;
  railItems: RailItem[];
  isAnchorActive: (href: string) => boolean;
  onToggleRail: () => void;
  onCloseMobileRail: () => void;
  onSelectAnchor: (href: string) => void;
};

export function Sidebar({
  visible,
  isRailCollapsed,
  isMobileRailOpen,
  isHomeNavActive,
  fullLogoSrc,
  onLogoError,
  railItems,
  isAnchorActive,
  onToggleRail,
  onCloseMobileRail,
  onSelectAnchor,
}: SidebarProps) {
  const { trackEvent, trackWhatsApp } = useAnalytics();

  if (!visible) {
    return null;
  }

  const handleNavSelection = (label: string) => {
    trackEvent({ action: 'internal_nav', category: 'rail', label });
    onCloseMobileRail();
  };

  return (
    <>
      <button
        className={`mobile-rail-toggle${isMobileRailOpen ? ' is-open' : ''}`}
        type="button"
        aria-controls="captiva-rail"
        aria-expanded={isMobileRailOpen}
        aria-label={isMobileRailOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
        onClick={onToggleRail}
      >
        <PanelToggleIcon collapsed={!isMobileRailOpen} />
      </button>

      <button
        className={`mobile-rail-backdrop${isMobileRailOpen ? ' is-visible' : ''}`}
        type="button"
        aria-label="Cerrar sidebar"
        aria-hidden={!isMobileRailOpen}
        tabIndex={isMobileRailOpen ? 0 : -1}
        onClick={onCloseMobileRail}
      />

      <aside
        id="captiva-rail"
        className={`section-rail${isRailCollapsed ? ' section-rail--collapsed' : ''}${
          isMobileRailOpen ? ' section-rail--mobile-open' : ''
        }`}
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
                  onClick={() => handleNavSelection(item.label)}
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
                  onClick={() => handleNavSelection(item.label)}
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
                onClick={() => {
                  onSelectAnchor(item.href);
                  handleNavSelection(item.label);
                }}
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
          onClick={() => {
            trackEvent({ action: ANALYTICS_EVENTS.CTA_STICKY_CLICK, category: 'rail', label: 'solicitar-landing' });
            trackWhatsApp('rail', 'solicitar-landing');
            onCloseMobileRail();
          }}
        >
          Hablar por WhatsApp
        </ButtonLink>
        <ThemeSwitch source="sidebar" compact={isRailCollapsed} className="section-rail__theme-switch" />
      </aside>
    </>
  );
}
