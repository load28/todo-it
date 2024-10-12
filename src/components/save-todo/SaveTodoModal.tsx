'use client';

import { CreateTodoModal } from '@/components/save-todo/CreateTodoModal';
import { EditTodoModal } from '@/components/save-todo/EditTodoModal';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { SaveTodoDataProvider } from '@/components/save-todo/SaveTodoData.context';
import { useTodoMapQuery } from '@/core/query/todo-query';
import { useSessionQuery } from '@/core/query/session-query';
import { utcDayjs } from '@/core/utils/date';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const session = useSessionQuery();
  const [cachedDate, setCachedDate] = useState<Date | null>(utcDayjs(date).toDate());
  const { data: todoMap } = useTodoMapQuery(session.data.id);
  const todos = useMemo(
    () =>
      todoMap?.[utcDayjs(cachedDate).format('YYYY-MM-DD')]?.map((todo) => ({
        data: todo.description,
        createAt: todo.createdAt,
      })),
    [todoMap, cachedDate],
  );

  return (
    <SaveTodoDataProvider value={{ date: cachedDate, setDate: setCachedDate }}>
      {todos ? <EditTodoModal todos={todos} /> : <CreateTodoModal />}
    </SaveTodoDataProvider>
  );
}
