export type LeadFormData = {
  name: string;
  company: string;
  industry: string;
  objective: string;
  contact: string;
};

export type LeadContext = {
  source?: string;
  industry?: string;
  city?: string;
  context?: string;
  leadScore?: number;
  leadLevel?: string;
};

function safeValue(value: string | undefined) {
  const normalized = String(value ?? '').trim();
  return normalized.length > 0 ? normalized : 'No informado';
}

export function buildLeadMessage(formData: LeadFormData, context: LeadContext = {}) {
  const lines = [
    'Hola, quiero informacion sobre Captiva como sistema de captacion de clientes.',
    '',
    `Nombre: ${safeValue(formData.name)}`,
    `Empresa: ${safeValue(formData.company)}`,
    `Rubro: ${safeValue(formData.industry)}`,
    `Objetivo: ${safeValue(formData.objective)}`,
    `Contacto: ${safeValue(formData.contact)}`,
    '',
    `Pagina de origen: ${safeValue(context.source)}`,
    `Industria: ${safeValue(context.industry)}`,
    `Ciudad: ${safeValue(context.city)}`,
    `Contexto: ${safeValue(context.context)}`,
    `Lead score: ${safeValue(context.leadScore != null ? String(context.leadScore) : undefined)}`,
    `Lead level: ${safeValue(context.leadLevel)}`,
  ];

  return lines.join('\n');
}

export function buildWhatsAppLeadUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
