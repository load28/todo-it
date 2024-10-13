'use client';

import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { PropsWithoutRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TodoMap, TODOS_QUERY_KEY } from '@/core/query/todo-query';
import { todoDateFormatter, Todo, TodoSaveParams } from '@/api/todo';
import { getQueryClient } from '@/core/providers/query/query-utils';
import { useSessionQuery } from '@/core/query/session-query';

export function EditTodoModal({ todos }: PropsWithoutRef<{ todos: Todo[] }>) {
  const session = useSessionQuery();
  const queryClient = getQueryClient();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [cacheTodos, setCacheTodos] = useState<Todo[]>(todos);

  // TODO: 생성/수정/삭제를 하는 mutation hook을 하나 만들어야함
  const updateTodoMutaion = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoSaveParam: TodoSaveParams) => {
      const responseBody = await fetch('/api/todo', { method: 'POST', body: JSON.stringify(todoSaveParam) });
      const responseData: Todo[] = await responseBody.json();
      return { date: todoSaveParam.date, todos: responseData };
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

    const trimmedTodos = cacheTodos.map((todo) => ({ ...todo, description: todo.description.trim() }));
    const todoParam: TodoSaveParams = {
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: {
        create: trimmedTodos
          .filter((todo) => !todo.id)
          .map((todo) => {
            return {
              description: todo.description,
              isComplete: todo.isComplete,
              createdAt: todo.createdAt,
            };
          }),
        update: trimmedTodos
          .filter((todo) => todo.id)
          .map((todo) => {
            return {
              id: todo.id,
              description: todo.description,
              isComplete: todo.isComplete,
              createdAt: todo.createdAt,
            };
          }),
        delete: todos.filter((todo) => trimmedTodos.every((cacheTodo) => cacheTodo.id !== todo.id)).map((todo) => todo.id),
      },
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
