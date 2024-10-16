'use client';

import { Todo, todoDateFormatter, TodoSaveParams } from '@/api/todo';
import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { useSessionQuery } from '@/core/query/session-query';
import { Button, Modal, Stack } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useSaveTodoQuery } from '@/core/query/todo-client-query';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [todos, setCacheTodos] = useState<Todo[]>([
    {
      id: '',
      description: '',
      isComplete: false,
      date: '',
      createdAt: Date.now(),
    },
  ]);
  const saveTodoMutation = useSaveTodoQuery(() => modalCtx?.close());
  const submitValidation = useMemo(() => todos.some((todo) => !!todo.description), [todos]);

  const onSubmitHandler = async () => {
    const date = ctx?.date;
    if (!(date && submitValidation)) return;

    const todoParam: TodoSaveParams = {
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: {
        create: todos
          .filter((todo) => !!todo.description)
          .map((todo) => ({ isComplete: false, createdAt: todo.createdAt, description: todo.description.trim() })),
      },
    };
    saveTodoMutation.mutate(todoParam);
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
            <Button mt={'md'} color="blue.5" onClick={onSubmitHandler} disabled={!submitValidation}>
              {saveTodoMutation.isPending ? 'Adding...' : 'Add'}
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};
