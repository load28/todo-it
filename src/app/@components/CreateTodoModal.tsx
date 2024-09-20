'use client';

import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { useModalControlContext } from '@/app/@core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useState } from 'react';
import { useSaveTodoDataContext } from '@/app/@components/save-todo/SaveTodoData.context';

export const CreateTodoModal = () => {
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));

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
              <SaveTodo.Todos todos={todos} setTodos={setTodos} />
            </Stack>
            <Button mt={'md'} color="blue.5">
              Add
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};
