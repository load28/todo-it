'use client';

import { useTzContext } from '@/app/@core/providers/Timezone.context';
import { TodoList } from '@/app/@main/TodoList';
import { getTodos } from '@/app/api/todo';
import { sortDate } from '@/core/date';
import { Divider, Stack } from '@mantine/core';
import { dehydrate, HydrationBoundary, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react';

export function TodoPage() {
  const tzCtx = useTzContext();
  const client = useQueryClient();
  const { data: todoMap, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos(tzCtx?.tz),
  });
  const { sortedDates } = useMemo(() => {
    const dates = Object.keys(todoMap || {});
    const sortedDates = sortDate(dates, 'des');
    return { sortedDates };
  }, [todoMap]);

  const fetchData = async () => {
    await client.prefetchQuery({
      queryKey: ['todos'],
      queryFn: getTodos(tzCtx?.tz),
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
