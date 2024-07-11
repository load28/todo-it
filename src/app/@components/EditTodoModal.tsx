import { Button, Modal, Stack } from '@mantine/core';
import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { PropsWithoutRef, useState } from 'react';

export function EditTodoModal({
  opened,
  open,
  close,
  date,
  todos,
}: PropsWithoutRef<{ opened: boolean; open: () => void; close: () => void; date: Date; todos: string[] }>) {
  const [value, setValue] = useState(date);
  const [editTodos, setTodos] = useState<string[]>([...todos]);

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
          <SaveTodo.Todos todos={editTodos} setTodos={setTodos} />
        </Stack>
        <Button mt={'md'} color="blue.5">
          Add
        </Button>
      </Stack>
    </Modal>
  );
}
