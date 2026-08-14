import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DifficultyLevel } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'easy' | 'medium' | 'hard' | 'custom' | 'orange';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className, ...props }) => {
  const base = 'inline-flex items-center gap-1 font-medium px-2.5 py-0.5 rounded-full text-xs';

  const variants = {
    default: 'bg-stone-100 text-stone-700 border border-stone-200',
    easy: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium',
    medium: 'bg-amber-50 text-amber-900 border border-amber-200/80 font-semibold',
    hard: 'bg-rose-50 text-rose-900 border border-rose-200/80 font-bold uppercase tracking-wider',
    custom: 'bg-orange-50 text-orange-800 border border-orange-200/80 font-semibold',
    orange: 'bg-orange-600 text-white font-semibold',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {variant === 'easy' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />}
      {variant === 'medium' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />}
      {variant === 'hard' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />}
      {children}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: DifficultyLevel | string }> = ({ difficulty }) => {
  const diffKey = (difficulty.toLowerCase() as 'easy' | 'medium' | 'hard') || 'easy';
  return <Badge variant={diffKey}>{difficulty}</Badge>;
};
