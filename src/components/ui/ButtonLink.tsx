import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type ButtonLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary';
  }
>;

export function ButtonLink({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const classes = ['button-link', `button-link--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
