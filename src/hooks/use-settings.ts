import { useQuery } from '@tanstack/react-query';
import httpClient from '@/service/httpClient';
import { type Settings } from '@backend/schemas/shared/settings';

export function useSettings() {
  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: async (): Promise<Settings | null> => {
      return await httpClient('/v1/settings', {
        method: 'GET',
      });
    },
    retry: false,
  });

  return {
    settings: settingsQuery.data,
    error: settingsQuery.isError ? 'Failed to fetch settings' : null,
    isLoading: settingsQuery.isPending,
  };
}
