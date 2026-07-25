'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useLeads, useDashboardStats, useUpdateLeadStatus } from '@/hooks/useLeads';
import { Lead, LeadStatus } from '@/types/lead';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardCards } from '@/components/admin/DashboardCards';
import { LeadSearchFilter } from '@/components/admin/LeadSearchFilter';
import { LeadTable } from '@/components/admin/LeadTable';
import { LeadDetailModal } from '@/components/admin/LeadDetailModal';

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  // State management for query parameters
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Protected route guard check
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // TanStack Query custom hooks
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  const { data: leadsData, isLoading: isLeadsLoading } = useLeads({
    page,
    limit: 10,
    search: searchQuery,
    status: statusFilter,
  });

  const updateStatusMutation = useUpdateLeadStatus();

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to update lead status. Please try again.';
      toast.error('Update Failed', { description: errorMessage });
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Authenticating session...
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <AdminNavbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lead Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Monitor, search, and manage incoming lead acquisition pipelines in real-time.
            </p>
          </div>

          {/* Metric Overview Cards */}
          <div className="mb-8">
            <DashboardCards stats={statsData} isLoading={isStatsLoading} />
          </div>

          {/* Controls Bar: Search & Status Filters */}
          <LeadSearchFilter
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setPage(1); // Reset page on new search
            }}
            statusFilter={statusFilter}
            onStatusChange={(status) => {
              setStatusFilter(status);
              setPage(1); // Reset page on filter change
            }}
          />

          {/* Lead Table */}
          <LeadTable
            leads={leadsData?.leads || []}
            meta={leadsData?.meta}
            isLoading={isLeadsLoading}
            onStatusChange={handleStatusChange}
            isUpdatingStatus={updateStatusMutation.isPending}
            onViewDetails={(lead) => setSelectedLead(lead)}
            onPageChange={(newPage) => setPage(newPage)}
          />

          {/* Lead Details Modal */}
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        </main>
      </div>
    </div>
  );
}
