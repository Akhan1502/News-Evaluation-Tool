import { cn } from '../lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2',
          'transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-zinc-600',
          variant === 'default' && [
            'bg-zinc-900 text-white',
            'border border-zinc-700/50',
            'hover:bg-zinc-800'
          ],
          variant === 'outline' && [
            'border border-zinc-700',
            'bg-transparent',
            'hover:bg-zinc-800/50',
            'text-zinc-300'
          ],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
