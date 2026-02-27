'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  href: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-medium tracking-wide
  rounded-lg
  transition-all duration-300 ease-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]
  disabled:opacity-50 disabled:cursor-not-allowed
  transform hover:scale-[1.02] active:scale-[0.98]
  cursor-pointer
`;

const variants = {
  primary: `
    bg-[var(--color-orange)] text-white
    hover:bg-[var(--color-orange-dark)]
    focus-visible:ring-[var(--color-orange)]
    shadow-md hover:shadow-[var(--glow-md)]
  `,
  secondary: `
    bg-[var(--color-gold)] text-[var(--color-black)]
    hover:bg-[var(--color-gold-dark)]
    focus-visible:ring-[var(--color-gold)]
    shadow-md hover:shadow-[var(--glow-gold)]
  `,
  outline: `
    border-2 border-[var(--color-orange)] text-[var(--color-orange)]
    hover:bg-[var(--color-orange)] hover:text-white
    focus-visible:ring-[var(--color-orange)]
  `,
  ghost: `
    text-[var(--color-cream)]
    hover:bg-white/10
    focus-visible:ring-[var(--color-orange)]
  `,
  accent: `
    bg-[var(--color-red)] text-white
    hover:bg-[#E64345]
    focus-visible:ring-[var(--color-red)]
    shadow-md hover:shadow-lg
  `,
  gradient: `
    bg-gradient-to-r from-[var(--color-orange)] via-[var(--color-red)] to-[var(--color-amber)]
    text-white font-semibold
    hover:brightness-110
    focus-visible:ring-[var(--color-orange)]
    shadow-md hover:shadow-[var(--glow-lg)]
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    ...rest
  } = props;

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  if ('href' in props && props.href) {
    const { disabled, href, ...linkRest } = rest as ButtonAsLink & { href: string };
    return (
      <Link
        href={props.href}
        className={cn(combinedClassName, disabled && 'opacity-50 pointer-events-none')}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      ref={ref}
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...buttonRest}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
