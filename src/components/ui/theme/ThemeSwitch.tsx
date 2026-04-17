import { trackEvent } from '../../../utils/analytics';
import { useTheme } from './useTheme';
import '../../../styles/theme-switch.css';

type ThemeSwitchProps = {
  compact?: boolean;
  className?: string;
  source?: 'sidebar' | 'mobile';
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15.9 3.9a8.5 8.5 0 1 0 4.2 15.4 8.8 8.8 0 0 1-4.2-15.4Z" fill="none" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export function ThemeSwitch({ compact = false, className, source = 'sidebar' }: ThemeSwitchProps) {
  const { resolvedTheme, setThemeMode } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const currentLabel = isDark ? 'oscuro' : 'claro';
  const nextLabel = isDark ? 'claro' : 'oscuro';

  const toggleTheme = () => {
    const nextMode = isDark ? 'light' : 'dark';
    setThemeMode(nextMode);
    trackEvent({
      event: 'internal_nav',
      category: 'theme',
      label: `${source}-${nextMode}`,
    });
  };

  const switchNode = (
    <button
      type="button"
      className={`theme-switch${compact ? ' theme-switch--compact' : ''}${className ? ` ${className}` : ''}`}
      onClick={toggleTheme}
      aria-label={`Cambiar tema. Modo actual: ${currentLabel}. Activar modo ${nextLabel}.`}
      aria-pressed={isDark}
      data-tooltip="Cambiar tema"
    >
      <span className="theme-switch__track" aria-hidden="true">
        <span className="theme-switch__icon theme-switch__icon--sun">
          <SunIcon />
        </span>
        <span className="theme-switch__icon theme-switch__icon--moon">
          <MoonIcon />
        </span>
      </span>
      <span className="theme-switch__thumb" aria-hidden="true" />
    </button>
  );

  if (compact) return switchNode;

  return (
    <div className="theme-switch-wrap">
      <p className="theme-switch-wrap__title">Tema</p>
      <span className="theme-switch-wrap__state" aria-hidden="true">
        {isDark ? 'Oscuro' : 'Claro'}
      </span>
      {switchNode}
    </div>
  );
}
