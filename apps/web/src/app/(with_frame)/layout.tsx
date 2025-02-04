import { Stack } from '@mantine/core';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Navbar } from '@todo-it/components/navbar/Navbar';
import { getQueryClient } from '@todo-it/core/providers/query/query-utils';
import { sessionQueryPrefetch } from '@todo-it/core/query/session-query';

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  await sessionQueryPrefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="layout">
        <Navbar />
        <div className="layoutMain">
          <div className="layoutMainContent">
            <Stack pl={24} pr={24} h={'100%'}>
              {children}
            </Stack>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
