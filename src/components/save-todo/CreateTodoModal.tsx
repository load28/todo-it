'use client';

import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { useSessionQuery } from '@/core/query/session-query';
import { TodoMap, TODOS_QUERY_KEY } from '@/core/query/todo-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoDateFormatter, Todo, TodoPostParams } from '@/api/todo';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const queryClient = useQueryClient();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [todos, setCacheTodos] = useState<Todo[]>([{ id: '', description: '', isComplete: false, date: '', createdAt: Date.now() }]);
  const createTodoMutation = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoParam: TodoPostParams) => {
      const responseBody = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoParam),
      });
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
      mode: 'create',
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: todos
        .filter((todo) => !!todo.description)
        .map((todo) => ({ isComplete: false, createdAt: todo.createdAt, description: todo.description.trim() })),
    };
    createTodoMutation.mutate(todoParam);
  };

  return (
    <>
      {ctx?.date && (
        <Modal
          opened={modalCtx?.opened || false}
          onClose={() => {
            modalCtx?.close();
          }}
          title="Create todo"
          styles={{
            title: {
              fontWeight: 700,
            },
          }}
        >
          <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
            <Stack gap={'xl'}>
              <SaveTodo.Date date={ctx.date} setDate={ctx.setDate} />
              <SaveTodo.Todos date={todoDateFormatter(ctx.date)} todos={todos} setTodos={setCacheTodos} />
            </Stack>
            <Button mt={'md'} color="blue.5" onClick={submitHandler}>
              {createTodoMutation.isPending ? 'Adding...' : 'Add'}
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};
