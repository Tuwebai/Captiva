import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { PrimaryCTA } from '../components/cta/PrimaryCTA';
import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import type { BlogPostContent } from '../types/blog';
import { trackEvent } from '../utils/analytics';
import { formatPostDate, getBlogPostBySlug, getRelatedBlogPosts } from '../utils/blog';

const blogContentModules = import.meta.glob('../content/blog-content/*.json');

export function BlogPostPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const [content, setContent] = useState<BlogPostContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!post) {
    return <Navigate replace to="/blog" />;
  }

  useEffect(() => {
    let isMounted = true;
    const modulePath = `../content/blog-content/${post.slug}.json`;
    const loader = blogContentModules[modulePath];

    if (!loader) {
      navigate('/blog', { replace: true });
      return;
    }

    setIsLoading(true);
    loader()
      .then((module) => {
        if (!isMounted) return;
        const data = (module as { default: BlogPostContent }).default;
        if (!data || data.slug !== post.slug) {
          navigate('/blog', { replace: true });
          return;
        }
        setContent(data);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        navigate('/blog', { replace: true });
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, post.slug]);

  const pagePath = `/blog/${post.slug}`;
  const relatedPosts = getRelatedBlogPosts(post, 3);

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
              <button
                className="blog-post-article__back"
                type="button"
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                    return;
                  }
                  navigate('/blog');
                }}
              >
                ← Volver atrás
              </button>
              <p className="section-heading__eyebrow">{siteConfig.pages.blog.postEyebrow}</p>
            </div>
            <h1>{post.title}</h1>
            <p className="blog-post-article__meta">
              <span>{formatPostDate(post.date)}</span>
              <span>{post.readingTime} min lectura</span>
            </p>
            <p className="blog-post-article__description">{post.description}</p>
            {isLoading ? (
              <div className="blog-post-content">
                <p>Cargando artículo...</p>
              </div>
            ) : (
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: content?.contentHtml ?? '' }}
              />
            )}
          </article>

          <aside className="blog-post-sidebar" aria-label={siteConfig.pages.blog.sidebarAriaLabel}>
            <SurfaceCard>
              <h2>{siteConfig.pages.blog.sidebarDemosTitle}</h2>
              <p>{siteConfig.pages.blog.sidebarDemosDescription}</p>
              <Link className="text-link" to={siteConfig.routes.captivaDemos}>
                {siteConfig.pages.blog.sidebarDemosLinkLabel}
              </Link>
            </SurfaceCard>

            <SurfaceCard>
              <h2>{siteConfig.pages.blog.sidebarCtaTitle}</h2>
              <p>{siteConfig.pages.blog.sidebarCtaDescription}</p>
              <PrimaryCTA
                label={siteConfig.pages.blog.sidebarCtaButtonLabel}
                mode="lead-form"
                leadFormId={`lead-form-blog-${post.slug}`}
                source="blog-post"
                context={post.slug}
                variant="primary"
              />
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

            <RelatedLinksSection title="Recursos relacionados" maxLinks={6} />
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
