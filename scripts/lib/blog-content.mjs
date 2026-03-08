import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import YAML from 'yaml';

const REQUIRED_FIELDS = ['title', 'description', 'slug', 'date', 'readingTime', 'tags'];

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractFrontmatterAst(source, filepath) {
  const tree = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']).parse(source);
  let parsed = null;

  visit(tree, 'yaml', (node) => {
    if (parsed) return;
    parsed = YAML.parse(node.value ?? '');
  });

  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Missing or invalid frontmatter in ${filepath}`);
  }

  return parsed;
}

function sanitizeUrl(url) {
  if (url.startsWith('/') || url.startsWith('#')) {
    return url;
  }

  try {
    const parsed = new URL(url, 'https://example.com');
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url;
    }
  } catch {
    return '#';
  }

  return '#';
}

function fixMojibake(text) {
  return String(text)
    .replace(/â€¦/g, '…')
    .replace(/â€™/g, '’')
    .replace(/â€œ/g, '“')
    .replace(/â€/g, '”');
}

function normalizeText(text) {
  return fixMojibake(String(text)).normalize('NFC');
}

function validateBlogMetadata(input, filepath) {
  REQUIRED_FIELDS.forEach((field) => {
    if (input[field] === undefined || input[field] === null) {
      throw new Error(`Missing required frontmatter field "${field}" in ${filepath}`);
    }
  });

  if (typeof input.title !== 'string' || !input.title.trim()) {
    throw new Error(`Invalid "title" in ${filepath}: must be non-empty string`);
  }
  if (typeof input.slug !== 'string' || !input.slug.trim()) {
    throw new Error(`Invalid "slug" in ${filepath}: must be non-empty string`);
  }
  if (typeof input.description !== 'string' || !input.description.trim()) {
    throw new Error(`Invalid "description" in ${filepath}: must be non-empty string`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(input.date))) {
    throw new Error(`Invalid "date" in ${filepath}: expected YYYY-MM-DD`);
  }
  const parsedDate = new Date(`${input.date}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid "date" in ${filepath}: must be a valid calendar date`);
  }
  if (!Number.isInteger(input.readingTime) || input.readingTime <= 0) {
    throw new Error(`Invalid "readingTime" in ${filepath}: must be positive integer`);
  }
  if (!Array.isArray(input.tags) || input.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
    throw new Error(`Invalid "tags" in ${filepath}: must be non-empty string array`);
  }

  const normalizedSlug = slugify(input.slug);
  if (!normalizedSlug || normalizedSlug !== input.slug) {
    throw new Error(`Slug must be kebab-case in ${filepath}. Expected "${normalizedSlug}"`);
  }

  return {
    title: normalizeText(input.title.trim()),
    slug: input.slug.trim(),
    description: normalizeText(input.description.trim()),
    date: input.date,
    readingTime: input.readingTime,
    tags: input.tags.map((tag) => normalizeText(tag.trim())),
  };
}

async function markdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(() => (tree) => {
      visit(tree, 'yaml', (node, index, parent) => {
        if (!parent || typeof index !== 'number') return;
        parent.children.splice(index, 1);
      });

      visit(tree, 'link', (node) => {
        node.url = sanitizeUrl(String(node.url ?? ''));
      });
    })
    .use(remarkRehype)
    .use(() => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName !== 'a') return;
        const rawHref = typeof node.properties?.href === 'string' ? node.properties.href : '#';
        const safeHref = sanitizeUrl(rawHref);
        node.properties = {
          ...(node.properties ?? {}),
          href: safeHref,
        };
        if (/^https?:\/\//i.test(safeHref)) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer';
        }
      });
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file).trim();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_#>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function loadBlogEntries(contentDir) {
  if (!existsSync(contentDir)) {
    return [];
  }

  const files = readdirSync(contentDir).filter((file) => extname(file).toLowerCase() === '.md');
  const slugs = new Set();
  const posts = files.map(async (file) => {
    const filepath = join(contentDir, file);
    const source = normalizeText(readFileSync(filepath, 'utf8'));
    const rawMeta = extractFrontmatterAst(source, filepath);
    const data = validateBlogMetadata(rawMeta, filepath);
    const slug = data.slug;

    if (slugs.has(slug)) {
      throw new Error(`Duplicate blog slug "${slug}" detected`);
    }
    slugs.add(slug);

    const cleanBody = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
    const plain = normalizeText(stripMarkdown(cleanBody));
    const excerpt = plain.slice(0, 210).trimEnd() + (plain.length > 210 ? '…' : '');
    const contentHtml = normalizeText(await markdownToHtml(cleanBody));

    return {
      title: data.title,
      description: data.description,
      slug,
      date: data.date,
      readingTime: data.readingTime,
      tags: data.tags,
      excerpt,
      body: cleanBody,
      contentHtml,
      wordCount: plain.split(' ').filter(Boolean).length,
    };
  });

  return Promise.all(posts).then((resolved) => resolved.sort((left, right) => right.date.localeCompare(left.date)));
}
