import { DEFAULT_DEMO_PREVIEW } from './constants.mjs';

function renderTemplate(template, replacements, templatePath) {
  return template.replace(/{{([A-Z0-9_]+)}}/g, (_match, key) => {
    if (!(key in replacements)) {
      throw new Error(`Template ${templatePath} requires placeholder {{${key}}}.`);
    }
    return String(replacements[key]);
  });
}

export function renderDemo(context) {
  const renderedBlocks = {};

  Object.entries(context.blockTemplates).forEach(([placeholder, template]) => {
    renderedBlocks[placeholder] = template ? renderTemplate(template, context.replacements, placeholder) : '';
  });

  const html = renderTemplate(
    context.layoutTemplate,
    { ...context.replacements, ...renderedBlocks },
    context.layoutPath,
  );

  const meta = {
    title: context.args.title,
    description: context.args.description,
    category: context.args.category,
    industry: context.requestedIndustry,
    preview: DEFAULT_DEMO_PREVIEW,
    slug: context.args.name,
    template: context.selectedTemplate.id,
    layout: context.layoutKey,
    variant: context.args.variant || context.layoutKey,
    goal: context.goal,
    style: context.style,
    status: context.status,
    tags: context.tags,
    sections: context.selectedTemplate.sections,
  };

  if (context.args.tier) {
    meta.tier = context.args.tier;
  }

  return { ...context, html, meta };
}
