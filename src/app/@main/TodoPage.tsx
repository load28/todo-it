'use client';

import { dehydrate, HydrationBoundary, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos, Todo } from '@/api/todo';
import { Divider, Stack } from '@mantine/core';
import { TodoList } from '@/app/@main/TodoList';
import React, { useMemo } from 'react';
import { sortDate } from '@/utils/date';

export function TodoPage() {
  const client = useQueryClient();
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  const { todoMap, sortedDates } = useMemo(() => {
    const todoMap =
      todos?.reduce<Record<string, Todo[]>>((acc, todo) => {
        return {
          ...acc,
          [todo.date]: [...(acc[todo.date] || []), todo],
        };
      }, {}) || {};
    const dates = Object.keys(todoMap);
    const sortedDates = sortDate(dates, 'des');
    return { todoMap, sortedDates };
  }, [todos]);

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
        {sortedDates.map((date) => {
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
