'use client';

import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { useSessionQuery } from '@/core/query/session-query';
import { utcDayjs } from '@/core/utils/date';
import { TodoMap, TODOS_QUERY_KEY } from '@/core/query/todo-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, TodoPostParams } from '@/api/todo';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const queryClient = useQueryClient();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [descriptions, setDescriptions] = useState<{ data: string; createAt: number }[]>([
    {
      data: '',
      createAt: Date.now(),
    },
  ]);
  const createTodoMutation = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoParam: TodoPostParams) => {
      const responseBody = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoParam),
      });

      const responseData = await responseBody.json();
      return { date: todoParam.date, todos: responseData };
    },
    onSuccess: ({ date, todos }: { date: string; todos: Todo[] }) => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!todoMap) return;

      queryClient.setQueryData([TODOS_QUERY_KEY], {
        ...todoMap,
        [date]: todos,
      });

      modalCtx?.close();
    },
  });

  const submitHandler = async () => {
    const date = ctx?.date;
    if (!(date && modalCtx)) {
      return;
    }

    const todoParam: TodoPostParams = {
      mode: 'create',
      userId: session.data.id,
      date: utcDayjs(date).format('YYYY-MM-DD'),
      data: descriptions
        .filter((description) => !!description)
        .map((description) => ({
          description: description.data.trim(),
          isComplete: false,
          createdAt: description.createAt,
        })),
    };
    createTodoMutation.mutate(todoParam);
  };

  return (
    <>
      {ctx && (
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
              <SaveTodo.Todos todos={descriptions} setTodos={setDescriptions} />
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
