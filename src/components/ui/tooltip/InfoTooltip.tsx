type InfoTooltipProps = {
  text: string;
};

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <button className="info-tooltip-trigger" type="button" aria-label="Mas informacion" data-tooltip={text}>
      <span aria-hidden="true">i</span>
    </button>
  );
}
