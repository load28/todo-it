import { QueryClient, queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Todo } from '@/app/api/todo/route';
import { utcDayjs } from '@/app/@core/utils/date';
import { todo } from 'node:test';

export const TODOS_QUERY_KEY = 'todos';
export type TodoMap = Record<string, Todo[] | undefined>;
const todoQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async (): Promise<TodoMap> => {
      const responseBody = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo?userId=${userId}`);
      const data = await responseBody.json();
      return todoToMap(data);
    },
  });

export const useTodoQuery = (userId: string) => useSuspenseQuery(todoQueryOptions(userId));
export const todoQueryPrefetch = async (queryClient: QueryClient, userId: string) => await queryClient.prefetchQuery(todoQueryOptions(userId));

export const todoToMap = (todos?: Todo[]) => {
  return (
    todos?.reduce<Record<string, Todo[]>>((acc, todo) => {
      const tzDate = utcDayjs(todo.date).format('YYYY-MM-DD');
      return {
        ...acc,
        [tzDate]: [...(acc[tzDate] || []), todo],
      };
    }, {}) || {}
  );
};
