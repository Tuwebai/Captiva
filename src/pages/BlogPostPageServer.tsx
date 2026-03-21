import { Link, Navigate, useLocation } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { getRouteCta } from '../config/cta-strategy';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import type { BlogPostContent } from '../types/blog';
import { trackEvent } from '../utils/analytics';
import { formatPostDate, getBlogPostBySlug, getRelatedBlogPosts } from '../utils/blog';
import { getIndustryLinks } from '../utils/seo-autolinks';

const blogContentModules = import.meta.glob('../content/blog-content/*.json', { eager: true });

function getContentBySlug(slug: string): BlogPostContent | null {
  const modulePath = `../content/blog-content/${slug}.json`;
  const module = blogContentModules[modulePath] as { default?: BlogPostContent } | undefined;
  const content = module?.default;
  return content?.slug === slug ? content : null;
}

export function BlogPostPageServer() {
  const blogCta = getRouteCta('blog');
  const location = useLocation();
  const slug = location.pathname.replace(/^\/blog\//, '');
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate replace to="/blog" />;
  }

  const content = getContentBySlug(post.slug);
  if (!content) {
    return <Navigate replace to="/blog" />;
  }

  const pagePath = `/blog/${post.slug}`;
  const relatedPosts = getRelatedBlogPosts(post, 3);
  const featuredIndustry = getIndustryLinks(1)[0];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es',
    mainEntityOfPage: `${siteConfig.seo.siteUrl}${pagePath}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.companyName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.companyName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}/LOGO-captiva.png`,
      },
    },
    image: `${siteConfig.seo.siteUrl}${post.ogImage}`,
    keywords: post.tags.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Captiva',
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.seo.siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteConfig.seo.siteUrl}${pagePath}`,
      },
    ],
  };

  useDocumentMetadata({
    title: `${post.title} | ${siteConfig.productName}`,
    description: post.description,
    path: pagePath,
    ogType: 'article',
    image: post.ogImage,
    keywords: post.tags,
    structuredData: [articleSchema, breadcrumbSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <div className="blog-post-layout">
          <article className="blog-post-article">
            <div className="blog-post-article__topbar">
              <Link className="blog-post-article__back" to="/blog">
                ← Volver al blog
              </Link>
              <p className="section-heading__eyebrow">{siteConfig.pages.blog.postEyebrow}</p>
            </div>
            <h1>{post.title}</h1>
            <p className="blog-post-article__meta">
              <span>{formatPostDate(post.date)}</span>
              <span>{post.readingTime} min lectura</span>
            </p>
            <p className="blog-post-article__description">{post.description}</p>
            <div className="blog-post-content" data-blog-post-content="true" dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
          </article>

          <aside className="blog-post-sidebar" aria-label={siteConfig.pages.blog.sidebarAriaLabel}>
            <SurfaceCard>
              <h2>{siteConfig.pages.blog.sidebarDemosTitle}</h2>
              <p>{siteConfig.pages.blog.sidebarDemosDescription}</p>
              <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                {blogCta.primary}
              </Link>
            </SurfaceCard>

            <SurfaceCard>
              <h2>{siteConfig.pages.blog.sidebarCtaTitle}</h2>
              <p>{siteConfig.pages.blog.sidebarCtaDescription}</p>
              <PrimaryCTA
                label={blogCta.secondary ?? siteConfig.pages.blog.sidebarCtaButtonLabel}
                mode="lead-form"
                leadFormId={`lead-form-blog-${post.slug}`}
                source="blog-post"
                context={post.slug}
                variant="primary"
              />
            </SurfaceCard>

            <SurfaceCard>
              <h2>Ruta recomendada</h2>
              <p>Seguí este flujo para pasar de contenido a implementación comercial.</p>
              <div className="cta-row">
                <Link className="button-link button-link--secondary" to={siteConfig.routes.captivaDemos}>
                  {blogCta.primary}
                </Link>
                {featuredIndustry ? (
                  <Link className="button-link button-link--secondary" to={featuredIndustry.href}>
                    Ver landing por industria
                  </Link>
                ) : null}
                <PrimaryCTA
                  label={blogCta.secondary ?? 'Quiero mi landing'}
                  mode="lead-form"
                  leadFormId={`lead-form-blog-${post.slug}`}
                  source="blog-post"
                  context={`${post.slug}-sidebar-route`}
                  variant="primary"
                />
              </div>
            </SurfaceCard>

            {relatedPosts.length ? (
              <SurfaceCard>
                <h2>{siteConfig.pages.blog.relatedTitle}</h2>
                <ul className="blog-related-list">
                  {relatedPosts.map((item) => (
                    <li key={item.slug}>
                      <Link
                        className="text-link"
                        to={`/blog/${item.slug}`}
                        onClick={() => trackEvent({ event: 'internal_nav', category: 'blog-related', label: item.slug })}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>
            ) : null}

            <RelatedLinksSection title="Recursos relacionados" maxLinks={6} compact />
          </aside>
        </div>

        <LeadFormSection
          id={`lead-form-blog-${post.slug}`}
          source="blog-post"
          context={post.slug}
          title="Solicitar mi landing desde este articulo"
          description="Compartinos tu objetivo y abrimos WhatsApp con el resumen de este contexto para avanzar sin friccion."
        />
      </div>
    </section>
  );
}
