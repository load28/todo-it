import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { auth } from '@/app/@core/auth/auth';

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

export async function sessionQueryPrefetch(queryClient: QueryClient) {
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
}
