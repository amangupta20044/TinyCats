import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[#FF7A00] text-white hover:bg-orange-600 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 border border-orange-500/20',
        secondary: 'bg-[#FFE4C4] text-amber-950 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300/40',
        accent: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/30',
        outline: 'border border-border bg-card text-foreground hover:bg-muted hover:text-foreground',
        ghost: 'hover:bg-muted text-foreground font-semibold',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20',
      },
      size: {
        sm: 'h-9 px-4 text-xs gap-1.5',
        md: 'h-11 px-5 text-sm gap-2',
        lg: 'h-13 px-7 text-base gap-2.5 rounded-2xl',
        icon: 'h-10 w-10 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
