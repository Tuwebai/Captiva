import type { PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren<{
  isCaptivaContext: boolean;
  isRailCollapsed: boolean;
}>;

export function MainLayout({ children, isCaptivaContext, isRailCollapsed }: MainLayoutProps) {
  return (
    <main
      className={`site-main${isCaptivaContext ? ' site-main--with-rail' : ''}${
        isRailCollapsed ? ' site-main--rail-collapsed' : ''
      }`}
    >
      {children}
    </main>
  );
}
