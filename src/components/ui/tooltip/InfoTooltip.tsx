import { Tooltip } from './Tooltip';

type InfoTooltipProps = {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
};

export function InfoTooltip({ text, position = 'top', delay = 120 }: InfoTooltipProps) {
  return (
    <Tooltip text={text} position={position} delay={delay}>
      <button className="info-tooltip-trigger" type="button" aria-label="Mas informacion">
        <span aria-hidden="true">i</span>
      </button>
    </Tooltip>
  );
}
