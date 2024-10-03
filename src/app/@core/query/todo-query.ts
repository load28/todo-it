'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos, Todo } from '@/app/api/todo';

const TODOS_QUERY_KEY = 'todos';

const useTodoQuery = (tz?: string) => useQuery({ queryKey: [TODOS_QUERY_KEY], queryFn: getTodos(tz) });
const useTodoToggle = (date: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TODOS_QUERY_KEY],
    mutationFn: async (id: string): Promise<Record<string, Todo[]>> => {
      const allTodos = queryClient.getQueryData<Record<string, Todo[]>>([TODOS_QUERY_KEY]) || {};
      return {
        ...allTodos,
        [date]: allTodos[date].map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)),
      };
    },
    onSuccess: (todos) => {
      queryClient.setQueryData([TODOS_QUERY_KEY], todos);
    },
  });
};

export { useTodoToggle, useTodoQuery };
