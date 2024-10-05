import { PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';
import Navbar from '@/app/(with_frame)/@navbar/Navbar';
import { getQueryClient } from '@/app/@core/providers/query/query-utils';
import { sessionQueryPrefetch } from '@/app/@core/query/session-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';

export default async function layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  await sessionQueryPrefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="layout">
        <Navbar />
        <div className="layoutMain">
          <Stack pl={24} pr={24} h={'100%'}>
            {children}
          </Stack>
        </div>
      </div>
    </HydrationBoundary>
  );
}
