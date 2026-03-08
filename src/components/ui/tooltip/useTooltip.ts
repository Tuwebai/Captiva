import { useEffect, useRef, useState } from 'react';

type UseTooltipOptions = {
  delay?: number;
};

export function useTooltip({ delay = 120 }: UseTooltipOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const openTimerRef = useRef<number | null>(null);

  const clearOpenTimer = () => {
    if (openTimerRef.current == null) return;
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  };

  const show = () => {
    clearOpenTimer();
    openTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      openTimerRef.current = null;
    }, delay);
  };

  const hide = () => {
    clearOpenTimer();
    setIsOpen(false);
  };

  const toggle = () => {
    clearOpenTimer();
    setIsOpen((current) => !current);
  };

  useEffect(() => () => clearOpenTimer(), []);

  return {
    isOpen,
    show,
    hide,
    triggerProps: {
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      onClick: toggle,
    },
  };
}
