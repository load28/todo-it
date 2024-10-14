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

export const useTodoSaveQuery = (onSuccess: () => void) => {
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
      onSuccess();
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
