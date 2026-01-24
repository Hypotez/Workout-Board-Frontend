import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '@/components/navigation/back-link';
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/service/httpClient';
import { showError } from '@/lib/toast';
import type { GetRoutineResponse } from '@backend/schemas/shared/hevy/routine';

export default function RoutineDetail() {
  const { id } = useParams<{ id: string }>();

  const routineQuery = useQuery<GetRoutineResponse, Error>({
    queryKey: ['routines', id],
    queryFn: async (): Promise<GetRoutineResponse> => {
      return await httpClient<GetRoutineResponse>(`/v1/routines/${id}`, {
        method: 'GET',
      });
    },
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (routineQuery.isError) {
      showError(routineQuery.error?.message ?? 'Failed to load routine.');
    }
  }, [routineQuery.isError, routineQuery.error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="absolute left-6 top-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">
        {routineQuery.data?.routine.title ?? 'Routine'}
      </h1>
      {routineQuery.isLoading && <p className="text-muted-foreground">Loading…</p>}
      {routineQuery.isError && <p className="text-muted-foreground">Failed to load routine.</p>}
      {!routineQuery.isLoading && !routineQuery.isError && (
        <p className="text-muted-foreground">ID: {id}</p>
      )}
    </div>
  );
}
