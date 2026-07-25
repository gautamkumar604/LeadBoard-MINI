import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadService } from '@/services/lead.service';
import { CreateLeadInput } from '@/schemas/lead.schema';
import { LeadQueryFilter, LeadStatus } from '@/types/lead';

export const useLeads = (filters: LeadQueryFilter) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadService.getLeads(filters),
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => leadService.getDashboardStats(),
    refetchInterval: 30000, // Refresh stats every 30 seconds
  });
};

export const useSubmitLead = () => {
  return useMutation({
    mutationFn: (input: CreateLeadInput) => leadService.submitLead(input),
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      leadService.updateStatus(id, status),
    onSuccess: () => {
      // Invalidate both leads list and dashboard stats cache for instant sync
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};
