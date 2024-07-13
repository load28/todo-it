'use client';

import { PropsWithRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import { SaveTodoWrapperProvider } from '@/app/@components/save-todo/SaveTodoWrapper.context';
import { getTodos } from '@/api/todo';
import dayjs from 'dayjs';

export function SaveTodoModal({ opened, close, date }: PropsWithRef<{ opened: boolean; close: () => void; date: string }>) {
  const { data: todoMap } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const [cachedDate, setCachedDate] = useState<Date | null>(dayjs(date).utc().toDate());
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!todoMap || !cachedDate) {
      return;
    }

    const utcDate = cachedDate.toISOString();
    const todos = todoMap[utcDate];
    if (!todos) {
      setIsEdit(false);
      setTodos(Array.from({ length: 4 }, () => ''));
    } else {
      setIsEdit(true);
      setTodos(todos.map((todo) => todo.description));
    }
  }, [cachedDate, todoMap]);

  return (
    <SaveTodoWrapperProvider value={{ date: cachedDate, todos, setTodos, setDate: setCachedDate }}>
      {isEdit ? <EditTodoModal opened={opened} close={close} /> : <CreateTodoModal opened={opened} close={close} />}
    </SaveTodoWrapperProvider>
  );
}
