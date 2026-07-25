import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
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
        {isMounted ? (
          <textarea
            ref={ref}
            data-lpignore="true"
            data-1p-ignore="true"
            className={cn(
              'w-full bg-slate-900/80 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-3 transition duration-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[120px] resize-y',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
              className,
            )}
            {...props}
          />
        ) : (
          <div
            className={cn(
              'w-full bg-slate-900/80 border border-slate-800 text-slate-100 text-sm rounded-xl px-4 py-3 min-h-[120px]',
              className,
            )}
          />
        )}
        {error && (
          <p className="text-xs font-medium text-rose-400 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
