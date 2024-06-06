import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:ring-offset-zinc-950',
  {
    variants: {
      variant: {
        default:
          'bg-amber-400 text-zinc-900 hover:bg-amber-400/90 disabled:cursor-wait disabled:opacity-50',
        destructive: 'border border-red-500 text-red-500 hover:bg-red-500/10',
        outline: 'border border-zinc-500 bg-transparent hover:bg-amber-400/20',
        secondary: 'border border-tertiary bg-transparent hover:bg-tertiary/10',
        tertiary:
          'border border-secondary bg-transparent hover:bg-secondary/10 text-secondary',
        ghost: 'hover:text-zinc-50/80 text-zinc-50',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
