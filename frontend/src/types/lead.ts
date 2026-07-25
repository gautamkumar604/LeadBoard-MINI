export type { ApiResponse } from './api';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LeadQueryFilter {
  page?: number;
  limit?: number;
  search?: string;
  status?: LeadStatus | 'ALL';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
  conversionRate: number;
}
