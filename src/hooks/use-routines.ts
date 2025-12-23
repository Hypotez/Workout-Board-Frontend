import { useState, useEffect } from 'react';
import httpClient from '@/service/httpClient';
import { type GetSettings } from '@/schemas/shared/settings';

export function useSettings() {
  const [settings, setSettings] = useState<GetSettings | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response: GetSettings | null = await httpClient('/v1/settings', {
          method: 'GET',
        });

        setSettings(response);
      } catch {
        setError('Failed to fetch settings');
      }
    })();
  }, []);
  return { settings, error };
}
