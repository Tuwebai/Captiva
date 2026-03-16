import blogIndex from '../../generated/blog-index.json';
import type { BlogPostIndex } from '../../types/blog';

export const blogPosts = blogIndex as BlogPostIndex[];

const topicMap = new Map<string, { slug: string; label: string; count: number }>();

blogPosts.forEach((post) => {
  post.tags.forEach((tag) => {
    const slug = tag
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const current = topicMap.get(slug);
    if (current) {
      current.count += 1;
      return;
    }

    topicMap.set(slug, {
      slug,
      label: tag,
      count: 1,
    });
  });
});

export const blogTopics = Array.from(topicMap.values()).sort((left, right) => left.label.localeCompare(right.label, 'es'));
