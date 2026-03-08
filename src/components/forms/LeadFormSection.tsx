import { FormEvent, useEffect, useId, useMemo, useState } from 'react';

import { InfoTooltip } from '../ui/tooltip/InfoTooltip';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';
import { buildLeadMessage, buildWhatsAppLeadUrl, type LeadContext, type LeadFormData } from '../../utils/lead-message';
import { resolveCurrentPageContext } from '../../utils/page-context';

type LeadFormSectionProps = LeadContext & {
  id?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
};

const initialState: LeadFormData = {
  name: '',
  company: '',
  industry: '',
  objective: '',
  contact: '',
};

export function LeadFormSection({
  id,
  title = 'Contanos tu objetivo y armamos un sistema de captación para tu negocio',
  description = 'Completa el formulario y abrimos WhatsApp con un brief comercial estructurado para responderte más rápido.',
  submitLabel = 'Enviar por WhatsApp',
  source,
  industry,
  city,
  context,
  className,
}: LeadFormSectionProps) {
  const fallbackId = useId().replace(/:/g, '');
  const formId = id ?? `lead-form-${fallbackId}`;
  const persistenceKey = useMemo(() => {
    const contextKey = [source ?? '', industry ?? '', city ?? '', context ?? ''].join('|');
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    return `captiva:lead-form:${id ?? formId}:${contextKey}:${pathname}`;
  }, [city, context, formId, id, industry, source]);
  const [formData, setFormData] = useState<LeadFormData>({
    ...initialState,
    industry: industry ?? '',
  });

  const leadContext = useMemo<LeadContext>(
    () => ({
      source,
      industry: industry ?? formData.industry,
      city,
      context: context ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
    }),
    [source, industry, formData.industry, city, context],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const persisted = window.localStorage.getItem(persistenceKey);
    if (!persisted) return;

    try {
      const parsed = JSON.parse(persisted) as Partial<LeadFormData>;
      setFormData((current) => ({
        ...current,
        name: parsed.name ?? current.name,
        company: parsed.company ?? current.company,
        industry: parsed.industry ?? current.industry,
        objective: parsed.objective ?? current.objective,
        contact: parsed.contact ?? current.contact,
      }));
    } catch {
      // Ignore invalid storage payload.
    }
  }, [persistenceKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(persistenceKey, JSON.stringify(formData));
  }, [formData, persistenceKey]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = buildLeadMessage(formData, leadContext);
    const whatsappUrl = buildWhatsAppLeadUrl(siteConfig.contact.whatsapp, message);
    const pageContext = resolveCurrentPageContext();

    trackEvent('lead_submit', {
      source: source ?? 'lead-form',
      page: pageContext.path,
      pageType: pageContext.pageType,
      formId,
      industry: industry ?? formData.industry,
      city: city ?? pageContext.city ?? '',
      context: context ?? '',
      contact_type: formData.contact.includes('@') ? 'email' : 'whatsapp',
    });

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const leadMessage = buildLeadMessage(formData, leadContext);
  const mailtoHref = `mailto:${siteConfig.contact.productEmail}?subject=${encodeURIComponent('Lead Captiva')}&body=${encodeURIComponent(leadMessage)}`;

  return (
    <section id={formId} className={`lead-form-section${className ? ` ${className}` : ''}`}>
      <div className="lead-form-card">
        <div className="lead-form-header">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <form className="lead-form-grid" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              name="name"
              required
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            />
          </label>

          <label>
            Empresa
            <input
              name="company"
              value={formData.company}
              onChange={(event) => setFormData((current) => ({ ...current, company: event.target.value }))}
            />
          </label>

          <label>
            Rubro
            <input
              name="industry"
              required
              value={formData.industry}
              onChange={(event) => setFormData((current) => ({ ...current, industry: event.target.value }))}
            />
          </label>

          <label className="lead-form-grid__wide">
            <span className="lead-form-label-row">
              Que quieres conseguir con tu landing?
              <InfoTooltip text="Ejemplo: conseguir mas consultas o captar alumnos." />
            </span>
            <textarea
              name="objective"
              required
              rows={3}
              value={formData.objective}
              onChange={(event) => setFormData((current) => ({ ...current, objective: event.target.value }))}
            />
          </label>

          <label className="lead-form-grid__wide">
            WhatsApp o email
            <input
              name="contact"
              required
              value={formData.contact}
              onChange={(event) => setFormData((current) => ({ ...current, contact: event.target.value }))}
            />
          </label>

          <div className="lead-form-actions lead-form-grid__wide">
            <button className="button-link button-link--primary" type="submit">
              <span className="lead-form-actions__wa-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="currentColor" role="img">
                  <path d="M16.1 4C9.47 4 4.1 9.3 4.1 15.84c0 2.08.56 4.12 1.62 5.92L4 28l6.44-1.67a12.05 12.05 0 0 0 5.65 1.44h.01c6.63 0 12-5.31 12-11.84C28.1 9.3 22.73 4 16.1 4Zm0 21.72h-.01a9.95 9.95 0 0 1-5.09-1.39l-.36-.21-3.82.99 1.02-3.72-.24-.38a9.73 9.73 0 0 1-1.5-5.16c0-5.42 4.5-9.83 10.03-9.83 5.53 0 10.02 4.41 10.02 9.83 0 5.42-4.5 9.83-10.03 9.83Zm5.5-7.38c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.78-1.48-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37s-1.04 1.01-1.04 2.45c0 1.44 1.06 2.84 1.2 3.04.15.2 2.09 3.33 5.16 4.53.73.29 1.3.46 1.74.59.73.23 1.4.2 1.93.12.59-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </span>
              {submitLabel}
            </button>
            <a className="button-link button-link--secondary" href={mailtoHref}>
              Enviar por email
            </a>
            <a className="button-link button-link--secondary" href={siteConfig.contact.ctaHref} target="_blank" rel="noreferrer">
              WhatsApp directo
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
