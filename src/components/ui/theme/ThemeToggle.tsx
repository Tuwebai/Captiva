import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';

import type { ThemeMode } from '../../../types/theme';
import { trackEvent } from '../../../utils/analytics';
import { Tooltip } from '../tooltip/Tooltip';
import { useTheme } from './useTheme';

type ThemeToggleProps = {
  compact?: boolean;
  className?: string;
  source?: 'sidebar' | 'mobile';
};

type ThemeOption = {
  mode: ThemeMode;
  label: string;
  shortLabel: string;
  icon: 'light' | 'dark' | 'system';
};

const themeOptions: ThemeOption[] = [
  { mode: 'light', label: 'Light', shortLabel: '☀', icon: 'light' },
  { mode: 'dark', label: 'Dark', shortLabel: '🌙', icon: 'dark' },
  { mode: 'system', label: 'System', shortLabel: '🖥', icon: 'system' },
];

function ThemeGlyph({ icon }: { icon: ThemeOption['icon'] }) {
  if (icon === 'light') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2.75v2.5M12 18.75v2.5M2.75 12h2.5M18.75 12h2.5M5.3 5.3l1.78 1.78M16.92 16.92l1.78 1.78M18.7 5.3l-1.78 1.78M7.08 16.92l-1.78 1.78" />
      </svg>
    );
  }

  if (icon === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M15.85 3.95a8.4 8.4 0 1 0 4.2 15.35 8.7 8.7 0 0 1-4.2-15.35Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 19.5h7M10.5 16.5v3M13.5 16.5v3" />
    </svg>
  );
}

export function ThemeToggle({ compact = false, className, source = 'sidebar' }: ThemeToggleProps) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const systemLabel = useMemo(
    () => `System (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`,
    [resolvedTheme],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [isOpen]);

  const handleModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    trackEvent({
      event: 'internal_nav',
      category: 'theme',
      label: `${source}-${mode}`,
    });
    setIsOpen(false);
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    event.preventDefault();

    const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (index + delta + themeOptions.length) % themeOptions.length;
    const nextMode = themeOptions[nextIndex].mode;

    handleModeChange(nextMode);
  };

  if (compact) {
    const activeOption = themeOptions.find((item) => item.mode === themeMode) ?? themeOptions[2];

    return (
      <div ref={rootRef} className={`theme-toggle theme-toggle--compact${className ? ` ${className}` : ''}`}>
        <Tooltip text="Cambiar tema">
          <button
            type="button"
            className="theme-toggle__trigger"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label={`Cambiar tema. Actual: ${themeMode === 'system' ? systemLabel : activeOption.label}`}
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <ThemeGlyph icon={activeOption.icon} />
          </button>
        </Tooltip>

        {isOpen ? (
          <div className="theme-toggle__menu" role="menu" aria-label="Theme mode">
            {themeOptions.map((option) => {
              const isActive = option.mode === themeMode;
              const label = option.mode === 'system' ? systemLabel : option.label;

              return (
                <button
                  key={option.mode}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  className={`theme-toggle__menu-item${isActive ? ' is-active' : ''}`}
                  onClick={() => handleModeChange(option.mode)}
                >
                  <ThemeGlyph icon={option.icon} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`theme-toggle${className ? ` ${className}` : ''}`}>
      <p className="theme-toggle__title">Theme</p>
      <div className="theme-toggle__group" role="radiogroup" aria-label="Theme mode">
        {themeOptions.map((option) => {
          const isActive = option.mode === themeMode;
          const ariaLabel = option.mode === 'system' ? systemLabel : option.label;
          const optionIndex = themeOptions.findIndex((item) => item.mode === option.mode);

          return (
            <button
              key={option.mode}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={ariaLabel}
              className={`theme-toggle__option${isActive ? ' is-active' : ''}`}
              onClick={() => handleModeChange(option.mode)}
              onKeyDown={(event) => handleOptionKeyDown(event, optionIndex)}
            >
              <ThemeGlyph icon={option.icon} />
              <span>{option.mode === 'system' ? systemLabel : option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
