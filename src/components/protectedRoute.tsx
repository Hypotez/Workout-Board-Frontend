import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '@/service/httpClient';
import { Layout } from '@/components/layout';

import type { ProtectedRouteProps } from '@/schemas/shared/auth';

export default function ProtectedRoute({ children, showLayout = true }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await httpClient('/v1/auth/validate', {
          method: 'GET',
        });
        setIsAuthenticated(true);
      } catch {
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    })();
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (showLayout) {
    return <Layout>{children}</Layout>;
  }

  return <>{children}</>;
}
