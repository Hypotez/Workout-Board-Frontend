import httpClient from '@/service/httpClient';
import { useQuery } from '@tanstack/react-query';
import { type PublicUser } from '@backend/schemas/shared/user';

export function useUser() {
  const userQuery = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async (): Promise<PublicUser | null> => {
      try {
        const response: PublicUser = await httpClient('/v1/user/me', {
          method: 'GET',
        });
        return response;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  return { user: userQuery.data, isLoading: userQuery.isPending };
}
