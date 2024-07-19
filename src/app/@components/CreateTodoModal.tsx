'use client';

import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { useModalControlContext } from '@/app/@core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';

export const CreateTodoModal = () => {
  const modalCtx = useModalControlContext();

  return (
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
          <SaveTodo.Date />
          <SaveTodo.Todos />
        </Stack>
        <Button mt={'md'} color="blue.5">
          Add
        </Button>
      </Stack>
    </Modal>
  );
};
