import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { auth } from '@todo-it/core/auth/auth';

const TodoItSessionInfoSchema = z.object({ id: z.string(), email: z.string().email(), image: z.string().url() });
export type TodoItSessionInfo = z.infer<typeof TodoItSessionInfoSchema>;

const SESSION_QUERY_KEY = 'session';
const SESSION_QUERY_STALE_TIME = 1000 * 60 * 60 * 24;

export const useSessionQuery = () => {
  return useSuspenseQuery<TodoItSessionInfo>({
    queryKey: [SESSION_QUERY_KEY],
    staleTime: SESSION_QUERY_STALE_TIME,
    queryFn: async (): Promise<TodoItSessionInfo> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`);
        const responseBody = await response.json();
        const { error, data: user } = TodoItSessionInfoSchema.safeParse(responseBody.user);
        if (error) {
          /**
           * TODO session 에러인 경우 상위의 바운더리에서 에러를 케치하여 에러 페이지로 이동시켜야함
           * 즉 해당 훅을 사용하는 곳에서는 세션이 주입되어 있는 곳에서만 사용할수있음
           * 에러를 유형별로 캐치하게 만들어야함 (예: 세션 에러, 네트워크 에러 등)
           */
          throw new Error('Invalid session');
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image,
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
        const { error, data: user } = TodoItSessionInfoSchema.safeParse(session?.user);
        if (error) {
          throw new Error('Invalid session');
        }

        return {
          id: user.id,
          image: user.image,
          email: user.email,
        };
      } catch (error) {
        throw new Error('Unknown error');
      }
    },
  });
}
