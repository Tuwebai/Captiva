export type DemoManifestItem = {
  slug: string;
  folderName?: string;
  publicSlug?: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  goal?: string;
  template?: string;
  variant?: string;
  tier?: string;
  style?: string;
  tags?: string[];
  sections?: string[];
  status?: string;
  preview: string | null;
  href: string;
};

export type DemoCategoryGroup = {
  slug: string;
  title: string;
  description: string;
  items: DemoManifestItem[];
};
