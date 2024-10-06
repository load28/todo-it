import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { auth } from '@/app/@core/auth/auth';

export type TodoItSessionInfo = {
  id: string;
  email: string;
  image: string;
};

const SESSION_QUERY_KEY = 'session';
const SESSION_QUERY_STALE_TIME = 1000 * 60 * 60 * 24;

const sessionGuard = (session: any): session is TodoItSessionInfo => {
  return session?.id && session?.email && session?.image;
};

export const useSessionQuery = () => {
  return useSuspenseQuery<TodoItSessionInfo>({
    queryKey: [SESSION_QUERY_KEY],
    staleTime: SESSION_QUERY_STALE_TIME,
    queryFn: async (): Promise<TodoItSessionInfo> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`);
        const data = await response.json();
        if (!sessionGuard(data.user)) {
          /**
           * TODO session 에러인 경우 상위의 바운더리에서 에러를 케치하여 에러 페이지로 이동시켜야함
           * 즉 해당 훅을 사용하는 곳에서는 세션이 주입되어 있는 곳에서만 사용할수있음
           * 에러를 유형별로 캐치하게 만들어야함 (예: 세션 에러, 네트워크 에러 등)
           */
          throw new Error('Invalid session');
        }

        return {
          id: data.user.id,
          email: data.user.email,
          image: data.user.image,
        };
      } catch (error) {
        throw new Error('Unknown error');
      }
    },
  });
};

export async function sessionQueryPrefetch(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: [SESSION_QUERY_KEY],
    staleTime: SESSION_QUERY_STALE_TIME,
    queryFn: async (): Promise<TodoItSessionInfo> => {
      try {
        const session = await auth();
        if (!sessionGuard(session?.user)) {
          throw new Error('Invalid session');
        }

        return {
          id: session.user.id,
          image: session.user.image,
          email: session.user.email,
        };
      } catch (error) {
        throw new Error('Unknown error');
      }
    },
  });
}
