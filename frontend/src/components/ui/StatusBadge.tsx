import React from 'react';
import { LeadStatus } from '@/types/lead';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const styles: Record<LeadStatus, string> = {
    NEW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    CONTACTED: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    CLOSED: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  };

  const labels: Record<LeadStatus, string> = {
    NEW: 'New Lead',
    CONTACTED: 'Contacted',
    CLOSED: 'Closed',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border',
        styles[status],
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {labels[status]}
    </span>
  );
};
