type InfoTooltipProps = {
  text: string;
};

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <button className="info-tooltip-trigger" type="button" aria-label="Mostrar ayuda contextual" data-tooltip={text}>
      <span aria-hidden="true">i</span>
    </button>
  );
}
