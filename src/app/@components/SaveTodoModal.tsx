'use client';

import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { SaveTodoDataProvider } from '@/app/@components/save-todo/SaveTodoData.context';
import { useTodoMapQuery } from '@/app/@core/query/todo-query';
import { useSessionQuery } from '@/app/@core/query/session-query';
import { utcDayjs } from '@/app/@core/utils/date';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const session = useSessionQuery();
  const [cachedDate, setCachedDate] = useState<Date | null>(utcDayjs(date).toDate());
  const { data: todoMap } = useTodoMapQuery(session.data.id);
  const todos = useMemo(
    () => todoMap?.[utcDayjs(cachedDate).format('YYYY-MM-DD')]?.map((todo) => ({ data: todo.description, createAt: todo.createdAt })),
    [todoMap, cachedDate],
  );

  return (
    <SaveTodoDataProvider value={{ date: cachedDate, setDate: setCachedDate }}>
      {todos ? <EditTodoModal todos={todos} /> : <CreateTodoModal />}
    </SaveTodoDataProvider>
  );
}
