import type { ButtonProps } from '@/types'
import { cn } from '@/lib/utils'

const variantClasses: Record<string, string> = {
  primary:
    'bg-gradient-to-br from-indigo-500 to-violet-600 text-white border-none hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-none',
  secondary:
    'bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none no-underline'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  download,
  external,
  disabled,
  children,
  icon,
  iconPosition = 'left',
  onClick,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {iconPosition === 'left' && icon}
        {children}
        {iconPosition === 'right' && icon}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      className={classes}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
