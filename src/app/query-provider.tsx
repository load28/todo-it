'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export function QueryProviders({ children }: PropsWithChildren<{}>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
