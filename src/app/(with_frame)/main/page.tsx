import { Todo } from '@/app/(with_frame)/main/Todo';
import { todoQueryPrefetch } from '@/app/@core/query/todo-query';
import { getQueryClient } from '@/app/@core/providers/query/query-utils';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';

export default async function Page() {
  const queryClient = getQueryClient();
  await todoQueryPrefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todo />
    </HydrationBoundary>
  );
}
