'use client';

import { Button, Modal, Stack } from '@mantine/core';
import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { PropsWithoutRef } from 'react';

export const CreateTodoModal = ({ opened, close }: PropsWithoutRef<{ opened: boolean; close: () => void }>) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
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
