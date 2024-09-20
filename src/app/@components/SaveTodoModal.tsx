'use client';

import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import { useTzContext } from '@/app/@core/providers/Timezone.context';
import { getTodos } from '@/app/api/todo';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { SaveTodoDataProvider } from '@/app/@components/save-todo/SaveTodoData.context';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const tzCtx = useTzContext();
  const [cachedDate, setCachedDate] = useState<Date | null>(dayjs(date).toDate());
  const { data: todoMap } = useQuery({ queryKey: ['todos'], queryFn: getTodos(tzCtx?.tz) });
  const todos = useMemo(() => todoMap?.[dayjs(date).format('YYYY-MM-DD')]?.map((todo) => todo.description), [todoMap, date]);

  return (
    <>
      <SaveTodoDataProvider value={{ date: cachedDate, setDate: setCachedDate }}>
        {todos ? <EditTodoModal todos={todos} /> : <CreateTodoModal />}
      </SaveTodoDataProvider>
    </>
  );
}
