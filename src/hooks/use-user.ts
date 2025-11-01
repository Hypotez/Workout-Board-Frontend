import httpClient from '@/service/httpClient';
import { useEffect, useState } from 'react';
import { type PublicUser } from '@/schemas/shared/user';

export function useUser() {
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response: PublicUser = await httpClient('/v1/user/me', {
          method: 'GET',
        });
        setUser(response);
      } catch {
        setUser(null);
      }
    })();
  }, []);
  return { user };
}
