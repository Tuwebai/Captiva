import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import './tooltip.css';

type TooltipContextValue = {
  portalElement: HTMLElement | null;
};

const TooltipContext = createContext<TooltipContextValue>({ portalElement: null });

export function TooltipProvider({ children }: PropsWithChildren) {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const existing = document.getElementById('captiva-tooltip-root');
    if (existing) {
      setPortalElement(existing);
      return;
    }

    const element = document.createElement('div');
    element.id = 'captiva-tooltip-root';
    document.body.appendChild(element);
    setPortalElement(element);
  }, []);

  const value = useMemo<TooltipContextValue>(() => ({ portalElement }), [portalElement]);
  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export function useTooltipPortal() {
  return useContext(TooltipContext);
}
