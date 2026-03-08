import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from 'react';

import type { ResolvedTheme, ThemeMode } from '../../../types/theme';

const STORAGE_KEY = 'captiva:theme-mode';
const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)';

type ThemeContextValue = {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
};

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const persisted = window.localStorage.getItem(STORAGE_KEY);
  return isThemeMode(persisted) ? persisted : 'system';
}

const defaultThemeMode = getInitialThemeMode();

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultThemeMode);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(defaultThemeMode));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (themeMode !== 'system') {
      setResolvedTheme(themeMode);
      return;
    }

    const mediaQuery = window.matchMedia(SYSTEM_DARK_QUERY);
    const applySystemTheme = () => {
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    applySystemTheme();

    const listener: EventListener = () => applySystemTheme();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, [themeMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, themeMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      resolvedTheme,
      setThemeMode: setThemeModeState,
    }),
    [resolvedTheme, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
