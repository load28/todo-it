import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Todo } from '@todo-it/app/(with_frame)/main/Todo';
import { auth } from '@todo-it/core/auth/auth';
import { getQueryClient } from '@todo-it/core/providers/query/query-utils';
import { todoMapQueryPrefetch } from '@todo-it/core/query/todo-query';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const queryClient = getQueryClient();
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  await todoMapQueryPrefetch(queryClient, session.user.id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Todo />
    </HydrationBoundary>
  );
}
