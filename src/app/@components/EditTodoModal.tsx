'use client';

import { SaveTodo } from '@/app/@components/save-todo/SaveTodo';
import { useModalControlContext } from '@/app/@core/providers/ModalControl.context';
import { Button, Modal, Stack } from '@mantine/core';
import { useSaveTodoDataContext } from '@/app/@components/save-todo/SaveTodoData.context';
import { PropsWithoutRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoMap, TODOS_QUERY_KEY } from '@/app/@core/query/todo-query';
import { Todo } from '@/app/api/todo/route';

export function EditTodoModal({ todos }: PropsWithoutRef<{ todos: string[] }>) {
  const queryClient = useQueryClient();
  const ctx = useSaveTodoDataContext();
  const modalCtx = useModalControlContext();
  const [cacheTodos, setCacheTodos] = useState<string[]>(todos);

  const updateTodoMutaion = useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todos: Pick<Todo, 'id' | 'date' | 'description'>[]): Promise<TodoMap | undefined> => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!todoMap) return todoMap;

      // TODO 업데이트 api 호출
      const newTodoMap = { ...todoMap };
      todos.forEach((newTodo) => {
        const targetTodo = newTodoMap[newTodo.date]?.find((t) => t.id === newTodo.id);
        if (targetTodo) {
          targetTodo.description = newTodo.description;
        }
      });

      return newTodoMap;
    },
    onSuccess: (todoMap: TodoMap | undefined) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], todoMap);
    },
  });

  return (
    <>
      {ctx && (
        <Modal
          opened={modalCtx?.opened || false}
          onClose={() => {
            modalCtx?.close();
          }}
          title="Edit todo"
          styles={{
            title: {
              fontWeight: 700,
            },
          }}
        >
          <Stack pt={'md'} pb={'md'} pl={'sm'} pr={'sm'} gap={'xl'}>
            <Stack gap={'xl'}>
              <SaveTodo.Date date={ctx.date} setDate={ctx.setDate} />
              <SaveTodo.Todos todos={cacheTodos} setTodos={setCacheTodos} />
            </Stack>
            <Button mt={'md'} color="blue.5">
              Edit
            </Button>
          </Stack>
        </Modal>
      )}
    </>
  );
}
