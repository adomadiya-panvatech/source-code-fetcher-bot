
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useOpportunities = () => {
  return useQuery({
    queryKey: ['opportunities'],
    queryFn: api.getOpportunities,
  });
};

export const useOpportunity = (id: string) => {
  return useQuery({
    queryKey: ['opportunities', id],
    queryFn: () => api.getOpportunity(id),
    enabled: !!id,
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createOpportunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['opportunities-stats'] });
    },
  });
};

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      api.updateOpportunity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};

export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteOpportunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['opportunities-stats'] });
    },
  });
};

export const useOpportunityStats = () => {
  return useQuery({
    queryKey: ['opportunities-stats'],
    queryFn: api.getOpportunityStats,
  });
};
