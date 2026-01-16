import { ClickableCardList, type ClickableCardItem } from '@/components/clickableCardList';
import { useQuery } from '@tanstack/react-query';
import httpClient from '@/service/httpClient';
import type { GetRoutinesResponse } from '@backend/schemas/shared/hevy/routine';

export default function Routines() {
  const page = 1;
  const pageSize = 10;

  const routinesQuery = useQuery({
    queryKey: ['routines', page, pageSize],
    queryFn: async (): Promise<GetRoutinesResponse> => {
      const query = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      return await httpClient<GetRoutinesResponse>(`/v1/routines?${query.toString()}`, {
        method: 'GET',
      });
    },
    refetchOnMount: 'always',
  });

  const items: ClickableCardItem[] =
    routinesQuery.data?.routines.map((routine, index) => ({
      index,
      title: routine.title,
      description: `${routine.exercises.length} exercises`,
    })) ?? [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {routinesQuery.isPending && (
        <ClickableCardList items={[]} header="Routines" description="Loading…" />
      )}

      {routinesQuery.isError && (
        <ClickableCardList items={[]} header="Routines" description={routinesQuery.error.message} />
      )}

      {routinesQuery.isSuccess && (
        <ClickableCardList
          items={items}
          header="Routines"
          description="Click any"
          onItemClick={(item) => alert(`Clicked: ${item.title}`)}
        />
      )}
    </div>
  );
}
