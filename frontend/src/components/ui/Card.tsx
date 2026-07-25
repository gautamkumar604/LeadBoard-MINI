import React from 'react';
import { cn } from '@/lib/utils';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6 transition duration-300 hover:border-slate-700/60 shadow-xl',
        className,
      )}
    >
      {children}
    </div>
  );
};
