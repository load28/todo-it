'use client';

import { TodoList } from '@/app/(with_frame)/main/TodoList';
import { sortDate } from '@/app/@core/utils/date';
import { Divider, Stack } from '@mantine/core';
import React, { useMemo } from 'react';
import { useTzContext } from '@/app/@core/providers/TimezoneProvider';
import { todoToMap, useTodoQuery } from '@/app/@core/query/todo-query';
import { useSessionQuery } from '@/app/@core/query/session-query';

export function Todo() {
  const tzCtx = useTzContext();
  const session = useSessionQuery();
  const { data, isLoading } = useTodoQuery(session.data.id);
  const todoMap = useMemo(() => todoToMap(tzCtx?.tz, data), [data, tzCtx?.tz]);
  const sortedDates = useMemo(() => sortDate(Object.keys(todoMap || {}), 'des'), [todoMap]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (sortedDates.length === 0) {
    return <div>Empty</div>;
  }

  return (
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
  );
}
