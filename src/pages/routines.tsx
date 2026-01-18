import { ClickableCardList, type ClickableCardItem } from '@/components/clickableCardList';
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import httpClient from '@/service/httpClient';
import type { GetRoutinesResponse } from '@backend/schemas/shared/hevy/routine';

export default function Routines() {
  const pageSize = 10;

  const routinesQuery = useInfiniteQuery<
    GetRoutinesResponse,
    Error,
    InfiniteData<GetRoutinesResponse>,
    ['routines', number],
    number
  >({
    queryKey: ['routines', pageSize],
    queryFn: async ({ pageParam }): Promise<GetRoutinesResponse> => {
      const query = new URLSearchParams({
        page: String(pageParam),
        pageSize: String(pageSize),
      });
      return await httpClient<GetRoutinesResponse>(`/v1/routines?${query.toString()}`, {
        method: 'GET',
      });
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.page_count ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    retry: 3,
    refetchOnMount: 'always',
  });

  const items: ClickableCardItem[] =
    routinesQuery.data?.pages
      .flatMap((page) => page.routines)
      .map((routine, index) => ({
        index,
        title: routine.title,
        description: `${routine.exercises.length} exercises`,
      })) ?? [];

  const isFullyLoaded =
    routinesQuery.isSuccess &&
    !routinesQuery.hasNextPage &&
    !routinesQuery.isFetchingNextPage;

  const pagingFailed = routinesQuery.isFetchNextPageError;

  const isLoading =
    routinesQuery.isPending || (routinesQuery.isSuccess && !isFullyLoaded && !pagingFailed);

  const isError = routinesQuery.isError || pagingFailed;

  const errorMessage = routinesQuery.error?.message ?? 'Failed to load routines.';

  const listProps: {
    items: ClickableCardItem[];
    header: string;
    description: string;
    onItemClick?: (item: ClickableCardItem) => void;
  } = isError
    ? {
        items: [],
        header: 'Routines',
        description: errorMessage,
      }
    : isLoading
      ? {
          items: [],
          header: 'Routines',
          description: 'Loading…',
        }
      : {
          items,
          header: 'Routines',
          description: 'Click any',
          onItemClick: (item) => alert(`Clicked: ${item.title}`),
        };

  const shouldFetchNextPage =
    routinesQuery.hasNextPage &&
    !routinesQuery.isFetchingNextPage &&
    !routinesQuery.isFetchNextPageError;

  useEffect(() => {
    if (shouldFetchNextPage) {
      routinesQuery.fetchNextPage();
    }
  }, [shouldFetchNextPage, routinesQuery.fetchNextPage]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ClickableCardList {...listProps} />
    </div>
  );
}
