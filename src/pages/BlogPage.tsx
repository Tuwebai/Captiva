import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { SurfaceCard } from '../components/ui/SurfaceCard';

const plannedPosts = [
  'Como conseguir clientes con una landing page',
  'Landing page vs sitio web: que conviene para vender',
  'Ejemplos de landing pages que convierten',
  'Guia de landing pages para negocios locales',
];

export function BlogPage() {
  useDocumentMetadata({
    title: `Blog de Captiva | ${siteConfig.companyName}`,
    description:
      'Blog tecnico de Captiva para crecimiento organico: conversion, landing pages y adquisicion de clientes.',
    path: '/blog',
    robots: 'noindex,follow',
    keywords: ['blog landing pages', 'captiva blog', 'conversion web'],
  });

  return (
    <section className="content-section">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Blog</p>
          <h1>Base preparada para blog tecnico</h1>
          <p>
            Esta ruta deja lista la arquitectura para escalar contenido SEO informacional sin cambiar la estructura
            principal del producto.
          </p>
        </div>

        <div className="card-grid card-grid--two">
          {plannedPosts.map((title) => (
            <SurfaceCard key={title}>
              <h2>{title}</h2>
              <p>Contenido planificado para fase de growth SEO informacional.</p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
