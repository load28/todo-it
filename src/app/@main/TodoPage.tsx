'use client';

import { dehydrate, HydrationBoundary, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos } from '@/api/todo';
import { Divider, Stack } from '@mantine/core';
import { TodoList } from '@/app/@main/TodoList';
import React, { useMemo } from 'react';
import { sortDate } from '@/core/utils/date';

export function TodoPage() {
  const client = useQueryClient();
  const { data: todoMap, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  const { sortedDates } = useMemo(() => {
    const dates = Object.keys(todoMap || {});
    const sortedDates = sortDate(dates, 'des');
    return { sortedDates };
  }, [todoMap]);

  const fetchData = async () => {
    await client.prefetchQuery({
      queryKey: ['todos'],
      queryFn: getTodos,
    });
    return dehydrate(client);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (sortedDates.length === 0) {
    return <div>Empty</div>;
  }

  return (
    <HydrationBoundary state={fetchData}>
      <Stack gap={32}>
        {todoMap &&
          sortedDates.map((date) => {
            return (
              <Stack key={date} gap={18}>
                <TodoList key={date} todos={todoMap[date]} date={date} />
                <Divider />
              </Stack>
            );
          })}
      </Stack>
    </HydrationBoundary>
  );
}
