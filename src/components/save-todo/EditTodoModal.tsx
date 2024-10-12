'use client';

import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { PropsWithoutRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TodoMap, TODOS_QUERY_KEY } from '@/core/query/todo-query';
import { todoDateFormatter, Todo, TodoPostParams } from '@/api/todo';
import { getQueryClient } from '@/core/providers/query/query-utils';
import { useSessionQuery } from '@/core/query/session-query';

export function EditTodoModal({ todos }: PropsWithoutRef<{ todos: Todo[] }>) {
  const session = useSessionQuery();
  const queryClient = getQueryClient();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [cacheTodos, setCacheTodos] = useState<Todo[]>(todos);

  const updateTodoMutaion = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoParam: TodoPostParams) => {
      const responseBody = await fetch('/api/todo', { method: 'POST', body: JSON.stringify(todoParam) });
      const responseData: Todo[] = await responseBody.json();
      return { date: todoParam.date, todos: responseData };
    },
    onSuccess: ({ date, todos }: { date: string; todos: Todo[] }) => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!todoMap) return;

      queryClient.setQueryData([TODOS_QUERY_KEY], { ...todoMap, [date]: todos });
      modalCtx?.close();
    },
  });

  const submitHandler = async () => {
    const date = ctx?.date;
    if (!date) return;

    const todoParam: TodoPostParams = {
      mode: 'update',
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: cacheTodos.map((todo) => ({ ...todo, description: todo.description.trim() })),
    };

    updateTodoMutaion.mutate(todoParam);
  };

  return (
    <>
      {ctx?.date && (
        <Modal
          opened={modalCtx?.opened || false}
          onClose={() => modalCtx?.close()}
          title="Edit todo"
          styles={{ title: { fontWeight: 700 } }}
        >
          <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
            <Stack gap={'xl'}>
              <SaveTodo.Date date={ctx.date} setDate={ctx.setDate} />
              <SaveTodo.Todos date={todoDateFormatter(ctx.date)} todos={cacheTodos} setTodos={setCacheTodos} />
            </Stack>
            <Button mt={'md'} color="blue.5" onClick={submitHandler}>
              {updateTodoMutaion.isPaused ? 'Editing' : 'Edit'}
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
