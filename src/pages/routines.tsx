import { ClickableCardList, type ClickableCardItem } from '@/components/clickableCardList';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import httpClient from '@/service/httpClient';
import type { GetRoutinesResponse } from '@backend/schemas/shared/hevy/routine';
import { showError } from '@/lib/toast';

export default function Routines() {
  const pageSize = 1;
  const skeletonCount = 4;

  const [page, setPage] = useState(1);
  const navigate = useNavigate();

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
    }
  });

  const items: ClickableCardItem[] =
    routinesQuery.data?.routines.map((routine) => ({
      id: routine.id,
      title: routine.title,
      description: `${routine.exercises.length} exercises`,
    })) ?? [];

  const isLoading = routinesQuery.isPending;

  const isError = routinesQuery.isError;

  const errorMessage = routinesQuery.error?.message ?? 'Failed to load routines.';

  useEffect(() => {
    if (isError) {
      showError(errorMessage);
    }
  }, [isError, errorMessage]);

  const listProps: {
    items: ClickableCardItem[];
    header: string;
    description: string;
    onItemClick?: (item: ClickableCardItem) => void;
  } | null = isError ? null
    : {
      items,
      header: 'Routines',
      description: 'Click any',
      onItemClick: (item) => {
        navigate(`${ROUTES.routineDetail.path.replace(':id', item.id)}`);
      },
    };

  const currentPage = routinesQuery.data?.page ?? page;
  const totalPages = routinesQuery.data?.page_count ?? 1;
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const isPaging = routinesQuery.isFetching;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
      {isLoading ? (
        <>
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: skeletonCount }).map((_, index) => (
                <div
                  key={`routine-skeleton-${index}`}
                  className="w-full p-4 rounded-lg border"
                >
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-1/3" />
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-10 rounded-md" />
            <Skeleton className="h-5 w-12 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </>
      ) : (
        <>
          {listProps ? <ClickableCardList {...listProps} /> : null}
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
                  } }
                  className={!canGoPrevious || isPaging ? 'pointer-events-none opacity-50' : undefined}
                  aria-disabled={!canGoPrevious || isPaging} />
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
                  } }
                  className={!canGoNext || isPaging ? 'pointer-events-none opacity-50' : undefined}
                  aria-disabled={!canGoNext || isPaging} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
      </div>
  );
}