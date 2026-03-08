import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useTooltip } from './useTooltip';
import { useTooltipPortal } from './TooltipProvider';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text: string;
  position?: TooltipPosition;
  delay?: number;
  children: ReactNode;
};

type Coordinates = {
  top: number;
  left: number;
  finalPosition: TooltipPosition;
};

function computeCoordinates(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferredPosition: TooltipPosition,
): Coordinates {
  const gap = 8;
  const viewportPadding = 8;

  const positionCandidates: TooltipPosition[] =
    preferredPosition === 'top'
      ? ['top', 'bottom', 'right', 'left']
      : preferredPosition === 'bottom'
        ? ['bottom', 'top', 'right', 'left']
        : preferredPosition === 'left'
          ? ['left', 'right', 'top', 'bottom']
          : ['right', 'left', 'top', 'bottom'];

  const getPosition = (position: TooltipPosition) => {
    if (position === 'top') {
      return {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      };
    }
    if (position === 'bottom') {
      return {
        top: triggerRect.bottom + gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      };
    }
    if (position === 'left') {
      return {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.left - tooltipRect.width - gap,
      };
    }
    return {
      top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.right + gap,
    };
  };

  let finalPosition: TooltipPosition = preferredPosition;
  let coords = getPosition(preferredPosition);

  for (const candidate of positionCandidates) {
    const next = getPosition(candidate);
    const fitsVertically =
      next.top >= viewportPadding &&
      next.top + tooltipRect.height <= window.innerHeight - viewportPadding;
    const fitsHorizontally =
      next.left >= viewportPadding &&
      next.left + tooltipRect.width <= window.innerWidth - viewportPadding;

    if (fitsVertically && fitsHorizontally) {
      finalPosition = candidate;
      coords = next;
      break;
    }
  }

  const clampedTop = Math.min(
    Math.max(coords.top, viewportPadding),
    window.innerHeight - tooltipRect.height - viewportPadding,
  );
  const clampedLeft = Math.min(
    Math.max(coords.left, viewportPadding),
    window.innerWidth - tooltipRect.width - viewportPadding,
  );

  return { top: clampedTop, left: clampedLeft, finalPosition };
}

export function Tooltip({ text, position = 'top', delay = 120, children }: TooltipProps) {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { portalElement } = useTooltipPortal();
  const { isOpen, triggerProps } = useTooltip({ delay });
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setCoords(computeCoordinates(triggerRect, tooltipRect, position));
  }, [isOpen, position, text]);

  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      setCoords(computeCoordinates(triggerRect, tooltipRect, position));
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, position]);

  const onlyChild = Children.only(children) as ReactNode;

  let triggerNode: ReactNode;
  if (isValidElement(onlyChild) && typeof onlyChild.type === 'string') {
    const element = onlyChild as ReactElement<{
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      onFocus?: () => void;
      onBlur?: () => void;
      onClick?: () => void;
      ref?: (node: HTMLElement | null) => void;
      'aria-describedby'?: string;
    }>;

    triggerNode = cloneElement(element, {
      ...triggerProps,
      'aria-describedby': isOpen ? tooltipId : undefined,
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
      },
      onMouseEnter: () => {
        triggerProps.onMouseEnter();
        element.props.onMouseEnter?.();
      },
      onMouseLeave: () => {
        triggerProps.onMouseLeave();
        element.props.onMouseLeave?.();
      },
      onFocus: () => {
        triggerProps.onFocus();
        element.props.onFocus?.();
      },
      onBlur: () => {
        triggerProps.onBlur();
        element.props.onBlur?.();
      },
      onClick: () => {
        triggerProps.onClick();
        element.props.onClick?.();
      },
    });
  } else if (isValidElement(onlyChild)) {
    triggerNode = (
      <span
        ref={(node) => {
          triggerRef.current = node;
        }}
        aria-describedby={isOpen ? tooltipId : undefined}
        {...triggerProps}
      >
        {onlyChild}
      </span>
    );
  } else {
    triggerNode = (
      <span
        ref={(node) => {
          triggerRef.current = node;
        }}
        aria-describedby={isOpen ? tooltipId : undefined}
        {...triggerProps}
      >
        {children}
      </span>
    );
  }

  return (
    <>
      {triggerNode}
      {isOpen && portalElement && coords
        ? createPortal(
            <div
              id={tooltipId}
              ref={tooltipRef}
              role="tooltip"
              className={`captiva-tooltip captiva-tooltip--${coords.finalPosition}`}
              style={{ top: coords.top, left: coords.left }}
            >
              {text}
            </div>,
            portalElement,
          )
        : null}
    </>
  );
}
