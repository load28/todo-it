import { HydrationBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/app/@core/providers/query/query-utils';
import { auth } from '@/app/@core/auth/auth';
import { dehydrate } from '@tanstack/query-core';
import { PropsWithChildren } from 'react';

type TodoItSessionInfo = {
  email: string;
  image: string;
};

type TodoItSessionResult = TodoItSessionInfo | null;

const SESSION_QUERY_KEY = 'session';
export const useSessionQuery = () =>
  useSuspenseQuery({
    queryKey: [SESSION_QUERY_KEY],
    queryFn: async (): Promise<TodoItSessionResult> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`);
      const data = await response.json();
      return {
        email: data.user.email,
        image: data.user.image,
      };
    },
  });

export async function SessionQueryPrefetchBoundary({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [SESSION_QUERY_KEY],
    queryFn: async (): Promise<TodoItSessionResult> => {
      const session = await auth();
      if (!(session?.user?.image && session?.user?.email)) {
        return null;
      }

      return {
        image: session.user.image,
        email: session.user.email,
      };
    },
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
