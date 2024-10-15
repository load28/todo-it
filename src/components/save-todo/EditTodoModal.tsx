'use client';

import { Todo, todoDateFormatter, TodoSaveParams } from '@/api/todo';
import { SaveTodo } from '@/components/save-todo/SaveTodo';
import { useSaveTodoDataContext } from '@/components/save-todo/SaveTodoData.context';
import { useModalControlContext } from '@/core/providers/ModalControl.context';
import { useSessionQuery } from '@/core/query/session-query';
import { useSaveTodoQuery } from '@/core/query/todo-query';
import { Button, Modal, Stack } from '@mantine/core';
import { PropsWithoutRef, useState } from 'react';

export function EditTodoModal({ todos }: PropsWithoutRef<{ todos: Todo[] }>) {
  const session = useSessionQuery();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [cacheTodos, setCacheTodos] = useState<Todo[]>(todos);
  const saveTodoMutation = useSaveTodoQuery(() => modalCtx?.close());

  const onSubmitHandler = async () => {
    const date = ctx?.date;
    if (!date) return;

    const trimmedTodos = cacheTodos.map((todo) => ({ ...todo, description: todo.description.trim() }));
    const todoParam: TodoSaveParams = {
      userId: session.data.id,
      date: todoDateFormatter(date),
      data: {
        create: trimmedTodos
          .filter((todo) => !todo.id)
          .map((todo) => {
            return {
              description: todo.description,
              isComplete: todo.isComplete,
              createdAt: todo.createdAt,
            };
          }),
        update: trimmedTodos
          .filter((todo) => todo.id)
          .map((todo) => {
            return {
              id: todo.id,
              description: todo.description,
              isComplete: todo.isComplete,
              createdAt: todo.createdAt,
            };
          }),
        delete: todos.filter((todo) => trimmedTodos.every((cacheTodo) => cacheTodo.id !== todo.id)).map((todo) => todo.id),
      },
    };

    saveTodoMutation.mutate(todoParam);
  };

  return (
    <>
      {ctx?.date && (
        <Modal
          opened={modalCtx?.opened || false}
          onClose={() => modalCtx?.close()}
          title="Edit todo"
          styles={{ title: { fontWeight: 700 } }}
        >
          <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
            <Stack gap={'xl'}>
              <SaveTodo.Date date={ctx.date} setDate={ctx.setDate} />
              <SaveTodo.Todos date={todoDateFormatter(ctx.date)} todos={cacheTodos} setTodos={setCacheTodos} />
            </Stack>
            <Button mt={'md'} color="blue.5" onClick={onSubmitHandler}>
              {saveTodoMutation.isPending ? 'Editing...' : 'Edit'}
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
