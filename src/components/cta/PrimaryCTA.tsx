import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { ANALYTICS_EVENTS, useAnalytics } from '../../lib/analytics';
import { siteConfig } from '../../config/site';
import { buildLeadMessage, buildWhatsAppLeadUrl, type LeadContext } from '../../utils/lead-message';
import { resolveCurrentPageContext } from '../../utils/page-context';

type PrimaryCTAMode = 'lead-form' | 'whatsapp' | 'route';

type PrimaryCTAProps = LeadContext & {
  label: string;
  mode?: PrimaryCTAMode;
  leadFormId?: string;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
};

export function PrimaryCTA({
  label,
  mode = 'whatsapp',
  leadFormId,
  href,
  source,
  industry,
  city,
  context,
  className,
  variant = 'primary',
  icon,
}: PrimaryCTAProps) {
  const { trackConversion, trackEvent, trackWhatsApp } = useAnalytics();
  const classes = ['button-link', `button-link--${variant}`, className].filter(Boolean).join(' ');
  const pageContext = typeof window !== 'undefined' ? resolveCurrentPageContext() : { pageType: 'unknown' as const, path: '' };

  const trackCta = (modeLabel: PrimaryCTAMode) => {
    trackEvent({
      action: ANALYTICS_EVENTS.CTA_SECTION_CLICK,
      category: source ?? 'unknown',
      label,
      cta_text: label,
      location: source ?? 'unknown',
      mode: modeLabel,
      page: pageContext.path,
      pageType: pageContext.pageType,
      industry: industry ?? pageContext.industry ?? '',
      city: city ?? pageContext.city ?? '',
      context: context ?? '',
    });
    trackConversion({
      conversion_type: 'cta_click',
      business_type: industry ?? pageContext.industry,
      source_section: source ?? 'unknown',
    });
  };

  if (mode === 'lead-form') {
    const target = leadFormId ? `#${leadFormId}` : '#lead-form';
    return (
      <a
        className={classes}
        href={target}
        onClick={() => trackCta('lead-form')}
      >
        {icon}
        {label}
      </a>
    );
  }

  if (mode === 'route') {
    return (
      <Link className={classes} to={href ?? siteConfig.routes.captiva} onClick={() => trackCta('route')}>
        {icon}
        {label}
      </Link>
    );
  }

  const message = buildLeadMessage(
    {
      name: '',
      company: '',
      industry: industry ?? '',
      objective: '',
      contact: '',
    },
    { source, industry, city, context },
  );
  const whatsappUrl = buildWhatsAppLeadUrl(siteConfig.contact.whatsapp, message);

  return (
    <a
      className={classes}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        trackCta('whatsapp');
        trackWhatsApp(source ?? 'unknown', label, industry ?? pageContext.industry);
      }}
    >
      {icon}
      {label}
    </a>
  );
}
