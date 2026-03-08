type PanelToggleIconProps = {
  collapsed: boolean;
};

export function PanelToggleIcon({ collapsed }: PanelToggleIconProps) {
  return collapsed ? <PanelLeftCloseIcon /> : <PanelLeftIcon />;
}

function PanelLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m15 15-3-3 3-3" />
    </svg>
  );
}

function PanelLeftCloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="m12 15 3-3-3-3" />
    </svg>
  );
}
