
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: api.getDashboardSummary,
  });
};

export const useConversionRate = () => {
  return useQuery({
    queryKey: ['conversion-rate'],
    queryFn: api.getConversionRate,
  });
};

export const useTopPerformers = () => {
  return useQuery({
    queryKey: ['top-performers'],
    queryFn: api.getTopPerformers,
  });
};

export const useMonthlyStats = () => {
  return useQuery({
    queryKey: ['monthly-stats'],
    queryFn: api.getMonthlyStats,
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: api.getRecentActivity,
  });
};
