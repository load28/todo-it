'use client';

import { Divider, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { useSessionQuery } from '@todo-it/core/query/session-query';
import { useTodoMapQuery } from '@todo-it/core/query/todo-client-query';
import { sortDate } from '@todo-it/core/utils/date';
import { TodoList } from '@todo-it/app/(with_frame)/main/TodoList';

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
