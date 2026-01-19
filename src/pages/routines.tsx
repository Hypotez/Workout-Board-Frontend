import { ClickableCardList, type ClickableCardItem } from '@/components/clickableCardList';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import httpClient from '@/service/httpClient';
import type { GetRoutinesResponse } from '@backend/schemas/shared/hevy/routine';

export default function Routines() {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const routinesQuery = useQuery<GetRoutinesResponse, Error>({
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
    retry: 3,
    refetchOnMount: 'always',
    placeholderData: (previousData) => previousData,
  });

  const items: ClickableCardItem[] =
    routinesQuery.data?.routines.map((routine, index) => ({
      index,
      title: routine.title,
      description: `${routine.exercises.length} exercises`,
    })) ?? [];

  const isLoading = routinesQuery.isPending;

  const isError = routinesQuery.isError;

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

  const currentPage = routinesQuery.data?.page ?? page;
  const totalPages = routinesQuery.data?.page_count ?? 1;
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const isPaging = routinesQuery.isFetching;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
      <ClickableCardList {...listProps} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (canGoPrevious && !isPaging) {
                  setPage((prev) => Math.max(1, prev - 1));
                }
              }}
              className={!canGoPrevious || isPaging ? 'pointer-events-none opacity-50' : undefined}
              aria-disabled={!canGoPrevious || isPaging}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive onClick={(event) => event.preventDefault()}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <span className="px-2 text-sm text-muted-foreground">of {totalPages}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (canGoNext && !isPaging) {
                  setPage((prev) => Math.min(totalPages, prev + 1));
                }
              }}
              className={!canGoNext || isPaging ? 'pointer-events-none opacity-50' : undefined}
              aria-disabled={!canGoNext || isPaging}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
