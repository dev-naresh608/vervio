import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow active:scale-[0.98]',
    secondary: 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 active:scale-[0.98]',
    outline: 'bg-transparent border border-stone-300 hover:border-orange-500 text-stone-700 hover:text-orange-600 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-stone-100 text-stone-600 hover:text-stone-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  return (
    <button
    className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
    disabled={disabled}
    {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
