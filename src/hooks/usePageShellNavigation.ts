import { useEffect, useState } from 'react';

import type { RailItem } from '../components/layout/types';

type UsePageShellNavigationOptions = {
  isCaptivaHome: boolean;
  hash: string;
  railItems: RailItem[];
};

export function usePageShellNavigation({ isCaptivaHome, hash, railItems }: UsePageShellNavigationOptions) {
  const [activeSectionId, setActiveSectionId] = useState('');
  const [isNearTop, setIsNearTop] = useState(true);

  useEffect(() => {
    if (!isCaptivaHome) {
      setActiveSectionId('');
      return;
    }

    const anchorIds = railItems
      .filter((item) => item.type !== 'route')
      .map((item) => item.href.split('#')[1])
      .filter((value): value is string => Boolean(value));

    if (!anchorIds.length) return;

    const sections = anchorIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const computeActiveSection = () => {
      const activationOffset = Math.max(120, window.innerHeight * 0.22);
      let currentId = sections[0].id;

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top - activationOffset <= 0) {
          currentId = section.id;
        }
      });

      const scrollBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      if (documentBottom - scrollBottom <= 4) {
        currentId = sections.at(-1)?.id ?? currentId;
      }

      setActiveSectionId((previous) => (previous === currentId ? previous : currentId));
    };

    computeActiveSection();
    window.addEventListener('scroll', computeActiveSection, { passive: true });
    window.addEventListener('resize', computeActiveSection);
    return () => {
      window.removeEventListener('scroll', computeActiveSection);
      window.removeEventListener('resize', computeActiveSection);
    };
  }, [isCaptivaHome, railItems]);

  useEffect(() => {
    if (!isCaptivaHome) return;
    const hashId = hash.replace('#', '').trim();
    if (hashId) setActiveSectionId(hashId);
  }, [hash, isCaptivaHome]);

  useEffect(() => {
    if (!isCaptivaHome) {
      setIsNearTop(true);
      return;
    }

    const updateTopState = () => setIsNearTop(window.scrollY < 64);
    updateTopState();
    window.addEventListener('scroll', updateTopState, { passive: true });
    return () => window.removeEventListener('scroll', updateTopState);
  }, [isCaptivaHome]);

  const isAnchorActive = (href: string) => {
    if (!isCaptivaHome) return false;
    if (!hash && isNearTop) return false;
    const anchorId = href.split('#')[1];
    if (!anchorId) return false;
    return activeSectionId === anchorId;
  };

  const isHomeNavActive = isCaptivaHome && !hash && isNearTop;

  const handleAnchorSelect = (href: string) => {
    const anchorId = href.split('#')[1];
    if (anchorId) {
      setActiveSectionId(anchorId);
    }
  };

  return {
    handleAnchorSelect,
    isAnchorActive,
    isHomeNavActive,
  };
}
