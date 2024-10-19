import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { getQueryClient } from '@todo-it/core/providers/query/query-utils';
import { auth } from '@todo-it/core/auth/auth';
import { todoMapQueryPrefetch } from '@todo-it/core/query/todo-query';
import { Todo } from '@todo-it/app/(with_frame)/main/Todo';

export default async function Page() {
  const queryClient = getQueryClient();
  const session = await auth();
  // todo auth 함수도 세션 에러를 캐치해서 예외처리하는 커스텀 함수로 감싸야함
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
