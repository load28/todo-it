import { dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { auth } from '@todo-it/core/auth/auth';
import { getQueryClient } from '@todo-it/core/providers/query/query-utils';
import { todoMapQueryPrefetch } from '@todo-it/core/query/todo-query';

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  await todoMapQueryPrefetch(queryClient, session.user.id);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
