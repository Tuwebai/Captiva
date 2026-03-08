import type { ReactElement } from 'react';

type FeatureIconName =
  | 'home'
  | 'how'
  | 'problem'
  | 'solution'
  | 'benefits'
  | 'demos'
  | 'blog'
  | 'industries'
  | 'process'
  | 'contact-nav'
  | 'inbox'
  | 'page'
  | 'clarity'
  | 'signal'
  | 'social'
  | 'missing'
  | 'loss'
  | 'conversion'
  | 'structure'
  | 'contact'
  | 'design'
  | 'analysis'
  | 'build'
  | 'launch'
  | 'ready';

type FeatureIconProps = {
  name: FeatureIconName;
};

const iconMap: Record<FeatureIconName, ReactElement> = {
  home: (
    <>
      <path d="m4.5 10.5 7.5-6 7.5 6" />
      <path d="M6.75 9.75v8.5a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5v-8.5" />
    </>
  ),
  how: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8.5v3.5l2.5 2.5" />
    </>
  ),
  problem: (
    <>
      <path d="M12 4.5 3.75 18h16.5L12 4.5Z" />
      <path d="M12 9.25v4.25" />
      <circle cx="12" cy="16.25" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  solution: (
    <>
      <path d="m6.75 12.25 3.25 3.25 7.25-7.25" />
      <circle cx="12" cy="12" r="8" />
    </>
  ),
  benefits: (
    <>
      <path d="M12 4.5v15" />
      <path d="M5.25 12h13.5" />
      <path d="M8.25 8.25h7.5v7.5h-7.5Z" />
    </>
  ),
  demos: (
    <>
      <rect x="4.5" y="5.25" width="15" height="13.5" rx="1.5" />
      <path d="M8 9.5h8" />
      <path d="M8 12.25h8" />
      <path d="M8 15h5" />
    </>
  ),
  blog: (
    <>
      <path d="M6.25 4.5h7l4.5 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-10a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M13.25 4.5V9h4.5" />
      <path d="M8 12h8" />
      <path d="M8 15h5.5" />
    </>
  ),
  industries: (
    <>
      <rect x="4.5" y="4.5" width="6" height="6" rx="1" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1" />
      <rect x="13.5" y="13.5" width="6" height="6" rx="1" />
    </>
  ),
  process: (
    <>
      <path d="M5.5 8.25h5" />
      <path d="M13.5 8.25h5" />
      <path d="m8.5 11 3.5 3 3.5-3" />
      <path d="M12 14v5" />
    </>
  ),
  'contact-nav': (
    <>
      <rect x="3.75" y="6" width="16.5" height="12" rx="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.75 9.75h4.5l1.5 2.25h4.5l1.5-2.25h4.5" />
      <path d="M5.25 5.25h13.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Z" />
    </>
  ),
  page: (
    <>
      <path d="M8.25 3.75h6l4.5 4.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M14.25 3.75v4.5h4.5" />
      <path d="M9.75 12h4.5" />
      <path d="M9.75 15.75h6" />
    </>
  ),
  clarity: (
    <>
      <path d="m12 3.75 7.5 4.5v7.5l-7.5 4.5-7.5-4.5v-7.5l7.5-4.5Z" />
      <path d="m4.5 8.25 7.5 4.5 7.5-4.5" />
      <path d="M12 12.75v7.5" />
    </>
  ),
  signal: (
    <>
      <path d="M4.5 16.5a10.5 10.5 0 0 1 15 0" />
      <path d="M7.5 13.5a6.5 6.5 0 0 1 9 0" />
      <path d="M10.5 10.5a2.5 2.5 0 0 1 3 0" />
      <circle cx="12" cy="17.25" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  social: (
    <>
      <circle cx="8" cy="8.25" r="2.25" />
      <circle cx="16.5" cy="9.75" r="1.75" />
      <path d="M4.75 18.5a4 4 0 0 1 4-4h1.5a4 4 0 0 1 4 4" />
      <path d="M14 18.5v-.5a3 3 0 0 1 3-3h.5a3 3 0 0 1 3 3v.5" />
    </>
  ),
  missing: (
    <>
      <path d="M8.25 4.75h7.5A1.5 1.5 0 0 1 17.25 6.25v11.5a1.5 1.5 0 0 1-1.5 1.5h-7.5a1.5 1.5 0 0 1-1.5-1.5V6.25a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M9.75 8.75h4.5" />
      <path d="M9.75 12.25h4.5" />
      <path d="m7.5 16.5 9-9" />
    </>
  ),
  loss: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 15.5 7-7" />
      <path d="M15.5 15.5h-7v-7" />
    </>
  ),
  conversion: (
    <>
      <path d="M5.25 12h13.5" />
      <path d="m14.25 8.25 3.75 3.75-3.75 3.75" />
      <path d="m9.75 15.75-3.75-3.75 3.75-3.75" />
    </>
  ),
  structure: (
    <>
      <rect x="4.5" y="4.5" width="5.25" height="5.25" rx="1" />
      <rect x="14.25" y="4.5" width="5.25" height="5.25" rx="1" />
      <rect x="4.5" y="14.25" width="5.25" height="5.25" rx="1" />
      <rect x="14.25" y="14.25" width="5.25" height="5.25" rx="1" />
    </>
  ),
  contact: (
    <>
      <rect x="3.75" y="6" width="16.5" height="12" rx="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </>
  ),
  design: (
    <>
      <path d="M12 4.5a7.5 7.5 0 1 0 7.5 7.5c0-.69-.56-1.25-1.25-1.25H15.5a1.5 1.5 0 0 1-1.5-1.5V6.5A2 2 0 0 0 12 4.5Z" />
      <circle cx="8" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10.75" cy="15.75" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  analysis: (
    <>
      <path d="M5.25 18.75h13.5" />
      <path d="M7.5 16.5v-5.25" />
      <path d="M12 16.5v-8.25" />
      <path d="M16.5 16.5V10.5" />
    </>
  ),
  build: (
    <>
      <path d="m14.25 5.25 4.5 4.5" />
      <path d="m6 18 3.25-.75 8.75-8.75-2.5-2.5-8.75 8.75L6 18Z" />
    </>
  ),
  launch: (
    <>
      <path d="M12 13.5 18.5 5.75" />
      <path d="m14.25 5.25 4.5.5-.5 4.5" />
      <path d="M10.5 9.75A5.75 5.75 0 1 0 14.25 15" />
    </>
  ),
  ready: (
    <>
      <path d="m7.5 12.25 3 3 6-7" />
      <path d="M12 4.5 5.25 7.5v4.5c0 4.08 2.85 7.46 6.75 8.25 3.9-.79 6.75-4.17 6.75-8.25V7.5L12 4.5Z" />
    </>
  ),
};

export function FeatureIcon({ name }: FeatureIconProps) {
  return (
    <span className={`feature-icon feature-icon--${name}`} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {iconMap[name]}
      </svg>
    </span>
  );
}
