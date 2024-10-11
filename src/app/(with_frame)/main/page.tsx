import { Todo } from '@/app/(with_frame)/main/Todo';
import { todoMapQueryPrefetch } from '@/app/@core/query/todo-query';
import { getQueryClient } from '@/app/@core/providers/query/query-utils';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';
import { auth } from '@/app/@core/auth/auth';

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
