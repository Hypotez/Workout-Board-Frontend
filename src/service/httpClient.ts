import env from '@/config/env';
import { ErrorResponseSchema } from '@backend/schemas/shared/error';

export default async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${env.VITE_API_URL}${endpoint}`;
  const headers = new Headers(options.headers);

  if (options.body != undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    credentials: 'include',
    headers,
    ...options,
  });

  const contentType = response.headers.get('content-type');
  const json = contentType?.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    if (json) {
      const parsedError = ErrorResponseSchema.safeParse(json);
      if (parsedError.success) {
        throw new Error(parsedError.data.error);
      }
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }

  if (!json) {
    throw new Error('Expected JSON response but none received');
  }

  return json as T;
}
