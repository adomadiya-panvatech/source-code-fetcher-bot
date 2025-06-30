
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: api.getAccounts,
  });
};

export const useAccount = (id: string) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => api.getAccount(id),
    enabled: !!id,
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts-stats'] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      api.updateAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      queryClient.invalidateQueries({ queryKey: ['accounts-stats'] });
    },
  });
};

export const useAccountStats = () => {
  return useQuery({
    queryKey: ['accounts-stats'],
    queryFn: api.getAccountStats,
  });
};
