import type { CSSProperties, ReactNode } from 'react';

type FrameVariant = 'hero' | 'feature' | 'card';
type FrameOrientation = 'br' | 'bl';

type ImageFrameProps = {
  variant: FrameVariant;
  orientation?: FrameOrientation;
  precise?: boolean;
  reveal?: boolean;
  revealIndex?: number;
  className?: string;
  style?: CSSProperties;
  overlay?: ReactNode;
  children: ReactNode;
};

export function ImageFrame({
  variant,
  orientation = 'br',
  precise = false,
  reveal = false,
  revealIndex = 0,
  className,
  style,
  overlay,
  children,
}: ImageFrameProps) {
  const classes = ['img-frame', `img-frame--${variant}`, `img-frame--${orientation}`, precise ? 'img-frame--precise' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  const outlined = variant !== 'card';

  return (
    <div
      className={classes}
      data-reveal={reveal ? 'frame' : undefined}
      style={reveal ? ({ ...style, '--i': revealIndex } as CSSProperties) : style}
    >
      {outlined ? (
        <span className='img-frame__outline' aria-hidden='true'>
          <span className='img-frame__line img-frame__line--x' />
          <span className='img-frame__line img-frame__line--y' />
          {variant === 'hero' ? <span className='img-frame__line img-frame__line--tick' /> : null}
        </span>
      ) : null}
      <div className='img-frame__media'>{children}</div>
      {outlined ? <span className='img-frame__corner img-frame__corner--start' aria-hidden='true' /> : null}
      <span className='img-frame__corner img-frame__corner--end' aria-hidden='true' />
      {overlay}
    </div>
  );
}
