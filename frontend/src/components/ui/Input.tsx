import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 z-10">
              {leftIcon}
            </div>
          )}
          {isMounted ? (
            <input
              ref={ref}
              data-lpignore="true"
              data-1p-ignore="true"
              className={cn(
                'w-full bg-slate-900/80 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-2.5 transition duration-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
                leftIcon && 'pl-10',
                error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
                className,
              )}
              {...props}
            />
          ) : (
            <div
              className={cn(
                'w-full bg-slate-900/80 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-2.5 h-[42px]',
                leftIcon && 'pl-10',
                className,
              )}
            />
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-rose-400 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
