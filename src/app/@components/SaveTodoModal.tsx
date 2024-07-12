'use client';

import { PropsWithRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CreateTodoModal } from '@/app/@components/CreateTodoModal';
import { EditTodoModal } from '@/app/@components/EditTodoModal';
import { SaveTodoWrapperProvider } from '@/app/@components/save-todo/SaveTodoWrapper.context';
import { getTodos } from '@/api/todo';
import { utcDayjs } from '@/core/utils/date';

export function SaveTodoModal({ opened, close }: PropsWithRef<{ opened: boolean; close: () => void }>) {
  const { data: todoMap } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  const [date, setDate] = useState<Date | null>(new Date());
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!todoMap || !date) {
      return;
    }

    const utcDate = utcDayjs(date.toDateString()).utc().format('YYYY-MM-DD');
    const todos = todoMap[utcDate];
    if (!todos) {
      setIsEdit(false);
      setTodos(Array.from({ length: 4 }, () => ''));
    } else {
      setIsEdit(true);
      setTodos(todos.map((todo) => todo.description));
    }
  }, [date, todoMap]);

  return (
    <SaveTodoWrapperProvider value={{ date, todos, setTodos, setDate }}>
      {isEdit ? <EditTodoModal opened={opened} close={close} /> : <CreateTodoModal opened={opened} close={close} />}
    </SaveTodoWrapperProvider>
  );
}
