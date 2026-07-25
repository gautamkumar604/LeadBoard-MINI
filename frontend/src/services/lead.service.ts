import { apiClient } from '@/lib/api-client';
import { CreateLeadInput } from '@/schemas/lead.schema';
import {
  ApiResponse,
  DashboardStats,
  Lead,
  LeadQueryFilter,
  PaginationMeta,
} from '@/types/lead';

export interface PaginatedLeadsResponse {
  leads: Lead[];
  meta: PaginationMeta;
}

export const leadService = {
  async submitLead(input: CreateLeadInput): Promise<Lead> {
    const response = await apiClient.post<ApiResponse<Lead>>('/leads', input);
    return response.data.data;
  },

  async getLeads(filters: LeadQueryFilter): Promise<PaginatedLeadsResponse> {
    const params: Record<string, any> = {
      page: filters.page || 1,
      limit: filters.limit || 10,
    };

    if (filters.search && filters.search.trim() !== '') {
      params.search = filters.search.trim();
    }

    if (filters.status && filters.status !== 'ALL') {
      params.status = filters.status;
    }

    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    const response = await apiClient.get<ApiResponse<Lead[]>>('/admin/leads', {
      params,
    });

    return {
      leads: response.data.data,
      meta: (response.data as any).meta,
    };
  },

  async updateStatus(id: string, status: string): Promise<Lead> {
    const response = await apiClient.patch<ApiResponse<Lead>>(
      `/admin/leads/${id}/status`,
      { status },
    );
    return response.data.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      '/admin/dashboard',
    );
    return response.data.data;
  },
};
