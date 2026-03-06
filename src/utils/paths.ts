import { siteConfig } from '../config/site';

export function buildDemoPath(slug: string) {
  return `${siteConfig.routes.captivaDemos}/${slug}`;
}

export function buildDemoPublicPath(folderName: string) {
  return encodeURI(`${siteConfig.routes.demosPublicBase}/${folderName}/`);
}

export function buildDemoPreviewPath(folderName: string, previewImage: string) {
  return encodeURI(`${siteConfig.routes.demosPublicBase}/${folderName}/${previewImage}`);
}
