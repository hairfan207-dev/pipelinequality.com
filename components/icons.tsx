const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d='M5 12h14' />
      <path d='m13 6 6 6-6 6' />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d='M19 12H5' />
      <path d='m11 6-6 6 6 6' />
    </svg>
  );
}

export function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d='M12 5v14' />
      <path d='m6 13 6 6 6-6' />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d='m5 12.5 4.2 4.2L19 7' />
    </svg>
  );
}
