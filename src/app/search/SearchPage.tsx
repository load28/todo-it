'use client';

import { Input, Stack, Text } from '@mantine/core';
import { ChangeEvent, useMemo, useState } from 'react';
import { getTodos, Todo } from '@/api/todo';
import { useQuery } from '@tanstack/react-query';
import { SearchResult } from '@/app/search/SearchResult';
import { VIEW_STATUS, ViewStatus } from '@/types/view-status';

export function SearchPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const viewData: ViewStatus<Todo[]> = useMemo(() => {
    if (isLoading || !data) {
      return { status: VIEW_STATUS.LOADING };
    }

    if (!searchTerm) {
      return { status: VIEW_STATUS.IDLE };
    }

    const result = data.filter((todo) => todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return { status: VIEW_STATUS.SUCCESS, data: result };
  }, [isLoading, searchTerm, data]);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (viewData.status === VIEW_STATUS.LOADING) {
    return <div>Loading...</div>;
  }

  return (
    <Stack gap={48}>
      <Stack gap={12}>
        <Text size="xl" fw={700} c="gray.8">
          Search
        </Text>
        <Input autoFocus={true} onChange={handler} />
      </Stack>
      <Stack>
        {viewData.status === VIEW_STATUS.IDLE && data ? (
          <SearchResult todos={data} />
        ) : viewData.status === VIEW_STATUS.SUCCESS && viewData.data.length > 0 ? (
          <SearchResult todos={viewData.data} />
        ) : (
          <div>No results</div>
        )}
      </Stack>
    </Stack>
  );
}
