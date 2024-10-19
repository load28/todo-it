'use client';

import { PropsWithoutRef, useMemo, useState } from 'react';
import { useSessionQuery } from '@todo-it/core/query/session-query';
import { utcDayjs } from '@todo-it/core/utils/date';
import { useTodoMapQuery } from '@todo-it/core/query/todo-client-query';
import { todoDateFormatter } from '@todo-it/api/todo';
import { SaveTodoDataProvider } from '@todo-it/components/save-todo/SaveTodoData.context';
import { EditTodoModal } from '@todo-it/components/save-todo/EditTodoModal';
import { CreateTodoModal } from '@todo-it/components/save-todo/CreateTodoModal';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const session = useSessionQuery();
  const [cachedDate, setCachedDate] = useState<Date | null>(utcDayjs(date).toDate());
  const { data: todoMap } = useTodoMapQuery(session.data.id);
  const todos = useMemo(() => (cachedDate ? todoMap?.[todoDateFormatter(cachedDate)] : undefined), [todoMap, cachedDate]);

  return (
    <SaveTodoDataProvider value={{ date: cachedDate, setDate: setCachedDate }}>
      {todos ? <EditTodoModal todos={todos} /> : <CreateTodoModal />}
    </SaveTodoDataProvider>
  );
}
