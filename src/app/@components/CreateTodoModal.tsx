'use client';

import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { useModalControlContext } from '@/app/@core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSaveTodoDataContext } from '@/app/@components/save-todo/SaveTodoData.context';
import { TodoPostParams } from '@/app/api/todo/route';
import { useSessionQuery } from '@/app/@core/query/session-query';
import { utcDayjs } from '@/app/@core/utils/date';
import { TODOS_QUERY_KEY } from '../@core/query/todo-query';
import { useMutation } from '@tanstack/react-query';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const createTodoMutation = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoParam: TodoPostParams) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoParam),
      });

      if (response.status !== 200) {
        throw new Error('Failed to create todo');
      }

      modalCtx?.close();
      // TODO 서버 반환값을 넘김
      return todoParam;
    },
  });
  const [descriptions, setDescriptions] = useState<string[]>(Array.from({ length: 4 }, () => ''));

  const submitHandler = async () => {
    const date = ctx?.date;
    if (!(date && modalCtx)) {
      return;
    }

    const todoParam: TodoPostParams = {
      userId: session.data.id,
      date: utcDayjs(date).format('YYYY-MM-DD'),
      data: descriptions.filter((description) => !!description).map((description) => ({ description: description.trim(), isComplete: false })),
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
              Add
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};
