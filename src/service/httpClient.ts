import env from '@/config/env';
import { ApiResponseSchema } from '@/schemas/shared/api';

export default async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${env.VITE_API_URL}${endpoint}`;
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await response.json();
  const parsedJson = ApiResponseSchema.safeParse(json);

  if (!parsedJson.success) {
    throw new Error(parsedJson.error.message);
  }

  const parsedData = parsedJson.data;

  if (parsedData.status === 'error') {
    throw new Error(parsedData.error || 'Unknown API error');
  }

  return parsedData.data as T;
}
