'use client';

import { Button, Modal, Stack } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useSessionQuery } from '@todo-it/core/query/session-query';
import { useSaveTodoDataContext } from '@todo-it/components/save-todo/SaveTodoData.context';
import { SaveTodo } from '@todo-it/components/save-todo/SaveTodo';
import { useModalControlContext } from '@todo-it/core/providers/ModalControl.context';
import { Todo, todoDateFormatter, TodoSaveParams } from '@todo-it/api/todo';
import { useSaveTodoQuery } from '@todo-it/core/query/todo-client-query';

export const CreateTodoModal = () => {
  const session = useSessionQuery();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [todos, setCacheTodos] = useState<Todo[]>([]);
  const saveTodoMutation = useSaveTodoQuery(() => modalCtx?.close());
  const submitValidation = useMemo(() => todos.some((todo) => !!todo.description), [todos]);

  const onSubmitHandler = async () => {
    const date = ctx?.date;
    if (!(date && submitValidation)) return;

    const todoParam: TodoSaveParams = {
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: {
        create: todos.map((todo) => ({ isComplete: false, createdAt: todo.createdAt, description: todo.description.trim() })),
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
