import { Button, Modal, Stack } from '@mantine/core';
import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { PropsWithoutRef, useState } from 'react';

export function CreateTodoModal({ opened, open, close }: PropsWithoutRef<{ opened: boolean; open: () => void; close: () => void }>) {
  const [value, setValue] = useState(new Date());
  const [todos, setTodos] = useState<string[]>(Array.from({ length: 4 }, () => ''));

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        setTodos(Array.from({ length: 4 }, () => ''));
      }}
      title="Create todo it"
      styles={{
        title: {
          fontWeight: 700,
        },
      }}
    >
      <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
        <Stack gap={'xl'}>
          <SaveTodo.Date value={value} setDate={setValue} />
          <SaveTodo.Todos todos={todos} setTodos={setTodos} />
        </Stack>
        <Button mt={'md'} color="blue.5">
          Add
        </Button>
      </Stack>
    </Modal>
  );
}
