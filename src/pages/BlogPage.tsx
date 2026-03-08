import { Link, Navigate, useParams } from 'react-router-dom';

import { LeadFormSection } from '../components/forms/LeadFormSection';
import { RelatedLinksSection } from '../components/seo/RelatedLinksSection';
import { SurfaceCard } from '../components/ui/SurfaceCard';
import { siteConfig } from '../config/site';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { trackEvent } from '../utils/analytics';
import { BLOG_POSTS_PER_PAGE, formatPostDate, getAllBlogTags, getBlogPosts, getPostsByTagSlug, slugifyTag } from '../utils/blog';

export function BlogPage() {
  const { page: pageParam, tag: tagParam } = useParams<{ page?: string; tag?: string }>();
  const allPosts = getBlogPosts();
  const allTags = getAllBlogTags();
  const activeTagSlug = tagParam?.trim().toLowerCase();
  const filteredPosts = activeTagSlug ? getPostsByTagSlug(activeTagSlug) : allPosts;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / BLOG_POSTS_PER_PAGE));
  const requestedPage = pageParam ? Number.parseInt(pageParam, 10) : 1;
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  if (currentPage > totalPages && filteredPosts.length > 0) {
    const target = activeTagSlug
      ? totalPages === 1
        ? `/blog/tag/${activeTagSlug}`
        : `/blog/tag/${activeTagSlug}/page/${totalPages}`
      : totalPages === 1
        ? '/blog'
        : `/blog/page/${totalPages}`;
    return <Navigate replace to={target} />;
  }

  if (activeTagSlug && filteredPosts.length === 0) {
    return <Navigate replace to="/blog" />;
  }

  const startIndex = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + BLOG_POSTS_PER_PAGE);
  const canonicalPath = activeTagSlug
    ? currentPage === 1
      ? `/blog/tag/${activeTagSlug}`
      : `/blog/tag/${activeTagSlug}/page/${currentPage}`
    : currentPage === 1
      ? '/blog'
      : `/blog/page/${currentPage}`;
  const prevPath =
    currentPage > 1
      ? activeTagSlug
        ? currentPage === 2
          ? `/blog/tag/${activeTagSlug}`
          : `/blog/tag/${activeTagSlug}/page/${currentPage - 1}`
        : currentPage === 2
          ? '/blog'
          : `/blog/page/${currentPage - 1}`
      : undefined;
  const nextPath =
    currentPage < totalPages
      ? activeTagSlug
        ? `/blog/tag/${activeTagSlug}/page/${currentPage + 1}`
        : `/blog/page/${currentPage + 1}`
      : undefined;
  const seoTitleSuffix = activeTagSlug ? ` - ${activeTagSlug}` : '';
  const seoPageSuffix = currentPage > 1 ? ` - Página ${currentPage}` : '';
  const activeTagLabel = allTags.find((tag) => tag.slug === activeTagSlug)?.label;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: siteConfig.pages.blog.title,
    description: activeTagLabel
      ? `${siteConfig.pages.blog.description} Filtrado por ${activeTagLabel}.`
      : siteConfig.pages.blog.description,
    url: `${siteConfig.seo.siteUrl}${canonicalPath}`,
    inLanguage: 'es',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: visiblePosts.map((post, index) => ({
        '@type': 'ListItem',
        position: startIndex + index + 1,
        url: `${siteConfig.seo.siteUrl}/blog/${post.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteConfig.productName,
        item: `${siteConfig.seo.siteUrl}${siteConfig.routes.captiva}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.seo.siteUrl}/blog`,
      },
      ...(activeTagLabel
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: activeTagLabel,
              item: `${siteConfig.seo.siteUrl}/blog/tag/${activeTagSlug}`,
            },
          ]
        : []),
    ],
  };

  useDocumentMetadata({
    title: `${siteConfig.pages.blog.seoTitle}${seoTitleSuffix}${seoPageSuffix} | ${siteConfig.companyName}`,
    description: siteConfig.pages.blog.seoDescription,
    path: canonicalPath,
    prevPath,
    nextPath,
    keywords: siteConfig.pages.blog.seoKeywords,
    structuredData: [collectionSchema, breadcrumbSchema],
  });

  return (
    <section className="content-section">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">{siteConfig.pages.blog.eyebrow}</p>
          <h1>{siteConfig.pages.blog.title}</h1>
          <p>{siteConfig.pages.blog.description}</p>
        </div>

        <RelatedLinksSection title="Recursos relacionados" maxLinks={6} />

        <div className="blog-tag-filters" aria-label="Filtrar por tag">
          <Link className={`template-filter-chip${!activeTagSlug ? ' template-filter-chip--active' : ''}`} to="/blog">
            Todos
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag.slug}
              className={`template-filter-chip${activeTagSlug === tag.slug ? ' template-filter-chip--active' : ''}`}
              to={`/blog/tag/${tag.slug}`}
            >
              {tag.label}
            </Link>
          ))}
        </div>

        <div className="card-grid card-grid--two blog-post-grid">
          {visiblePosts.map((post) => (
            <SurfaceCard key={post.slug} className="blog-post-card">
              <p className="blog-post-card__meta">
                <span>{formatPostDate(post.date)}</span>
                <span>{post.readingTime} min lectura</span>
              </p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="blog-post-card__tags">
                {post.tags.map((tag) => (
                  <Link key={`${post.slug}-${tag}`} className="blog-tag-chip" to={`/blog/tag/${slugifyTag(tag)}`}>
                    {tag}
                  </Link>
                ))}
              </div>
              <Link
                className="text-link"
                to={`/blog/${post.slug}`}
                onClick={() => trackEvent({ event: 'internal_nav', category: 'blog', label: post.slug })}
              >
                {siteConfig.pages.blog.readPostLabel}
              </Link>
            </SurfaceCard>
          ))}
        </div>

        {totalPages > 1 ? (
          <nav className="blog-pagination" aria-label="Paginación del blog">
            <Link
              className={`template-filter-chip${!prevPath ? ' is-disabled' : ''}`}
              to={prevPath ?? canonicalPath}
              aria-disabled={!prevPath}
              onClick={(event) => {
                if (!prevPath) event.preventDefault();
              }}
            >
              Previous
            </Link>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const path =
                activeTagSlug
                  ? pageNumber === 1
                    ? `/blog/tag/${activeTagSlug}`
                    : `/blog/tag/${activeTagSlug}/page/${pageNumber}`
                  : pageNumber === 1
                    ? '/blog'
                    : `/blog/page/${pageNumber}`;

              return (
                <Link
                  key={pageNumber}
                  className={`template-filter-chip${pageNumber === currentPage ? ' template-filter-chip--active' : ''}`}
                  to={path}
                >
                  {pageNumber}
                </Link>
              );
            })}
            <Link
              className={`template-filter-chip${!nextPath ? ' is-disabled' : ''}`}
              to={nextPath ?? canonicalPath}
              aria-disabled={!nextPath}
              onClick={(event) => {
                if (!nextPath) event.preventDefault();
              }}
            >
              Next
            </Link>
          </nav>
        ) : null}

        <LeadFormSection
          id="lead-form-blog-index"
          source="blog-index"
          context={activeTagSlug ? `blog-tag-${activeTagSlug}` : 'blog-index'}
          title="Quiero una landing para mi negocio"
          description="Completas estos datos y abrimos WhatsApp con un brief inicial para avanzar sin friccion."
        />
      </div>
    </section>
  );
}
