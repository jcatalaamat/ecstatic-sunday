import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-white/10 text-[var(--foreground)]',
        variant === 'primary' && 'bg-[var(--color-orange)]/20 text-[var(--color-orange)]',
        variant === 'secondary' && 'bg-[var(--color-gold)]/20 text-[var(--color-gold)]',
        variant === 'accent' && 'bg-[var(--color-red)]/20 text-[var(--color-red)]',
        variant === 'outline' && 'border border-[var(--color-orange)]/30 text-[var(--color-orange)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
