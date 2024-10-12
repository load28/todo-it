'use client';

import { TodoList } from '@/app/(with_frame)/main/TodoList';
import { sortDate } from '@/core/utils/date';
import { Divider, Stack } from '@mantine/core';
import React, { useMemo } from 'react';
import { useTodoMapQuery } from '@/core/query/todo-query';
import { useSessionQuery } from '@/core/query/session-query';

export function Todo() {
  const session = useSessionQuery();
  const { data: todoMap, isLoading } = useTodoMapQuery(session.data.id);
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
          const todos = todoMap[date]?.sort((a, b) => a.createdAt - b.createdAt);
          if (!todos) return null;

          return (
            <Stack key={date} gap={18}>
              <TodoList todos={todos} date={date} />
              <Divider />
            </Stack>
          );
        })}
    </Stack>
  );
}
