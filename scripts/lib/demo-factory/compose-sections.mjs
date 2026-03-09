import {
  defaultSectionCopy,
  goalByCategory,
  normalizeVariantKey,
  sectionCopyByProfile,
  toTitleCaseFromSlug,
  variantProfiles,
} from './config.mjs';

function buildTags(profileKey, selectedTemplate, industry) {
  const tags = new Set(['captiva', 'demo', profileKey, selectedTemplate.id, industry]);
  return [...tags].filter(Boolean);
}

export function composeSections(context) {
  const businessName = context.args['business-name']
    ? context.args['business-name'].trim()
    : toTitleCaseFromSlug(context.args.name);
  const ctaPrimary = context.args['cta-text'] ? context.args['cta-text'].trim() : context.contentContract.cta.primary;
  const ctaSecondary = context.args['cta-secondary']
    ? context.args['cta-secondary'].trim()
    : context.contentContract.cta.secondary;

  const proposal = context.contentContract.valueProposition;
  const benefits = context.contentContract.benefits;
  const objections = context.contentContract.objections;
  const trustMessages = context.contentContract.trustMessages;
  const faq = context.contentContract.faq;
  const sectionCopy = {
    ...defaultSectionCopy,
    ...(sectionCopyByProfile[context.profileKey] ?? {}),
  };
  const primaryColor = context.args['primary-color']?.trim() || context.themeConfig.primaryColor;
  const secondaryColor = context.args['secondary-color']?.trim() || context.themeConfig.secondaryColor;
  const goal = context.args.goal?.trim() || goalByCategory[context.profileKey] || 'leads';
  const style = context.args.style?.trim() || context.selectedTemplate.style || 'premium';
  const status = context.args.status?.trim() || 'active';
  const variantKey = normalizeVariantKey(context.args.variant ?? context.selectedTemplate.defaultLayout);
  const variantProfile = variantProfiles[variantKey] ?? variantProfiles.default;
  const tags = context.args.tags
    ? context.args.tags
        .split(',')
        .map((token) => token.trim())
        .filter(Boolean)
    : buildTags(context.profileKey, context.selectedTemplate, context.requestedIndustry);

  const benefitTitleMap = {
    fitness: ['Clases guiadas', 'Membresias claras', 'Contacto activo'],
    health: ['Turnos visibles', 'Autoridad medica', 'Canal de consulta'],
    legal: ['Consulta calificada', 'Respaldo visible', 'Seguimiento directo'],
    business: ['Oferta estructurada', 'Mensaje preciso', 'Lead listo para avanzar'],
    restaurant: ['Reserva inmediata', 'Carta clara', 'Accion sin friccion'],
    beauty: ['Confianza visual', 'Tratamientos claros', 'Reserva directa'],
    automotriz: ['Oferta priorizada', 'Financiacion visible', 'Cierre con asesor'],
  };

  const benefitMetaMap = {
    fitness: ['Prueba inicial', 'Valor claro', 'Seguimiento'],
    health: ['Confianza', 'Especialidades', 'Atencion rapida'],
    legal: ['Caso correcto', 'Credibilidad', 'Contacto seguro'],
    business: ['Lead calificado', 'Decision simple', 'Embudo listo'],
    restaurant: ['Mesa o pedido', 'Experiencia', 'Accion rapida'],
    beauty: ['Percepcion premium', 'Diagnostico', 'Turno inmediato'],
    automotriz: ['Stock visible', 'Argumento comercial', 'Test drive'],
  };

  const serviceBadgeMap = {
    fitness: ['Programa clave', 'Membresia destacada', 'Canal de alta'],
    health: ['Tratamiento central', 'Prueba social', 'Canal de reserva'],
    legal: ['Area prioritaria', 'Especialidad destacada', 'Canal de consulta'],
    business: ['Oferta principal', 'Diferencial', 'Canal comercial'],
    restaurant: ['Experiencia', 'Momento clave', 'Accion inmediata'],
    beauty: ['Tratamiento estrella', 'Autoridad visual', 'Canal de cita'],
    automotriz: ['Unidad destacada', 'Financiacion', 'Cierre comercial'],
  };

  const goalLabelMap = {
    appointments: 'turnos',
    memberships: 'altas',
    consultations: 'consultas',
    leads: 'leads',
    bookings: 'reservas',
    'test-drives': 'test drives',
  };

  const benefitTitles = benefitTitleMap[context.profileKey] ?? ['Conversion', 'Claridad', 'Contacto'];
  const benefitMetas = benefitMetaMap[context.profileKey] ?? ['Impacto', 'Confianza', 'Accion'];
  const serviceBadges = serviceBadgeMap[context.profileKey] ?? ['Oferta', 'Prueba social', 'Contacto'];
  const goalLabel = goalLabelMap[goal] ?? 'leads';

  const replacements = {
    TITLE: context.args.title,
    DESCRIPTION: context.args.description,
    CATEGORY: context.args.category,
    CATEGORY_LABEL: context.themeConfig.label,
    BUSINESS_NAME: businessName,
    CTA_TEXT: ctaPrimary,
    CTA_SECONDARY: ctaSecondary,
    PRIMARY_COLOR: primaryColor,
    SECONDARY_COLOR: secondaryColor,
    HEADLINE: proposal,
    HERO_IMAGE: context.assets.heroImage,
    HERO_TAG: `${context.themeConfig.label} ${variantProfile.heroTag}`,
    GOAL_LABEL: goalLabel,
    WHATSAPP_TEXT: `Hola ${businessName}, quiero informacion sobre ${context.args.title}.`,
    TRUST_1: trustMessages[0],
    TRUST_2: trustMessages[1],
    TRUST_3: trustMessages[2],
    PROOF_VALUE_1: variantProfile.proof[0].value,
    PROOF_LABEL_1: variantProfile.proof[0].label,
    PROOF_VALUE_2: variantProfile.proof[1].value,
    PROOF_LABEL_2: variantProfile.proof[1].label,
    PROOF_VALUE_3: variantProfile.proof[2].value,
    PROOF_LABEL_3: variantProfile.proof[2].label,
    BENEFIT_1_TITLE: benefitTitles[0],
    BENEFIT_1_DESC: benefits[0],
    BENEFIT_1_META: benefitMetas[0],
    BENEFIT_2_TITLE: benefitTitles[1],
    BENEFIT_2_DESC: benefits[1],
    BENEFIT_2_META: benefitMetas[1],
    BENEFIT_3_TITLE: benefitTitles[2],
    BENEFIT_3_DESC: benefits[2],
    BENEFIT_3_META: benefitMetas[2],
    PROCESS_TITLE: sectionCopy.processTitle,
    PROCESS_DESC: variantProfile.processTone,
    STEP_1_TITLE: sectionCopy.steps[0].title,
    STEP_1_DESC: sectionCopy.steps[0].desc,
    STEP_2_TITLE: sectionCopy.steps[1].title,
    STEP_2_DESC: sectionCopy.steps[1].desc,
    STEP_3_TITLE: sectionCopy.steps[2].title,
    STEP_3_DESC: sectionCopy.steps[2].desc,
    PROCESS_COMMUNITY_TITLE: 'Implementacion guiada y comercial',
    PROCESS_COMMUNITY_DESC: `Convertimos la estrategia en una landing operativa para captar ${goalLabel} con mas claridad.`,
    SERVICE_TITLE: variantProfile.servicesTitle,
    SERVICE_DESC: `${objections.join('. ')}.`,
    SERVICE_1_BADGE: serviceBadges[0],
    SERVICE_1_TITLE: 'Oferta principal',
    SERVICE_1_DESC: benefits[0],
    SERVICE_2_BADGE: serviceBadges[1],
    SERVICE_2_TITLE: 'Diferencial comercial',
    SERVICE_2_DESC: benefits[1],
    SERVICE_3_BADGE: serviceBadges[2],
    SERVICE_3_TITLE: 'Canal de cierre',
    SERVICE_3_DESC: benefits[2],
    SERVICE_IMAGE_1: context.assets.serviceImages[0],
    SERVICE_IMAGE_2: context.assets.serviceImages[1],
    SERVICE_IMAGE_3: context.assets.serviceImages[2],
    PLANS_TITLE: sectionCopy.plansTitle,
    PLANS_DESC: sectionCopy.plansDesc,
    PLAN_1_NAME: sectionCopy.plans[0].name,
    PLAN_1_PRICE: sectionCopy.plans[0].price,
    PLAN_1_DESC: sectionCopy.plans[0].desc,
    PLAN_2_NAME: sectionCopy.plans[1].name,
    PLAN_2_PRICE: sectionCopy.plans[1].price,
    PLAN_2_DESC: sectionCopy.plans[1].desc,
    PLAN_3_NAME: sectionCopy.plans[2].name,
    PLAN_3_PRICE: sectionCopy.plans[2].price,
    PLAN_3_DESC: sectionCopy.plans[2].desc,
    GALLERY_IMAGE_1: context.assets.galleryImages[0],
    GALLERY_IMAGE_2: context.assets.galleryImages[1],
    GALLERY_IMAGE_3: context.assets.galleryImages[2],
    GALLERY_IMAGE_4: context.assets.galleryImages[3],
    SOCIAL_TITLE: variantProfile.socialTitle,
    SOCIAL_DESC: variantProfile.socialDesc,
    TESTIMONIAL_1_TEXT: `La propuesta quedo mucho mas clara y empezamos a recibir ${goalLabel} con mejor contexto.`,
    TESTIMONIAL_2_TEXT: `Ahora el visitante entiende rapido el servicio y llega al contacto con mas intencion.`,
    TESTIMONIAL_3_TEXT: `La nueva estructura ordeno el mensaje y mejoro la calidad del primer contacto.`,
    TESTIMONIAL_NAME_1: 'Cliente Premium A',
    TESTIMONIAL_NAME_2: 'Cliente Premium B',
    TESTIMONIAL_NAME_3: 'Cliente Premium C',
    EXPERIENCE_TITLE: 'Sistema de conversion completo para demos enterprise',
    EXPERIENCE_DESC: 'Diseño, copy y flujo comercial alineados para captar oportunidades reales.',
    FAQ_Q1: faq[0].question,
    FAQ_A1: faq[0].answer,
    FAQ_Q2: faq[1].question,
    FAQ_A2: faq[1].answer,
    FAQ_Q3: faq[2].question,
    FAQ_A3: faq[2].answer,
    FAQ_Q4: faq[3].question,
    FAQ_A4: faq[3].answer,
    FAQ_Q5: faq[4].question,
    FAQ_A5: faq[4].answer,
    FAQ_Q6: faq[5].question,
    FAQ_A6: faq[5].answer,
    CTA_HEADLINE: `${variantProfile.ctaHeadlinePrefix} ${goalLabel}`,
    CTA_DESC: variantProfile.ctaDesc,
    CONTACT_TITLE: `Hablemos de tu negocio ${context.themeConfig.label.toLowerCase()}`,
    CONTACT_DESC: 'Te ayudamos a activar una landing comercial lista para captar consultas.',
    CONTACT_EMAIL: `${context.args.name}@demo.captiva`,
    CONTACT_GOAL_1: 'Solicitar propuesta',
    CONTACT_GOAL_2: 'Ver opciones de plan',
    CONTACT_GOAL_3: 'Coordinar una llamada',
  };

  return {
    ...context,
    goal,
    variantKey,
    replacements,
    status,
    style,
    tags,
  };
}
