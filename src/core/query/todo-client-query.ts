'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { omit } from 'es-toolkit';
import { getQueryClient } from '@todo-it/core/providers/query/query-utils';
import { Todo, TodoSaveParams } from '@todo-it/api/todo';
import { isErrorResponse } from '@todo-it/api/types';
import { saveTodoFetch, TodoMap, todoMapQueryOptions, TODOS_QUERY_KEY } from '@todo-it/core/query/todo-query';

export const useTodoMapQuery = (userId: string) => useQuery(todoMapQueryOptions(userId));
export const useSaveTodoQuery = (onSuccess?: () => void) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoSaveParams: TodoSaveParams) => {
      const responseData = await saveTodoFetch(todoSaveParams);
      // TODO 에러 핸들링을 해야함
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.error);
      }

      return { date: todoSaveParams.date, todos: responseData.data };
    },
    onSuccess: ({ date, todos }: { date: string; todos: Todo[] }) => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!todoMap) return;

      queryClient.setQueryData([TODOS_QUERY_KEY], { ...todoMap, [date]: todos });
      onSuccess?.();
    },
  });
};
export type TodoSaveParamsWithRequiredDelete = Omit<TodoSaveParams, 'data'> & {
  data: Omit<TodoSaveParams['data'], 'delete'> & {
    delete: NonNullable<TodoSaveParams['data']['delete']>;
  };
};
export const useRemoveTodoQuery = (onSuccess?: () => void) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoSaveParams: TodoSaveParamsWithRequiredDelete) => {
      const responseData = await saveTodoFetch(todoSaveParams);
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.error);
      }

      return todoSaveParams.date;
    },
    onSuccess: (date: string) => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!(todoMap && todoMap[date])) return;

      const deletedTodoMap = omit(todoMap, [date]);
      queryClient.setQueryData([TODOS_QUERY_KEY], deletedTodoMap);
      onSuccess?.();
    },
  });
};
/**
 * Custom hook to update the toggle state of a Todo item using optimistic updates
 *
 * Optimistic update approach:
 * 1. Immediately updates the UI in response to user action
 * 2. Saves the changes to the server in the background
 * 3. Rolls back to the previous state if an error occurs
 */

export type TodoToggleParams = Omit<TodoSaveParams, 'data'> & {
  data: Omit<TodoSaveParams['data'], 'delete'> & {
    update: NonNullable<TodoSaveParams['data']['update']>[number];
  };
};

export const useToggleTodoQuery = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoSaveParams: TodoSaveParams): Promise<{ date: string; result: Todo[] }> => {
      const responseData = await saveTodoFetch(todoSaveParams);
      if (isErrorResponse(responseData)) {
        throw new Error(responseData.error);
      }

      return { date: todoSaveParams.date, result: responseData.data };
    },
    onMutate: (todoSaveParams: TodoSaveParams) => {
      const date = todoSaveParams.date;
      const previousTodoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!(previousTodoMap && previousTodoMap[date] && todoSaveParams.data.update)) return;

      const newTodos: Todo[] = [...previousTodoMap[date]];
      const updatedTodos: Todo[] = todoSaveParams.data.update.map((update) => ({ ...update, date }));
      updatedTodos.forEach((updatedTodo) => {
        const index = newTodos.findIndex((todo) => todo.id === updatedTodo.id);
        if (index < 0) return;

        newTodos[index] = updatedTodo;
      });
      queryClient.setQueryData([TODOS_QUERY_KEY], { ...previousTodoMap, [date]: newTodos });

      return previousTodoMap;
    },
    onError: (error, _, context: TodoMap | undefined) => {
      if (!context) return;
      // TODO 에러를 캐치해서 sentry 같은 곳으로 보내거나, 사용자에게 알림을 띄워줄 수 있습니다.
      queryClient.setQueryData([TODOS_QUERY_KEY], context);
    },
  });
};
