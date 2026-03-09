const TOOLTIP_ID = 'global-tooltip';
const VIEWPORT_PADDING = 8;
const TOOLTIP_GAP = 10;

function getTooltipTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>('[data-tooltip]');
}

function getTooltipText(target: HTMLElement | null): string {
  if (!target) return '';
  return target.getAttribute('data-tooltip')?.trim() ?? '';
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isTooltipTargetStillInteractive(target: HTMLElement | null): boolean {
  if (!target || !target.isConnected) return false;
  const activeElement = document.activeElement;
  return target.matches(':hover') || target === activeElement || target.contains(activeElement);
}

function positionTooltip(tooltip: HTMLElement, target: HTMLElement, pointerX?: number): void {
  const rect = target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const maxLeft = window.innerWidth - tooltipRect.width - VIEWPORT_PADDING;
  const centerX = pointerX ?? rect.left + rect.width / 2;
  const left = clamp(centerX - tooltipRect.width / 2, VIEWPORT_PADDING, maxLeft);

  let top = rect.top - tooltipRect.height - TOOLTIP_GAP;
  if (top < VIEWPORT_PADDING) {
    top = rect.bottom + TOOLTIP_GAP;
  }

  const maxTop = window.innerHeight - tooltipRect.height - VIEWPORT_PADDING;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${clamp(top, VIEWPORT_PADDING, maxTop)}px`;
}

export function initTooltipSystem(): () => void {
  if (typeof document === 'undefined') return () => {};

  const tooltip = document.getElementById(TOOLTIP_ID);
  if (!(tooltip instanceof HTMLElement)) return () => {};

  let activeTarget: HTMLElement | null = null;
  let pointerX: number | undefined;

  const hideTooltip = () => {
    if (activeTarget?.getAttribute('aria-describedby') === TOOLTIP_ID) {
      activeTarget.removeAttribute('aria-describedby');
    }

    tooltip.textContent = '';
    tooltip.removeAttribute('data-visible');
    tooltip.setAttribute('aria-hidden', 'true');
    activeTarget = null;
    pointerX = undefined;
  };

  const syncTooltipState = () => {
    if (!activeTarget) return;
    if (!isTooltipTargetStillInteractive(activeTarget)) {
      hideTooltip();
      return;
    }

    positionTooltip(tooltip, activeTarget, pointerX);
  };

  const showTooltip = (target: HTMLElement, nextPointerX?: number) => {
    const text = getTooltipText(target);
    if (!text) {
      hideTooltip();
      return;
    }

    if (activeTarget && activeTarget !== target && activeTarget.getAttribute('aria-describedby') === TOOLTIP_ID) {
      activeTarget.removeAttribute('aria-describedby');
    }

    activeTarget = target;
    pointerX = nextPointerX;
    tooltip.textContent = text;
    tooltip.setAttribute('data-visible', 'true');
    tooltip.setAttribute('aria-hidden', 'false');
    target.setAttribute('aria-describedby', TOOLTIP_ID);
    positionTooltip(tooltip, target, pointerX);
  };

  const handleMouseOver = (event: MouseEvent) => {
    const target = getTooltipTarget(event.target);
    if (!target) return;

    if (target === activeTarget) {
      pointerX = event.clientX;
      positionTooltip(tooltip, target, pointerX);
      return;
    }

    showTooltip(target, event.clientX);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!activeTarget) return;
    pointerX = event.clientX;
    positionTooltip(tooltip, activeTarget, pointerX);
  };

  const handleMouseOut = (event: MouseEvent) => {
    if (!activeTarget) return;
    const leavingTarget = getTooltipTarget(event.target);
    if (leavingTarget !== activeTarget) return;

    const nextTarget = getTooltipTarget(event.relatedTarget);
    if (nextTarget && nextTarget !== activeTarget) {
      showTooltip(nextTarget);
      return;
    }

    if (!nextTarget) hideTooltip();
  };

  const handleFocusIn = (event: FocusEvent) => {
    const target = getTooltipTarget(event.target);
    if (!target) return;
    showTooltip(target);
  };

  const handleFocusOut = (event: FocusEvent) => {
    if (!activeTarget) return;
    const currentTarget = getTooltipTarget(event.target);
    if (currentTarget !== activeTarget) return;

    const nextTarget = getTooltipTarget(event.relatedTarget);
    if (nextTarget && nextTarget !== activeTarget) {
      showTooltip(nextTarget);
      return;
    }

    if (!nextTarget) hideTooltip();
  };

  const handleViewportChange = () => {
    syncTooltipState();
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      hideTooltip();
      return;
    }

    window.requestAnimationFrame(syncTooltipState);
  };

  const handleWindowBlur = () => {
    hideTooltip();
  };

  const handleWindowFocus = () => {
    window.requestAnimationFrame(syncTooltipState);
  };

  const handlePointerDown = () => {
    hideTooltip();
  };

  const handleDocumentLeave = () => {
    hideTooltip();
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') hideTooltip();
  };

  document.addEventListener('mouseover', handleMouseOver, true);
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('mouseout', handleMouseOut, true);
  document.addEventListener('focusin', handleFocusIn, true);
  document.addEventListener('focusout', handleFocusOut, true);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('keydown', handleEscape, true);
  document.addEventListener('mouseleave', handleDocumentLeave, true);
  window.addEventListener('scroll', handleViewportChange, true);
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('blur', handleWindowBlur);
  window.addEventListener('focus', handleWindowFocus);

  return () => {
    hideTooltip();
    document.removeEventListener('mouseover', handleMouseOver, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('mouseout', handleMouseOut, true);
    document.removeEventListener('focusin', handleFocusIn, true);
    document.removeEventListener('focusout', handleFocusOut, true);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    document.removeEventListener('pointerdown', handlePointerDown, true);
    document.removeEventListener('keydown', handleEscape, true);
    document.removeEventListener('mouseleave', handleDocumentLeave, true);
    window.removeEventListener('scroll', handleViewportChange, true);
    window.removeEventListener('resize', handleViewportChange);
    window.removeEventListener('blur', handleWindowBlur);
    window.removeEventListener('focus', handleWindowFocus);
  };
}
