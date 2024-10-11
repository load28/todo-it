'use client';

import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import dayjs from 'dayjs';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { SaveTodoDataProvider } from '@/app/@components/save-todo/SaveTodoData.context';
import { todoToMap, useTodoQuery } from '@/app/@core/query/todo-query';
import { useSessionQuery } from '@/app/@core/query/session-query';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const session = useSessionQuery();
  const [cachedDate, setCachedDate] = useState<Date | null>(dayjs(date).toDate());
  const { data } = useTodoQuery(session.data.id);
  const todoMap = useMemo(() => todoToMap(data), [data]);
  const todos = useMemo(() => todoMap?.[dayjs(cachedDate).format('YYYY-MM-DD')]?.map((todo) => todo.description), [todoMap, cachedDate]);

  return (
    <SaveTodoDataProvider value={{ date: cachedDate, setDate: setCachedDate }}>
      {todos ? <EditTodoModal todos={todos} /> : <CreateTodoModal />}
    </SaveTodoDataProvider>
  );
}
