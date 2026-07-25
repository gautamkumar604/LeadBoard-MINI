'use client';

import React from 'react';
import { Lead, LeadStatus, PaginationMeta } from '@/types/lead';
import { StatusBadge } from '../ui/StatusBadge';
import { Skeleton } from '../ui/Skeleton';
import { formatDate } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Eye, Inbox, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface LeadTableProps {
  leads: Lead[];
  meta?: PaginationMeta;
  isLoading: boolean;
  onStatusChange: (id: string, newStatus: LeadStatus) => void;
  isUpdatingStatus?: boolean;
  onViewDetails: (lead: Lead) => void;
  onPageChange: (newPage: number) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  meta,
  isLoading,
  onStatusChange,
  isUpdatingStatus,
  onViewDetails,
  onPageChange,
}) => {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-800">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">No Lead Records Found</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
          No leads match your current filter or search criteria. Try clearing your search query or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Submitted Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-800/40 transition duration-150 group">
                <td className="py-4 px-6 font-semibold text-white">
                  {lead.name}
                </td>
                <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                  {lead.email}
                </td>
                <td className="py-4 px-6 text-slate-400 text-xs">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="py-4 px-6">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value as LeadStatus)}
                    disabled={isUpdatingStatus}
                    className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer hover:border-slate-600 transition"
                  >
                    <option value="NEW">🟢 New Lead</option>
                    <option value="CONTACTED">🟡 Contacted</option>
                    <option value="CLOSED">🟣 Closed</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(lead)}
                    leftIcon={<Eye className="w-4 h-4 text-indigo-400" />}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {meta && (
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-white">{((meta.page - 1) * meta.limit) + 1}</span> to{' '}
            <span className="font-semibold text-white">{Math.min(meta.page * meta.limit, meta.total)}</span> of{' '}
            <span className="font-semibold text-white">{meta.total}</span> leads
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!meta.hasPrevPage}
              onClick={() => onPageChange(meta.page - 1)}
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-semibold">
              Page {meta.page} of {meta.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange(meta.page + 1)}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
