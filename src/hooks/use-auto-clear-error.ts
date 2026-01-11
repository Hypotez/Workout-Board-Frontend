import { useEffect } from 'react';

export function useAutoClearError(
  error: string,
  setError: (error: string) => void,
  delay: number = 4000
) {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [error, setError, delay]);
}
