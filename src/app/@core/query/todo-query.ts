import { QueryClient, queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Todo } from '@/app/api/todo/route';
import { utcDayjs } from '@/app/@core/utils/date';

const TODOS_QUERY_KEY = 'todos';
const todoQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/todo?userId=${userId}`);
      return await res.json();
    },
  });

export const useTodoQuery = (userId: string) => useSuspenseQuery(todoQueryOptions(userId));
export const todoQueryPrefetch = async (queryClient: QueryClient, email: string) => await queryClient.prefetchQuery(todoQueryOptions(email));
export const useTodoToggle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (id: string): Promise<Todo[]> => {
      const todos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]);
      return todos?.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)) || [];
    },
    onSuccess: (todos: Todo[]) => queryClient.setQueryData([TODOS_QUERY_KEY], todos),
  });
};

export const todoToMap = (tz?: string, todos?: Todo[]) => {
  return (
    todos?.reduce<Record<string, Todo[]>>((acc, todo) => {
      const tzDate = utcDayjs(todo.date).tz(tz).format('YYYY-MM-DD');
      return {
        ...acc,
        [tzDate]: [...(acc[tzDate] || []), todo],
      };
    }, {}) || {}
  );
};
