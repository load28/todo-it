'use client';

import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import { SaveTodoDataProvider } from '@/app/@components/save-todo/SaveTodoData.context';
import { useTzContext } from '@/app/@core/providers/Timezone.context';
import { getTodos } from '@/app/api/todo';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PropsWithoutRef, useEffect, useState } from 'react';

export function SaveTodoModal({ date }: PropsWithoutRef<{ date: string }>) {
  const tzCtx = useTzContext();
  const { data: todoMap } = useQuery({ queryKey: ['todos'], queryFn: getTodos(tzCtx?.tz) });
  const [cachedDate, setCachedDate] = useState<Date | null>(dayjs(date).toDate());
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!todoMap || !cachedDate) {
      return;
    }

    const todos = todoMap[dayjs(cachedDate).format('YYYY-MM-DD')];

    if (!todos) {
      setIsEdit(false);
      setTodos(Array.from({ length: 4 }, () => ''));
    } else {
      setIsEdit(true);
      setTodos(todos.map((todo) => todo.description));
    }
  }, [cachedDate, todoMap]);

  return (
    <SaveTodoDataProvider value={{ date: cachedDate, todos, setTodos, setDate: setCachedDate }}>
      {isEdit ? <EditTodoModal /> : <CreateTodoModal />}
    </SaveTodoDataProvider>
  );
}
