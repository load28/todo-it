import { queryOptions } from '@tanstack/react-query';

const SESSION_QUERY_KEY = 'session';
export const sessionQueryOptions = queryOptions({
  queryKey: [SESSION_QUERY_KEY],
  queryFn: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`);
    return response.json();
  },
});
