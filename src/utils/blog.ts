import blogIndex from '../generated/blog-index.json';
import type { BlogPostIndex } from '../types/blog';

const posts = blogIndex as BlogPostIndex[];
export const BLOG_POSTS_PER_PAGE = 10;

export function slugifyTag(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getBlogPosts() {
  return [...posts].sort((left, right) => right.date.localeCompare(left.date));
}

export function getBlogPostBySlug(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPostIndex, limit = 3) {
  const scored = getBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return { candidate, sharedTags };
    })
    .sort((left, right) => right.sharedTags - left.sharedTags || right.candidate.date.localeCompare(left.candidate.date));

  return scored.slice(0, limit).map((entry) => entry.candidate);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
  }).format(new Date(`${date}T00:00:00`));
}

export function getAllBlogTags() {
  const seen = new Map<string, string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const slug = slugifyTag(tag);
      if (!seen.has(slug)) {
        seen.set(slug, tag);
      }
    });
  });
  return Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }));
}

export function getPostsByTagSlug(tagSlug: string) {
  return posts.filter((post) => post.tags.some((tag) => slugifyTag(tag) === tagSlug));
}
