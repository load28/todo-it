'use client';

import {
  dehydrate,
  HydrationBoundary,
  useQueryClient,
} from '@tanstack/react-query';
import { TodoList } from './TodoList';
import { getTodos } from '@/api/todo';

export function TodoPage() {
  const client = useQueryClient();
  const fetchData = async () => {
    await client.prefetchQuery({
      queryKey: ['todos'],
      queryFn: getTodos,
    });
    return dehydrate(client);
  };

  return (
    <HydrationBoundary state={fetchData}>
      <TodoList />
    </HydrationBoundary>
  );
}
