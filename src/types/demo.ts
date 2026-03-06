export type DemoManifestItem = {
  slug: string;
  folderName: string;
  publicSlug: string;
  title: string;
  description: string;
  category: string;
  preview: string | null;
  href: string;
};

export type DemoCategoryGroup = {
  slug: string;
  title: string;
  description: string;
  items: DemoManifestItem[];
};
