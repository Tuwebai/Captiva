export type BlogPostIndex = {
  title: string;
  description: string;
  slug: string;
  date: string;
  readingTime: number;
  tags: string[];
  excerpt: string;
  ogImage: string;
};

export type BlogPostContent = {
  slug: string;
  title: string;
  contentHtml: string;
  wordCount: number;
};

export type BlogPostManifestEntry = BlogPostIndex & {
  excerpt: string;
  body: string;
  contentHtml: string;
  wordCount: number;
};
