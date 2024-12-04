import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSavedSearches, createSavedSearch, deleteSavedSearch } from '../services/savedSearches';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export function useSavedSearches() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: savedSearches = [], isLoading, error } = useQuery({
    queryKey: ['savedSearches', user?.id],
    queryFn: () => fetchSavedSearches(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: createSavedSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedSearches', user?.id] });
      toast.success('Search saved successfully');
    },
    onError: () => {
      toast.error('Failed to save search');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavedSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedSearches', user?.id] });
      toast.success('Search deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete search');
    },
  });

  return {
    savedSearches,
    isLoading,
    error,
    createSavedSearch: createMutation.mutate,
    deleteSavedSearch: deleteMutation.mutate,
  };
}
