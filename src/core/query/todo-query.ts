import { Todo, TodoSaveParams } from '@/api/todo';
import { QueryClient, queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { getQueryClient } from '../providers/query/query-utils';

export const TODOS_QUERY_KEY = 'todos';
export type TodoMap = Record<string, Todo[] | undefined>;
const todoMapQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async (): Promise<TodoMap> => {
      const responseBody = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo?userId=${userId}`);
      const data = await responseBody.json();
      return todoToMap(data);
    },
  });

export const useTodoMapQuery = (userId: string) => useQuery(todoMapQueryOptions(userId));
export const todoMapQueryPrefetch = async (queryClient: QueryClient, userId: string) =>
  await queryClient.prefetchQuery(todoMapQueryOptions(userId));

export const useSaveTodoQuery = (onSuccess?: () => void) => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoParam: TodoSaveParams) => {
      const responseBody = await fetch('/api/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoParam),
      });
      const responseData: Todo[] = await responseBody.json();
      return { date: todoParam.date, todos: responseData };
    },
    onSuccess: ({ date, todos }: { date: string; todos: Todo[] }) => {
      const todoMap = queryClient.getQueryData<TodoMap>([TODOS_QUERY_KEY]);
      if (!todoMap) return;

      queryClient.setQueryData([TODOS_QUERY_KEY], { ...todoMap, [date]: todos });
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
export const useToggleTodoQuery = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (todoSaveParams: TodoSaveParams) => {
      const responseBody = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoSaveParams),
      });
      if (responseBody.status !== 200) {
        throw new Error('Failed to save todo');
      }

      const responseData: Todo[] = await responseBody.json();
      return { date: todoSaveParams.date, result: responseData };
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
    onError: (error, _, context) => {
      if (context) {
        // TODO 에러를 캐치해서 sentry 같은 곳으로 보내거나, 사용자에게 알림을 띄워줄 수 있습니다.
        queryClient.setQueryData([TODOS_QUERY_KEY], context);
      }
    },
  });
};

export const todoToMap = (todos?: Todo[]): Record<string, Todo[] | undefined> => {
  return (
    todos?.reduce<Record<string, Todo[]>>((acc, todo) => {
      const date = todo.date;
      return {
        ...acc,
        [date]: [...(acc[date] || []), todo],
      };
    }, {}) || {}
  );
};
