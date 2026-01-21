import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/service/httpClient';
import { Layout } from '@/components/layout';
import { showError } from '@/lib/toast';

import type { ProtectedRouteProps } from '@/schemas/shared/auth';

export default function ProtectedRoute({ children, showLayout = true }: ProtectedRouteProps) {
  const navigate = useNavigate();

  const validateQuery = useQuery({
    queryKey: ['auth', 'validate'],
    queryFn: async (): Promise<void> => {
      return await httpClient('/v1/auth/validate', {
        method: 'GET',
      });
    },
  });

  useEffect(() => {
    if (validateQuery.isError) {
      showError('Session expired. Please log in again.');
      navigate('/login', { replace: true });
    }
  }, [validateQuery.isError, navigate]);

  if (validateQuery.isPending) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (validateQuery.isError) {
    return null;
  }

  if (showLayout) {
    return <Layout>{children}</Layout>;
  }

  return <>{children}</>;
}
