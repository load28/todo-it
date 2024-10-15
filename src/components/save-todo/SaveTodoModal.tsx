'use client';

import { CreateTodoModal } from '@/components/save-todo/CreateTodoModal';
import { EditTodoModal } from '@/components/save-todo/EditTodoModal';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { SaveTodoDataProvider } from '@/components/save-todo/SaveTodoData.context';
import { useSessionQuery } from '@/core/query/session-query';
import { utcDayjs } from '@/core/utils/date';
import { todoDateFormatter } from '@/api/todo';
import { useTodoMapQuery } from '@/core/query/todo-client-query';

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
