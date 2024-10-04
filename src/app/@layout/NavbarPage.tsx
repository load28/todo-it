import { Navbar } from '@/app/@layout/Navbar';
import { sessionQueryPrefetch } from '@/app/@core/query/session-query';
import { getQueryClient } from '@/app/@core/providers/query/query-utils';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/query-core';

export default async function NavbarPage() {
  const queryClient = getQueryClient();
  await sessionQueryPrefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar />
    </HydrationBoundary>
  );
}
