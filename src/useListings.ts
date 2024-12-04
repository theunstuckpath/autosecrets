import { useQuery } from '@tanstack/react-query';
import { fetchListings } from '../services/listings';
import { useStore } from '../store/useStore';

export function useListings() {
  const { filters } = useStore();

  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => fetchListings(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 2,
    onError: (error) => {
      console.error('Error fetching listings:', error);
    }
  });
}
