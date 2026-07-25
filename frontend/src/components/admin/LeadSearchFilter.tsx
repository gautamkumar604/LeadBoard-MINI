import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { LeadStatus } from '@/types/lead';
import { cn } from '@/lib/utils';

interface LeadSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: LeadStatus | 'ALL';
  onStatusChange: (status: LeadStatus | 'ALL') => void;
}

export const LeadSearchFilter: React.FC<LeadSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  const tabs: { label: string; value: LeadStatus | 'ALL' }[] = [
    { label: 'All Leads', value: 'ALL' },
    { label: 'New', value: 'NEW' },
    { label: 'Contacted', value: 'CONTACTED' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-card p-4 rounded-2xl mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by lead name or email..."
          className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-xl pl-10 pr-9 py-2 transition placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onStatusChange(tab.value)}
            className={cn(
              'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition duration-200 whitespace-nowrap',
              statusFilter === tab.value
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
